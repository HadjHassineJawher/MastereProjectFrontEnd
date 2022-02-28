export default {
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
};
