import { RECEIVE_QUESTIONS, REMOVE_QUESTION } from "../actions/questions_actions";


const QuestionsReducer = (state={}, action) =>  {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return newState
        case REMOVE_QUESTION: 
            return newState
        default:
            return state;
    }
}

export default QuestionsReducer; 