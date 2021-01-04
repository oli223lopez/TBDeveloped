import {connect} from 'react-redux';
import Room from './room.js'


const mSTP = (state) => ({
   user: state.session.user.username
})

const mDTP = (dispatch) => ({

})

export default connect(mSTP, mDTP)(Room)