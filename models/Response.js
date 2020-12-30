const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const ResponseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    consultation: {
        type: Date,
        require: true
    },
    answer: {
        type: String
    }
},
    {
        timestamps: true


    })
const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response


