<template>
 <div class="main">
        <div class="main__left">
           <div class="main__videos">
            
              <div id="video-grid" ref="video_grid">
                 <h5> {{currentUser.LastName}} {{currentUser.FirstName}}</h5>
              </div>
           </div>
           <div class="main__controls">
              <div class="main__controls__block">
                 <div  class="main__controls__button main__mute_button">
                    <i class="fas fa-microphone"></i>
                    <span id="muteButton">Mute</span>
                 </div>
                 <div  class="main__controls__button main__video_button" >
                    <i class="fas fa-video"></i>
                    <span id="stopVideo">Stop Video</span>
                 </div>
              </div>
              <div class="main__controls__block">
                 <div class="main__controls__button">
                    <i class="fas fa-shield-alt"></i>
                    <span>Security</span>
                 </div>
                 <div class="main__controls__button">
                    <i class="fas fa-user-friends"></i>
                    <span>Participants</span>
                 </div>
                 <div class="main__controls__button">
                    <i class="fas fa-comment-alt"></i>
                    <span>Chat</span>
                 </div>
              </div>
              <div class="main__controls__block">
                 <div class="main__controls__button">
                    <span class="leave_meeting">Leave Meeting</span>
                 </div>
              </div>
           </div>
        </div>
        <div class="main__right">
           <div class="main__header">
              <h6>Chat</h6>
           </div>
           <div class="main__chat_window">
              <ul class="messages">
                 
              </ul>
  
           </div>
           <div class="main__message_container">
              <input id="chat_message" type="text" placeholder="Type message here...">
           </div>
        </div>
     </div>

</template>

<script>
import io from 'socket.io-client';
import userMixin from "../mixins/user.mixin";
const socket = io.connect("http://192.168.9.147:3031");
const myVideo= document.createElement('video')
 myVideo.muted= true


   //Create a peer 
    const peer = new Peer(undefined,{
      // path:'/peerjs',
      //   host:'/',
      //   port:'3032',
      host:'peerjs-server.herokuapp.com',
      port:'443',
      secure: true,
    }); 




export default {
   mixins: [userMixin],
  name: "Meet",
  data(){
    return{
      videoGrid:"",
      title:"",
      ROOM_ID:"",
      myVideoStream:"",
    }
  },
  mounted(){
    console.log(this.currentUser)
    this.videoGrid= this.$refs.video_grid
    this.ROOM_ID= this.$route.params.idMeet
//sahiahsjpoamjso
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
      addVideoStream(video, stream,h3) {
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
     <style>
        #video-grid{
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
        }
        video{
           height: 250px;
           width: 300px;
           object-fit: cover;
           padding: 8px;
        }

       .main {
    height: 100vh;
    display: flex;
}

.main__left {
    flex: 0.8;
    display: flex;
    flex-direction: column;
}

.main__right {
    flex: 0.2
}

.main__videos {
    flex-grow: 1;
    background-color: rgb(156, 156, 156);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
}

.main__controls {
    background-color: rgba(10, 54, 63, 1);
}

.main__right {
    background-color: rgba(10, 54, 63, 1);
    border-left: 1px solid #3D3D42;
}

.main__controls {
    color: #D2D2D2;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

.main__controls__block {
    display: flex;
}

.main__controls__button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    min-width: 80px;
    cursor: pointer;
}

.main__controls__button:hover {
    background-color: #343434;
    border-radius: 5px;
}

.main__controls__button i {
    font-size: 24px;
}

.main__right {
    display: flex;
    flex-direction: column;
}

.main__header {
    padding-top: 5px;
    color: #F5F5F5;
    text-align: center;
}

.main__chat_window {
    flex-grow: 1;
    overflow-y: auto;
}

.messages{
    color: white;
    list-style: none;
}

.main__message_container {
    padding: 22px 12px;
    display: flex;
}

.main__message_container input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    color: #F5F5F5;
}

.leave_meeting {
    color: #EB534B;
}

.unmute, .stop {
    color: #CC3B33;
}
     </style>