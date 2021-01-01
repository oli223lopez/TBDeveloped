import React from 'react'
import QuestionIndex from '../question/question_index'
import ResolvedIndex from '../resolved/resolved_index'


class BulletinBoard extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            idx: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchQuestions()
    }


    handleClick(num){
        this.setState({idx: num})
    }


    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    render(){
        

        // console.log(this.props.questions)

        if(this.isEmpty(this.props.questions)){
            return(
                null
            )
        }else{
            // console.log(this.props.questions)
            const questionArray = []
            const resolvedArray = []
            Object.values(this.props.questions).forEach(question => {
                if(question.solved === false){
                    questionArray.push(question)
                }else{
                    resolvedArray.push(question)
                }
            })
            // console.log(questionArray)
            return(
                <div>
                    <h1>Bulletin</h1>

                    <div>
                        <div className='questions' onClick={() => this.handleClick(0)}>Questions</div>
                        <div className='resolvedQuestions' onClick={() => this.handleClick(1)}>Resolved Questions</div>

                        {this.state.idx === 0 ? <QuestionIndex questions={questionArray} /> : <ResolvedIndex resolved={resolvedArray}/>}

                    </div>
                    
                </div>
            )
        }
    }


}

export default BulletinBoard


