import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'


const Messenger = (props) => {
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        //! emit chat id when opening chat
        //! socketRef.emit to make the rooms personalized





        socketRef.current.on("message", (message) => {
            console.log("here");
            receivedMessage(message);
        })
        console.log(props.user)
        socketRef.current.emit('join', props.user[0])
    }, []);

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    // console.log(messages)

    return (
        <div>
            <div>
                {messages.map((message, index) => {
                    if (message.id === yourID) {
                        return (
                            <div key={index}>
                                <div>
                                    {message.body}
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index}>
                            <div>
                                {message.body}
                            </div>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={sendMessage}>
                <textarea value={message} onChange={handleChange} placeholder="Say something..." />
                <button type='submit'>Send</button >
            </form>
        </div>
    );
};

export default Messenger