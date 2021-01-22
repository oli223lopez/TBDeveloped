import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/signup.scss';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.handleDemo = this.handleDemo.bind(this);
    this.handleDemo2 = this.handleDemo2.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); 
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }


  componentWillUnmount() {
        this.props.removeErrors();
    }


  handleDemo(e) {
    e.preventDefault();
    // const demoUser = {email: 'Demo@user.com', password: 123456}
    // const user = Object.assign({}, demoUser);
    let user = {
      email: 'Demo@user.com',
      password: '123456'
    };

    this.props.login(user); 

  }

  handleDemo2(e) {
    e.preventDefault();
    
    let user = {
      email: 'Demo2@user.com',
      password: '123456'
    };

    this.props.login(user); 

  }

  render() {
    return (
              <div className='userAuth'>
                <span className='signup_title'>Create New Customer Account</span>

                <div className='signup_form_container'>

                    <div className='left_signin'>

                        <h2 className='sub_title'>Personal Information</h2>
                        

                        <form onSubmit={this.handleSubmit} className='signup_form_box'>
                            <div className='personal_login'>
                                <label className='name_signup'>First Name
                                    <input type="text" className='personal_input'/>
                                </label>

                                <label className='lname_signup'>Last Name
                                    <input type="text" className='personal_input'/>
                                </label>

                                <div className='check_div'>
                                    <input type="checkbox" default='checked' className='check'/>                   
                                    <label className='newsletter'>Subscribe to our newsletter</label>
                                </div>
                                
                            </div>

                        <h2 className='sub_title'>Sign-in information</h2>

                            <div className='sign_info'>
                                <label className='email_signup'>Username<span className='asterisk'>*</span>
                                      <input type="text"
                                        value={this.state.username}
                                        onChange={this.update('username')}
                                        // placeholder="Username"
                                      />
                                </label>
                                <label className='email_signup'>Email<span className='asterisk'>*</span>
                                    <input type="text"
                                      value={this.state.email}
                                      onChange={this.update('email')}
                                      // placeholder="Email"
                                    />
                                </label>
                                
                                <label className='password_signup'>Password<span className='asterisk'>*</span>
                                      <input type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                        // placeholder="Password"
                                      />
                                </label>

                                <label className='password_signup'>Confirm Password<span className='asterisk'>*</span>
                                      <input type="password"
                                        value={this.state.password2}
                                        onChange={this.update('password2')}
                                        // placeholder="Confirm Password"
                                      />
                                </label>
                                <div className='disclaimer'>
                                    <p>This website is for demonstration purposes. Please do not store personal information.</p>   
                                    <p>Thank you!</p>
                                </div>
                            </div>   

                            <div className='enter_back'>

                                <button type="submit" value="Create An Account" className='signupButton'>Create An Account</button>
                                <button type='submit' onClick={this.handleDemo} className='demoButton'>Demo User 1</button>
                                <button type='submit' onClick={this.handleDemo2} className='demoButton'>Demo User 2</button>
                            </div>
                            <span className='requried_field'>* Required Field</span>
                        </form>
                        <div className='error_message'>{this.renderErrors()}</div>
                    </div>
                </div>
            </div>
    );
  }
}

export default withRouter(SignupForm);