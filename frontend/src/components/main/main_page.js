import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/main.scss';
import '../../assets/stylesheets/question_show.css';

import splash from '../../assets/images/splash.jpg';
import gitty from '../../assets/images/gitty.png';
import linkedn from '../../assets/images/linkedn.png';

import logo192 from '../../assets/images/features/logo192.png';
import mongodb from '../../assets/images/features/mongodb.png';
import redux from '../../assets/images/features/redux.png';
import webRTC from '../../assets/images/features/webRTC.png';
import socketio from '../../assets/images/features/socketio.png';
import checkmark from '../../assets/images/features/checkmark.png';

class MainPage extends React.Component {

    render() {
        return (
            <div className='main_container'>

                <div className='main_content'>
                    <div className="main_content_left">
                        <div>
                            <h1 className='welcome-tag'>Meet your Developer</h1>
                        </div>
                        <div className='welcome-sent'>
                            <p>Finding the right team for your web idea can be hard, messy, complicated… That’s why we made TBDeveloped — a place where people can meet and get work done, together!</p>
                        </div>
                        <div>
                            <Link to={'/signup'} className='signupButton'>TRY FOR FREE</Link>
                        </div>
                    </div>

                    <div className="image_top_container">
                        <div className='splash_img'>
                            <img alt="" src={splash} />
                        </div>
                    </div>
                </div>

                <div className="featured_info">
                    <div>
                    <h1 className='feature_title'>Key Features</h1>
                        <div className="title_name">
                            <div className='check_img'>
                                <img alt="" src={checkmark} />
                            </div>
                            <div>Share business ideas</div>
                        </div>
                        <div className="title_name">
                            <div className='check_img'>
                                <img alt="" src={checkmark} />
                            </div>
                            <div>Ask questions</div>
                        </div>
                        <div className="title_name">
                            <div className='check_img'>
                                <img alt="" src={checkmark} />
                            </div>
                            <div>Live video chat</div>
                        </div>
                        <div className="title_name">
                            <div className='check_img'>
                                <img alt="" src={checkmark} />
                            </div>
                            <div>Real-time messaging</div>
                        </div>
                    </div>

                    <div>
                    <h1 className='feature_title'>Main Technologies</h1>
                        <div className='title_info'>
                            <div>React</div>    
                            <div className='feat_img1'>
                                <img alt="" src={logo192} />
                            </div>
                        </div>
                        <div className='title_info'>
                            <div>Redux</div>
                            <div className='feat_img1'>
                                <img alt="" src={redux} />
                            </div>
                        </div>
                        <div className='title_info'>
                            <div>MongoDB</div>
                            <div className='feat_img1'>
                                <img alt="" src={mongodb} />
                            </div>
                        </div>
                        <div className='title_info'>
                            <div>Socket.Io</div>
                            <div className='feat_img'>
                                <img alt="" src={socketio} />
                            </div>
                        </div>
                        <div className='title_info'>
                            <div>WebRTC</div>
                            <div className='feat_img1'>
                                <img alt="" src={webRTC} />
                            </div>
                        </div>
                    </div>

                </div>


                <div className="footer_top_container">

                    <div className='footer_sent_container'>
                        <div className="footer_sent">
                            Choose a better way to work
                        </div>
                        <div className='freeTrial_container'>
                            <Link to={'/signup'} className='footer_freeTrial'>TRY FOR FREE</Link>
                        </div>

                        <div className='social'>Social</div>
                        <div className='social_links'>
                            <div>
                                <div className='name-space'>Oliver
                                <div className='individual_info'>
                                    <div className='info_align'>
                                        <img alt="" src={gitty} />
                                        <a href='https://github.com/oli223lopez'>Github</a>
                                    </div>
                                    <div className='info_align'>
                                        <img alt="" src={linkedn} />
                                        <a href='https://www.linkedin.com/in/oliverlopez23/'>Linkedin</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className='name-space'>Shane
                                    <div className='individual_info'>
                                        <div className='info_align'>
                                            <img alt="" src={gitty} />
                                            <a href='https://github.com/ShaneSharareh'>Github</a>
                                        </div>
                                        <div className='info_align'>
                                            <img alt="" src={linkedn} />
                                            <a href='https://www.linkedin.com/in/shanesharareh/'>Linkedin</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='name-space'>Thomas
                                    <div className='individual_info'>
                                        <div className='info_align'>
                                            <img alt="" src={gitty} />
                                            <a href='https://github.com/tom-cheung'>Github</a>
                                        </div>
                                        <div className='info_align'>
                                            <img alt="" src={linkedn} />
                                            <a href='https://www.linkedin.com/in/thomas-cheung-38953034/'>Linkedin</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='name-space'>William
                                    <div className='individual_info'>
                                        <div className='info_align'>
                                            <img alt="" src={gitty} />
                                            <a href='https://github.com/1071919wl'>Github</a>
                                        </div>
                                        <div className='info_align'>
                                            <img alt="" src={linkedn} />
                                            <a href='https://www.linkedin.com/in/william-leung-60589a73/'>Linkedin</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <footer className='footer_container'>
                    <div className='copyRight'>
                        <div>Copyright &copy; 2020 TBDeveloped</div>
                    </div>
                    
                </footer>
            </div>
        );
    }
}

export default MainPage;