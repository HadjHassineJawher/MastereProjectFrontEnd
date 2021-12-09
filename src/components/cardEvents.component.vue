<template>
  <v-container>
    <v-card height="100%" :to="href">
      <!-- <p>aaa {{ event }}</p> -->
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://www.kuppingercole.com/pics/2018_csls_1000x563px.png"
      >
      </v-img>
      <v-card-subtitle class="pb-0">{{ event.name }} </v-card-subtitle>
      <v-card-text class="text--primary">
        <div>Cyber Security</div>
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-icon color="#119D90"> mdi-video-vintage</v-icon>
          <v-list-item-content>
            <v-list-item-title>Online Event</v-list-item-title>
          </v-list-item-content>
          <v-row align="center" justify="end">
            <v-icon color="#119D90" class="mr-1"> mdi-star-outline </v-icon>
            <v-icon color="#119D90" class="mr-1">
              mdi-account-group-outline
            </v-icon>
            <span class="subtitle-2 mt-5">{{ event.nb_place }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    event: Object,
  },
  data() {
    return {
      href: "/EventDetails/" + this.event._id,
    };
  },
};
</script>