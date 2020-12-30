const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateQuestionInput(data){
    let errors = {};

    data.subject = validText(data.subject) ? data.subject : '';
    data.content = validText(data.content) ? data.content : '';
    data.tag = validText(data.tag) ? data.tag : '';
    // data.solved = validBoolean(data.solved) ? data.solved
    


    if (Validator.isEmpty(data.subject)) {
        errors.subject = "Please enter a subject"
    }

     if (!Validator.isLength(data.subject, {min: 10 ,max: 100 })) {
         errors.subject = "Please enter a subject thats between 10 and 100 "
     }

    if (Validator.isEmpty(data.content)) {
        errors.content = `Please enter details for your ${data.tag === "question" ? "question" : "idea" }`
    }
    
    if(Validator.isEmpty(data.tag)){
        errors.tag = "Please select a tag"
    }

    // if(!Validator.matches( data.tag, "idea") || !Validator.matches(data.tag,"question") ){
    //     errors.tag = "Please set tag as either idea or question"
    // }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}