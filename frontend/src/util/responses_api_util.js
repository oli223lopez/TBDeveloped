import axios from "axios";

//? Not need since we only have Post and Delete Reponses embedded in Questions
// export const fetchResponse = (questionId) => {
//     return axios.get(`/api/questions/${questionId}`)
// }

export const postResponse = (questionId, response) => {
    return axios.post(`/api/questions/${questionId}/responses/`, response)
}

export const deleteResponse = (questionId, responseId) => {
    return axios.delete(`/api/questions/${questionId}/responses/${responseId}`)
}
