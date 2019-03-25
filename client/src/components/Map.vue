<template>
  <div id="leafletMap"></div>
</template>
<script>
import L from 'leaflet';
import 'leaflet.markercluster';

export default {
  name: 'Map',
  props: {
    selectedFilters: Array, 
    zonesTouristiques: Array, 
    toilets: Array
  },
  watch: {
    selectedFilters() {
      this.updateLayers.bind(this);
      this.updateLayers();
    }
  },
  data (){
    return {
      map: null,
      tileLayer: null,
      lastLayers: [],
      polygons: [],
      err: "",
      zonesTouristiquesLayers: undefined,
      toiletsLayer: undefined
    }
  },
  computed: {
    layers: function(){
      var result = [];
      var thisRef = this;

      this.selectedFilters.forEach(function(activity){
        if (activity.name == "Touristiques area") {
          thisRef.getZonesTouristiquesLayer().forEach(function(e){
            result.push(e);
          });
        }

        if (activity.name == "Toilets") {
          result.push(thisRef.getToiletsLayer());
        }
      });

      return result;
    }
  },
  mounted() {
    this.initMap();
    this.initLayers();
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
    initLayers() {
      var thisRef = this;
      this.layers.forEach(function(layer){
        thisRef.showLayer(layer);
      });
    },
    updateLayers(){
      var thisRef = this;

      //Loop through every layer and check if some of them are new compared as before.
      this.layers.forEach(function(layer){
        if (!thisRef.lastLayers.includes(layer)) {
          thisRef.showLayer(layer);
        }
      });
      //Loop through every layers of the last state and check if some of them are missing compared to the current state.
      this.lastLayers.forEach(function(layer){
        if (!thisRef.layers.includes(layer)) {
          thisRef.hideLayers(layer);
        }
      });

      this.lastLayers = this.layers;
    },
    showLayer(layer){
      this.map.addLayer(layer)
    },
    hideLayers(layer){
      this.map.removeLayer(layer);
    },
    onEachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
      }
    },
    getZonesTouristiquesLayer(){
      if (this.zonesTouristiquesLayers == undefined) {
        var thisRef = this;
        var result = [];

        this.zonesTouristiques.forEach(element => {

          var geojsonFeature = {
            "type": "Feature",
            "properties": {
                "popupContent": element.name,
                "marker-color": "#f31c1c",
                "marker-size": "medium",
                "marker-symbol": ""
            },
            "geometry": {
              "type": "Point",
              "coordinates": element.coordinates
            }
          };
          var zones = L.geoJSON(geojsonFeature, {
              onEachFeature: thisRef.onEachFeature
          });
          result.push(zones);
        });

        this.zonesTouristiquesLayers = result;
      }

      return this.zonesTouristiquesLayers; 
    },
    getToiletsLayer(){
      if (this.toiletsLayer == undefined) {
        var markers = L.markerClusterGroup();

        this.toilets.forEach(element => {

            var title = element.fields.nom_voie;
            var marker = L.marker(new L.LatLng(element.geometry.coordinates[1], element.geometry.coordinates[0]), { title: title});
            marker.bindPopup(title);
            markers.addLayer(marker);

        });
        this.toilersLayer = markers;
      }
      
      return this.toilersLayer;
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
