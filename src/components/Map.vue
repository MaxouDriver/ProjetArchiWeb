<template>
 <div id="map" class="map"></div>
</template>

<script>
export default {
  name: 'Map',
  data: {
    map: null,
    tileLayer: null,
    layers: [],
  },
  mounted() {
    this.initMap();
    this.initLayers();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([48.860637, 2.340873], 12);

      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.tileLayer.addTo(this.map);
    },
    initLayers() {},
  }
}
</script>

<style scoped>
  h1{
    margin: 10vw;
  }
  .map { 
    height: 600px; 
    margin-right: 17vw;
    margin-left: 17vw;
  }
</style>
