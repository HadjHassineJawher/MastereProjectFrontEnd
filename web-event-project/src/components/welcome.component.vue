<template>
  <v-app>
    <carousel></carousel>
    <upcomingEvent></upcomingEvent>
  </v-app>
</template>
<script>
import carousel from "./carousel.component.vue";
import upcomingEvent from "./upcomingevents.component";

export default {
  name: "Welcome",

  components: {
    carousel,
    upcomingEvent,
  },
};
</script>
