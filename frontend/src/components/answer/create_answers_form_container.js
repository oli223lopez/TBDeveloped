import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_actions'


const mapStateToProps = (state, ownProps)=> ({
    newResponse: {
        consultation: '',
        answer: '',
        user: state.session.user.id
    },
    formType: 'Respond',
})

const mapDispatchToProps = dispatch => ({
    processForm: (questionsId, newResponse) => dispatch(postResponse(questionsId, newResponse)) 
})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)