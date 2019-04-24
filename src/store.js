import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    active:0,
    recruitScrollY:0
  },
  mutations: {
    setUser(state, account){
      state.user = account;//将传参设置给state的city
    },
    setActive(state,n){
      state.active = n;
    },
    changeRecruitScrollY(state,recruitScrollY) { 
      state.recruitScrollY = recruitScrollY
    }
  },
  actions: {
    setUser({ commit }, account){
      commit("setUser", account);
    },
    setActive({ commit }, n){
      commit("setActive", n);
    }
  },
  getters: {
    getUser(state){
      return state.user;
    },
    getActive(state){
      return state.active;
    },
    recruitScrollY:state => state.recruitScrollY
  }
})
