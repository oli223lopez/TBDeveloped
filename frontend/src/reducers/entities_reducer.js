import { combineReducers } from 'redux'; 
import QuestionsReducer from "./questions_reducer";
import ResponsesReducer from "./responses_reducer";

export default combineReducers ({
    questions: QuestionsReducer,
    responses: ResponsesReducer
});