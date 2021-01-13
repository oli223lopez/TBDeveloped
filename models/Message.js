const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    //string array of conversations
    conversations: [ { type: string, required: true }]
},
    {
        timestamps: true
    })
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message 