import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_actions'
import {fetchQuestion} from '../../actions/questions_actions'


const mapStateToProps = (state, props,)=> { 
    return (
    {newResponse: {
        consultation: '',
        answer: '',
        user: state.session.user.id
    },
    formType: 'Respond',
<<<<<<< HEAD
    }
    )
=======
    errors: state.errors.responses})
>>>>>>> main
}

const mapDispatchToProps = dispatch => ({
    processForm: (questionID, newResponse) => dispatch(postResponse(questionID, newResponse)),

})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)