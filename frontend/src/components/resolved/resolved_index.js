import React from 'react'
import {Link} from 'react-router-dom'


class ResolvedIndex extends React.Component{
    constructor(props){
        super(props)

        this.itemColor = this.itemColor.bind(this);
    }

    itemColor(i, resolved){
        if( i % 2 === 0){
            return (
                <div key={i} className='individualResponse'>
                    <div className='individualQuestionLink'>Username: {resolved.user.username}</div>
                    {/* {console.log(resolved._id)} */}
                    <Link to={`/resolved/${resolved._id}`}>
                        <div className='individualResponseUser'>
                            Topic: {resolved.subject}
                        </div>
                    </Link>
                </div>
            )
        }else{
            return (
                <div key={i} className='individualResponse1'>
                    <div className='individualQuestionLink'>Username: {resolved.user.username}</div>
                    {/* {console.log(resolved._id)} */}
                    <Link to={`/resolved/${resolved._id}`}>
                        <div className='individualResponseUser'>
                            Topic: {resolved.subject}
                        </div>
                    </Link>
                </div>
            )
        }
    }

    render() {
        // return (
        //     <div className='resolvedIndex'>
        //         {this.props.resolved.map((resolved, i) => {
        //             return (
        //                 <div key={i} className='individualResponse'>
        //                     <div className='individualQuestionLink'>Username: {resolved.user.username}</div>
        //                     {/* {console.log(resolved._id)} */}
        //                     <Link to={`/resolved/${resolved._id}`}>
        //                         <div className='individualResponseUser'>
        //                             Topic: {resolved.subject}
        //                         </div>
        //                     </Link>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // )
        return (
            <div className='resolvedIndex'>
                {this.props.resolved.map((resolved, i) => {
                    return (
                       this.itemColor(i, resolved)
                    )
                })}
            </div>
        )

    }
    
}

export default ResolvedIndex