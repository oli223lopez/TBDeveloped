import { RECEIVE_CHAT_ERRORS, REMOVE_CHAT_ERRORS } from "../actions/messages_actions";

const ChatErrorReducer = (state = [], action) => {

    switch(action.type){
        case RECEIVE_CHAT_ERRORS:
            return [action.errors]
        case REMOVE_CHAT_ERRORS:
            return []
        default: return state
    }

}


export default ChatErrorReducer



