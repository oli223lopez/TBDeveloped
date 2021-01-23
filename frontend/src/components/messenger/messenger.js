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
        // console.log(yourID)

        socketRef.current.on("message", (message) => {
            console.log('here')
            receivedMessage(message);


        })
        
        // console.log('messenger-31', props.chatID)
        socketRef.current.emit('join', props.chatID)

    }, [props.chatID]);

    function receivedMessage(message) {
        console.log('socketio@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
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

    //!{/* //!WL 1/19/ trying to kill chat connection */}
    function leaveChat(){
        socketRef.current.disconnect()
    }
    //!{/* //!WL 1/19/ trying to kill chat connection */}

    // console.log(props.chatID)
    // console.log(props.chatID.messages.length)
    // console.log('conversation',conversations.length)
    //!renders DB Conversations
    useEffect(() => {

        // if(props.chatID.messages.length !== conversations.length){
        if(props.chatID){
            props.fetchChat(props.chatID._id).then(res =>{
                // console.log(res.chat.posterID)
                setConversations(res.chat.messages)
            })
        }
        
    }, [])

    useEffect(() => {
        
        if (messages) {
            messages.scrollTop = messages.scrollHeight
        }
    }, [conversations])
    //!renders DB Conversations
    // console.log(messages)

    if(messages){
        messages.scrollTop = messages.scrollHeight
    }
    function posterValid(){
        // if(poster){
        //     if (props.userID === poster._id){
        //         return(
        //             <div>
        //                { console.log(poster)}
                        
        //                 <img src={`https://robohash.org/${ responder._id}?100x100`}className='robotNav' />
        //                 <div>{`${responder.username}-${questionSubject.substring(0, 15)}`}</div>
        //             </div>
        //         )
        //     }else{
        //         return (
        //             <div>
        //                 <img src={`https://robohash.org/${poster._id}?100x100`} className='robotNav' />
        //                 <div>{`${poster.username}-${questionSubject.substring(0, 15)}`}</div>
        //             </div>
        //         )
        //     }
        // }else{
        //    return null
        // }
    }
    
    return (
        <div>
            
        <div className='chatBox'>

            <div onClick={() => leaveChat()} id={`leaveChat${props.chatID._id}`}></div> 
            <div className='messages' >
                {/* {console.log(conversations)} */}
                 {console.log(conversations)}  
                {conversations.map((message, index) => {
                    
                    if (message.user === props.userID) {
                        
                        return (
                            <div key={index} className='myMessagesRow'>
                                {/* <div>{props.username}</div> */}
                                <div className='myMessage'>
                                    {/* {console.log(message)} */}
                                    {/* {message.user} */}
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
                {message === '' ? <button className='chatSend' type='submit' disabled>Send</button > : <button className='chatSend' type='submit'>Send</button > }
                
            </form>
            

        </div>
        </div>

    );
            
            
};

export default Messenger