import { Login, SingleUser } from "../components/APIS/AuthApi";
export default {
  state: {
    currentUser: {},
    user: {},
  },

  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setCurrentUser(state, output) {
      state.currentUser = output;
    },
    setUser(state, output) {
      state.user = output;
    },
  },
  actions: {
    async getCurrentUserConnect(context) {
      let usr = await SingleUser(localStorage.ID);
      context.commit("setUser", usr);
      return usr;
    },
    async loginAction(context, user) {
      let usr = await Login(user);
      context.commit("setCurrentUser", usr.data.SecretInfo);
      return usr.data.SecretInfo;
    },

    async logout(context) {
      context.commit("setCurrentUser", {});
      return localStorage.clear();
    },
  },
};
