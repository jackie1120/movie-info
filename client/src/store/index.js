import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    user: Object,
    isUserLogin: false,
    loadingService: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLogin = true
      } else {
        state.isUserLogin = false
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
  },
  plugins: [createPersistedState({
    paths: ['token', 'user', 'isUserLogin']
  })]
})

export default store
