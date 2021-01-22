import React from 'react' 
import '../../assets/stylesheets/resolved_show.css'

class ResolvedShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            idx: 0
        }
    }

    componentDidMount() {
        this.props.fetchQuestion(this.props.resolvedId)
        // console.log(this.props.resolvedId)
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0
    }



    render() {
        const resolved = Object.values(this.props.resolved)
        // console.log(resolved)
        if (this.isEmpty(resolved) === true) {
            return (
                <div>some text in that div tag</div>
            )
        } else {
           
            return (
                <div  className="question_container">
                    <div className="resolved_question_description">
                        <div className="resolved_question_header">
                          <img className = "resolved_question-show-author-image" alt="robots" src={`https://robohash.org/${resolved[0].user._id}?100x100`} />
                          <h1 className="resolved-question-author"> {resolved[0].user.username}</h1>
                            <h2 className="resolved-question-subject">{resolved[0].subject}</h2>
                        </div>
                         <div className="resolved_question_body">
                            <p >{resolved[0].content}</p>

                         </div>
                        <div className="resolved_question_footer">
                            <div className="resolved-date-resolved">
                            <p className="resolved_date_posted" >Resolved on: {Date(resolved[0].createdAt)}</p>
                            <div className="check-mark">&#10003;</div>
                            </div>
                            
                              <p>Tag: {resolved[0].tag}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ResolvedShow