import {connect} from 'react-redux';
import {receiveResponse} from '../../actions/responses_actions';
import AnswerIndex from '../answer/answer_index';
import {postChat} from '../../actions/messages_actions';
import {fetchUser} from '../../actions/session_actions';
import { removeChatErrors } from '../../actions/messages_actions'


const mapStateToProps = (state, ownProps) => {
    
    return({
    questionSubject: ownProps.questionSubject,
    questionID: ownProps.questionID,
    responses: ownProps.responses,
    username: ownProps.username,
    posterID: ownProps.currentUserID,
        chatErrors: state.errors.chats

    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchAnswers: (responses) => dispatch(receiveResponse(responses)),
    createChat: (newChat) => dispatch(postChat(newChat)),
    fetchUser: () => dispatch(fetchUser()),
    removeChatErrors: () => dispatch(removeChatErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerIndex)
