import React, { useState, useRef, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import io from "socket.io-client";

const Room = (props) => {
    //!TEST
        let [peers, setPeers] = useState([]);
    //!TEST


    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();
    const setPeers = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

//!delete
console.log(userStream.current)
console.log('getTracks', userStream.current.getTracks())
//!delete

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });


            //!TEST - WL - trying to remove video on meeting exit
            socketRef.current.on( "user left", id => {
                const peerObj = peerRef.current.find(p => p.peerID === id);
                if (peerObj){
                    peerObj.peer.destroy();
                }
                const peers = peerRef.current.filter(p => p.peerID !== id);
                peerRef.current = peers;
                setPeers(peers); //state

            })
            // finding the peer, destorying the peer, and removing it from the array
            //!TEST

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

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

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
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
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };


    //! VIDEO function
    const playStop = () => {
        let enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
        if(enabled){
            userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
            console.log('false', enabled)
        }else{
            userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
            console.log('true', enabled)
        }
    }

    //! Cut connection of the person leaving page.
    const stopStreamedVideo = () => {
        const tracks = userStream.current.getTracks();
        console.log(tracks);
        
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

    //? is this leaving the call or just shutting off camera?
    // function stopUserStreamedVideo() {
    //     const tracks = userVideo.current.srcObject.getTracks();
    //     console.log('user',tracks);

    //     //note - stream.stop() is deprecated. Do not use
    //     tracks.forEach(function(track) {
    //         track.stop();
    //     });
        

    // }
    
    //? is this leaving the call or just shutting off camera?
    // function stopPartnerStreamedVideo() {
    //     const tracks = partnerVideo.current.srcObject.getTracks();
    //     console.log('partner',tracks);

    //     //note - stream.stop() is deprecated. Do not use
    //     tracks.forEach(function(track) {
    //         track.stop();
    //     });
    // }


    //! MUTE function
    const muteStream = () => {
        const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
        if(enabled){
            userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
            // console.log('false', enabled)
        }else {
            userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
            // console.log('true', enabled)
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
            <p>Hello</p>
            <video autoPlay ref={userVideo} muted/>
            <video autoPlay ref={partnerVideo} />


            {/* Leave meeting works but the other user sees a frozen screen */}
            <Link to='/'>
                <button onClick={() => stopStreamedVideo()}>Leave Meeting</button>  
            </Link>


            {/* BELOW IS WORKING FOR BOTH PARTY, DONT DELETE */}
            <button onClick={() => muteStream()}>MuteControl</button> 
            <button onClick={() => playStop()}>Video On/Off</button>  


        </div>
    );
};

export default Room;