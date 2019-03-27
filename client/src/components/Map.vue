<template>
  <div id="leafletMapContainer">
    <div id="leafletMap"></div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add on planning</span>
          </v-card-title>
          <v-card-text>
            <v-date-picker
              v-model="date"
              full-width
              landscape
              class="mt-3"
            ></v-date-picker>
            <br/>
            <v-select
              v-model="moment"
              :items="items"
              label="Outline style"
              outline
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addToPlanning()">Add on my planning</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'
import L from 'leaflet';
import 'leaflet.markercluster';
import $ from "jquery";


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
      isAuthenticated: false,

      date: new Date().toISOString().substr(0, 10),
      moment: undefined,
      items: ['Morning', 'Afternoon', 'Evening'],


      map: null,
      tileLayer: null,
      lastLayers: [],
      polygons: [],
      err: "",
      zonesTouristiquesLayers: undefined,
      toiletsLayer: undefined,
      dialog: false,
      currentSelectedElementName: "",
      currentSelectedElementType: ""
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

    var thisRef = this;
    this.isAuthenticated = AuthenticationManager.isAuthenticated();
    this.$root.$on('authenticated', () => {
      thisRef.isAuthenticated = true;
    })
    this.$root.$on('notauthenticated', () => {
      thisRef.isAuthenticated = false;
    })
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
    addToPlanning(){
      this.$root.$emit('addToPlanning', this.date, this.moment, this.currentSelectedElementName);
      this.dialog = false;
    },
    showLayer(layer){
      this.map.addLayer(layer)
    },
    hideLayers(layer){
      this.map.removeLayer(layer);
    },
    getGeojsonFeature(id, title, type, isPlannifiable, geometry){
      var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "id" : id,
            "title": title,
            "type": type,
            "plannifiable": isPlannifiable
        },
        "geometry": {
          "type": geometry.type,
          "coordinates": geometry.coordinates
        }
      };
      return geojsonFeature;
    },
    onEachFeature(feature, layer) {
      var thisRef = this;

      var container = $('<div />');

      container.html("<h3>" + feature.properties.title + "</h3><br/><h6>" + feature.properties.type + "</h6><br/>");

      if (feature.properties.plannifiable) {
        var button;
        if (thisRef.isAuthenticated) {
          container.on('click', '.addToPlanning', function() {
              thisRef.currentSelectedElementName = $(this).attr("name");
              thisRef.currentSelectedElementType = $(this).attr("type");
              thisRef.dialog = true;
          });

          button = $("<button name='" + feature.properties.title + "' type='" + feature.properties.type + "' class='addToPlanning'>Click me</button>");
        }else{
          container.on('click', '.connection', function() {
              thisRef.$router.push("/login");
          });

          button = $("<button class='connection'>Connection</button>");
        }
        button.css("background-color", "#4CAF50", "border",  "none", "color", "white", "padding", "15px 32px", "text-align", "center", "text-decoration", "none", "display", "inline-block", "font-size", "16px");
        container.append(button);
      }
      

      // Insert the container into the popup
      layer.bindPopup(container[0]);
    },
    getZonesTouristiquesLayer(){
      if (this.zonesTouristiquesLayers == undefined) {
        var thisRef = this;
        var result = [];

        this.zonesTouristiques.forEach(element => {
          
          var zones = L.geoJSON(thisRef.getGeojsonFeature(element.id, element.name, "Touristism area", true, element.geometry), {
              onEachFeature: thisRef.onEachFeature
          });
          result.push(zones);
        });

        this.zonesTouristiquesLayers = result;
      }

      return this.zonesTouristiquesLayers; 
    },
    getToiletsLayer(){
      var thisRef = this;

      if (this.toiletsLayer == undefined) {
        var markers = L.markerClusterGroup();

        this.toilets.forEach(element => {

            var marker = L.geoJSON(thisRef.getGeojsonFeature(element.id, element.name, "Toilet", false, element.geometry), {
                onEachFeature: thisRef.onEachFeature
            });

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
    z-index: 0;
  }
  #leafletMapContainer{
    height: 100%;
  }
</style>
