import React from 'react'
import QuestionIndex from '../question/question_index'
import ResolvedIndex from '../resolved/resolved_index'
import '../../assets/stylesheets/bulletin_board.css'
import CreateQuestionFormContainer from '../question/create_question_form_container'
import MessengerContainer from '../messenger/messenger_container'
import { Link } from 'react-router-dom'

import wFSP from '../../assets/images/ad_fsp/wFSP.jpg';
import tFSP2 from '../../assets/images/ad_fsp/tFSP2.png';
import oFSP2 from '../../assets/images/ad_fsp/oFSP2.png';
import sFSP from '../../assets/images/ad_fsp/sFSP.png';

class BulletinBoard extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            idx: 0,
            img: 1,
            intervalId: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.adInterval = this.adInterval.bind(this);
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        this.props.fetchQuestions()


        //!testing AD
        let intervalId = setInterval(this.timer, 8000);
        this.setState({
            intervalId: intervalId
        })
        //!testing AD
    }

    //!testing AD
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }

    timer(){
        if(this.state.img < 4){
            this.setState({
                img: this.state.img + 1
            })
        }else{
            this.setState({
                img: 1
            })
        }
    }

    adInterval(){
        if( this.state.img === 1){
            return(
                <div className="tFSP-img">
                    <a href='https://spacegear.herokuapp.com/#/'>
                        <img alt="" src={tFSP2} />
                    </a>
                </div>
            )
        }else if( this.state.img === 2){
            return(
                <div className="wFSP-img">
                     <a href='https://heighten-fullstack.herokuapp.com/#/' >
                        <img alt="" src={wFSP} />
                    </a>
                </div>
            )
        }else if( this.state.img === 3){
            return(
                <div className="oFSP-img">
                    <a href='https://alltreks.herokuapp.com/#/'>
                        <img alt="" src={oFSP2} />
                    </a>
                </div>
            )
        }else if( this.state.img === 4){
            return(
                <div className="sFSP-img">
                    <a href='https://bettercraft.herokuapp.com/#/'>
                        <img alt="" src={sFSP} />
                    </a>
                </div>
            )
        }
    }
    //!testing AD
    componentDidUpdate(prevState) {
        if(Object.values(prevState.questions).length != Object.values(this.props.questions).length) {
            this.props.fetchQuestions()
        }
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
                // <div className='bulletin_right'>
                //     <div className='questionForm'>
                //         <CreateQuestionFormContainer />
                //     </div>
                //     <div>
                //         <div className='adv_container'>
                //             <span>ADVERTISEMENT</span>
                //             {this.adInterval()}
                //         </div>
                //     </div>
                // </div> 
                null
            )
        }else{
            // console.log(this.props.questions)
            const questionArray = []
            const resolvedArray = []
            const usernames = []
            Object.values(this.props.questions).forEach(question => {
                if(question.solved === false){
                    questionArray.push(question)
                }else{
                    resolvedArray.push(question)
                }
                usernames.push(question.user)

            })
            return(
                <div className="bulletin_container">
                    <div className='bulletin_content'>
                        <div className='bulletin_left'>
                            <div className='qr'>
                                <div className='questionsTab' onClick={() => this.handleClick(0)}>Questions</div>
                                <div className='resolvedQuestionsTab' onClick={() => this.handleClick(1)}>Resolved</div>
                            </div>

                            {this.state.idx === 0 ? <QuestionIndex questions={questionArray} /> 
                            : 
                            <ResolvedIndex resolved={resolvedArray}/>}
                        </div>

                        <div className="bulletin_spacing"></div>
                        
                        <div className='bulletin_right'>
                            <div className='questionForm'>
                                <CreateQuestionFormContainer />
                            </div>
                            <div>
                                <div className='adv_container'>
                                    <span>ADVERTISEMENT</span>
                                    {this.adInterval()}
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            )
        }
    }


}

export default BulletinBoard


