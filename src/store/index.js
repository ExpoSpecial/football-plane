import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    siteTitle: '',
    messageAlert: ''
  },
  actions: {},
  mutations: {
    SET_SITE_TITLE (state, value) {
      state.siteTitle = value
      document.title = state.siteTitle
    },
    SET_MESSAGE_ALERT (state, value) {
      state.messageAlert = value
    }
  },
  getters: {}
})
