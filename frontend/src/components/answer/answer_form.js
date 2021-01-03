import React from 'react'
import mongoose from 'mongoose';


class ResponseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            consultation: this.props.consultation,
            answer: this.props.answer,
<<<<<<< HEAD
            errors: ""
=======
            errors: this.props.errors
>>>>>>> main
        }
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
    }

    update(field){
        return (e) => this.setState({[field]: e.currentTarget.value})
    }



    async submit(e){

        e.preventDefault();
        let newResponse = {
            user: this.props.user,
            consultation: this.state.consultation,
            answer: this.state.answer
        };
       

        if(!newResponse.consultation){
            this.setState({errors: "please pick a consultation date"})
        }
        else if(!newResponse.answer){
            this.setState({errors: "please write out your response"})

        }
        else {
            await this.props.processForm(this.props.questionID, newResponse)
            this.props.fetchQuestion(this.props.questionID)
            //clear errors and form fields
            this.setState({errors: ""})
            this.setState({consultation: ""})
            this.setState({answer: ""})

         
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors })
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

   


    render(){
        
        return(
            <form onSubmit={this.submit}>
                <div>
                    <div className="errors">
                    <p>{this.state.errors}</p>
                    </div>
                <label>
                    consultation: <input type="date" value={this.state.consultation} onChange={this.update('consultation')}/>
                </label>
                </div>
                <div>
                <label>
                    answer: <textarea type='text' value={this.state.answer} onChange={this.update('answer')}/>
                </label>
                </div>

                <div>
                <label>
                    <button type='submit'>{this.props.formType}</button>
                    {this.renderErrors()}
                </label>
                </div>
            </form>
        )
    }
}

export default ResponseForm 