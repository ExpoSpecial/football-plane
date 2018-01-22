<template>
  <v-layout row wrap>
    <v-flex xs12 sm4 offset-sm4>
      <v-card color="white">
        <div class="login">
          <h3>Регистрация</h3>
          <div class="errore">{{ mesDesc }}</div>
          <input type="email" v-model="email" placeholder="Email">
          <input type="password" v-model="password" placeholder="Пароль">
          <v-btn @click="signUp">Регистрация</v-btn>
          <p>Есть аккаунт? <router-link to="/login">Ввойти</router-link></p>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import firebase from 'firebase'
  export default {
    name: 'signUp',
    data: function () {
      return {
        email: '',
        password: '',
        mesDesc: ''
      }
    },
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (succes) => {
            this.mesDesc = 'Добро пожаловать!:)'
            setTimeout(() => {
              this.$router.replace('/')
            }, 2000)
          },
          (err) => {
            this.mesDesc = err.message
          }
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .login {
    margin: 40px auto;
    padding: 30px;
    .errore {
      color: red;
      padding: 15px 0;
    }
    h3 {
      font-size: 24px;
    }
    input {
      border: 1px solid #f48fb1;
      margin: 10px 0;
      width: 100%;
      padding: 10px;
      font-size: 18px;
    }
    button {
      background-color: #d81b60;
      color: #fff;
    }
  }

  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
