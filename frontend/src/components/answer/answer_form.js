import React from 'react'

import '../../assets/stylesheets/answer_form.css'


class ResponseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            consultation:'',
            answer: this.props.answer,
            errors: ""
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
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ errors: nextProps.errors })
    // }

   
   


    render(){
          console.log(this.props.currentUser) 
        return(
            <form className = "response-form" onSubmit={this.submit}>
                <div>
                    <div className = "response-answer-container" >
                    <p className="error_message">{this.state.errors}</p>
                    </div>
                <div className="respondant-header">
                <img className = "respondants-image" alt="robots" src={`https://robohash.org/${this.props.currentUser.id}?100x100`} />
                <label className = "consoldation-label">
                    Consultation Date: <span class="error_message">*</span> <input className ="response-date" type="date" value={this.state.consultation} onChange={this.update('consultation')}/>
                </label>
                </div>
                </div>
                <div>
                <label>
                   <textarea className = "response-text-area" placeholder="Write a Response..." type='text' value={this.state.answer} onChange={this.update('answer')}/>
                </label>
                </div>

                <div>
                <label>
                    <button className = "response-submission-button" type='submit'>{this.props.formType}</button>
                </label>
                </div>
            </form>
        )
    }
}

export default ResponseForm 