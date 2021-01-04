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
            <div>
                Start Video Chat!
            </div>
            <Link to={`/room/${create()}`}><button>Create Room</button></Link>
        </div>
    )
}

export default CreateRoom; 