import React from 'react'
import mongoose from 'mongoose';


class ResponseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            consultation: this.props.consultation,
<<<<<<< HEAD
            answer: this.props.answer
=======
            answer: this.props.answer,
           
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
        }
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
    }

    update(field){
        return (e) => this.setState({[field]: e.currentTarget.value})
    }


    submit(e){
<<<<<<< HEAD
        // e.preventDefault();
=======

        e.preventDefault();
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
        let newResponse = {
            user: this.props.user,
            consultation: this.state.consultation,
<<<<<<< HEAD
            answer: this.state.answer,
            user: this.props.user
        };
        this.props.processForm(this.props.questionId, newResponse)
=======
            answer: this.state.answer
        };
         this.props.processForm(this.props.questionID, newResponse)
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
    }

   


    render(){
        return(
<<<<<<< HEAD
            <form onSubmit={() => this.submit()}>
                
=======
            <form onSubmit={this.submit}>
                <div>
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
                <label>
                    consultation: <input type="date" placeholder={this.props.newResponse.consultation} onChange={this.update('consultation')}/>
                </label>
                </div>
                <div>
                <label>
<<<<<<< HEAD
                    answer: <textarea  value={this.state.answer} onChange={this.update('answer')}/>
=======
                    answer: <textarea type='text' placeholder={this.props.newResponse.answer} onChange={this.update('answer')}/>
>>>>>>> 34bed719a1d9344479f86321fcce278d0ad6e527
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