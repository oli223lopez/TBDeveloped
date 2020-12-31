import React from 'react';


class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    

    render() {
        return(
        <div>
            <h2>{this.props.currentUser.username}'s Profile</h2>
        </div>
        )
    }
}

export default Profile;