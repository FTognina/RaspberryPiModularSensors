const SocketIOClient = require('socket.io-client');
const {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} = require('wrtc');

//import {useState, useEffect, useRef} from 'react';


//const [localStream, setlocalStream] = useState(null);
//const [remoteStream, setRemoteStream] = useState(null);

const [callerId] = [123]; //not sure this is correct, depends how use state is implemented(variabile normal but is a persistent state)
//const otherUserId = useRef(null);

const socket = SocketIOClient('http://172.20.10.7:4000');

const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
    {
      urls: 'stun:stun2.l.google.com:19302',
    },
  ],
});



socket.on("message",  async message => {
  if (message.answer) {
      const remoteDesc = new RTCSessionDescription(message.answer);
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
  };
  if (message.offer) {
      peerConnection.current.setRemoteDescription(message.offer);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("message", "message",{
        calleeId: 345,
        answer: answer,
      })
  }
});



async function startCall(otherUserId) {
  const offer = await peerConnection.current.createOffer();
  await peerConnection.current.setLocalDescription(offer);
  socket.emit("message",{
    calleeId: 345,
    offer: offer,
  });
}


peerConnection.addEventListener('icecandidate', event => {
  if (event.candidate) {
    socket.emit({'new-ice-candidate': event.candidate})({
    });
  } else {
    console.log('End of candidates.');
  }
});

peerConnection.addEventListener('connectionstatechange', event => {
  console.log("Connection state change", peerConnection.connectionState);
});

console.log('start')



