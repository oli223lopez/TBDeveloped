import { connect } from 'react-redux';
import Messenger from './messenger.js'


const mSTP = (state) => {
    // console.log(state.session.user)
    return({
    user: state.session.user.activeChats})
}

const mDTP = (dispatch) => ({

})

export default connect(mSTP, mDTP)(Messenger)