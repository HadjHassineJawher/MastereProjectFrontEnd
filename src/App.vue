<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>MPDAM Event</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
    </v-navigation-drawer>
    <v-main class="containerBox">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../src/components/Footer/footer.component.vue";
export default {
  data: () => ({ drawer: null }),
  components: {
    Footer,
  },
  //***STILL ERROR IN HIDING NAV FROM THE LOGIN PAGE */
  // mounted() {
  //   console.log("##", this.route.meta.hideNavigation);
  // },
};
</script>

<style scoped>
</style>