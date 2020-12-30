import React from 'react'
import QuestionIndexContainer from '../question/question_index_container'
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


    handleClick(num){
        this.setState({idx: num})
    }





    render(){
        let {one, two} = 'notSelected'
        if(this.state.idx === 0){
            one = '--Selected--'
        }else{
            two = '--Selected--'
        }

        return(
            <div>
                <h1>Bulletin</h1>

                <div>
                    <div className={one} onClick={this.handleClick(0)}>
                        <QuestionIndex />
                    </div>
                    <div className={two} onClick={this.handleClick(0)}>
                        <ResolvedIndex />
                    </div>
                </div>
            </div>
        )
    }


}

export default BulletinBoard


