import Vue from 'vue'
import Vuex from '../my-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add (state) {
      state.counter++
    }
  },
  getters: {
    doubleCounter (state) {
      return state.counter * 2
    },
    counter (state) {
      return state.counter
    }
  },
  actions: {
    add ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {}
})
