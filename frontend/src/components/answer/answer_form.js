import React from 'react'
import mongoose from 'mongoose';


class ResponseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            consultation: this.props.consultation,
            answer: this.props.answer,
           
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
         let res =  await this.props.processForm(this.props.questionID, newResponse)
         this.props.fetchQuestion(this.props.questionID)
    }

   


    render(){
        return(
            <form onSubmit={this.submit}>
                <div>

                <label>
                    consultation: <input type="date" placeholder={this.props.newResponse.consultation} onChange={this.update('consultation')}/>
                </label>
                </div>
                <div>
                <label>
                    answer: <textarea type='text' placeholder={this.props.newResponse.answer} onChange={this.update('answer')}/>
                </label>
                </div>

                <div>
                <label>
                    <button type='submit'>{this.props.formType}</button>
                </label>
                </div>
            </form>
        )
    }
}

export default ResponseForm 