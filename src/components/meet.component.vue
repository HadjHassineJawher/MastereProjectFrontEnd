<template>
  <div>
    <div id="video-grid" ref="video_grid"></div>
  </div>
  
</template>

<script>
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3031");
const myVideo= document.createElement('video')
 myVideo.muted= true


   //Create a peer 
    const peer = new Peer(undefined,{
      // path:'/peerjs',
        host:'/',
        port:'3032',
    }); 




export default {
  name: "Meet",
  data(){
    return{
      videoGrid:"",
      ROOM_ID:"",
      myVideoStream:"",
    }
  },
  mounted(){
    this.videoGrid= this.$refs.video_grid
    this.ROOM_ID= this.$route.params.idMeet

    navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
    }).then(stream=>{
      this. myVideoStream = stream;
      this.addVideoStream(myVideo,stream)

        peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })

      socket.on('user-connected', userId => {
        this.connectToNewUser(userId, stream)
      })
    })

    peer.on('open', id => {
     socket.emit('join-room', this.ROOM_ID, id)
  })
  },
  
  methods:{
      addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        this.videoGrid.append(video)
      },
      connectToNewUser(userId, stream) {
        const call = peer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
   
  }
  }
};




</script>