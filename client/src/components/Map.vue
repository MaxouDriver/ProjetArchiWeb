<template>
  <div id="leafletMap"></div>
</template>
<script>
import DataManager from '../utils/DataManager';
import L from 'leaflet';
import 'leaflet.markercluster';

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
    this.initToilets();
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

          L.geoJSON(geojsonFeature, {
              onEachFeature: thisRef.onEachFeature
          }).addTo(thisRef.map);
          
        });
      },function(err){
          thisRef.err = err
      });
    },
    initToilets(){
      var thisRef = this;

      DataManager.getToilets(function(res){
        var markers = L.markerClusterGroup();

        res.forEach(element => {

            var title = element.fields.nom_voie;
            var marker = L.marker(new L.LatLng(element.geometry.coordinates[1], element.geometry.coordinates[0]), { title: title});
            marker.bindPopup(title);
            markers.addLayer(marker);

        });

        thisRef.map.addLayer(markers);
        //markers.addTo(thisRef.map);
          
      },function(err){
          alert(err);
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

  .info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
.legend {
    text-align: left;
    line-height: 18px;
    color: #555;
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
.legend .colorcircle {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin-top: 0px;
}
.legend .circlepadding {
    border-radius: 50%;
    margin-top: 0px;
    background: rgba(255, 255, 255, 0.8);
}
</style>
