import React from 'react'
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
                    <div>
                        <p>User: {this.props.response.user.username}</p>
                        <p>Consultation Date: {this.props.response.consultation}</p>
                        <p>Reply: {this.props.response.answer}</p>
                        <p>Date Posted: {this.props.response.createdAt}</p>
                        {this.props.currentUserID ===this.props.response.user ? <button onClick= {this.removeResponse}>Delete</button> : <div></div> }
                        <br></br>
                    </div>
                )
       
    }
}

export default AnswerIndexItem