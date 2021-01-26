import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_actions'
// import {fetchQuestion} from '../../actions/questions_actions'
import {fetchUser} from '../../actions/session_actions';

const mapStateToProps = (state, props,)=> { 
    return (
    {newResponse: {
        consultation: '',
        answer: '',
        user: state.session.user.id,
    },
    formType: 'Reply',
    currentUser: state.entities.currentUser, 
    questions: state.entities.currentUser.questions,
    userID: state.session.user.id

    })
}

const mapDispatchToProps = dispatch => ({
    processForm: (questionID, newResponse) => dispatch(postResponse(questionID, newResponse)),
    fetchUser: (userID) => dispatch(fetchUser(userID))

})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)