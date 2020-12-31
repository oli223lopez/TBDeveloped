import { RECEIVE_ERRORS } from "../actions/questions_actions";

const QuestionsErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}; 

    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errors
        default:
            return newState;
    }
}

export default QuestionsErrorsReducer;