import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const userReducer = (state = {}, action) => {
    Object.freeze(state);

    const newState = Object.assign({}, state); 

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser 
        default:
            return state;
    }

}

export default userReducer; 