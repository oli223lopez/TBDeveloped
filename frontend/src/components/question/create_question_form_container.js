import {connect} from 'react-redux'
import QuestionFrom from './question_form'
import {postQuestion, fetchQuestions} from '../../actions/questions_actions'


const mapStateToProps = state => ({
    newQuestion: {
        subject: '',
        content: '',
        tag: '',
        solved: false,
        user: state.session.user.id
    },
    formType: 'Ask a Question!',
    errors: state.errors.questions
})

const mapDispatchToProps = dispatch => ({
    processForm: (newQuestion) => dispatch(postQuestion(newQuestion)), 
    fetchQuestions: () => dispatch(fetchQuestions()) 
})

export default connect(mapStateToProps,mapDispatchToProps)(QuestionFrom)