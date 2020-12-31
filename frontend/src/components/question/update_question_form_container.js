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
       const {subject, content, tag, solved, user} = this.props
        return (
            <QuestionForm  
                subject={subject}
                content={content}
                tag={tag}
                solved={solved}
                user={user}
            />
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return({ formType: 'Update Question!'}
    )
}

const mapDispatchToProps = (dispatch) => ({
    processForm: (updatedQuestion) => dispatch(updateQuestion(updatedQuestion))
})


export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)