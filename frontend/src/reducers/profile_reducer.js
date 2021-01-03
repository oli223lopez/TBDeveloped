
import {  RECEIVE_PROFILE_QUESTIONS } from "../actions/questions_actions";




const ProfileReducer = (state =[], action) => {
    switch(action.type){
        case RECEIVE_PROFILE_QUESTIONS:
           return action.questions
        default: return state
    }

}

export default ProfileReducer