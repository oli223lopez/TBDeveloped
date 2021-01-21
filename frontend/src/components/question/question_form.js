import React from 'react'
import {Link} from 'react-router-dom'

import '../../assets/stylesheets/question_form.css'


class QuestionForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            subject: '',
            content: this.props.content,
            tag: this.props.tag,
            solved: this.props.solved,
            errors: this.props.errors,
            tagSelected: true
            
        }

        this.submit = this.submit.bind(this)
        this.updateSubmit = this.updateSubmit.bind(this)
        this.update = this.update.bind(this)

        
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ errors: nextProps.errors })
    }

    update(field){
        return (e) => this.setState({[field]: e.currentTarget.value})
    }


    async submit(e){
        e.preventDefault();
        let newQuestion = {
            subject: this.state.subject,
            content: this.state.content,
            solved: this.state.solved,
            tag: this.state.tag,
            user: this.props.user
        };
        await this.props.processForm(newQuestion)
        if(Object.keys(this.state.errors).length === 0){
            this.setState({subject: ""})
            this.setState({content: ""})
            this.props.fetchQuestions()
        }
        console.log(this.state.errors)

    }

    updateSubmit(e) {
        // console.log(this.props.questionId)
        e.preventDefault();
        let newQuestion = {
            
            content: this.state.content,
            solved: this.state.solved,
            tag: this.state.tag,
            user: this.props.user

        };
        this.props.processForm(this.props.questionId, newQuestion)
    }
    
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`} className="question_errors_msg">
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }


    render(){
        if (this.props.formType === 'Update Question!'){
            return (
            <div className = "updateForm_container">

                <form onSubmit={this.updateSubmit}>
                        <h2 className="update_form_header">Edit Post</h2>
                    <div>
                    <label>
                        Content: <textarea type='text' value={this.state.content} onChange={this.update('content')} />
                    </label>
                    </div>
                    <div>
                    <label>Tag
                        <select onChange={this.update('tag')} >
                            <option value=''>--Choose a tag--</option>
                            <option value='idea'>Idea</option>
                            <option value='question'>Question</option>
                        </select>
                    </label>
                    </div>
                    <div>
                    <label>Solved
                        <select onChange={this.update('solved')} >
                            <option value=''>--Choose a tag--</option>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                    </label>
                    </div>
                    <label>
                        <button className="submit-question-button" type='submit'>{this.props.formType}</button>
                    </label>

                </form>
            </div>

            )
        }
        return(
            <div className="createform_container">
                <form onSubmit={this.submit}>
                    <div>

                        <label>
                            Subject: <span className="error_message">*</span> <input className="question-subject" type="text" value={this.state.subject} onChange={this.update('subject')}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Content: <span className="error_message">*</span> <textarea className="question-subject" value={this.state.content} onChange={this.update('content')}/>

                            Tag: <span className="error_message">*</span> <select onChange={this.update('tag')} >
                                <option value='' defaultValue={this.state.tagSelected}>--Choose a tag--</option>

                
                                <option value='idea'>Idea</option>
                                <option value='question'>Question</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="ques_button_err">
                                <button className="submit-question-button" type='submit'>{this.props.formType}</button>
                                <div className ="error_message">
                                    {this.renderErrors()}
                                </div>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default QuestionForm 