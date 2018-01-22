// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuetify from 'vuetify'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'

Vue.use(VueAxios, Axios)
Vue.use(Vuetify)
import('../node_modules/vuetify/dist/vuetify.min.css')
Vue.config.productionTip = false
window.axios.defaults.headers.common = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
let app
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyD0x6tNZkdvGqLpcbeWU769AHbBfEGBV9U',
  authDomain: 'vue-plane.firebaseapp.com',
  databaseURL: 'https://vue-plane.firebaseio.com',
  projectId: 'vue-plane',
  storageBucket: 'vue-plane.appspot.com',
  messagingSenderId: '633984702698'
}
firebase.initializeApp(config)
/* eslint-disable no-new */
//  router.beforeEach((to, from, next) => {
//  let currentUser = firebase.auth().currentUser
//  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//  if (requiresAuth && !currentUser) next('Login')
//  else if (!requiresAuth && currentUser) next('hello')
//  else next()
//  })
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  }
})
