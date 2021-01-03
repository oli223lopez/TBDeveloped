import React from 'react'
class AnswerIndexItem extends React.Component {
    
    render() {     
        // console.log('answer index item')   
                return(
                    <div>
                        <p>User: {this.props.response.user}</p>
                        <p>Consultation Date: {this.props.response.consultation}</p>
                        <p>Reply: {this.props.response.answer}</p>
                        <p>Date Posted: {this.props.response.createdAt}</p>
                        <br></br>
                    </div>
                )
       
    }
}

export default AnswerIndexItem