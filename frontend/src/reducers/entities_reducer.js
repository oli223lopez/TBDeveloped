import { combineReducers } from 'redux'; 
import QuestionsReducer from "./questions_reducer";
import ResponsesReducer from "./responses_reducer";
import ProfileReducer from './profile_reducer'
import userReducer from "./user_reducer"; 

export default combineReducers ({
    currentUser: userReducer, 
    questions: QuestionsReducer,
    responses: ResponsesReducer,
    profile: ProfileReducer
});