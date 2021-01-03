import { connect } from 'react-redux';
import Profile from './profile';
import {fetchProfileQuestions} from '../../actions/questions_actions'

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        profile_questions: state.entities.profile

    };
};


const mapDispatchToProps = dispatch => ({
    fetchProfileQuestions: (questions) => dispatch(fetchProfileQuestions(questions))
})



export default connect(mapStateToProps, mapDispatchToProps)(Profile);