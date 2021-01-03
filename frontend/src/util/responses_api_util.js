import axios from "axios";

//? Not need since we only have Post and Delete Reponses embedded in Questions
// export const fetchResponse = (questionId) => {
//     return axios.get(`/api/questions/${questionId}`)
// }

export const postResponse = (questionId, response) => {
    return axios.post(`/api/questions/${questionId}/responses`, response)
}

//testing in browser
// response = {consultation: 12/31/2021, answer: 'testingtesting'}
// axios.post(`/api/questions/"5fee995f12a6d3671ba3bb7e/responses"`, response).then(res => console.log(res.data))


export const deleteResponse = (questionId, responseId) => {
    return axios.delete(`/api/questions/${questionId}/responses/${responseId}`)
}
// testing in browser
//axios.delete('api/questions/5fee995f12a6d3671ba3bb7e/responses/5fee9b571e26b27079e8fd23/')