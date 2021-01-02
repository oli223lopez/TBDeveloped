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

//!TEST - WL - trying to remove video on meeting exit
const peers = {};
//!TEST

io.on("connection", socket => { // listens for "connection" event, which generates a socket object. This is triggered when a user on a browser hits a particular page 

    // console.log((new Date()).getTime())
    console.log('this is the socket id', socket.id)

    socket.on("join room", roomID => { // applying a event listener to the socket generated, which listens for "join room", which is a event fired off from the CLIENT side 
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
            console.log('this is the rooms', rooms)
        } else {
            rooms[roomID] = [socket.id];
            console.log('this is the rooms', rooms)
        }
        // listens for the join room event. This event is triggered when someone creates a room on the fronend or joins 
        // a room. 
        // the event is emited with the room id which is just grabbed from the url 
        // here it checks to see if the room id exists within the rooms object declared on line 10
        // if it does it pushes the socket.id (the id of the )

        //!TEST - WL - trying to remove video on meeting exit
        peers[socket.id] = roomID;
        //!TEST

        const otherUser = rooms[roomID].find(id => id !== socket.id);

        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id)
            console.log('other user joined')
        }

       
        // on this event, do this. 
        socket.on("offer", payload => { // caller, makes the call, and supplies a payload 
            io.to(payload.target).emit("offer", payload);
           
        });

        socket.on("answer", payload => { // receiver, answers the call and responds with a payload 
            io.to(payload.target).emit("answer", payload)
        });

        socket.on("ice-candidate", incoming => { // established a proper connection 
            console.log(incoming.test)
            io.to(incoming.target).emit("ice-candidate", incoming.candidate)
        })

        socket.on('remove-user', () => {
            console.log('hello from yee old server')
            // console.log(rooms[roomID].indexOf(socket.id))
            const index = rooms[roomID].indexOf(socket.id) 
            rooms[roomID] = rooms[roomID].splice(0, index) + rooms[roomID].splice(index + 1)
            console.log(rooms)
        })


        //!TEST - WL - trying to remove video on meeting exit
        // socket.on('disconnect', () => {
        //     const roomID = peers[socket.id];
        //     let room = rooms[roomID];
        //     if(room){
        //         room = room.filter(id => id !== socket.id);
        //         users[roomID] = room
        //     }

        //     socket.broadcast.emit('user left', socket.id);
        // })
        //give me the roomID the socket.id is disconneting from and 
        //with that information, give me that room.
        //!TEST - 

    })
})

// video feature test

const questions = require("./routes/api/questions");
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
// app.use("/api/responses", responses) 12/31/20, removed since responses are embedded within questions
