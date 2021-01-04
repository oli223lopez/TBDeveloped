import React from 'react';
// import CreateQuestionFormContainer from '../question/create_question_form_container'
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/profile.scss';


class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }


    componentDidMount() {
        console.log(this.props.currentUser.questions)
        this.props.fetchProfileQuestions(this.props.currentUser.questions)
    }

    

    render() {
        console.log('one', this.props.profile_questions)

        const profile_questions = () => {

            if(this.props.profile_questions.length > 0){
                return(
                    this.props.profile_questions.map((question, id) => {
                        if(this.props.currentUser.questions.includes(question._id)){
                            // console.log('jjello', this.props.currentUser);
                            if(question.user._id === this.props.currentUser.id){
                                console.log('bellow', (question.user._id));
                                return(
                                    <div key={id}>
                                        <div className="created_post_title">Created Posts:</div>
                                        
                                        <label>Question:
                                            <Link to={`/question/${question._id}`}>
                                                {question.subject}
                                            </Link>
                                        </label>
                                        
                                        <div>CONTENT:
                                            {question.content}
                                        </div>
                                    </div>
                                )
                            }
                            //! USERS ANSWERED/RESPONDED POSTS. REVISIT AFTER COHORT. SHOULD BE A SEPARATE IF STATEMENT
                            // else{
                            //     return (
                            //         <div key={id}>
                            //             <div className="post_answered_title">Posts Answered:</div>
                            //             <div>SUBJECT:
                            //                 <Link to={`/question/${question._id}`}>
                            //                     {question.subject}
                            //                 </Link>
                            //             </div>
                            //             <div>CONTENT: 
                            //                 {question.content}
                            //             </div>
                            //         </div>
                            //     )
                            // }
                        }
                        
                    })
                )
                // console.log(this.props.profile_questions)
            }
        }
        
        return(
            <div className='profile_container'>
                <div className='profile_name'>{this.props.currentUser.username}'s Profile</div>

                <div>
                    {profile_questions()}
                </div>




                {/* <div>
                    <CreateQuestionFormContainer />
                </div> */}
            </div>
        )
    }
}

export default Profile;