import * as ResponsesApiUtil from "../util/responses_api_util";

export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const REMOVE_RESPONSE = 'REMOVE_RESPONSE';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

//THUNK
const receiveResponse = (question) => {
    return{
        type: RECEIVE_RESPONSE,
        question
    }
}

const removeResponse = (question, response) => {
    return {
        type: REMOVE_RESPONSE,
        question,
        response,
    }
}

const receiveResponseErrors = (errors) => {
    return {
        type: RECEIVE_RESPONSE,
        errors
    }
}

//THUNK ACTION

export const postResponse = (questionId, response) => (dispatch) => {
    return ResponsesApiUtil.postResponse(questionId, response)
        .then( res => { dispatch(receiveResponse(res.data)) })
        .catch( errors => { dispatch(receiveResponseErrors(errors.response.data))})
}

export const deleteResponse = (questionId, responseId) => (dispatch) => {
    return ResponsesApiUtil.deleteResponse(questionId, responseId)
        .then( res => { dispatch(removeResponse(res.data)) })
        .catch(err => dispatch(receiveResponseErrors(err)))
}