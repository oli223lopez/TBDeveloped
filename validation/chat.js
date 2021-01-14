module.exports = function validateChat(data) {

  if(!data.question){
        errors.question = "this chat isn't associcated qith a question"
    }

    //for now we are allowing messages to be null

  return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}