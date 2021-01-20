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
                        <div key={i} className='individualQuestion'>
                            <div className='individualQuestionLink'>Username: {resolved.user.username}</div>
                            {/* {console.log(resolved._id)} */}
                            <div className='individualQuestionUser'>
                                Topic: <Link to={`/resolved/${resolved._id}`}>{resolved.subject}</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        )

    }
    
}

export default ResolvedIndex