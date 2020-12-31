const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
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
},
    {
        timestamps: true
        
    })
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question


