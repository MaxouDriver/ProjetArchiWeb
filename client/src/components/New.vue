
<template>
    <v-layout row>
        <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
                <v-layout>
                    <v-flex xs5>
                        <v-img v-if="image != undefined" :src="image" height="7vw" contain></v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{this.title}}</div>
                            <div>{{this.date + this.source}}</div>
                            <div>{{this.description}}</div>
                        </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
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
  #container{
      height: 7vw;
  }
</style>