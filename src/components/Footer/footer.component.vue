<template>
  <v-footer padless>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card
          height="100%"
          color="rgba(10, 54, 63, 1)"
          dark
          class="pa-2 text-center"
          outlined
          tile
        >
          About us
          <v-spacer></v-spacer>
          We are just a team of devolopers looking for a place when we create a
          state of mind full of dream and creation
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card
          height="100%"
          color="rgba(10, 54, 63, 1)"
          dark
          class="pa-2 text-center"
          outlined
          tile
        >
          Contact us
          <v-spacer></v-spacer>
          Avenue Quods Radés Madina + 216 99 999 999 isetrades@gmail.com
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-card
          height="100%"
          style="background-color: rgba(10, 54, 63, 1)"
          dark
          class="pa-2 text-center"
          outlined
          tile
        >
          Around the web
          <v-spacer />
          <v-icon>mdi-facebook</v-icon>
          <v-icon>mdi-linkedin</v-icon>
          <v-icon>mdi-gmail</v-icon>
        </v-card>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" sm="6" md="12" lg="12">
        <v-card
          class="pa-2 text-center"
          outlined
          tile
          dark
          style="background-color: rgba(10, 54, 63, 0.91)"
        >
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