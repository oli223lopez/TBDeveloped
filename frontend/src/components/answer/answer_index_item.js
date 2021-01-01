import React from 'react'
class AnswerIndexItem extends React.Component {
    
    render() {
        let {response, deleteAnswer} = this.props
        
                return(
                    <div>
                        <p>{answer.consultation}</p>
                        <p>{answer.answer}</p>

                    </div>
                )
       
    }
}

export default AnswerIndexItem