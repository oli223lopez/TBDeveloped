import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/main.scss';


class MainPage extends React.Component {

    render() {
        return (
            <div className='main_container'>
                <div className='main_content'>
                main content
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
                </div>
                <footer className='footer_container'>
                    <div className='copyRight'>
                        Copyright &copy; 2020 TBDeveloped
                        Social

                    </div>
                </footer>
            </div>
        );
    }
}

export default MainPage;