import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id_saission_table:[
 
    ]
  },
  getters:{
    allIdSaission:(state)=>state.id_saission_table
  },
  actions: {
    addId({commit}, id){
      commit('newId', id)
    }
  },
  mutations: {
    setId:(state,newId)=>state.id_saission_table.push(newId)
  },

  modules: {
  }
})
