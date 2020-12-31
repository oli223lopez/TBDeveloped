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
        this.update = this.update.bind(this)
    }

    update(field){
        return (e) => this.setState({ [field]: e.target.currentValue})
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
        this.props.postQuestion(newQuestion)
    }
    


    render(){
        const tag = this.state.tag
        return(
            <form onSubmit={() => this.submit()}>
                
                <label>
                    Subject: <input type="text" value={this.state.subject} />
                </label>
                <label>
                    Content: <textarea type='text' value={this.state.content} />
                </label>
                <label>
                    <select name={'tag'} onChange={this.update('tag')} value={this.state.tag}>
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