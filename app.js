const express = require("express");
const app = express();
const users = require("./routes/api/users");
const User = require('./models/User')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path');


const port = process.env.PORT || 5000;

// socket dependencies
const socket = require("socket.io"); 
const io = socket(app.listen(port, () => console.log(`Server is running on port ${port}`)))

// video feature test

const rooms = {};

const peers = {};

io.on("connection", socket => { // listens for "connection" event, which generates a socket object. This is triggered when a user on a browser hits a particular page 



    socket.on('join', room  => {
        socket.join(room);
        socket.emit('your id', socket.id)
        socket.on('send message', body => {
            // console.log(room)
            io.to(room).emit('message', body)
        })
    });


    


      socket.on("send name", username => {
        peers[socket.id.toString()] = username
        })

    // listens for "connection" event, which generates a socket object. 
    // this appears to be triggered by the room.js socketRef.current = io.connect("/");
    
    socket.on("join room", roomID => { 
        // applying a event listener to the socket generated, which listens for "join room"
        // this is an event fired off from the frontend room.js file 

        
    
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }

        // the "join room" event emits the roomID number (see rooms.js). This gets passed down to this
        // "join room" listener. Here we set the roomID as the key of rooms
        // essentially rooms is a key-value pair list of rooms
        // the value is an array of socket id's, each of which belongs to a user
        // so a list of rooms, with each user in the room 


        
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        // look into a speciific room based on the roomId emitted with the "join room event"
        // goes through the id's stored in that room checks if there is a id in the room that doesn't belong to the 
        // user who just joined then that becomes the otherUser 
        // finds an ID that does NOT match the socket id of the user who just connected. This represents another user 
        // in the room 

      

        if (otherUser) {
            socket.emit("other user", otherUser);
            // this emits the other user event to the client side, the person who just joined this chatroom   
            socket.to(otherUser).emit("user joined", socket.id)
            // this second line emits an event TO the other user. 
            // socket.to().emit will emit an event to a specified user 
            // remember otherUser is a socket essentially? 

            let selfUser = socket.id
            socket.to(otherUser).emit("receive name", peers[socket.id])
            socket.emit("receive name", peers[otherUser])
        }

        // if other user exists, then you emit a event called "other user" along with the OTHER USERS socket id 
        // you also emit to the other user that a user joined, event along with the user who just joined 

       
        // on this event, do this. 
        socket.on("offer", payload => { // caller, makes the call, and supplies a payload 
            io.to(payload.target).emit("offer", payload);
           
        });

        socket.on("answer", payload => { // receiver, answers the call and responds with a payload 
            io.to(payload.target).emit("answer", payload)
        });

        socket.on("ice-candidate", incoming => { // established a proper connection 
            // console.log(incoming.test)
            io.to(incoming.target).emit("ice-candidate", incoming.candidate)
        })

        socket.on('remove-user', () => {
            // console.log('hello from yee old server')
            // console.log(rooms[roomID].indexOf(socket.id))
            const index = rooms[roomID].indexOf(socket.id) 
            rooms[roomID] = rooms[roomID].splice(0, index) + rooms[roomID].splice(index + 1)
            // console.log(rooms)
        })


        socket.on('disconnect', () => {
        
            let idx = rooms[roomID].indexOf(socket.id)   

            delete peers[socket.id]
            
            rooms[roomID].splice(idx, 1)

            if(otherUser) {
                io.to(otherUser).emit("killconnection")
            }
        })
       




            socket.on("hangUp", otherUserId => {
                io.to(otherUserId).emit("killconnection")
            })

        //

    })
})

// video feature test

const questions = require("./routes/api/questions");
const chat = require("./routes/api/chat")
// const responses = require("./routes/api/responses") 12/31/20 removed since responses are embedded within questions

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.get("/", (req, res) => {
    res.send(" World")

});

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(passport.initialize())
require('./config/passport')(passport)

app.use("/api/users", users)
app.use("/api/questions", questions) 

// const chat = require("./routes/api/chat")
app.use('/api/chat',chat)

const message = require('./routes/api/message')
app.use('/api/message', message)
// app.use("/api/responses", responses) 12/31/20, removed since responses are embedded within questions
