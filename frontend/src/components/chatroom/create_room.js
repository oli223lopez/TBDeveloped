import React from "react";
import { v1 as uuid } from "uuid";
import { Link } from 'react-router-dom';


const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        return id;  
        // props.history.push(`/room/${id}`)
    }

    return (
        <div>
            <Link to={`/room/${create()}`}><button>Start Video Chat!</button></Link>
        </div>
    )
}

export default CreateRoom; 