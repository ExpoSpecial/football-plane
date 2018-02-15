<template>
    <v-list dense>
      <li>
          <v-btn
            :to="{ name: 'Home' }"
            block
            flat
            color="green darken-3"
            class="white--text"
          >
          home
        </v-btn>
      </li>
      <v-list-tile v-for="item in items" :to="{ name: 'SingleLeague', params: { id: item.id } }" :key="item.id">
        <v-list-tile-action>
          <v-icon color='green darken-3'>fiber_manual_record</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.caption }}
          </v-list-tile-title>
        </v-list-tile-content>
        <v-badge left color="green darken-3" text-color='green darken-3'>
          <span slot="badge">{{ item.numberOfTeams }}</span>
        </v-badge>
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
          axios.get('/competitions/' + idLeagues[i]
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
<style>
  .list__tile--active {
    background-color: #e6f0e7;
    color: #2e7d32 !important;
    border-bottom: 1px solid #2e7d32;
  }
  .list__tile:hover {
    background-color: #e6f0e7 !important;
  }
</style>
