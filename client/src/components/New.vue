
<template>
<div class="container">
  <div class="card-media">
    <!-- media container -->
    <div class="card-media-object-container">
      <div class="card-media-object" :style="'background-image: url(' + imageUrl + ');'"></div>
    </div>
    <!-- body container -->
    <div class="card-media-body">
      <div class="card-media-body-top">
        <span class="subtle">{{date + " BY " + source}}</span>
      </div>
      <p class="card-media-body-heading" style="overflow: hidden;">{{title}}</p>
      <div class="card-media-body-supporting-bottom">
        <span class="card-media-body-supporting-bottom-text subtle">{{description}}</span>
      </div>
    </div>
  </div>
</div>
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
  html {
    background-color: #fefefe;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .container {
    margin: 50px auto 0;
    width: 80%;
  }

  .subtle {
    color: #888;
    font-size: 12px;
  }

  .card-media {
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
    height: 125px;
    margin-bottom: 25px;
    transition: all 300ms ease-out;
    width: 100%;
  }

  .card-media:hover {
    box-shadow: 0 5px 14px rgba(0, 0, 0, .2);
  }

  .card-media-object-container {
    background: none;
    float: left;
    height: 100%;
    width: 35%;
    position: relative;
  }

  .card-media-object {
    background-position: center center;
    background-size: cover;
    height: 100%;
  }

  .card-media-object-tag {
    background-color: #fff;
    border-radius: 2px;
    padding: 2px 7px;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .card-media-body {
    background-color: #fff;
    float: left;
    height: 100%;
    padding: 12px 15px;
    position: relative;
    width: 65%;
  }

  .card-media-body-top {
    display: block;
  }

  .card-media-body-heading {
    display: block;
    margin-top: 10px;
  }
</style>
