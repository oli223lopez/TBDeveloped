import React from 'react'
import '../../assets/stylesheets/answer_index.css'

class AnswerIndexItem extends React.Component {

    constructor(props){
        super(props)
       
        this.removeResponse = this.removeResponse.bind(this)
    }

    
    async removeResponse(){
       await  this.props.deleteResponse(this.props.questionID, this.props.response._id)
        this.props.fetchQuestion(this.props.questionID)
    }
    
    
    render() {     

                return(
                    <div className="response-element">
                        <div className="response-header">
                        
                         <img className = "respondants-image" alt="robots" src={`https://robohash.org/${this.props.response.user._id}?100x100`} />

                         <h2> {this.props.response.user.username}</h2>
                        </div>
                        <div className = "response-body">
                            <p className="response-answer">{this.props.response.answer}</p>
                            <p className="response-date-view">Consultation Date: {this.props.response.consultation}</p>
                        </div>
                        <div className= "response-footer">
                           {this.props.currentUserID ===this.props.response.user._id ? <button onClick= {this.removeResponse}>Delete</button> : <div></div> }
                            <p>Posted: {this.props.response.createdAt}</p>

                        </div>
                        <br></br>
                    </div>
                )
       
    }
}

export default AnswerIndexItem