import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/bulletin_board.css'




class QuestionIndex extends React.Component {
    constructor(props) {
        super(props)

        this.itemColor = this.itemColor.bind(this);
    }


    itemColor(i, question){
        if( i % 2 === 0){
            return(
                <div key={i} className='individualQuestion'>
                    <Link to={`/question/${question._id}`}>
                    <div className='individualQuestionLink'>Username: {question.user.username}</div>
                        <div className='individualQuestionUser'>
                            Topic: {question.subject}
                        </div>
                    </Link>    
                </div>  
            )
        }else{
            return(
                <div key={i} className='individualQuestion1'>
                    <Link to={`/question/${question._id}`}>
                    <div className='individualQuestionLink'>Username: {question.user.username}</div>
                        <div className='individualQuestionUser'>
                            Topic: {question.subject}
                        </div>
                    </Link>    
                </div>  
            )
        }
    }

    render() {
        
        // console.log('im from question index',this.props.questions)
        // return(
        //     <div className='questionIndex'>
        //         {this.props.questions.map((question, i) => {
        //             // console.log(question._id)
        //             return(
        //                 <div key={i} className='individualQuestion'>
        //                     <div className='individualQuestionLink'>Username: {question.user.username}</div>
        //                     <Link to={`/question/${question._id}`}>
        //                         <div className='individualQuestionUser'>
        //                             Topic: {question.subject}
        //                         </div>
        //                     </Link>    
        //                 </div>
                        
        //             )
        //         })}
                
        //     </div>
        // )
        return(
            <div className='questionIndex'>
                {this.props.questions.map((question, i) => {
                    // console.log(question._id)
                    return (
                       this.itemColor(i, question)
                    )
                })}
                
            </div>
        )
       
    }
}

export default QuestionIndex