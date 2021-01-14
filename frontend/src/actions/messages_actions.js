import * as MessagesAPIUtil from "../util/messages_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_CHAT = 'RECEIVE_CHAT';


export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const receiveMessages = (messages) => {
    return{
        type: RECEIVE_MESSAGES,
        messages
    }
}

export const receiveChat = (chat) => {
    return {
        type: RECEIVE_CHAT,
        chat
    }
}


//THUNK ACTION

export const postChat = (newChat) => dispatch => {
    return MessagesAPIUtil.postChat(newChat)
        .then(res => dispatch(receiveChat(res.data)))

}

export const fetchMessage = (messageId) => dispatch => {
    return MessagesAPIUtil.fetchMessage(messageId)
        .then(res => dispatch(receiveMessage(res.data)))
}

export const fetchMessages = () => dispatch => {
    return MessagesAPIUtil.fetchMessages()
        .then(res => dispatch(receiveMessages(res.data)))
}


export const fetchChat = (chatID) => dispatch => {
    return MessagesAPIUtil.fetchChat(chatID)
        .then(res => dispatch(receiveChat(res.data)))
}