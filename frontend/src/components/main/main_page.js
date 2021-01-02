import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/main.scss';
import splash from '../../assets/images/splash.jpg';
import github2 from '../../assets/images/github2.png';
import linkedin from '../../assets/images/linkedin.png';


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
                            <img src={splash} />
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
                                <p className='name-space'>Oliver
                                    <a href='https://github.com/oli223lopez'>Github</a>
                                    <img src={github2} />
                                    <a href='https://github.com/oli223lopez'>Linkedin</a>
                                    <img src={linkedin} />
                                </p>
                            </div>
                            <div>
                                <p className='name-space'>Shane
                                    <a href='https://github.com/oli223lopez'>Github</a>                                
                                    <img src={github2} />
                                    <a href='https://github.com/oli223lopez'>Linkedin</a>
                                    <img src={linkedin} />
                                </p>
                            </div>
                            <div>
                                <p className='name-space'>Thomas
                                    <a href='https://github.com/oli223lopez'>Github</a>                                
                                    <img src={github2} />
                                    <a href='https://github.com/oli223lopez'>Linkedin</a>
                                    <img src={linkedin} />
                                </p>
                            </div>
                            <div>
                                <p className='name-space'>William
                                    <a href='https://github.com/oli223lopez'>Github</a>                                
                                    <img src={github2} />
                                    <a href='https://github.com/oli223lopez'>Linkedin</a>
                                    <img src={linkedin} />
                                </p>
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