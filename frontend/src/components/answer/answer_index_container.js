import {connect} from 'react-redux'
import {receiveResponse} from '../../actions/responses_actions'
import AnswerIndex from '../answer/answer_index'

const mapStateToProps = (state, ownProps) => {
    return({
    questionID: ownProps.questionID,
    responses: ownProps.responses,
    username: ownProps.username,
    

    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchAnswers: (responses) => dispatch(receiveResponse(responses))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerIndex)

