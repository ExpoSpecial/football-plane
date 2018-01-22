import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: []
  },
  actions: {
    getItems ({ commit }) {
      axios.get(
        'https://api.football-data.org/v1/competitions', {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }
      ).then((response) => {
        commit('SET_PROJECT_LIST', response.data)
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_PROJECT_LIST (state, list) {
      list.map(function (item) {
        state.items.push(item)
        axios.get(
          'https://api.football-data.org/v1/competitions/' + item.id + '/leagueTable', {
            headers: {
              'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
            }
          }
        ).then((response) => {
          item.teams = []
          item.teams = response.data
        }, (err) => {
          console.log(err)
        })
      })
    }
  },
  getters: {
    loadItems (state) {
      return state.items
    },
    loadLeague (state) {
      return (meetsId) => {
        return state.items.find((meetid) => {
          return meetid.id === parseInt(meetsId)
        })
      }
    }
  }
})
