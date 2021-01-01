import {connect} from 'react-redux'
import {fetchAResponse, deleteResponse} from '../../actions/answers_actions'
import AnswerIndex from '../answer/answer_index'

const mapStateToProps = (state, ownProps) => {
    return({
    questionId: state.questionId,

    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerIndex)

