<!--
<template>
    <script type="text/java">
      String currentTime = time;
      if("currentTime == '6:00'" || "currentTime == '7:00'" || "currentTime == '8:00'" || "currentTime == '9:00'" || "currentTime == '10:00'" || "currentTime == '11:00'"){
        String url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_Matin.jpg?alt=media&token=ecf6fb08-b378-488a-a743-125e18603550";
        String color1 = "black--text";
        String color2 = "black--text mb-2 display-1 text-xs-center";
      } else if("currentTime == '12:00'" || "currentTime == '13:00'" || "currentTime == '14:00'" || "currentTime == '15:00'" || "currentTime == '16:00'" || "currentTime == '17:00'"){
        String url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_jour.jpg?alt=media&token=16979a45-9524-45b8-b807-d24274916549";
        String color1 = "black--text";
        string color2 = "black--text mb-2 display-1 text-xs-center";
      } else if("currentTime == '18:00'" || "currentTime == '19:00'" || "currentTime == '20:00'" || "currentTime == '21:00'" || "currentTime == '22:00'" || "currentTime == '23:00'"){
        String url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_soir.jpg?alt=media&token=cce52d3a-9f39-475c-859a-de3a3dc91e77";
        String color1 = "white--text";
        String color2 = "white--text mb-2 display-1 text-xs-center";
      } else {
        String url = "https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_nuit2.jpg?alt=media&token=9ffe94fc-115b-4686-9f55-e87e45a1d056"
        String color1 = "white--text";
        String color2 = "white--text mb-2 display-1 text-xs-center";
      }
    </script>
    <v-parallax src=url height="600">
      <v-layout column align-center justify-center class=color1>
        <h1 class=color2>{{title}}</h1>
        <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
        <v-btn v-if="!isAuthenticated" class="blue lighten-2 mt-5" dark large v-on:click="connect()">
          {{buttonName}}
        </v-btn>
      </v-layout>
    </v-parallax>
</template>
-->

<template v-if="time == '16:00'">
  <v-parallax src="https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_Matin.jpg?alt=media&token=ecf6fb08-b378-488a-a743-125e18603550" height="600">
    <v-layout column align-center justify-center class="black--text">
      <h1 class="black--text mb-2 display-1 text-xs-center">{{title}}</h1>
      <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
      <v-btn v-if="!isAuthenticated" class="blue lighten-2 mt-5" dark large v-on:click="connect()">
        {{buttonName}}
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<template v-else>
  <v-parallax src="https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Paris_nuit2.jpg?alt=media&token=9ffe94fc-115b-4686-9f55-e87e45a1d056" height="600">
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
import DataManager from '../utils/DataManager.js'

export default {
  name: 'Header',
  data () {
      return {
          isAuthenticated: false,
          title: "Tourism at Paris",
          subtitle: "The most efficient way to discover Paris",
          buttonName: "Connection",
          time: undefined
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
    DataManager.getWeatherCurrent(function(data){
      thisRef.time=data.time;
    }, function(){

    })
  }
}
</script>

<style scoped>

</style>
