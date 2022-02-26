<template>
      <div class="chat__cantainer">
        <div class="chat__header">
              <h2>Chat</h2>
        </div>
         <div class="chat__body">
              <ul class="messages">
                <li v-for="message in listMesssage" :key="message._id" >
                    <v-container>
                        <h4>{{message.author}}</h4>
                        <h6>{{message.time}}</h6>
                        <p>{{message.message}}</p>
                    </v-container>
                    
                </li>
              </ul>
         </div>
        <div class="chat__footer">
              <!-- <input id="chat_message" type="text" placeholder="Type message here..."> -->
               <v-text-field
                    id="chat_message"
                    label="Send Message"
                    outlined
                    placeholder="Type message here..."
                    v-model="Message"
                   
                    ></v-text-field>
        </div>
    </div>
</template>
<script>
export default {
    name:'Chat',
    props:['room','username','socketIo'],
    data(){
      return{
        Message:"",
        listMesssage:[],
        inputMessage:""

      }
   },
  
    methods:{
        async sendMessage (){
        const _id = Math.random();
        // console.log("form sendMessage :",this.socketIo)
        const messageData={
            id:_id,
            room: this.room,
            author: this.username,
            message: this.Message,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
              await  this.socketIo.emit("sendMessage",messageData)
                 this.listMesssage.push(messageData)
                
                 
        
    },
        receiveMessage(){
           
            this.socketIo.on('reciveMessage',(data)=>{
               this.listMesssage.push(data)
            })
    },
        listener(){
                  this.inputMessage=document.getElementById("chat_message");
                    this.inputMessage.addEventListener("keydown",(e)=>{
                     if (e.key === "Enter") {  
                            this.sendMessage();
                            document.getElementById("chat_message");
                        }
                })
        }
    },
      mounted() {
         
           this.$nextTick(function(){
           this.receiveMessage()
           })
            this.listener() 
      },     
    
}
</script>
<style scoped>
    .chat__cantainer{
       height: 100vh;
       flex: 0.2;
       background-color: rgb(234, 234, 234);
       border-left: 1px solid #3D3D42;
       display: flex;
       flex-direction: column;
     }
    .chat__header {
        padding-top: 5px;
        color: black;
        text-align: center;
    }

    .chat__body {
        flex-grow: 1;
        overflow-y: auto;
    }


    .messages{
        color: black;
        list-style: none;
    }
     .chat__footer {
        padding: 22px 12px;
        display: flex;
    }

 
</style>