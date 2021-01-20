import { RECEIVE_QUESTIONS, RECEIVE_QUESTION,REMOVE_QUESTION } from "../actions/questions_actions";


const QuestionsReducer = (state={}, action) =>  {
    Object.freeze(state); 

    let newState = Object.assign({}, state);
    // debugger
    // console.log(action.type)
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            let questionState = {}
            Object.values(action.questions).forEach(question => {
                questionState[question._id] = question
            })
            return questionState
            // Object.values(action.questions).map( question => {
            //     return newState[question._id] = question
            // })
            // return newState
        case RECEIVE_QUESTION:
            newState[action.question._id] = action.question
            return newState
        case REMOVE_QUESTION: 
            let questionId = action.question._id
            delete newState[questionId]
            return newState
        default:
            return state;
    }
}

export default QuestionsReducer; 