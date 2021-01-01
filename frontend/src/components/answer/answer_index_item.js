import React from 'react'
class AnswerIndexItem extends React.Component {
    
    render() {        
                return(
                    <div>
<<<<<<< HEAD
                        <p>{response.consultation}</p>
                        <p>{response.answer}</p>

=======
                        <p>User: {this.props.response.user}</p>
                        <p>Consultation Date: {this.props.response.consultation}</p>
                        <p>Reply: {this.props.response.answer}</p>
                        <p>Date Posted: {this.props.response.createdAt}</p>
                        <br></br>
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
                    </div>
                )
       
    }
}

export default AnswerIndexItem