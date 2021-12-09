<template>
  
    <v-container>
      <v-row justify="space-around">
        <v-card>
          <v-img
            height="200px"
            src="https://www.kuppingercole.com/pics/2018_csls_1000x563px.png"
          >
          </v-img>
          <!-- {{ planningList }}
          {{ eventDetails.sessions[0] }} -->
          <div class="EventBox">
            <div class="EventInfo ml-8 mb-2">
              <v-card-text>
                <div class="EventInfoTop">
                  <h2>{{ eventDetails.name }}</h2>
                  <h3>Mon, Sep 1, 9:00 AM</h3>
                  <p class="EventDescription">
                    {{ eventDetails.description }}
                  </p>
                </div>
              </v-card-text>

              <v-card-text>
                <div class="font-weight-bold">Planning</div>

                <v-timeline align-top dense>
                  <v-timeline-item
                    v-for="planning in planningList"
                    :key="planning._id"
                    small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ planning.h_deb }}</strong>
                      </div>
                      <div>{{ planning.description }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
              <div class="btnBox">
                <h5>Join us on Spetember 1st</h5>
                <v-btn elevation="3" dark color="#119D90"> Register </v-btn>
                <v-btn elevation="3" color="#EF9440" dark> Join Now </v-btn>
              </div>
            </div>
            <div class="SpeakerInfo">
              <div class="SpeakerInfoTop">
                <img
                  class="userIcon"
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                />
                <h3>Drake Heptinstall</h3>
                <h4>Cyber Security Analyst</h4>
              </div>
              <div class="SpeakerInfoBody">
                <h2>Work Experience</h2>
                <h3>Pennsylvania Air National Guard</h3>
                <p class="EventDescription">
                  {{ planning.description }}
                </p>
              </div>
            </div>
          </div>
        </v-card>
      </v-row>
    </v-container>
  
</template>

<script>
import axios from "axios";
import { getEventById } from "./APIS/EventApi";

export default {
  data: () => ({
    planning: "",
    planningList: {
      _id: "",
      name: "",
      description: "",
      speakers: [],
      h_deb: "",
      h_fin: "",
    },
    eventDetails: {
      _id: "",
      name: "",
      description: "",
      sessions: [],
      nb_place: 0,
      state: "",
    },
    usersList: {
      firstName: "",
      lastName: "",
      phone: "",
      adresse: "",
      email: "",
      pwd: "",
      profile: "",
      status: "",
    },
  }),
  created() {
    this.getEventById();
   
  },
  methods: {
   
    getEventById() {
      getEventById(this.$route.params.id).then((response) => {
        this.eventDetails = response;
      });
    },
    getPlanningById() {
      axios
        .get(
          "http://localhost:4000/Api/sessions/" + this.eventDetails.sessions[0]
        )
        .then((response) => {
          console.log("res", this.eventDetails.sessions[0]);
          this.planningList = response.data.session;
          console.log("this.session", this.session);
        });
    },
    getSpeakers() {
      axios.get("http://localhost:4000/Api/users").then((response) => {
        this.usersList = response.data.UsersList;
        //console.log("this.UsersList", this.UsersList);
      });
    },
  },
};
</script>

<style scoped>
.EventBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.EventInfo {
  flex: 1;
}
.EventInfoTop > * {
  margin: 7px;
}
.EventDescription {
  margin-top: 30px;
}
.btnBox > * {
  align-items: center;
  margin: 5px;
}

.SpeakerInfo {
  flex: 1;
  background-color: #c4eee4;
}

.SpeakerInfoTop {
  margin-top: 20px;
  text-align: center;
}
.userIcon {
  width: 40%;
  border-radius: 50%;
}
.SpeakerInfoBody {
  margin: 50px;
}
.btnBox {
  text-align: center;
}


</style>