import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authStore from './auth.store'

export default new Vuex.Store({
  modules: {
    authStore,
  }
})