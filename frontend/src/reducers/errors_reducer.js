import {combineReducers} from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import QuestionsErrorsReducer from './questions_errors_reducer';

export default combineReducers ({
     session: SessionErrorsReducer,
     questions: QuestionsErrorsReducer
    });