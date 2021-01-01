import React from 'react'
import AnswerIndexItem from '../answer/answer_index_item'
class AnswerIndex extends React.Component {
    
    render() {
        <div>
            {this.props.responses.map((response, i) =>{
                
                return(
                    <div key={i}>
                        <AnswerIndexItem response={response} deleteAnswer={this.state.deleteAnswer} />
                    </div>
                )
            })}
        </div>
       
    }
}

export default AnswerIndex