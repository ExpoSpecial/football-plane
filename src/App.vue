<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <sidebar></sidebar>
    </v-navigation-drawer>
    <v-toolbar
      color="light-green darken-1"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">FIFA World Cup <v-icon>panorama_fish_eye</v-icon></span>
      </v-toolbar-title>

      <search></search>

      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn :to="{ name: 'LeagueChampions' }">Champions League</v-btn>
        <v-btn :to="{ name: 'FixturesMatches' }">Fixtures matches</v-btn>
        <v-btn icon large @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <transition>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </v-layout>
      </v-container>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>© {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import sidebar from './components/sidebar'
  import search from './components/search'
  export default {
    name: 'app',
    components: {
      sidebar,
      search
    },
    data () {
      return {
        alert: true,
        drawer: null
      }
    }
  }
</script>

<style>
  body {
    font-size: 18px;
  }
  .toolbar {
    box-shadow: none !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
