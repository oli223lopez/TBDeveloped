import React from 'react'
import AnswerIndexItem from '../answer/answer_index_item'
class AnswerIndex extends React.Component {
    
    render() {
        if(this.props.responses){
            return (
                <div>
                    {this.props.responses.map((response, i) => {

                        return (
                            <div key={i}>
                                <AnswerIndexItem response={response} deleteAnswer={this.props.deleteResponse} />
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
       
       
    }
}

export default AnswerIndex