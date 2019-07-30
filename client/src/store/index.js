import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: null,
    isUserLogin: false,
    loadingService: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLogin = true
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setLoadingService (state, service) {
      state.loadingService = service
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setLoadingService ({ commit }, service) {
      commit('setLoadingService', service)
    }
  }
})

export default store
