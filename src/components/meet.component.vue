<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="9" class="video_container">
          <v-card>
            <div id="video-grid" ref="video_grid"></div>
          </v-card>
        </v-col>
        <v-col cols="3" class="chat_container">
          <Chat
            :room="ROOM_ID"
            :username="currentUser.LastName"
            :socketIo="socketIo"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-footer>
      <v-col>
        <v-row align="center" justify="space-around">
          <v-btn
            x-large
            color="#E0E0E0"
            ref="mic_button"
            v-on:click="muteMic(myVideoStream, mic_icon)"
          >
            <i ref="mic_icon"></i>
            <!-- <v-icon color="#119D90" class="mr-1"> mdi-microphone </v-icon> -->
          </v-btn>
          <v-btn
            x-large
            color="#80CBC4"
            ref="video_button"
            v-on:click="hideCam(myVideoStream, video_icon)"
          >
            <i ref="video_icon"></i>
          </v-btn>
          <v-btn
            x-large
            color="error"
            ref="end_call_button"
            v-on:click="endCall()"
          >
            <i id="exit-icon" class="fas fa-phone-slash"></i>
          </v-btn>
        </v-row>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import userMixin from "../mixins/user.mixin";
import Chat from "./chat.component.vue";
//const socket = io.connect("http://localhost:3031");
const socket = io.connect("https://mpdam-stream-server.herokuapp.com/");

const myVideo = document.createElement("video");
myVideo.muted = true;

//Create a peer
const peer = new Peer(undefined, {
  host: "peerjs-server.herokuapp.com",
  port: "443",
  secure: true,
});

export default {
  mixins: [userMixin],
  name: "Meet",
  data() {
    return {
      fullName: currentUser.FirstName + "" + currentUser.LastName,
      socketIo: "",
      videoGrid: "",
      title: "",
      ROOM_ID: this.$route.params.idMeet,
      myVideoStream: "",
      mic_icon: "",
      mic_button: "",
      video_button: "",
      video_icon: "",
      end_call_button: "",
    };
  },
  components: {
    Chat,
  },

  mounted() {
    this.socketIo = socket;
    // console.log("from meet",this.socketIo)

    this.videoGrid = this.$refs.video_grid;
    this.ROOM_ID = this.$route.params.idMeet;
    this.video_button = this.$refs.video_button;
    this.video_icon = this.$refs.video_icon;
    this.mic_icon = this.$refs.mic_icon;
    this.mic_button = this.$refs.mic_button;
    this.end_call_button = this.$refs.end_call_button;

    const htmlVideoElement = `<i class="fas fa-video"></i>`;
    const htmlMicElement = `<i class="fas fa-microphone"></i>`;

    this.video_icon.innerHTML = htmlVideoElement;
    this.mic_icon.innerHTML = htmlMicElement;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.myVideoStream = stream;
        this.addVideoStream(myVideo, stream);

        peer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");

          call.on("stream", (userVideoStream) => {
            this.addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          this.connectToNewUser(userId, stream);
        });
      });

    peer.on("open", (id) => {
      socket.emit("join-room", this.ROOM_ID, id);
    });
  },

  methods: {
    addVideoStream(video, stream, h3) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      this.videoGrid.append(video);
    },
    connectToNewUser(userId, stream) {
      const call = peer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        this.addVideoStream(video, userVideoStream);
      });
      socket.on("user-disconnected", (userId) => {
        video.remove();
      });
    },
    hideCam(myVideoStream, videoIcon) {
      const enabled = myVideoStream.getVideoTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        const html = `<i class="fas fa-video-slash"></i>`;

        videoIcon.innerHTML = html;
      } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        const html = `<i class="fas fa-video"></i>`;

        videoIcon.innerHTML = html;
      }
    },
    muteMic(myVideoStream, micIcon) {
      const enabled = myVideoStream.getAudioTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        const html = `<i  class="fas fa-microphone-slash"></i>`;

        micIcon.innerHTML = html;
      } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        const html = `<i  class="fas fa-microphone"></i>`;

        micIcon.innerHTML = html;
      }
    },
    endCall() {
      peer.destroy();
      socket.on("user-disconnected", (userId) => {
        myVideo.remove();
      });
      this.$router.push({ name: "Welcome" });
      console.log(peer);
    },
  },
};
</script>
<style>
#video-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
video {
  height: 250px;
  width: 300px;
  object-fit: cover;
  padding: 8px;
}

.chat_container {
  border: 1px solid black;
}
.video_container {
  border: 1px solid black;
}
</style>
// #buttons_container { padding: 30px; position: fixed; display: flex;
justify-content: space-between; bottom: 20px; /* z-index: 2; */ width: 100%;
margin-right: 15%; }
