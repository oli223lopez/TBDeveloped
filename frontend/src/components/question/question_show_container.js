import {connect} from 'react-redux'
import {updateQuestion, deleteQuestion, fetchQuestion} from '../../actions/questions_actions'
import QuestionShow from './question_show'
// import {} from '../../actions/question_actions'



const mapStateToProps = (state, ownProps) => {
    let question = {}
    if(Object.keys(state.entities.questions).length > 0){
        question[ownProps.match.params.questionId]= state.entities.questions[ownProps.match.params.questionId]
    }
    return({
    questionId: ownProps.match.params.questionId,
    question,
    userId: state.session.user.id

    })

}



const mapDispatchToProps = (dispatch) => ({
    updateQuestion: (questionId, questionUpdates) => dispatch(updateQuestion(questionId, questionUpdates)),
    deleteQuestion: (questionId) => dispatch(deleteQuestion(questionId)),
    fetchQuestion: (questionId) => dispatch(fetchQuestion(questionId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionShow)

