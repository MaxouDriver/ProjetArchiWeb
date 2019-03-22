<template>
  <div id="leafletMap"></div>
</template>
<script>
import DataManager from '../utils/DataManager';
import L from 'leaflet';

export default {
  name: 'Map',
  data (){
    return {
      map: null,
      tileLayer: null,
      layers: [],
      polygons: [],
      err: ""
    }
  },
  mounted() {
    this.initMap();
    this.initLayers();
    this.initZonesTouristiques();
  },
  methods: {
    initMap() {
      this.map = L.map('leafletMap').setView([48.860637, 2.340873], 12);

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
    onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
      }
    },
    initZonesTouristiques(){
      var thisRef = this;
      DataManager.getZonesTouristiques(function(res){
        res.forEach(element => {
          
          var geojsonFeature = {
            "type": "Feature",
            "properties": {
                "popupContent": element.name
            },
            "geometry": {
              "type": "Point",
              "coordinates": element.coordinates
            }
          };

          L.geoJSON(geojsonFeature, {
              onEachFeature: thisRef.onEachFeature
          }).addTo(thisRef.map);
          
        });
      },function(err){
          thisRef.err = err
      });
    }
  }
}
</script>

<style scoped>
  h1{
    margin: 10vw;
  }
  #leafletMap { 
    height: 100%;
  }
</style>
