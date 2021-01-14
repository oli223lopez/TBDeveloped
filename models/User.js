const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require("./Question")
const Chat = require('./Chat')



const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        reqiure: true
    },
    password: {
        type: String,
        require: true
    },
    questions: [{ 
        type: Schema.Types.ObjectId, 
        ref: Question 
    }],

    //collection of live chats this user has
    activeChats: [{
        type: Schema.Types.ObjectId,
        ref: Chat
    }],
    
    
},
    {
        timestamps: true
    })
const User = mongoose.model('User', UserSchema);

module.exports = User