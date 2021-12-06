<template>
  <v-app>
    <Carousel />
    <Events title="Upcoming Events" />
    <!-- <Events title="Open Events" />
    <Events title="All Events" /> -->
  </v-app>
</template>
<script>
import Carousel from "./carousel.component.vue";
import CardEvents from "./cardEvents.component.vue";
import Events from "./events.component.vue";
import eventApi from "./APIS/EventApi";

console.log("eventApi.getEvents()", eventApi.getEvents());
export default {
  name: "Welcome",
  data() {
    return {
      listEvents: [],
    };
  },
  // created() {
  //   this.getAllEvents();
  // },
  // methods: {
  //   getAllEvents() {
  //     eventApi.getEvents().then((res) => {
  //       this.listEvents = res;
  //       //console.log("@@@", this.listEvents);
  //       // this.listEvents = res;
  //       // response.data.EventsList
  //     });
  //   },
  // },
  components: {
    Carousel,
    CardEvents,
    Events,
  },
};
</script>