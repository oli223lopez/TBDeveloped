import React from 'react' 
import UpdateQuestionForm from './update_question_form_container'
import CreateQuestionFormContainer from '../question/create_question_form_container'
import CreateRoom from '../chatroom/create_room'

import {Link} from 'react-router-dom'
import AnswerIndexContainer from '../answer/answer_index_container'
import AnswerIndexItemContainer from '../answer/answer_index_item_container'
import CreateAnswersFormContainer from '../answer/create_answers_form_container'





class QuestionShow extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users: []
        }
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
                if(question[0].user._id === this.props.userId){
                    return(
                        <div>
                            <UpdateQuestionForm 
                                questionId = {question[0]._id}
                                subject = {question[0].subject}
                                content = {question[0].content}
                                tag = {question[0].tag}
                                solved = {question[0].solved}
                                user = {question[0].user._id}
                            />
                        </div>
                    )
                }else{
                    // console.log('you are not the owner of this question')
                }
            }

            const deleteQuestion = () => {
                if (question[0].user._id === this.props.userId) {
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

            const userResponse = () => {
                return(
                question[0].responses.map((response, id) => {
                    if(response.user._id === this.props.userId){
                        return(
                            <div key={id}>
                                <p>------------------- Responses --------------------------------------------</p>
                                <AnswerIndexItemContainer 
                                    response = {response}
                                    questionID = {question[0]._id}
                                    currentUserID = {this.props.userId}
                                    fetchQuestion = {this.props.fetchQuestion}
                                   
                                />
                            </div>
                        )                       
                    }
                })
                )
            }
            
            const questionCreatorResponses = () => {
               
                if (question[0].responses.length >0) {
                    
                    if (question[0].user._id === this.props.userId){
                    return(
                        
                        <div>
                        <p>------------------- Responses -------------------------------------------</p> 
                            <AnswerIndexContainer 
                                responses = {question[0].responses}
                                questionID = {question[0]._id}
                                currentUserID = {this.props.userId}
                                fetchQuestion = {this.props.fetchQuestion}
                                
                               
                            />
                        </div>
                    
                    )
                }}else{
                    <div></div>
                }
            }
            
             const createAnswers = () => {
                if (question[0].user._id !== this.props.userId) {
                    return(
                        
                    
                        <div>
             <p>------------------- Response Form -------------------------------------</p>     

                            <CreateAnswersFormContainer 
                                questionID = {question[0]._id}
                                fetchQuestion = {this.props.fetchQuestion}
                                
                            />
         <p>---------------------------------------------------------------------------</p>     

                        </div>
                    
                    )
                }
            }
            
            return(
                < div className="question_container">
                    <div className="question_description">

                        {/* {console.log(this.state.users)} */}
                        <div className="question_header">
                            <h2>{question[0].subject}</h2>
                            <p className="date_posted">posted: {Date(question[0].createdAt)}</p>
                        </div>
                         <div className="question_body">
                             <p>{question[0].content}</p>

                        </div>   

                        <div className="question_footer">
                            { question[0].solved ? <p> &#10003; Solved</p> : <p>&#10007; Unsolved</p> }
                            <p className="tag">Tag: {question[0].tag}</p>
                            <h1 className="question-author"> posted by {question[0].user.username}</h1>

                        </div>

                    </div>

                    {update()}
                    {deleteQuestion()}
                    {userResponse()}
                    {questionCreatorResponses()}


                    {createAnswers()}


                    <div>
                        <CreateQuestionFormContainer />
                    </div>
                    <div>
                        <CreateRoom />
                    </div>

                </div>
            )
        }
    }
}

export default QuestionShow