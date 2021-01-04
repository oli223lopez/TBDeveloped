const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User')

const ResponseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    consultation: {
        type: Date,
        require: true
    },
    answer: {
        type: String,
        require: true 
    }
},
    {
        timestamps: true
    })

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    subject: {
        type: String,
        reqiure: true,
        unique: true
    },
    content: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        enum: ["idea", "question"],
        require: true
    },
    solved: {
        type: Boolean,
        default: false,
        require: true
    },
    responses: [ResponseSchema]
},
    {
        timestamps: true
        
    })

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question


