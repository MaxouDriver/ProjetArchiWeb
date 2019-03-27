<template>
  <v-parallax src="https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/paris.jpg?alt=media&token=d9084316-4348-4b85-9c66-e0834b7168fe" height="600">
    <v-layout column align-center justify-center class="white--text">
      <h1 class="white--text mb-2 display-1 text-xs-center">{{title}}</h1>
      <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
      <v-btn v-if="!isAuthenticated" class="blue lighten-2 mt-5" dark large v-on:click="connect()">
        {{buttonName}}
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'

export default {
  name: 'Header',
  data () {
      return {
          isAuthenticated: false,
          title: "Tourism at Paris",
          subtitle: "The most efficient way to discover Paris",
          buttonName: "Connection"
      }
  },
  methods: {
    connect () {
      this.$router.push("/login");
    }
  },
  mounted() {
    var thisRef = this;
    this.isAuthenticated = AuthenticationManager.isAuthenticated();
    this.$root.$on('authenticated', () => {
      thisRef.isAuthenticated = true;
    })
    this.$root.$on('notauthenticated', () => {
      thisRef.isAuthenticated = false;
    })
  }
}
</script>

<style scoped>

</style>
