import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

import authStore from './auth.store'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    authStore,
  }
})