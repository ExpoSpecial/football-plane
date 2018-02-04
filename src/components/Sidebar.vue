<template>
    <v-list dense>
      <v-list-tile v-for="item in items" :to="{ name: 'SingleLeague', params: { id: item.id } }" :key="item.id">
        <v-list-tile-action>
          <v-icon>fiber_manual_record</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.caption }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'sidebar',
    data () {
      return {
        drawer: null,
        items: []
      }
    },
    mounted: function () {
      this.addNew()
    },
    methods: {
      addNew: function () {
        let idLeagues = [445, 446, 447, 449, 450, 452, 455, 456]
        for (let i = 0; idLeagues.length >= i; i++) {
          axios.get(
            'https://api.football-data.org/v1/competitions/' + idLeagues[i], {
              headers: {
                'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
              }
            }
          ).then((response) => {
            this.items.push(response.data)
          }, (err) => {
            console.log(err)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list .primary--text {
    color: #7cb342 !important;
  }
</style>
