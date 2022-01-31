<template>
  <v-app>
    <v-app-bar v-if="!$route.meta.hideNavigation" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>MPDAM Event</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        class="mr-2"
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        rounded
        hide-details
        solo
        background-color="#ecebeb"
      ></v-text-field>
      <v-avatar color="brown" size="50">
        <span class="white--text text-h5"
          >{{ nameAvatar(currentUser.FirstName) }}
          {{ nameAvatar(currentUser.LastName) }}</span
        >
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <template v-slot:prepend>
        <v-list-item two-line class="pa-2">
          <v-avatar color="brown" size="48" class="mr-2">
            <span class="white--text text-h5"
              >{{ nameAvatar(currentUser.FirstName) }}
              {{ nameAvatar(currentUser.LastName) }}</span
            >
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title
              >{{ currentUser.FirstName }}
              {{ currentUser.LastName }}</v-list-item-title
            >
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/AddEvent">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Create event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/AddEvent">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main class="containerBox">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../src/components/Footer/footer.component.vue";
import userMixin from "./mixins/user.mixin";

export default {
  mixins: [userMixin],
  data() {
    return {
      search: "",
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
      ],
      drawer: null,
    };
  },

  components: {
    Footer,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then((data) => {
        this.$router.push({
          path: "/login",
          append: true,
        });
      });
    },

    nameAvatar(currentUserData) {
      if (currentUserData) {
        let s = currentUserData.charAt(0);
        return s.toUpperCase();
      }
    },
  },
};
</script>

<style scoped>
v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  width: 300px;
  text-align: right;
}
</style>