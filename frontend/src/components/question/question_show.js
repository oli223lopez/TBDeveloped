import React from 'react' 
import UpdateQuestionForm from './update_question_form_container'

class QuestionShow extends React.Component {
    constructor(props){
        super(props)
        this.updateQuestion = this.props.updateQuestion.bind(this)
        this.deleteQuestion = this.props.dele
        this.isUser = this.isUser.bind(this)
    }

    componentDidMount(){
        this.props.fetchQuestion(this.props.questionId)
    }
    
    isEmpty(obj){
        return Object.keys(obj).length === 0
    }

    isUser(question){
       
        console.log(this.props.userId)
        console.log(question)
        if (Object.values(question)[0].user && Object.values(question)[0].user === this.props.userId){
            return(
                <div>
                    <UpdateQuestionForm
                        subject={question[0].subject}
                        content={question[0].content}
                        tag={question[0].tag}
                        solved={question[0].solved}
                        user={question[0].user}

                    />
                </div>
            )
        }
    }




    render(){
        const question = Object.values(this.props.question)
        // console.log(question)
        if(this.isEmpty(question) === true){
            return(
                <div></div>
            )
        }else{
            
            return(
                <div>
                    
                    <h2>{question[0].subject}</h2>
                    <p>{question[0].content}</p>
                    <p>Created on: {Date(question[0].createdAt)}</p>
                    <p>Tag: {question[0].tag}</p>
                    {this.isUser(question)}

                   
                </div>
            )
        }
    }
}

export default QuestionShow