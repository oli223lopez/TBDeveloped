import { RECEIVE_MESSAGE, RECEIVE_MESSAGES, RECEIVE_CHAT } from "../actions/messages_actions";


const MessagesReducer = (state={}, action) =>  {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_MESSAGES:
            Object.values(action.messages).map( message => {
                return newState[message._id] = message
            })
            return newState
        case RECEIVE_MESSAGE:
            newState[action.message._id] = action.message
            return newState
        case RECEIVE_CHAT: 
            let chatId = action.chat._id
            delete newState[chatId]
            return newState
        default:
            return state;
    }
}

export default MessagesReducer; 