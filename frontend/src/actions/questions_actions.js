import * as QuestionsAPIUtil from "../util/questions_api_util"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const REMOVE_QUESTION = "REMOVE_QUESTION"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS, 
        questions // ES6 synthax = questions: questions 
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
        .then( res => { dispatch(receiveQuestions(res)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const fetchQuestion = (questionId) => (dispatch) => {
    return QuestionsAPIUtil.fetchQuestions(questionId)
        .then( res => { dispatch(receiveQuestions(res)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const postQuestion = (newQuestion) => (dispatch) => {
    return QuestionsAPIUtil.postQuestion(newQuestion)
        .then( res => { dispatch(receiveQuestions(res)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const updateQuestion = (questionId, questionUpdates) => (dispatch) =>{
    return QuestionsAPIUtil.updateQuestion(questionId, questionUpdates)
        .then( res => { dispatch(receiveQuestions(res)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}

export const deleteQuestion = (questionId) => (dispatch) => {
    return QuestionsAPIUtil.deleteQuestion(questionId)
        .then( res => { dispatch(removeQuestion(res)) })
        .catch(err => dispatch(receiveQuestionErrors(err)))
}