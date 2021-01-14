import axios from 'axios'; 

export const postChat = (questionID) => { // question 
    return axios.post(`/api/chat`, questionID)
}

export const fetchChat = (chatID) => {
    return axios.get(`/api/chat/${chatID}`)
}

export const postMessage = (message) => {
    return axios.post(`/api/message`, message)
}

export const fetchMessages = () => {
    return axios.get(`/api/message`)
}

export const fetchMessage = (messageID) => {
    return axios.get(`/api/message/${messageID}`)
}