import React from 'react';
// import CreateQuestionFormContainer from '../question/create_question_form_container'
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/profile.scss';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.caseResolved = this.caseResolved.bind(this);
    }


    componentDidMount() {
        // console.log(this.props.currentUser.questions)
        this.props.fetchProfileQuestions(this.props.currentUser.questions)
        this.props.fetchUser();
    }


    caseResolved(bool) {
        if (bool === 'false') {
            return (
                <div className='bool_info'>
                    False
                </div>
            )
        } else {
            return (
                <div className='bool_info2'>
                    True
                </div>
            )
        }
    }


    render() {
        // let boolean = false;
        let userID = this.props.currentUser.id; 
        let amtOfPost = 0;
        let amtOfResponse = 0;
        let responses = []; 
        let questions = []; 

        this.props.currentUser.questions.forEach( (question) => {
            if(question.user === userID) {
                questions.push(question)
            } else {
                responses.push(question)
            }
        });


        const profile_questions = () => {
            
            if(questions.length > 0){
                amtOfPost = questions.length;
                return(

                    questions.map((question, id) => {

                        if(question.user === userID) {

                            return (
                                <div key={id} className='questions_topic'>
                                    <div className='individual_case'>
                                        <label>
                                            <div className='sub_label'>Case Id:</div>
                                            <Link to={`/question/${question._id}`}>
                                                <div className='actual_info'>{question._id}</div>
                                            </Link>
                                        </label>
                                        <label>
                                            <div className='sub_label'>Subject:</div>
                                            <div className='actual_info'>{question.subject}</div>
                                        </label>
                                        <label>
                                            <div className='sub_label'>Case Closed: </div>
                                            {question.solved ? this.caseResolved('true') : this.caseResolved('false')}
                                        </label>
                                    </div>
                                </div>
                            )
                            
                        }

                    })
                )
            }
        }



        const profile_responses = () => {

            if(responses.length > 0 ) {
                amtOfResponse = responses.length
                return (
                    responses.map((question, id) => {

                        return question.responses.map(response => {

                            if(response.user === userID) {
                                return(
                                    <div key={id} className='questions_topic'>
                                        <div className='individual_case'>
                                            <label>
                                                <div className='sub_label'>Relating to Case Id:</div>
                                                <Link to={`/question/${question._id}`}>
                                                    <div className='actual_info'>{question._id}</div>
                                                </Link>
                                            </label>
                                            <label>
                                                <div className='sub_label'>Response:</div>
                                                <div className='actual_info'>{response.answer}</div>
                                            </label>
                                        </div>
                                    </div>  
                                )
                            }

                        })
                    }
                    )
            
            )}
        }
    
        return (
            <div className='profile_container'>

                <div className="created_post_info">
                    <div className="created_post_title">Created Posts:</div>

                    {profile_questions()}

                    <div className="responed_post_title">Response to Posts:</div>

                    {profile_responses()}

                </div>

                <div className="user_profile_info">
                    <div className='profile_name'>{this.props.currentUser.username}'s Profile</div>
                    <img alt="robots" src={`https://robohash.org/${userID}?100x100`} className='roboImgApi' />

                    <div className='profile_post_amt'>Number of Posts: {amtOfPost}</div>
                    <div className='profile_reponse_amt'>Response to Posts: {amtOfResponse}</div>
                </div>


            </div>

        )
    }
}

export default Profile;