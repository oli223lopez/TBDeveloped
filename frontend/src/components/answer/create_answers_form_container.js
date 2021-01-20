import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_actions'
import {fetchQuestion} from '../../actions/questions_actions'
import {fetchUser} from '../../actions/session_actions';


const mapStateToProps = (state, props,)=> { 
    return (
    {newResponse: {
        consultation: '',
        answer: '',
        user: state.session.user.id
    },
    formType: 'Reply',
    currentUser: state.entities.currentUser, 
    })
}

const mapDispatchToProps = dispatch => ({
    processForm: (questionID, newResponse) => dispatch(postResponse(questionID, newResponse)),
    fetchUser: () => dispatch(fetchUser())

})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)