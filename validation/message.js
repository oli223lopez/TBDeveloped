const Validator = require("validator");
const validText = require('./valid-text')

module.exports = function validateMessages(data) {
    let errors = {}; 


    if(!data.chatId){
        errors.chatId = "This message isn't associated with a chat"
    }

    if(!data.user){
        errors.user = "This message isn't associated with a user"
    }

    if(!data.sentence){
        errors.sentence = "Please start a conversation"

    }

    //this loops through the conversations array and pulls out each question to see if its a valid text
    // data.conversations.forEach(message =>{

    //     //checks to see if message is a valid text
    //     const newMessage = validText(message) ? message : "";
    //     if(Validator.isEmpty(newMessage)) {
    //         errors.conversations = "Please write a valid message"
    //      }

    // })

    

    return {
        errors, 
        isValid: Object.keys(errors).length === 0 
    }
}