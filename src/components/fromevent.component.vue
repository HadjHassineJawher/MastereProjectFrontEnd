<template>
  <v-container>
    <v-form lazy-validation ref="form" v-model="valid">
      <v-row v-row justify="center">
        <v-col cols="12">
          <v-label>Event name</v-label>
          <v-text-field :rules="inputRules" v-model="event.name">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-label>Number of attendees</v-label>
          <v-text-field
            single-line
            type="number"
            v-model="event.nb_place"
            :rules="inputRules"
          />
        </v-col>

        <v-col cols="12">
          <v-label>Event start date</v-label>
          <v-menu
            v-model="menuStart"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="inputRules"
                v-model="event.date_deb"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :rules="inputRules"
              v-model="event.date_deb"
              @input="menuStart = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-label>Event end date</v-label>
          <v-menu
            v-model="menuEnd"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.date_fin"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="inputRules"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="event.date_fin"
              @input="menuEnd = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-label>Event status</v-label>
          <v-select
            :items="items"
            dense
            v-model="event.state"
            :rules="inputRules"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-label>Event description</v-label>
          <v-textarea
            solo
            name="input-7-4"
            :rules="inputRules"
            v-model="event.description"
          />
        </v-col>
      </v-row>
      <v-btn
        block
        text-color="white"
        color="#CF6400"
        class="ma-6 white--text"
        max-width="400"
        align="center"
        justify="center"
        @click="addingEvent"
      >
        Add Event
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar" :timeout="timeout_snackbar">
      {{ text_snackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { addEvent } from "./APIS/EventApi";
const { v4: uuidv4 } = require("uuid");

export default {
  name: "FormEvent",
  props: {
    sessionIdTable: [],
  },
  data() {
    return {
      valid: true,
      inputRules: [(v) => !!v || "This filed is required"],
      menuStart: false,
      menuEnd: false,
      items: ["Online", "Face to Face"],
      snackbar: false,
      text_snackbar: "Event added successfully",
      timeout_snackbar: 2000,
      event: {
        id: "",
        name: "",
        description: "",
        room: "",
        sessions: [],
        date_deb: "",
        date_fin: "",
        // date_deb: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        //   .toISOString()
        //   .substr(0, 10),
        // date_fin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        //   .toISOString()
        //   .substr(0, 10),
        nb_place: "",
        state: "",
      },
    };
  },
  methods: {
    addingEvent() {
      if (this.$refs.form.validate()) {
        this.event.sessions = this.sessionIdTable;
        if (this.event.state == "Online") {
          this.event.room = uuidv4();
        }
        addEvent(this.event).then((response) => {
          this.event.id = response._id;
          this.snackbar = true;
        });
      }
    },
  },
};
</script>
