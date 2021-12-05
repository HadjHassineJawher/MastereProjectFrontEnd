<template>
  <v-app>
    <Carousel />
    <Events title="Upcoming Events" />
    <Events title="Open Events" />
    <Events title="All Events" />
  </v-app>
</template>
<script>
import Carousel from "./carousel.component.vue";
import CardEvents from "./cardEvents.component.vue";
import Events from "./events.component.vue";

export default {
  name: "Welcome",
  components: {
    Carousel,
    CardEvents,
    Events,
  },
};
</script>
