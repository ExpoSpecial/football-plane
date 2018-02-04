<template>
  <div class="main-content">
    <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <v-radio-group v-model="priory" :on:change="getNews" row>
              <v-radio label="bbc sport"
                color="success"
                value="sources=bbc-sport"
                ></v-radio>
              <v-radio label="football italia"
                color="success"
                value="sources=football-italia"></v-radio>
              <v-radio label="British news"
                color="success"
                value="country=gb&category=sports"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="(article, index) in news" class="item-news" :key="index">
        <v-card>
          <v-card-media :src="article.urlToImage" height="250px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0" v-html="article.title"></h3>
              <div v-html="article.description"></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green" :href="article.url" target="_blank">more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        news: [],
        priory: 'sources=bbc-sport'
      }
    },
    computed: {
      getNews () {
        axios.get('https://newsapi.org/v2/top-headlines?' + this.priory + '&apiKey=6106016e84014c3c9f86d4fe5bf6bef3')
          .then((response) => {
            this.news = response.data.articles
            console.log(this.news)
            this.$store.commit('SET_SITE_TITLE', 'Home football plan')
          }
          )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main-content {
    padding: 30px 0;
    h1 {
      margin-bottom: 20px;
    }
  }
  .item-news {
    padding: 15px;
  }
</style>
