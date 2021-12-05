<template>
  <v-container>
    <h1>{{ title }}</h1>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="i in 3" :key="i">
        <cardEvents></cardEvents>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardEvents from "./cardEvents.component.vue";
export default {
  name: "Events",
  components: {
    CardEvents,
  },
  props: {
    title: String,
  },
};
</script>
