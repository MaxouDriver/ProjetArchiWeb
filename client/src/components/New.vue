
<template>
  <v-card blue darken-2 class="white--text" style="padding: 5vw; min-height: 5vw;">
    <v-layout style="height: 100%;">
      <v-flex lg2 md12 hidden-sm12-and-down>
        <v-img
          :src="imageUrl"
          height="100%"
          style="min-height: 2vw;"
          contain
        ></v-img>
      </v-flex>
      <v-flex lg10 md12 >
        <v-card-title primary-title>
          <div>
            <div class="headline">{{title}}</div>
            <div>{{date + " BY " + source}}</div>
            <div style="padding-top: 2vw;">{{description}}</div>
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'New',
	props:{
		title: String,
		source: String,
		description: String,
		date: String,
		url: String,
		image: String
  },
	data(){
		return {
			show: false
		}
  },
  computed: {
    imageUrl(){
      return this.image != null ? this.image : 'https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/image-not-found.jpg?alt=media&token=7a10f222-5bb3-4b8d-b324-26c3a55a4cfd';
    }
  },
	methods: {
		openLink: function(){
			window.open(this.url, "_blank");
		}
	}  
}
</script>

<style scoped>
  
</style>
