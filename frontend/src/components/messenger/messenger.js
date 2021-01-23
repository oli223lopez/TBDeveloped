import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'


const Messenger = (props) => {
    const [yourID, setYourID] = useState();
    const [conversations, setConversations] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            // console.log('here', message)
            receivedMessage(message);
        })
        
        console.log('messenger-31', props.chatID)
        socketRef.current.emit('join', props.chatID)

    }, [props.chatID]);

    function receivedMessage(message) {
        setConversations(oldMsgs => [...oldMsgs, message]);
    }

    
    window.addEventListener('keydown', onKeyPress);
    function onKeyPress(e){
            if (e.code === 'Enter') {
                document.getElementById("chatBtn").click();
        }
    }


    function sendMessage(e) {
        console.log('invoked')
        // console.log('printSetConversations', conversations)
        e.preventDefault();

        const messageObject = {
            sentence: message,
            id: yourID,
        };
        messageToDB()
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function messageToDB(){

        let newMess = {
            chatId: props.chatID,
            user: props.userID,
            sentence: message
        };

        props.postMessage(newMess);
    }

    //!{/* //!WL 1/19/ trying to kill chat connection */}
    function leaveChat(){
        socketRef.current.disconnect()
    }
    //!{/* //!WL 1/19/ trying to kill chat connection */}
    
    //!renders DB Conversations
    useEffect(() => {
        if(props.chatID){
            props.fetchChat(props.chatID).then(res => 
                setConversations(res.chat.messages)
            )
        }
    }, [])
    //!renders DB Conversations

    return (
        <div>
            <div>
                {conversations.map((message, index) => {
                    if (message.id === yourID) {
                        return (
                            <div key={index}>
                                <div>
                                    {/* {message.user} */}
                                    {message.sentence}
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index}>
                            <div>
                                {/* {message.user} */}
                                {message.sentence}
                            </div>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={sendMessage}>
                <textarea id='chatInput' value={message} onChange={handleChange} placeholder="Say something..." />
                <button id='chatBtn' type='submit'>Send</button >
            </form>
            <div onClick={() => leaveChat()} id={`leaveChat${props.chatID}`}></div>  

        </div>
    );
};

export default Messenger