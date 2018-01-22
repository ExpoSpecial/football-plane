<template>
  <v-layout row wrap>
    <v-flex xs12>
  <div class="table-for-league">
    <h1>{{ league.teams.leagueCaption }}</h1>
    <v-tabs fixed icons centered>
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
                  <td></td>
                </tr>
                </thead>
                <tr v-for="item in league.teams.standing">
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
                  <td><v-btn fab dark small color="green darken-3" @click.stop="dialog2 = !dialog2" @click="getPlayers(item._links.team.href + '/players')">
                    <v-icon>more_horiz</v-icon>
                  </v-btn></td>
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
              <table class="list-games">
                <tr avatar v-for="fixter in fixtures.fixtures">
                  <td>{{ fixter.homeTeamName }}</td>
                  <td><v-chip outline color="secondary">{{ fixter.result.goalsHomeTeam }} : {{ fixter.result.goalsAwayTeam }}</v-chip></td>
                  <td>{{ fixter.awayTeamName }}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <v-dialog v-model="dialog2" max-width="900px">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text class="modal-dialog">
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
        </v-card-text>
        <v-card-actions>
          <v-btn outline color="light-green darken-1" flat @click.stop="dialog2=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        dialog: false,
        dialog2: false,
        players: [],
        fixtures: []
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
        axios.get(teamId, {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }).then((response) => {
          this.players = response.data
          console.log(this.players)
        })
      },
      getFixtures () {
        axios.get('https://api.football-data.org/v1/competitions/' + this.$route.params.id + '/fixtures', {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }).then((response) => {
          this.fixtures = response.data
          console.log(this.fixtures)
        })
      },
      getTeamInfo () {
        axios.get('https://api.football-data.org/v1/competitions/' + this.$route.params.id + '/teams', {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }).then((response) => {
          this.team = response.data
          console.log(this.team)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
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
  .modal-dialog {
    background: #fafafa;
    table {
      width: 100%;
    }
  }
  .table-for-league {
    tr:hover {
      background: #fafafa;
      transition: .3s;
    }
  }
  .table-for-league,.modal-dialog {
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
