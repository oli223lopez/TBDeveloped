import { use } from 'passport';
import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import '../../assets/stylesheets/chat.css'


const Messenger = (props) => {
    const [yourID, setYourID] = useState();
    // const [conversations, setConversations] = useState([]);
    const [conversations, setConversations] = useState([]);
    //! 
        // const
    //!
    const [message, setMessage] = useState("");

    const socketRef = useRef();
    let messages = document.querySelector('.messages')



    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            receivedMessage(message);


        })
        
        socketRef.current.emit('join', props.chatID)

    }, [props.chatID]);

    function receivedMessage(message) {
        setConversations(oldMsgs => [...oldMsgs, message]);        
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            sentence: message,
            id: yourID,
            user: props.userID,
            username: props.username
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

    function leaveChat(){
        socketRef.current.disconnect()
    }

    
    useEffect(() => {
        if(props.chatID){
            props.fetchChat(props.chatID).then(res =>{
                setConversations(res.chat.messages)
            })
            
        }

    }, [props.chatID])

    useEffect(() => {
        
        if (messages) {
            messages.scrollTop = messages.scrollHeight
        }
    }, [conversations])

    // if(messages){
    //     messages.scrollTop = messages.scrollHeight
    // }
  

    //This works but not moving to production
    // function onKeyUpValue(e) {
    //     e.preventDefault();
    //     if(message === ''){
    //         console.log('null')
    //         return null
    //     }else if (e.code==="Enter" && message !== ''){
    //         console.log('submited')
    //         sendMessage(e)
    //     }
    // }


    
    return (
        <div>
            
        <div className='chatBox'>

            <div onClick={() => leaveChat()} id={`leaveChat${props.chatID}`}></div> 
            <div className='messages' >
                {conversations.map((message, index) => {
                    
                    if (message.user === props.userID) {
                        return (
                            <div key={index} className='myMessagesRow'>
                                {/* <div>{props.username}</div> */}
                                <div className='myMessage'>
                                    {message.sentence}
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div key={index} className='otherMessagesRow'>
                                <div className='otherMessage'>
                                    {/* {message.user} */}
                                    {message.sentence}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

            
            <form onSubmit={sendMessage} className='chatForm'>
                <textarea value={message} className='chatTextArea' onChange={handleChange} placeholder="Say something..." />
                {message === '' ? <button className='chatSend' type='submit' disabled>Send</button > : <button className='chatSend' id='chatBtn' type='submit'>Send</button> }
                
            </form>
            

        </div>
        </div>

    );
            
            
};

export default Messenger