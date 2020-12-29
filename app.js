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

io.on("connection", socket => { // listens for "connection" event, which generates a socket object. This is triggered when a user on a browser hits a particular page 

    // console.log((new Date()).getTime())
    console.log(socket.id)

    socket.on("join room", roomID => { // applying a event listener to the socket generated, which listens for "join room", which is a event fired off from the CLIENT side 
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        // listens for the join room event. This event is triggered when someone creates a room on the fronend or joins 
        // a room. 
        // the event is emited with the room id which is just grabbed from the url 
        // here it checks to see if the room id exists within the rooms object declared on line 10
        // if it does it pushes the socket.id (the id of the )

        const otherUser = rooms[roomID].find(id => id !== socket.id);

        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id)
        }

       
        // on this event, do this. 
        socket.on("offer", payload => { // caller, makes the call, and supplies a payload 
            io.to(payload.target).emit("offer", payload);
        });

        socket.on("answer", payload => { // receiver, answers the call and responds with a payload 
            io.to(payload.target).emit("answer", payload)
        });

        socket.on("ice-candidate", incoming => { // established a proper connection 
            io.to(incoming.target).emit("ice-candidate", incoming.candidate)
        })

    })
})

// video feature test


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.get("/", (req, res) => {

    // const user = new User({
    //     username: 'oli',
    //     email: 'oli@oli',
    //     password: 'password'
    // })    
    // user.save()
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

