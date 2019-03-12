<template>
  <v-parallax src="http://www.medef-idf.fr/wp-content/uploads/2018/10/paris.jpg" height="600">
    <v-layout column align-center justify-center class="white--text">
      <img src="assets/vuetify.png" alt="Vuetify.js" height="200">
      <h1 class="white--text mb-2 display-1 text-xs-center">{{title}}</h1>
      <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
      <v-btn class="blue lighten-2 mt-5" dark large  href="/pre-made-themes">
        {{buttonName}}
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  name: 'Header',
  data () {
      return {
          title: "Tourism at Paris",
          subtitle: "The most efficient way to discover Paris",
          buttonName: "Connection"
      }
  }
}
</script>

<style scoped>

</style>
