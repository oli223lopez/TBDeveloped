import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/navbar.scss';
import dino2 from '../../assets/images/dino2.png';
import linkedin from '../../assets/images/linkedin.png';

//!{/* //!WL 1/19/ trying to kill chat connection */}
import MessengerContainer from '../messenger/messenger_container'
//!{/* //!WL 1/19/ trying to kill chat connection */}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);

        // console.log('18', this.props.currentUser)

        //!{/* //!WL 1/19/ trying to kill chat connection */}
            this.state = {
                // showComponent: false,
                chats: []
                
            }
            this.openChat = this.openChat.bind(this);
            // this.chatItself = this.chatItself.bind(this);
            this.leaveChat = this.leaveChat.bind(this)
        //!{/* //!WL 1/19/ trying to kill chat connection */}
    }

    componentDidMount() {
        this.props.fetchUser()
    }

    componentDidUpdate(prevState, b) {
        // if (prevState.currentUser.questions.length != this.props.currentUser.questions.length) {
        //     console.log('updating')
        //     this.props.fetchUser()
        // }
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='lefty'>
                    <button onClick={this.logoutUser} className='logoutButton'>Logout</button>
                    <Link to={'/profile'} className='profileButton'>Profile</Link>
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
//!{/* //!WL 1/19/ trying to kill chat connection */}
    openChat(chat){
            let chatsArray = this.state.chats
        if (!chatsArray.includes(chat)){
            chatsArray.push(chat)
        }
        // console.log(chatsArray)
            this.setState({chats: chatsArray})

    }

    leaveChat(chat){ 
        let leaveButton = document.getElementById(`leaveChat${chat}`)
        leaveButton.click()
        let chatsArray = this.state.chats
        delete chatsArray[chatsArray.indexOf(chat)]
        // console.log(chatsArray)

        this.setState({chats: chatsArray})
    }


    // chatItself(){
    //     // console.log('state', this.state.chatID)
    //     if(this.state.chatID === ''){
    //         return null
    //     }else{
    //         return(
    //             <div>
    //                 <MessengerContainer chatID={this.state.chatID}/>
    //             </div>
    //         )

    //     }
    // }
//!{/* //!WL 1/19/ trying to kill chat connection */}
    render() {
        const tbdevelopedHeader = () => {
            if(this.props.loggedIn === false){
                return(
                    <Link to='/'><h1>TBDeveloped</h1></Link>
                )
            }else{
                return (
                    <Link to='/bulletin'><h1>TBDeveloped</h1></Link>
                )
            }
        }
        
        return (


            <div className='navbar-container'>
                <div className='nav-header-bar'>
                    <div className='left-navbar'>

                        
                        <Link to='/'><img alt="" src={dino2} className='brand-icon'/></Link>
                        <div className='brand-navbar'>{tbdevelopedHeader()}</div>


                        
                        <div className='team-navbar'>About
                            <div className='team-container'>
                                <div className='teamInfo-navbar'>
                                    <div className='teamInfo-group'>
                                        <div className='individual-member'>
                                            <a href='https://www.linkedin.com/in/oliverlopez23/' className='linked_a'>
                                                <img alt="" src={linkedin} className='linkedin-icon'/>
                                                <div className='person_name'>Oliver Lopez</div>
                                            </a>    
                                        </div>
                                        <div className='individual-member'>
                                            <a href='https://www.linkedin.com/in/shanesharareh/' className='linked_a'>
                                                <img alt="" src={linkedin} className='linkedin-icon'/>
                                                <div className='person_name'>Shane Sharareh</div>
                                            </a>    
                                        </div>
                                        <div className='individual-member'>
                                            <a href='https://www.linkedin.com/in/thomas-cheung-38953034/' className='linked_a'>
                                                <img alt="" src={linkedin} className='linkedin-icon'/>
                                                <div className='person_name'>Thomas Cheung</div>
                                            </a>  
                                        </div>
                                        <div className='individual-member'>
                                          <a href='https://www.linkedin.com/in/william-leung-60589a73/' className='linked_a'>
                                                <img alt="" src={linkedin} className='linkedin-icon'/>
                                                <div className='person_name'>William Leung</div>
                                            </a>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                    </div>

                    <div>
                        {this.props.currentUser.activeChats ? 
                        
                        <ul>
                            {this.props.currentUser.activeChats.map((chat) => {

                            return (
                                <div>   
                                    {/* {console.log(chat)} */}
                                    <li onClick={() => this.openChat(chat)}>{chat}</li>
                                    
                                    {/* {this.chatItself()} */}
                                </div>
                            )
                            
                        })}
                            <div>
                                {/* //!WL 1/19/ trying to kill chat connection */}
                                {/* {this.state.chatID != "" ? this.chatItself() 
                                
                                
                                : null} */}
                                {/* {this.state.chatID !== "" ? this.chatItself() : null} */}
                                {/* {this.state.chatID != ""  ? <MessengerContainer chatID={this.state.chatID}/> : null} */}
                                {/* //!WL 1/19/ trying to kill chat connection */}
                            </div>
                                
                            <div>
                                {this.state.chats.map(chat => {
                                    return(
                                        <div>
                                        {/* {console.log(chat)} */}
                                         <MessengerContainer chatID={chat}/>
                                        <button onClick={() => this.leaveChat(chat)} >Leave Chat</button>

                                      </div>
                                    )
                                })}
                            </div>
                        </ul>

                        : null
                    
                    }
                        
                        
                    </div>

                    <div>{ this.getLinks()}</div>
                </div>
            </div>
        );
    }
}

export default NavBar;
