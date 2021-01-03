import React from 'react'
import AnswerIndexItemContainer from '../answer/answer_index_item_container'
class AnswerIndex extends React.Component {


   


    
    render() {
        let questionID = this.props.questionID;
        return(

        <div>
            {this.props.responses.map((response, i) =>{
                    return(
                    <div key={i}>
                        <AnswerIndexItemContainer fetchQuestion = {this.props.fetchQuestion}  response={response} questionID = {this.props.questionID} currentUserID={this.props.currentUserID} />
                    </div>
                    )
            })}
        </div>
        )
    }
}

export default AnswerIndex

                                
