import React from 'react' 

class ResolvedShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            idx: 0
        }
    }

    componentDidMount() {
        this.props.fetchQuestion(this.props.resolvedId)
        // console.log(this.props.resolvedId)
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0
    }



    render() {
        const resolved = Object.values(this.props.resolved)
        // console.log(resolved)
        if (this.isEmpty(resolved) === true) {
            return (
                <div>some text in that div tag</div>
            )
        } else {
           
            return (
                <div>

                    <h2>{resolved[0].subject}</h2>
                    <p>{resolved[0].content}</p>
                    <p>Created on: {Date(resolved[0].createdAt)}</p>
                    <p>Tag: {resolved[0].tag}</p>

                </div>
            )
        }
    }
}

export default ResolvedShow