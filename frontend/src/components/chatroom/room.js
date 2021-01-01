import React, { useState, useRef, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import io from "socket.io-client";

const Room = (props) => {
    //!TEST
        // let [peers, setPeers] = useState([]);
        const [mute, setMute] = useState('Mute');
        const [video, setVideo] = useState('Video Off');
    //!TEST


    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(MediaStream => {
            userVideo.current.srcObject = MediaStream;
            userStream.current = MediaStream;

<<<<<<< HEAD
            socketRef.current = io.connect("/"); // open up a new socket on the client side
=======
//!delete
console.log(userStream.current)
console.log('getTracks', userStream.current.getTracks())
//!delete

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);
>>>>>>> 6199337bf3cee4e6c9e8ac4d426d3e19a730a4a4

            socketRef.current.emit("join room", props.match.params.roomID); 
            // has the socket emit this event, this event is caught by the server. I believe there's some 
            // 'long polling' involved. Interesting because the connection happens while this is on localhost 3000
            // and the server is on 5000  

        
            // i believe the below code only runs when the events happen, after the above event is emitted
            // it triggers a slew of events on the server side 
            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            // the above event is emitted from the server back to the client who created a chatroom, it basically 
            // it basically says to the user, hey there's someone in this room 
            // likely whats happening is someone clicked on a room link and this component mounts and they're alerted
            // that there's another user, and also given the other users socket id 
            // so if the above happens then two users are sitting in the same room. 
            // but their sockets need to connect 
            // this i where the callUser function comes in. Essentially it calls the OTHER USER  

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });


            //!TEST - WL - trying to remove video on meeting exit
            // socketRef.current.on( "user left", id => {
            //     const peerObj = peerRef.current.find(p => p.peerID === id);
            //     if (peerObj){
            //         peerObj.peer.destroy();
            //     }
            //     const peers = peerRef.current.filter(p => p.peerID !== id);
            //     peerRef.current = peers;
            //     setPeers(peers); //state

            // })
            //finding the peer, destorying the peer, and removing it from the array
            //!TEST

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID); 
        // userID is the socket.id of the OTHER PERSON in the room 
        // it is used in the createPeer function and set to the peerRef hook  
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }   
    // userStream.current was set to the MediaStream above
    // i imagine i

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        }); 
        // this constructor takes in an array of objects, these objects are servers which allow peers to connect, should 
        // use your own, look into creating one 

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;

        // still in the process of calling the other user/ connecting to the other users socket 
        //starts off by instantiating a RTCPeerConnection, this is used to connect two peers and maintain the connection

    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => { // createOffer is a RTCPeerConnection method
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    } // this function is handling events related to someone calling the user 

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    } 

    // this handles answers both for the caller and the callee because it essentially to establish the connection it needs to 

    function handleICECandidateEvent(e) {
        if (e.candidate) { // is e.candidate the current user / client 
            const payload = {
                target: otherUser.current,
                candidate: e.candidate, // this e.candidate is like a ICE config used to establish an RTCPeerConnection
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) { // incoming maybe whoever is calling 
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate) 
            .catch(e => console.log(e));
    } // one perspective is from the user you're calling, the other user. Adds this icecandidate to it's peerRef as a key value pair? 

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    }; // creating a video for the person you're calling? 


    function hangUp(e) {
        console.log(peerRef.current)
        console.log(socketRef.current)
        console.log("make this hangup button")
        socketRef.current.emit("hang up")
        console.log(userVideo.current)
        let vid = document.getElementById("myVideo")
        vid.parentNode.removeChild(vid);
    }

    useEffect(() => {
        return () => {
            stopStreamedVideo()
        }
    },[])
    

    //! VIDEO function
    const playStop = () => {
        let enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
        if(enabled){
            userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
            // console.log('false', enabled)
            setVideo('Video On')
        }else{
            userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
            // console.log('true', enabled)
            setVideo('Video Off')
        }
    }

    //! Cut connection of the person leaving page.
    const stopStreamedVideo = () => {
        const tracks = userStream.current.getTracks();
        // console.log(tracks);
        
        //!TEST - WL  - Intent here is the black the screen whenever some one leaves
        // let enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
        // if(enabled){
        //     userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
        // }
        //!TEST

        //note - stream.stop() is deprecated. Do not use
        tracks.forEach(function(track) {
            track.stop();
        });

    }


    //! MUTE function
    const muteStream = () => {
        const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
        if(enabled){
            userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
            setMute('Unmute')
            // console.log('false', enabled)
        }else {
            userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
            // console.log('true', enabled)
            setMute('Mute')
        }
    }
    
    // function muteStream() {
    //     const tracks = userStream.current.getAudioTracks();
    //     //note - stream.stop() is deprecated. Do not use
    //     console.log('audio', tracks)
    //     tracks.forEach(function(track) {
    //         track.stop();
    //     });
    //     console.log('audio', tracks)

    // }

    return (
        <div>
            <p>Video Chat</p>
            <video id="myVideo" autoPlay ref={userVideo} muted/>
            <video autoPlay ref={partnerVideo} />
<<<<<<< HEAD
            <button onClick={hangUp}>Disconnect</button>
=======
            

            {/* Leave meeting works but the other user sees a frozen screen */}
            <Link to='/'>
                <button onClick={() => stopStreamedVideo()}>Leave Meeting</button>  
            </Link>


            {/* BELOW IS WORKING FOR BOTH PARTY, DONT DELETE */}
            <button onClick={() => muteStream()}>{mute}</button> 
            <button onClick={() => playStop()}>{video}</button>  


>>>>>>> 6199337bf3cee4e6c9e8ac4d426d3e19a730a4a4
        </div>
    );
};

export default Room;