import React from 'react'
import {Link} from 'react-router-dom'


class ResolvedIndex extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render() {
        return (
            <div>
                {this.props.resolved.map((resolved, i) => {
                    return (
                        <div key={i}>
                            <div>{resolved.user}</div>
                            {console.log(resolved._id)}
                            <Link to={`/resolved/${resolved._id}`}>{resolved.subject}</Link>

                        </div>
                    )
                })}
            </div>
        )

    }
    
}

export default ResolvedIndex