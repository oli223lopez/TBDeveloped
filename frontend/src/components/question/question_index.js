import React from 'react'
import {Link} from 'react-router-dom'



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
                            <div>{question.user}</div>
                            <Link to={`/question/${question._id}`}>{question.subject}</Link>
                            
                        </div>
                    )
                })}
            </div>
        )
       
    }
}

export default QuestionIndex