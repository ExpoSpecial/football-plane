<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="fixtures-container">
        <h1>Fixtures matches</h1>
        <table class="list-games">
          <thead dark color="green darken-3">
          <tr>
            <td>Data</td>
            <td>Tour</td>
            <td>Home team</td>
            <td>Score</td>
            <td>Away team</td>
            <td>Status</td>
          </tr>
          </thead>
          <tbody>
            <tr avatar v-for="fixter in fixtures.fixtures">
              <td class="data-match">{{ Date.parse(fixter.date) }}</td>
              <td class="tour-number">{{ fixter.matchday }}</td>
              <td class="home-team">{{ fixter.homeTeamName }}</td>
              <td class="score-match">{{ fixter.result.goalsHomeTeam }} : {{ fixter.result.goalsAwayTeam }}</td>
              <td class="away-team">{{ fixter.awayTeamName }}</td>
              <td v-if="fixter.status === 'IN_PLAY'" class="status-play">{{ fixter.status }}</td>
              <td v-if="fixter.status === 'FINISHED'" class="status-finish">{{ fixter.status }}</td>
              <td v-if="fixter.status === 'TIMED'" class="status-timed">{{ fixter.status }}</td>
            </tr>
          </tbody>
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
        siteTitle: '',
        matchday: 0,
        count: 0,
        fixtures: []
      }
    },
    mounted: function () {
      this.getFixtures()
    },
    methods: {
      getFixtures () {
        axios.get('https://api.football-data.org/v1/fixtures', {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }).then((response) => {
          this.fixtures = response.data
          this.$store.commit('SET_SITE_TITLE', 'Fixtures matches')
          console.log(response.data)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fixtures-container {
    font-size: 13px;
    padding: 15px;
    table {
      background: #fff;
      border-spacing: 0;
      border: 1px solid #eee;
      width: 100%;
      thead {
        font-size: 18px;
        text-transform: uppercase;
        background: #2e7d32;
        color: #fff;
        td {
          border: none !important;
        }
      }
      td {
        padding: 20px 25px;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
        &:last-child {
          border: 0;
          border-bottom: 1px solid #fff;
          text-align: center;
        }
      }
    }

    .status-play {
      background-color: #ff9800;
    }
    .status-finish {
      background-color: #4caf50;
    }
    .status-timed {
      background-color: #f44336;
    }
    .score-match {
      text-align: center;
      font-size: 18px !important;
    }
    .home-team, .away-team {
      background-color: #fafafa;
      font-size: 15px;
    }
    .home-team {
      text-align: right;
    }
    .data-match {
      color: #888;
      font-style: italic;
      font-weight: bold;
    }
    .tour-number {
      text-align: center;
      font-weight: bold;
      color: #888;
    }
  }
</style>
