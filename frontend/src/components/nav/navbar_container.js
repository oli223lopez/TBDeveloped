import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import {fetchUser} from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.entities.currentUser, 
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUser: () => dispatch(fetchUser())
})

export default connect(
    mapStateToProps,
    mDTP
    // { logout }
)(NavBar);