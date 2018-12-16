import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, account){
      state.user = account;//将传参设置给state的city
    }
  },
  actions: {
    setUser({ commit }, account){
      commit("setUser", account);
    }
  },
  getters: {
    getUser(state){
      return state.user;
    }
  }
})
