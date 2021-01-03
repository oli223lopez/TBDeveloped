import {connect} from 'react-redux'
import QuestionFrom from './question_form'
import {postQuestion} from '../../actions/questions_actions'


const mapStateToProps = state => ({
    newQuestion: {
        subject: '',
        content: '',
        tag: '',
        solved: false,
        user: state.session.user.id
    },
    formType: 'Ask a question!',
    errors: state.errors.questions
})

const mapDispatchToProps = dispatch => ({
    processForm: (newQuestion) => dispatch(postQuestion(newQuestion)) 
})

export default connect(mapStateToProps,mapDispatchToProps)(QuestionFrom)