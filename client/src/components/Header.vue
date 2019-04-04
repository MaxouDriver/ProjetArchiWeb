<template>
 <v-parallax :src="url" height="600">
    <v-layout column align-center justify-center :class="color">
      <h1 class="mb-2 display-1 text-xs-center">{{title}}</h1>
      <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
      <v-btn v-if="!isAuthenticated" class="blue lighten-2 mt-5" dark large v-on:click="connect()">
        {{buttonName}}
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'
import DataManager from '../utils/DataManager.js'
import TimeManager from '../utils/TimeManager.js';

export default {
  name: 'Header',
  data () {
      return {
          isAuthenticated: false,
          title: "Tourism at Paris",
          subtitle: "The most efficient way to discover Paris",
          buttonName: "Connection",
          
          
          url: "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_jour.jpg?alt=media&token=16979a45-9524-45b8-b807-d24274916549",
          color: undefined
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
    DataManager.getWeatherCurrent(
      function(data){
        thisRef.time=data.time;
      }, function(){

      }
    );


    switch(TimeManager.getCurrentMoment()){
      case TimeManager.moment.MORNING:
        this.url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_Matin.jpg?alt=media&token=ecf6fb08-b378-488a-a743-125e18603550";
        this.color = "black--text";
      break;

      case TimeManager.moment.AFTERNOON:
        this.url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_jour.jpg?alt=media&token=16979a45-9524-45b8-b807-d24274916549";
        this.color = "black--text";
      break;

      case TimeManager.moment.EVENING:
        this.url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_soir.jpg?alt=media&token=cce52d3a-9f39-475c-859a-de3a3dc91e77";
        this.color = "white--text";
      break;

      case TimeManager.moment.NIGHT:
        this.url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_nuit2.jpg?alt=media&token=9ffe94fc-115b-4686-9f55-e87e45a1d056"
        this.color = "white--text";
      break;

    }
  }
}
</script>

<style scoped>

</style>
