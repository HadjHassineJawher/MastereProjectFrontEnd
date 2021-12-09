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
import { getEvents } from "./APIS/EventApi";

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
    getAllEvents() {
      getEvents().then((response) => {
        this.events = response;
      });
    },
  },
  props: {
    title: String,
  },

  mounted() {
    this.getAllEvents();
  },
};
</script>
