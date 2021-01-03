import React from 'react'
import AnswerIndexItem from '../answer/answer_index_item'
class AnswerIndex extends React.Component {


    // componentDidMount(){
    //     this.props.fetchAnswers(this.props.responses)
    // }
    
    render() {
        return(

        <div>
            {this.props.responses.map((response, i) =>{
                    return(
                    <div key={i}>
                        <AnswerIndexItem response={response} />
                    </div>
                    )
            })}
        </div>
        )
    }
}

export default AnswerIndex