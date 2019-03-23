
<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img v-if="image != undefined" :src="image" height="200px">
                </v-img>

                <v-card-title primary-title>
                <div>
                    <div class="headline">{{this.title}}</div>
                    <span class="grey--text">{{this.date + this.source}}</span>
                </div>
                </v-card-title>

                <v-card-actions>
                    <v-btn flat>Share</v-btn>
                    <v-btn flat color="purple" @click="openLink()">Explore</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="show = !show">
                        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-slide-y-transition>
                    <v-card-text v-show="show">
                        {{this.description}}
                    </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
  name: 'New',
  props: {
        title: String,
        source: String,
        description: String,
        date: String,
        url: String,
        image: String
    },
  data (){
    return {
        show: false
    }
  },  
    methods:{
      openLink: function () {   

          window.open(this.url, "_blank");    

      }
    }
}
</script>

<style scoped>
  
</style>
