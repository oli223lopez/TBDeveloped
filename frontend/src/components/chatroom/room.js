import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

const Room = (props) => {
    //!TEST
        // let [mute, setMute] = useState(true)
    //!TEST


    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

console.log(userStream.current)
console.log('getTracks', userStream.current.getTracks())

            socketRef.current = io.connect("/");
            socketRef.current.emit("join room", props.match.params.roomID);

            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });







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


    //! is this leaving the call or just shutting off camera?
    function stopStreamedVideo() {
        const tracks = userStream.current.getTracks();
        console.log(tracks);

        //note - stream.stop() is deprecated. Do not use
        tracks.forEach(function(track) {
            track.stop();
        });


    }
    //! is this leaving the call or just shutting off camera?
    function stopUserStreamedVideo() {
        const tracks = userVideo.current.srcObject.getTracks();
        console.log('user',tracks);

        //note - stream.stop() is deprecated. Do not use
        tracks.forEach(function(track) {
            track.stop();
        });
        

    }
    
    //! is this leaving the call or just shutting off camera?
    function stopPartnerStreamedVideo() {
        const tracks = partnerVideo.current.srcObject.getTracks();
        console.log('partner',tracks);

        //note - stream.stop() is deprecated. Do not use
        tracks.forEach(function(track) {
            track.stop();
        });
    }


    //?mute button only works once but will not turn back on
    // function muteStream() {
    //     const tracks = userStream.current.getAudioTracks();
    //     //note - stream.stop() is deprecated. Do not use
    //     console.log('audio', tracks)
    //     tracks.forEach(function(track) {
    //         track.stop();
    //     });
    //     console.log('audio', tracks)

    // }


    function muteStream() {
        let tracks = userStream.current.getAudioTracks()[0].enabled;
        //note - stream.stop() is deprecated. Do not use
        // console.log('audio', tracks)
        if(tracks === true){
            tracks = true;
            console.log('true', tracks)
        }else{
            tracks = false;
            console.log('false', tracks)
        }
        // tracks.forEach(function(track) {
        //     track.stop();
        // });

    }


    return (
        <div>
            <p>Hello</p>
            <label>First User
                <video autoPlay ref={userVideo} muted/>
            </label>
            <button onClick={() => stopUserStreamedVideo()}>userOneVideo</button>  
            <button onClick={() => stopPartnerStreamedVideo()}>userTwoVideo</button>  

            <button onClick={() => muteStream()}>MuteControl</button>  
            <label>Second User
                <video autoPlay ref={partnerVideo} />
            </label>
            <button onClick={() => stopStreamedVideo()}>stopStreamVideo</button>  

        </div>
    );
};

export default Room;