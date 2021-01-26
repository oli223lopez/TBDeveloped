import {combineReducers} from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import QuestionsErrorsReducer from './questions_errors_reducer';
import ResponsesErrorsReducer from './responses_errors_reducer';
import ChatErrorReducer from './chat_error_reducer';

export default combineReducers ({
     session: SessionErrorsReducer,
     questions: QuestionsErrorsReducer,
     responses: ResponsesErrorsReducer,
     chats: ChatErrorReducer
});