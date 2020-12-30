import { combineReducers } from 'redux'; 
import QuestionsReducer from "./questions_reducer";

export default combineReducers ({
    questions: QuestionsReducer
});