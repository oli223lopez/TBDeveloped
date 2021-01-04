const Validator = require("validator");
const validText = require('./valid-text')

module.exports = function validateResponse(data) {
    // console.log(data)
    let errors = {}; 

    data.answer = validText(data.answer) ? data.answer : "";

    if(Validator.isEmpty(data.answer)) {
        errors.answer = "Please include an answer"
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0 
    }
}