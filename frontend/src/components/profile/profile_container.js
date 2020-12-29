import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user
    };
};



export default connect(mapStateToProps, {})(Profile);