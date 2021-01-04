import { combineReducers } from 'redux'; 
import QuestionsReducer from "./questions_reducer";
import ResponsesReducer from "./responses_reducer";
import ProfileReducer from './profile_reducer'

export default combineReducers ({
    questions: QuestionsReducer,
    responses: ResponsesReducer,
    profile: ProfileReducer
});