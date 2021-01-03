import * as QuestionsAPIUtil from "../util/questions_api_util"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_PROFILE_QUESTIONS = "RECEIVE_PROFILE_QUESTIONS";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION"
export const REMOVE_QUESTION = "REMOVE_QUESTION"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"


//test
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const receiveResponse = (response) => {
    return {
        type: RECEIVE_RESPONSE,
        response
    }
}
//test
const receiveProfileQuestions = (questions) => {
    return {
        type: RECEIVE_PROFILE_QUESTIONS,
        questions // ES6 synthax = questions: questions 
    }
}

const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS, 
        questions // ES6 synthax = questions: questions 
    }
}

const receiveQuestion = (question) => {
    return {
        type: RECEIVE_QUESTION, 
        question
    }
}

const removeQuestion = (question) => {
    return {
        type: REMOVE_QUESTION,
        question 
    }
} 
// model action should find the question by it's id and delete it, but return the question in case we need to remove it 
// from the state

const receiveQuestionErrors = (errors) => {
    return {
        type: RECEIVE_ERRORS, 
        errors 
    }
}

export const fetchQuestions = () => (dispatch) => {
    return QuestionsAPIUtil.fetchQuestions()
        .then( res => { dispatch(receiveQuestions(res.data)) } )
        
        .catch(err => dispatch(receiveQuestionErrors(err)))
}


export const fetchProfileQuestions = () => (dispatch) => {
    return QuestionsAPIUtil.fetchQuestions()
        .then(res => { dispatch(receiveProfileQuestions(res.data)) })

        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const fetchQuestion = (questionId) => (dispatch) => {
    return QuestionsAPIUtil.fetchQuestion(questionId)
        .then(res => ( dispatch(receiveQuestion(res.data)), dispatch(receiveResponse(res.data.responses))))
        .catch(err => (dispatch(receiveQuestionErrors(err))))
}

export const postQuestion = (newQuestion) => (dispatch) => {
    return QuestionsAPIUtil.postQuestion(newQuestion)
        .then( res => { dispatch(receiveQuestion(res.data)) })
        .catch( errors => { dispatch(receiveQuestionErrors(errors.response.data)) })
}


export const updateQuestion = (questionId, questionUpdates) => (dispatch) =>{
    return QuestionsAPIUtil.updateQuestion(questionId, questionUpdates)
        .then( res => { dispatch(receiveQuestion(res.data))})
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const deleteQuestion = (questionId) => (dispatch) => {
    return QuestionsAPIUtil.deleteQuestion(questionId)
        .then( res => { dispatch(removeQuestion(res.data)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

