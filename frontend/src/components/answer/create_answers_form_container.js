import {connect} from 'react-redux'
import ResponseForm from './answer_form'
import {postResponse} from '../../actions/responses_action'


const mapStateToProps = (state, ownProps)=> ({
    newResponse: {
        consultation: '',
        answer: '',
        user: ownProps.userID
    },
    formType: 'Respond',
})

const mapDispatchToProps = dispatch => ({
    processForm: (newResponse) => dispatch(postResponse(newResponse)) 
})

export default connect(mapStateToProps,mapDispatchToProps)(ResponseForm)