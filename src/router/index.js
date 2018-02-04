import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import SingleLeague from '@/components/SingleLeague'
import SingleTeam from '@/components/SingleTeam'
import LeagueChampions from '@/components/LeagueChampions'
import FixturesMatches from '@/components/FixturesMatches'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/league-:id',
      name: 'SingleLeague',
      props: true,
      component: SingleLeague
    },
    {
      path: '/team-:id',
      name: 'SingleTeam',
      props: true,
      component: SingleTeam
    },
    {
      path: '/champions-league',
      name: 'LeagueChampions',
      component: LeagueChampions
    },
    {
      path: '/fixtures-matches',
      name: 'FixturesMatches',
      component: FixturesMatches
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    }
  ]
})
