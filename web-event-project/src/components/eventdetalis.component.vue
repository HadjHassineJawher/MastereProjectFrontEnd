<template>
   <div class="container">
 <v-container>
    <v-row justify="space-around">
      <v-card >
        <v-img
          height="200px"
          src="https://www.kuppingercole.com/pics/2018_csls_1000x563px.png">
        </v-img>

        <div class="EventBox ">
            <div class="EventInfo ml-8 mb-2">
                     <v-card-text>
                                <div class="EventInfoTop">
                                     <h2>Cyber Security</h2>
                                     <h3>Mon, Sep 1, 9:00 AM</h3>
                                     <p class="EventDescription">
                                         In order to mitigate cyber security risks as organisations continue to modernise, it is important to protect your networks and assets from threats. Strengthening cyber security posture not only benefits the organisation but also their customers as part of the supply chain. 
                                     </p>
                                </div>

                             
                        </v-card-text>

                        <v-card-text>
                                <div class="font-weight-bold">
                                    Planning
                                </div>

                                <v-timeline
                                    align-top
                                    dense
                                >
                                    <v-timeline-item
                                    v-for="message in messages"
                                    :key="message.time"
                                    :color="message.color"
                                    small
                                    >
                                    <div>
                                        <div class="font-weight-normal">
                                        <strong>{{ message.Time }}</strong>
                                        </div>
                                        <div>{{ message.description }}</div>
                                    </div>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-card-text>
                            <div class="btnBox">
                                <h5> Join us on  Spetember 1st</h5>
                                <v-btn elevation="3" dark color="#119D90"> Register </v-btn>
                                <v-btn elevation="3"  color="#EF9440" dark> Join Now </v-btn>
                            </div>
                           
                </div>
                <div class="SpeakerInfo">
                        <div class="SpeakerInfoTop">
                                    <img class="userIcon" src="https://cdn.vuetifyjs.com/images/john.jpg"  >
                                    <h3>Drake Heptinstall</h3>
                                    <h4>Cyber Security Analyst</h4>
                        </div>
                        <div class="SpeakerInfoBody">
                             <h2>Work Experience</h2>
                                     <h3>Pennsylvania Air National Guard</h3>
                                     <p class="EventDescription">
                                        Ensuring all unclassified and classified systems and networks
                                        Primary base information assurance manager for all 
                                        telecommunications 
                                        Build and maintain client relationships with VA through
                                        positive interactions
                                        Evaluated and mitigated base noncompliance with t map
                                     </p>
                        </div>
                </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
  </div> 
 

</template>

<script>
  export default {
    data: () => ({
      messages: [
        {
          Time: '9:00 AM to 10:00 AM',
          description: `Intoduction`,
          color: '#119D90',
        },
        {
          Time: '10:00 AM to 11:00 AM',
         description: `Enterprise Security`,
          color: '#EF9440',
        },
        {
          Time: '11:00 AM to 12:00 AM',
          description: `Information security program development & management`,
          color: '#119D90',
        },
      ],
    }),
  }
</script>

<style scoped>
.EventBox{
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}


.EventInfo{
     flex: 1;
}
.EventInfoTop> *{
    margin: 7px;
}
.EventDescription{
    margin-top: 30px;
}
.btnBox> * {
    align-items: center;
 margin: 5px;
}

.SpeakerInfo{
    flex: 1;  
    background-color:#C4EEE4 ;
}

.SpeakerInfoTop{
     margin-top: 20px;
     text-align:  center;
}
.userIcon{
  width: 40%;
  border-radius: 50%;
}
.SpeakerInfoBody{
     margin: 50px;
}
.btnBox{
  text-align: center;
}

.container{
  padding-bottom: 5px;
 
}
</style>