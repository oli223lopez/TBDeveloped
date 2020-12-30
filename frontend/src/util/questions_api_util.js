import axios from "axios";

export const fetchQuestions = () => {
    return axios.get("/api/questions/questions")
};

export const fetchQuestion = (questionId) => {
    return axios.get(`/api/questions/questions/${questionId}`)
}

export const postQuestion = (newQuestion) => {
    return axios.post("/api/questions/questions", newQuestion)
}

export const updateQuestion = (questionId, questionUpdates) => {
    return axios.patch(`/api/questions/${questionId}`, questionUpdates)
}

export const deleteQuestion = (questionId) => {
    return axios.delete(`/api/questions/${questionId}`)
}

// CRUD 