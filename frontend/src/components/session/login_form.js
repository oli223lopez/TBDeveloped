import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/login.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: this.props.errors,
      emailError: "",
      passwordError: "", 
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidUpdate(prevState) {
    if(prevState.errors !== this.props.errors) {
      this.setState({emailError: this.props.errors.email})
      this.setState({passwordError: this.props.errors.password})
    }
  }
  
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    await this.props.login(user); 

    if(Object.values(this.props.errors)) {
      this.setState({errors: this.props.errors})

      if(!!this.props.errors.email) {
        this.setState({email: ""})
      };
  
      if(!!this.props.errors.password) {
        this.setState({password: ""})
      }
    }

  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    this.props.removeErrors();
  }

  render() {
    return (
      
      <div className='userAuth'>
                <span className='login_title'>Customer Login</span>
                
                <div className='login_form_container'>

                    <div className='left_login'>
                        <h2 className='sub_title'>Registered User</h2>
                        <hr/>
                        <form onSubmit={this.handleSubmit} className='login_form_box'>
                            <p>If you have an account, sign in with your email address.</p>
                            <label className='email_login'>Email<span className='asterisk'>*</span>
                                  <input className='login_input' type="text"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    placeholder={this.state.emailError}
                                  />
                            </label>

                            <label className='password_login'>Password<span className='asterisk'>*</span> 
                                  <input className='login_input' type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    placeholder={this.state.passwordError}
                                  />
                            </label>

                            <button type="submit" value="Sign In" className='signin-Button'>Sign In</button>
                            <span className='requried_field'>* Required Field</span>
                        </form>
                        <div className='error_message'>
                            {/* {this.renderErrors()} */}
                        </div>
                    </div>

                </div>
            </div>

    );
  }
}

export default withRouter(LoginForm);