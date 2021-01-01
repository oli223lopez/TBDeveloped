import {connect} from 'react-redux'
import {deleteResponse} from '../../actions/responses_actions'
import AnswerIndex from '../answer/answer_index'

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    console.log(ownProps)
    return({
    responses: ownProps.responses,

    })
}

const mapDispatchToProps = (dispatch) => ({
    deleteResponse: (questionId, responseId) => {dispatch(deleteResponse(questionId, responseId))}
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerIndex)

