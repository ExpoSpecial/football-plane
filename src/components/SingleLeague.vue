<template>
  <v-layout row wrap>
    <v-flex xs12>
  <div class="table-for-league">
    <h1>{{ league.leagueCaption }}</h1>
    <v-tabs centered>
      <v-tabs-bar dark color="green darken-3">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item href="#table">
          Table
        </v-tabs-item>
        <v-tabs-item @click="getFixtures()" href="#fixtures">
          Fixtures
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          :id="'table'"
        >
          <v-card flat>
            <v-card-text>
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
                <tr v-for="item in league.standing">
                  <td>{{item.position}} <img :src="item.crestURI" alt=""></td>
                  <td>{{item.teamName}}</td>
                  <td>{{item.playedGames}}</td>
                  <td>{{item.wins}}</td>
                  <td>{{item.draws}}</td>
                  <td>{{item.losses}}</td>
                  <td>{{item.goals}}</td>
                  <td>{{item.goalsAgainst}}</td>
                  <td>{{item.goalDifference}}</td>
                  <td>{{item.points}}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :id="'fixtures'"
        >
          <v-card flat>
            <v-card-text>
              <div class="fixtures-container">
                <v-layout row wrap>
                  <v-flex xs2>
                    <v-subheader>Tour:</v-subheader>
                  </v-flex>
                  <v-flex xs2>
                    <v-select
                      v-bind:items="matchdays"
                      v-model="num"
                      label="Select"
                      single-line
                      @change="getFixtures()"
                      bottom
                    ></v-select>
                  </v-flex>
                </v-layout>
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
                  <tr avatar v-for="fixter in fixtures">
                    <td class="data-match">{{ fixter.date }}</td>
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
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
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
        league: [],
        players: [],
        matchdays: [],
        fixtures: [],
        num: null
      }
    },
    mounted: function () {
      return this.getLeague()
    },
    methods: {
      getLeague () {
        axios.get('/competitions/' + this.id + '/leagueTable').then((response) => {
          this.league = response.data
          this.$store.commit('SET_SITE_TITLE', response.data.leagueCaption)
          for (let i = 1; i <= response.data.matchday; i++) {
            this.matchdays.push(i)
          }
          this.num = response.data.matchday
        })
      },
      getFixtures () {
        axios.get('/competitions/' + this.id + '/fixtures').then((response) => {
          this.fixtures = []
          response.data.fixtures.map((e) => {
            if (e.matchday === this.num) {
              this.fixtures.push(e)
            }
          })
        })
      }
    },
    watch: {
      '$route' () {
        this.getLeague()
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
        background: #fafafa;
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
  .list-games {
    font-size: 13px;
    tr {
      td {
        .chip {
          font-size: 16px;
          font-weight: bold;
        }
        padding: 15px;
        border-bottom: 1px solid #ccc;
        &:first-child {
          text-align: right;
        }
      }
    }
  }
  .table-for-league {
    tr:hover {
      background: #fafafa;
      transition: .3s;
    }
  }
  .table-for-league, {
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
    }
    img {
      height: 30px;
      margin: 0 5px;
      vertical-align: middle;
    }
  }
</style>
