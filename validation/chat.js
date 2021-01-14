module.exports = function validateChat(data) {
  let errors = {}

  if(!data.questionID){
        errors.question = "this chat isn't associcated with a question"
    }else if(!data.responseID){
      errors.response = "this chat isn't associcated with a response"
    }
    
    //for now we are allowing messages to be null

  return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}