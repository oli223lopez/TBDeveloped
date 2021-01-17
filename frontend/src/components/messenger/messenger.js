import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'


const Messenger = () => {
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            console.log("here");
            receivedMessage(message);
        })
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