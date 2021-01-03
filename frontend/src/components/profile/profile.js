import React from 'react';
import CreateQuestionFormContainer from '../question/create_question_form_container'



class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    

    render() {
        return(
        <div>
            <h2>{this.props.currentUser.username}'s Profile</h2>

            <div>
                
            </div>

            <div>
                <CreateQuestionFormContainer />
            </div>
        </div>
        )
    }
}

export default Profile;