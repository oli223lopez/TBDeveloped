const Validator = require("validator");
const validText = require('./valid-text')

module.exports = function validateMessages(data) {
    let errors = {}; 


    if(!data.question){
        errors.question = "This message isn't associated with a question"
    }

    if(!data.user){
        errors.user = "This message isn't associated with a user"
    }

    if(data.conversations.length<1){
        errors.conversations = "Please start a conversation"

    }

    //this loops through the conversations array and pulls out each question to see if its a valid text
    data.conversations.forEach(message =>{

        //checks to see if message is a valid text
        const newMessage = validText(message) ? message : "";
        if(Validator.isEmpty(newMessage)) {
            errors.conversations = "Please write a valid message"
         }

    })

    

    return {
        errors, 
        isValid: Object.keys(errors).length === 0 
    }
}