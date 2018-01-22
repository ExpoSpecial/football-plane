<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="table-for-league">
        <h1></h1>
                  <table class="list-games">
                    <tr avatar v-for="fixter in fixtures.fixtures">
                      <td>{{ fixter.homeTeamName }}</td>
                      <td><v-chip outline color="secondary">{{ fixter.result.goalsHomeTeam }} : {{ fixter.result.goalsAwayTeam }}</v-chip></td>
                      <td>{{ fixter.awayTeamName }}</td>
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
          console.log(this.fixtures)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
