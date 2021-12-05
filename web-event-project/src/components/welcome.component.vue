<template>
  <v-app>
    <Carousel/>
    <UpcomingEvent/>
    
  
  </v-app>
</template>
<script>
import Carousel from "./carousel.component.vue";
import UpcomingEvent from "./upcomingevents.component";

export default {
  name: "Welcome",

  components: {
    Carousel,
    UpcomingEvent,
  },
};
</script>

<style scoped>
 
</style>