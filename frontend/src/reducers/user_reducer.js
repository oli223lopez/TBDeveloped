import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const userReducer = (state = {}, action) => {
    Object.freeze(state);

    // const newState = Object.assign({}, state); commented out because it is not being used yet 1/13/21 - Tom  

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser 
        default:
            return state;
    }

}

export default userReducer; 