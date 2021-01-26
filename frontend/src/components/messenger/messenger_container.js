import { connect } from 'react-redux';
import Messenger from './messenger.js';

import {postMessage} from '../../actions/messages_actions';
import {fetchChat} from '../../actions/messages_actions';

const mSTP = (state) => {
    return({
    userID: state.session.user.id,
    user: state.session.user.activeChats,
    username: state.session.user.username
    })

}

const mDTP = (dispatch) => ({
    postMessage: (message) => dispatch(postMessage(message)),
    fetchChat: (chatID) => dispatch(fetchChat(chatID))

})

export default connect(mSTP, mDTP)(Messenger)