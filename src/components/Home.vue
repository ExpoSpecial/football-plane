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
        axios.get('/fixtures').then((response) => {
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

<!--<template>-->
<!--<div class="main-content">-->
<!--<v-layout row wrap>-->
<!--<v-flex xs12 sm6 md6>-->
<!--<v-radio-group v-model="priory" :on:change="getNews" row>-->
<!--<v-radio label="bbc sport"-->
<!--color="success"-->
<!--value="sources=bbc-sport"-->
<!--&gt;</v-radio>-->
<!--<v-radio label="football italia"-->
<!--color="success"-->
<!--value="sources=football-italia"></v-radio>-->
<!--<v-radio label="British news"-->
<!--color="success"-->
<!--value="country=gb&category=sports"></v-radio>-->
<!--</v-radio-group>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--<v-layout row wrap>-->
<!--<v-flex xs12 sm6 v-for="(article, index) in news" class="item-news" :key="index">-->
<!--<v-card>-->
<!--<v-card-media :src="article.urlToImage" height="250px">-->
<!--</v-card-media>-->
<!--<v-card-title primary-title>-->
<!--<div>-->
<!--<h3 class="headline mb-0" v-html="article.title"></h3>-->
<!--<div v-html="article.description"></div>-->
<!--</div>-->
<!--</v-card-title>-->
<!--<v-card-actions>-->
<!--<v-btn flat color="green" :href="article.url" target="_blank">more</v-btn>-->
<!--</v-card-actions>-->
<!--</v-card>-->
<!--</v-flex>-->
<!--</v-layout>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import axios from 'axios'-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--news: [],-->
        <!--priory: 'sources=bbc-sport'-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--getNews () {-->
        <!--axios.get('https://newsapi.org/v2/top-headlines?' + this.priory + '&apiKey=6106016e84014c3c9f86d4fe5bf6bef3', {-->
          <!--headers: {-->
            <!--'X-Auth-Token': '6106016e84014c3c9f86d4fe5bf6bef3'-->
          <!--}-->
        <!--})-->
          <!--.then((response) => {-->
            <!--this.news = response.data.articles-->
            <!--console.log(this.news)-->
            <!--this.$store.commit('SET_SITE_TITLE', 'Home football plan')-->
          <!--}-->
          <!--)-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style lang="scss" scoped>-->
  <!--.main-content {-->
    <!--padding: 30px 0;-->
    <!--h1 {-->
      <!--margin-bottom: 20px;-->
    <!--}-->
  <!--}-->
  <!--.item-news {-->
    <!--padding: 15px;-->
  <!--}-->
<!--</style>-->
