<template>
  <div>
  <div class="search__container">
    <v-text-field
      light
      solo
      prepend-icon="search"
      placeholder="Search team"
      style="max-width: 500px; min-width: 128px"
      v-model="title"
      :on:change="getTeams"
    ></v-text-field>
    <ul class="list__result">
      <li v-for="item in items.teams" :key="item.id">
        <router-link :to="{ name: 'SingleTeam', params: { id: item.id } }">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        title: '',
        items: [],
        alert: true,
        error: ''
      }
    },
    computed: {
      getTeams () {
        let title = this.title
        axios.get('https://api.football-data.org/v1/teams?name=' + title, {
          headers: {
            'X-Auth-Token': 'b50e3db6d6db42d18ab7a6d230a0b206'
          }
        }).then((response) => {
          this.items = response.data
          console.log(this.items)
        })
      }
    },
    watch: {
      '$route' () {
        this.title = ''
        this.items = []
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search__container {
    position: relative;
  }
  .list__result {
    position: absolute;
    top: 100%;
    max-height: 200px;
    overflow: auto;
    width: 100%;
    background: #fff;
    list-style: none;
    li {
      a {
        padding: 10px;
        color: #888;
        border-bottom: 1px solid #fafafa;
        text-decoration: none;
        display: block;
        font-size: 13px;
      }
    }
  }
</style>
