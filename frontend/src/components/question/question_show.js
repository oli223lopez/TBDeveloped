import React from 'react' 
import UpdateQuestionForm from './update_question_form_container'
import CreateQuestionFormContainer from '../question/create_question_form_container'
import {Link} from 'react-router-dom'
import AnswerIndex from '../answer/answer_index'
import CreateAnswersFormContainer from '../answer/create_answers_form_container'
class QuestionShow extends React.Component {

    constructor(props){
        super(props)
        this.updateQuestion = this.props.updateQuestion.bind(this)
        this.deleteQuestion = this.props.deleteQuestion.bind(this)
    }

    componentDidMount(){
        this.props.fetchQuestion(this.props.questionId)
    }
    
    isEmpty(obj){
        return Object.keys(obj).length === 0
    }

   




    render(){
        const question = Object.values(this.props.question)
        // console.log(question)
        if(this.isEmpty(question) === true){
            return(
                <div></div>
            )
        }else{
            const update = () => {
                if(question[0].user === this.props.userId){
                    return(
                        <div>
                            <UpdateQuestionForm 
                                questionId = {question[0]._id}
                                subject = {question[0].subject}
                                content = {question[0].content}
                                tag = {question[0].tag}
                                solved = {question[0].solved}
                                user = {question[0].user}
                            />
                        </div>
                    )
                }else{
                    console.log('you are not the owner of this question')
                }
            }

            const deleteQuestion = () => {
                if (question[0].user === this.props.userId) {
                    return(
                    
                       <div>
                        <Link to="/bulletin">
                        <button onClick={() => this.props.deleteQuestion(question[0]._id)}>
                                Delete Question
                        </button>
                        </Link>

                        </div>
                    )
                }
            }
            const displayResponses = () => {
               
                if (question[0].responses.length >0) {
                    if (question[0].user === this.props.userId){
                    return(
                        
                        <div>
                        <p>------------------- Responses -------------------------------------------</p> 
                            <AnswerIndex 
                                responses = {question[0].responses}
                                questionID = {question[0]._id}
                                
                            />
                        </div>
                    
                    )
                }}else{
                    <div></div>
                }
            }
            
             const createAnswers = () => {
                if (question[0].user !== this.props.userId) {
                    return(
                        
                    
                        <div>
             <p>------------------- Response Form -------------------------------------</p>     

                            <CreateAnswersFormContainer 
                                questionID = {question[0]._id}
                                
                            />
         <p>---------------------------------------------------------------------------</p>     

                        </div>
                    
                    )
                }
            }
            
            return(
                <div>
                    
                    <h2>{question[0].subject}</h2>
                    <p>{question[0].content}</p>
                    <p>Created on: {Date(question[0].createdAt)}</p>
                    <p>Tag: {question[0].tag}</p>
            
                    {displayResponses()}

                    {update()}
                    {deleteQuestion()}


                    {createAnswers()}


                    <div>
                        <CreateQuestionFormContainer />
                    </div>
                </div>
            )
        }
    }
}

export default QuestionShow