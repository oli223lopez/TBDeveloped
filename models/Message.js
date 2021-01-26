const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({

    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        require: true
    },

    //loggedIn User
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },

    //string for a single sentence
    sentence: { 
        type: String,
        require: true
    }
},
    {
        timestamps: true
    })
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message 




