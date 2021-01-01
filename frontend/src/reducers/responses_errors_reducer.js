import { RECEIVE_ERRORS } from "../actions/responses_actions";

const ResponsesErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {}; 

    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errors
        default:
            return newState;
    }
}

export default ResponsesErrorsReducer;