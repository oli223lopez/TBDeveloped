import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/navbar.scss';
import favicon from '../../assets/images/favicon.png'

import CreateRoom from "../chatroom/create_room";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/profile'}>Profile</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='right-navbar'>
                    <Link to={'/login'} className='signinButton'>Sign in</Link>
                    <Link to={'/signup'} className='signupButton'>TRY FOR FREE</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='navbar-container'>
                <div className='nav-header-bar'>
                    <div className='left-navbar'>
                        <img src={favicon} className='brand-icon'/>
                        <div className='brand-navbar'>TBDeveloped</div>
                        
                        <div className='team-navbar'>About
                            <div className='team-container'>
                                <div className='teamInfo-navbar'>
                                    <div>
                                        <div className='individual-member'>
                                            <div>Oliver Lopez</div>
                                        </div>
                                        <div className='individual-member'>
                                            <div>Shane Sharareh</div>   
                                        </div>
                                        <div className='individual-member'>
                                            <div>Thomas Cheung</div>
                                        </div>
                                        <div className='individual-member'>
                                            <div>William Leung</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                    </div>

                    <div>{ this.getLinks()}</div>
                </div>
            </div>
        );
    }
}

export default NavBar;
