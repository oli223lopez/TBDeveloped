const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require("./Question")



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
    questions: [ { type: Schema.Types.ObjectId, ref: Question }]
},
    {
        timestamps: true
    })
const User = mongoose.model('User', UserSchema);

module.exports = User