import { RECEIVE_SESSION_ERRORS,RECEIVE_CURRENT_USER } from '../actions/sessions_action';

const nullErrors = [];

const SessionErrorsReducer = (state = nullErrors, action) =>{
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return state;
    default:
      return state;
  }  
}

export default SessionErrorsReducer;