import React from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from '../../actions/questions_actions'
import QuestionForm from './question_form'


export class UpdateQuestionForm extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.receiveReview(this.props.reviewId)
    }

    render() {
       const {questionId, subject, content, tag, solved, user} = this.props
        return (
            <QuestionForm  
                questionId = {questionId}
                subject={subject}
                content={content}
                tag={tag}
                solved={solved}
                user={user}
            />
        );
    }
}



const mapStateToProps = (state) => {
    
    return ({ formType: 'Update Question!', errors: state.errors.questions}
    )
}

const mapDispatchToProps = (dispatch) => ({
    processForm: (questionId, questionUpdates) => dispatch(updateQuestion(questionId, questionUpdates))
})


export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)