import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_actions'


const mapStateToProps = (state, props)=> { 
    return (
    {newResponse: {
        consultation: '',
        answer: '',
        user: state.session.user.id
    },
    formType: 'Respond',})
}

const mapDispatchToProps = dispatch => ({
<<<<<<< HEAD
    processForm: (questionsId, newResponse) => dispatch(postResponse(questionsId, newResponse)) 
=======
    processForm: (questionID, newResponse) => dispatch(postResponse(questionID, newResponse)) 
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)