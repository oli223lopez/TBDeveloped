import React from 'react'



class QuestionForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            subject: this.props.subject,
            content: this.props.content,
            tag: this.props.tag,
            solved: this.props.solved
        }

        this.submit = this.submit.bind(this)
        this.updateSubmit = this.updateSubmit.bind(this)
        this.update = this.update.bind(this)
    }

    update(field){
        return (e) => this.setState({[field]: e.currentTarget.value})
    }


    submit(e){
        e.preventDefault();
        let newQuestion = {
            subject: this.state.subject,
            content: this.state.content,
            solved: this.state.solved,
            tag: this.state.tag,
            user: this.props.user
        };
        this.props.processForm(newQuestion)
    }

    updateSubmit(e) {
        console.log(this.props.questionId)
        e.preventDefault();
        let newQuestion = {
            
            content: this.state.content,
            solved: this.state.solved,
            tag: this.state.tag,
            user: this.props.user

        };
        this.props.processForm(this.props.questionId, newQuestion)
    }
    


    render(){
        if (this.props.formType === 'Update Question!'){
            return (
                <form onSubmit={this.updateSubmit}>

                    <label>
                        Subject: {this.state.subject}
                    </label>
                    <label>
                        Content: <textarea type='text' value={this.state.content} onChange={this.update('content')} />
                    </label>
                    <label>
                        <select onChange={this.update('tag')} >
                            <option value=''>--Choose a tag--</option>
                            <option value='idea'>Idea</option>
                            <option value='question'>Question</option>
                        </select>
                    </label>
                    <label>
                        <button type='submit'>{this.props.formType}</button>
                    </label>


                </form>
            )
        }
        return(
            <form onSubmit={this.submit}>
                
                <label>
                    Subject: <input type="text" value={this.state.subject} onChange={this.update('subject')}/>
                </label>
                <label>
                    Content: <textarea type='text' value={this.state.content} onChange={this.update('content')}/>
                </label>
                <label>
                    <select onChange={this.update('tag')} >
                        <option value=''>--Choose a tag--</option>
                        <option value='idea'>Idea</option>
                        <option value='question'>Question</option>
                    </select>
                </label>
                <label>
                    <button type='submit'>{this.props.formType}</button>
                </label>


            </form>
        )
    }
}

export default QuestionForm 