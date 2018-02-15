<template>
  <div class="table-for-league">
    <h1>{{ teams.leagueCaption }}</h1>
    <table>
      <thead>
      <tr>
        <td>Club</td>
        <td></td>
        <td>Played</td>
        <td>Won</td>
        <td>Drawn</td>
        <td>Lost</td>
        <td>GF</td>
        <td>GA</td>
        <td>GD</td>
        <td>Points</td>
      </tr>
      </thead>
      <tr v-for="item in teams">
      </tr>
    </table>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['id'],
    data () {
      return {
        teams: []
      }
    },
    computed: {
      league: function () {
        return this.$store.getters.loadLeague(this.id)
      }
    },
    mounted: function () {
      this.getPlayers()
    },
    methods: {
      getPlayers (teamId) {
        axios.get('/464/leagueTable').then((response) => {
          this.teams.push(response.data)
          console.log(response.data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table-for-league {
    table {
      background-color: #fff;
      font-size: 13px;
      border: 1px solid #eee;
      border-spacing: 0;
      td {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
      }
    }
    img {
      height: 30px;
      margin: 0 5px;
      vertical-align: middle;
    }
  }
</style>
