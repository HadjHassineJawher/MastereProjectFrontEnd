export default {
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        }
    }
}