<template>
  <v-footer padless>
    <v-row no-gutters>
      <v-col cols="4" color="#0a363f">
        <v-card dark class="pa-2" outlined tile>
          About us
          <v-spacer></v-spacer>
          We are just a team of devolopers looking for a place when we create a
          state of mind full of dream and creation
        </v-card>
      </v-col>
      <v-col cols="4" color="#0a363f">
        <v-card dark class="pa-2" outlined tile>
          Contact us
          <v-spacer></v-spacer>
          Avenue Quods Radés Madina + 216 99 999 999 isetrades@gmail.com
        </v-card>
      </v-col>
      <v-col cols="4" color="#0a363f">
        <v-card dark class="pa-2" outlined tile> Around the web </v-card>
      </v-col>
      <v-divider></v-divider>
      <v-col>
        <v-card class="pa-2" outlined tile>
          By Dev Mob Team - Iset Radés
          <v-spacer> </v-spacer>
          © All Rights Reserved 2022
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",

  data: () => ({
    alignments: ["start", "center", "end"],
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>