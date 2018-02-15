<template>
  <v-layout row wrap>
    <v-flex x12>
      <h1>{{ item.name }}</h1>
      <div class="modal-dialog">
        <table>
          <thead>
          <tr>
            <td>Player</td>
            <td></td>
            <td>Position</td>
            <td>Number</td>
            <td>Nationality</td>
            <td>Birthday</td>
          </tr>
          </thead>
          <tr v-for="item in players.players">
            <td><v-icon>perm_identity</v-icon></td>
            <td>{{item.name}}</td>
            <td>{{item.position}}</td>
            <td>{{item.jerseyNumber}}</td>
            <td>{{item.nationality}}</td>
            <td>
              {{item.dateOfBirth}}
            </td>
          </tr>
        </table>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['id'],
    data () {
      return {
        item: [],
        players: [],
        error: ''
      }
    },
    mounted: function () {
      this.getTeam()
      this.getPlayers()
    },
    methods: {
      getTeam () {
        axios.get('/teams/' + this.id).then((response) => {
          this.item = response.data
          this.$store.commit('SET_SITE_TITLE', response.data.name)
        }, (error) => {
          console.log(error.data)
        })
      },
      getPlayers () {
        axios.get('/teams/' + this.id + '/players').then((response) => {
          this.players = response.data
          console.log(this.players)
        }, (error) => {
          console.log(error.data)
        })
      }
    },
    watch: {
      '$route' () {
        this.getTeam()
        this.getPlayers()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modal-dialog {
    table {
      background-color: #fff;
      font-size: 13px;
      border: 1px solid #eee;
      border-spacing: 0;
      width: 100%;
      td {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
      }
      thead {
        font-size: 15px;
        font-weight: bold;
      }
      img {
        height: 30px;
        margin: 0 5px;
        vertical-align: middle;
      }
    }
  }
</style>
