import { connect } from 'react-redux';
import Profile from './profile';
import { fetchProfileQuestions } from '../../actions/questions_actions'
import { fetchUser } from '../../actions/session_actions'

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.currentUser,
        profile_questions: state.entities.profile,
    };
};


const mapDispatchToProps = dispatch => ({
    fetchProfileQuestions: (questions) => dispatch(fetchProfileQuestions(questions)),
    fetchUser: () => dispatch(fetchUser())
})



export default connect(mapStateToProps, mapDispatchToProps)(Profile);