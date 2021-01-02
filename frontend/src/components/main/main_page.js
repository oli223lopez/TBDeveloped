import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/main.scss';


class MainPage extends React.Component {

    render() {
        return (
            <div className='main_container'>

                <div className='main_content'>
                    <h1 className='welcome-tag'>Meet your Developer</h1>
                    <p>Teamwork can be hard, messy, complicated… and still the best way to work. That’s why we made Slack — a place where people get work done, together.</p>
                    <Link to={'/signup'} className='signupButton'>TRY FOR FREE</Link>
                </div>
                
                <div className="footer_top_container">
                    <div className='footer_sent_container'>
                        <div className="footer_sent">
                            Choose a better way to work
                        </div>
                        <div className='freeTrial_container'>
                            <Link to={'/signup'} className='footer_freeTrial'>TRY FOR FREE</Link>
                        </div>
                    </div>
                    <div className="image_top_container">
                            
                    </div>
                </div>
                <footer className='footer_container'>
                    <div className='copyRight'>
                        <div>Copyright &copy; 2020 TBDeveloped</div>
                    </div>
                    <div className='copyRight'>
                        {/* <div>Social</div>
                        <div>Social</div>
                        <div>Social</div>
                        <div>Social</div>
                        <div>Social</div> */}
                    </div>
                    
                </footer>
            </div>
        );
    }
}

export default MainPage;