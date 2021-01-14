module.exports = function validateChat(data) {

  if(!data.question){
        errors.question = "this chat isn't associcated with a question"
    }

  if(!data.response){
        errors.response = "this chat isn't associcated with a response"
    }

    //for now we are allowing messages to be null

  return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}