const Validator = require("validator");
const validText = require('./valid-text')

module.exports = function validateMessage(data) {
    let errors = {}; 

    if(!data.user){
        errors.user = "This message isn't associated with a user"
    }

    data.sentence = validText(data.sentence) ? data.sentence : '';

    //checks to see if sentence is a valid text
    if(Validator.isEmpty(data.sentence)) {
        errors.sentence = "Please write a message to send"
      }

    

    return {
        errors, 
        isValid: Object.keys(errors).length === 0 
    }
}