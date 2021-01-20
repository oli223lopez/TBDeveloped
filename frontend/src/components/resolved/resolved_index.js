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
                            <Link to={`/resolved/${resolved._id}`}>
                                <div className='individualResponseUser'>
                                    Topic: {resolved.subject}
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )

    }
    
}

export default ResolvedIndex