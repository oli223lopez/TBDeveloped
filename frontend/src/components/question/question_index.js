import React from 'react'
import {Link} from 'react-router-dom'
import CreateQuestionFormContainer from '../question/create_question_form_container'




class QuestionIndex extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return(
            <div>
                {this.props.questions.map((question, i) => {
                    // console.log(question._id)
                    return(
                        <div key={i}>
                            <div>{question.user.username}</div>
                            <Link to={`/question/${question._id}`}>{question.subject}</Link>
                        </div>
                        
                    )
                })}
                <div>
                    <CreateQuestionFormContainer />
                </div>
            </div>
        )
       
    }
}

export default QuestionIndex