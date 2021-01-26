import {connect} from 'react-redux'
import {deleteResponse} from '../../actions/responses_actions'
import AnswerIndexItem from '../answer/answer_index_item'


const mapStateToProps = (state,ownProps) => (
{    response: ownProps.response,
     questionID:  ownProps.questionID,
    currentUserID: ownProps.currentUserID,
    
    
})

const mapDispatchToProps = (dispatch) => ({
    deleteResponse: (questionId, responseId) => dispatch(deleteResponse(questionId, responseId)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerIndexItem)

