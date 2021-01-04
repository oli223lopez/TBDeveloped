import React from 'react'
import {Link} from 'react-router-dom'


class ResolvedIndex extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render() {
        return (
            <div className='resolvedIndex'>
                {this.props.resolved.map((resolved, i) => {
                    return (
                        <div key={i} className='individualResponse'>
                            <div className='individualResponseUser'>Username: {resolved.user.username}</div>
                            {/* {console.log(resolved._id)} */}
                            <div className='individualResponseLink'>
                                Case: <Link to={`/resolved/${resolved._id}`}>{resolved.subject}</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )

    }
    
}

export default ResolvedIndex