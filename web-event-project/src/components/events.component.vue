<template>
  <v-container>
    <h1>{{ title }}</h1>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="event in events"
        :key="event._id"
      >
        <CardEvents :event="event"></CardEvents>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardEvents from "./cardEvents.component.vue";
import eventApi from "./APIS/EventApi";

import axios from "axios";
console.log("##", eventApi.getEvents());

export default {
  name: "Events",
  data() {
    return {
      events: [],
    };
  },
  components: {
    CardEvents,
  },
  methods: {
    getEvents() {
      this.events = eventApi.getEvents();
    },
  },
  props: {
    title: String,
  },

  mounted() {
    //  this.getEvents();
    axios.get("http://localhost:4000/Api/events/").then((response) => {
      this.events = response.data.EventsList;
    });
  },
};
</script>
