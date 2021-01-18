import { connect } from 'react-redux';
import Profile from './profile';
import {fetchProfileQuestions} from '../../actions/questions_actions'
import {fetchUser} from '../../actions/session_actions'

//testing
// import {receiveCurrentUser} from '../../actions/session_actions'


const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        profile_questions: state.entities.profile,
        // currUser: state.entities.currentUser.questions,
        // currUserId: state.entities.currentUser.id

    };
};


const mapDispatchToProps = dispatch => ({
    // fetchProfileQuestions: (questions) => dispatch(fetchProfileQuestions(questions)),
    fetchProfileQuestions: () => dispatch(fetchProfileQuestions()),

    // curr2User: (currentUser) => dispatch(receiveCurrentUser(currentUser)),

})



export default connect(mapStateToProps, mapDispatchToProps)(Profile);