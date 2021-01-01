import React from 'react'



class ResponseForm extends React.Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
    }

    update(field){
        return (e) => this.setState({[field]: e.currentTarget.value})
    }


    submit(e){
        e.preventDefault();
        let newResponse = {
            consultation: this.state.consultation,
            answer: this.state.answer,
           
        };
        this.props.processForm(newResponse)
    }

   


    render(){
        return(
            <form onSubmit={this.submit}>
                
                <label>
                    consultation: <input type="date" value={this.state.consultation} onChange={this.update('consultation')}/>
                </label>
                <label>
                    answeer: <input type='text' value={this.state.answer} onChange={this.update('answer')}/>
                </label>
                <label>
                    <button type='submit'>{this.props.formType}</button>
                </label>
            </form>
        )
    }
}

export default ResponseForm 