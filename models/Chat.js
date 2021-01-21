const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require("./Message")
const Question = require("./Question")
const User = require("./User")

const ChatSchema = new Schema({

    question: {
        type: Schema.Types.ObjectId,
        ref: Question,
        require: true
    },
    
    response: {
        type: Schema.Types.ObjectId,
        ref: 'response',
        require: true
    },
    questionSubject: {
        type: String,
        require: true
    },
    posterID: { type: Schema.Types.ObjectId, ref: 'User', require: true},
    responderID: { type: Schema.Types.ObjectId, ref: 'User', require: true},


    messages: [{ 
        type: Schema.Types.ObjectId, 
        ref: Message
    }]
},
    {
        timestamps: true
    })
    
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat