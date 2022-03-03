<template>
  <v-app>
    <v-container>
      <v-row justify="space-around" class="ma-6">
        <v-card>
          <v-img
            max-height="200px"
            src="https://www.kuppingercole.com/pics/2018_csls_1000x563px.png"
          >
          </v-img>
          <!-- {{ planningList }} -->
          <!--{{ eventDetails.sessions[0] }} -->
          <div class="EventBox">
            <div class="EventInfo ml-8 mb-2">
              <v-card-text>
                <div class="EventInfoTop">
                  <h2>{{ capitalizeFirstLetter(eventDetails.name) }}</h2>
                  <h3>{{ format_date(eventDetails.date_deb) }}</h3>
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
                <h5>Join us on September 1st</h5>
                <v-btn elevation="3" dark color="#119D90"> Register </v-btn>
                <v-btn
                  v-show="eventDetails.state !== 'Face to Face'"
                  elevation="3"
                  color="#EF9440"
                  dark
                  @click="goToMeet"
                >
                  Join Now
                </v-btn>
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
              </div>
            </div>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { getEventById } from "./APIS/EventApi";
import moment from "moment";
import Meet from "./meet.component";

export default {
  data: () => ({
    eventDetails: Object,
    planningList: [],
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
  methods: {
    async getSingleEevent() {
      this.eventDetails = await getEventById(this.$route.params.id);
      this.planningList = this.eventDetails.sessions;
    },
    goToMeet() {
      this.$router.push({
        name: "Meet",
        params: { idMeet: this.eventDetails.room },
      });
    },

    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },

    capitalizeFirstLetter(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
  mounted() {
    this.getSingleEevent();
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
