<template>
  <v-navigation-drawer
    fixed
    clipped
    app
    v-model="drawer"
  >
    <v-list dense>
      <v-list-tile v-for="item in items" :to="'/league/' + item.id" :key="item.id">
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
  </v-navigation-drawer>

</template>
<script>
  // import axios from 'axios'
  export default {
    name: 'sidebar',
    computed: {
      items () {
        return this.$store.state.items
      }
    },
    data () {
      return {
        drawer: null
      }
    },
    mounted: function () {
      this.addNew()
    },
    methods: {
      addNew: function () {
        this.$store.dispatch('getItems')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .list .primary--text {
    color: #7cb342 !important;
  }
</style>
