import React from 'react';
// import CreateQuestionFormContainer from '../question/create_question_form_container'
import {Link} from 'react-router-dom'
import '../../assets/stylesheets/profile.scss';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.caseResolved = this.caseResolved.bind(this);
    }


    componentDidMount() {
        // console.log(this.props.currentUser.questions)
        this.props.fetchProfileQuestions(this.props.currentUser.questions)

        //!test
        // this.props.fetchProfileQuestions()
        // this.props.currUser;
        // this.props.profile_questions.map((question, id) => {
        //     if(question.user._id === this.props.currentUser.id){
                // this.props.fetchQuestion(id).subject
                // return question.subject;
        //     }

        // })
        

    }


    caseResolved(bool){
        if (bool === 'false'){
            return (
                <div className='bool_info'>
                    False
                </div>
            )
        }else{
            return (
                <div className='bool_info2'>
                    True
                </div>
            )
        }
    }
    

    render() {
        // console.log('51', this.props.currUser)
        //!test\n
        // this.props.profile_questions.map((question, id) => {
        //     if(question.user._id === this.props.currentUser.id){
        //         // this.props.fetchProfileQuestions(question.content)
        //         console.log(question.subject)
        //     }

        // })

        //!test



        let boolean = false;
        let amtOfPost = 0;
        let amtOfResponse = 0;

        const profile_questions = () => {
            if(this.props.profile_questions.length > 0){
                return(
                    this.props.profile_questions.map((question, id) => {
                        if(this.props.currentUser.questions.includes(question._id)){
                            // console.log('jjello', this.props.currentUser);
                            if(question.user._id === this.props.currentUser.id){
                                // console.log('bellow', (question.user._id));
                                amtOfPost += 1;
                                {`${question.solved}` === 'false' ? boolean = 'false' : boolean = true}
                                return(
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
                                                {/* <div className='actual_info'>{`${question.solved}`}</div> */}
                                                {this.caseResolved(boolean)}
                                            </label>
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



        const profile_responses = () => {
            if(this.props.profile_questions.length > 0){
                return(
                    this.props.profile_questions.map((question, id) => {
                        return(
                            question.responses.map((response, id) => {
                                if(response.user._id === this.props.currentUser.id){
                                    amtOfResponse += 1;
                                    return (
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
                        )                           
                    }
                ) 
                
            )}
        }
        // console.log('user stuff', this.props.currentUser.id)
        return(
            <div className='profile_container'>
                
                <div className="created_post_info">
                    <div className="created_post_title">Created Posts:</div>

                    {profile_questions()}

                    <div className="responed_post_title">Response to Posts:</div>

                    {profile_responses()}

                </div>

                <div className="user_profile_info">
                    <div className='profile_name'>{this.props.currentUser.username}'s Profile</div>
                    <img alt="robots" src={`https://robohash.org/${this.props.currentUser.id}?100x100`} className='roboImgApi'/>

                    <div className='profile_post_amt'>Number of Posts: {amtOfPost}</div>
                    <div className='profile_reponse_amt'>Response to Posts: {amtOfResponse}</div>
                </div>


            </div>
            
        )
    }
}

export default Profile;