import React from 'react'
import AnswerIndexItemContainer from '../answer/answer_index_item_container'
import { allUsers } from '../../util/session_api_util'

class AnswerIndex extends React.Component {
   
    


    render() {
        let questionID = this.props.questionID;
        return(

        <div>
            {this.props.responses.map((response, i) =>{
                    return(
                    <div key={i}>
                        <AnswerIndexItemContainer fetchQuestion={this.props.fetchQuestion}  response={response} questionID = {this.props.questionID} currentUserID={this.props.currentUserID} />
                        <button className="chatButton" onClick={ () => {console.log({'questionID': questionID, 'responseID': response._id, 'responseUserID':response.user._id, 'posterID': this.props.posterID})} }>Start a chat with {response.user.username}</button>
                    </div>
                    )
            })}
        </div>
        )
    }
}

export default AnswerIndex

// 'responseID': response._id, 'responseUserID':response.user._id, 'posterID': this.props.posterID

                                
