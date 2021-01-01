import React from 'react'
class AnswerIndexItem extends React.Component {
    
    render() {
        let {response, deleteAnswer} = this.props
        
                return(
                    <div>
                        <p>{response.consultation}</p>
                        <p>{response.answer}</p>

                    </div>
                )
       
    }
}

export default AnswerIndexItem