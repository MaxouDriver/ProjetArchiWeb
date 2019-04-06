<template>
  <div id="leafletMapContainer">
    <div id="leafletMap"></div>
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
  </div>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'
import DataManager from '../utils/DataManager.js'
import L from 'leaflet';
import 'leaflet.markercluster';
import $ from "jquery";

export default {
  name: 'Map',
  props: {
    selectedFilters: Array, 
    zonesTouristiques: Array, 
    toilets: Array,
    museums: Array,
    frenchTraditionalRestaurant: Array,
    satFastFood: Array,
    standingFastFood: Array,
    barAndCoffee: Array,
    tea: Array,
    artGallery: Array,
    localProduct: Array,
    souvenirShop: Array
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
      items: ['Morning', 'Afternoon', 'Evening', 'Night'],


      map: null,
      tileLayer: null,
      lastLayers: [],
      polygons: [],
      err: "",
      zonesTouristiquesLayers: undefined,
      toiletsLayer: undefined,
      museumsLayer: undefined,
      frenchTraditionalRestaurantLayer: undefined,
      satFastFoodLayer: undefined,
      standingFastFoodLayer: undefined,
      barCoffeeLayer: undefined,
      teaLayer: undefined,
      artGalleryLayer: undefined,
      localProductLayer: undefined,
      souvenirLayer: undefined,


      dialog: false,
      currentSelectedElementName: "",
      currentSelectedElementType: ""
    }
  },
  computed: {
    layers: function(){
      var result = [];
      var thisRef = this;

      var shopCat = false;
      var restaurantCat = false;
      var fastFoodCat = false;
      var beverageCat = false;

      this.selectedFilters.forEach(function(activity){
            shopCat = false;
            restaurantCat = false;
            fastFoodCat = false;
            beverageCat = false;

            switch(activity.name){

              case "Touristiques area":
                thisRef.getZonesTouristiquesLayer().forEach(function(e){
                  result.push(e);
                });
                break;

              case "Museums":
                result.push(thisRef.getMuseumsLayer());
                break;

              case "Toilets":
                result.push(thisRef.getToiletsLayer());
                break;

              case "Shops":
                shopCat = true;
                restaurantCat = true;
                fastFoodCat = true;
                beverageCat = true;
                /* falls through */
              case "Restaurant":
                restaurantCat = true;
                /* falls through */
              case "French Traditional":
                result.push(thisRef.getFrenchTraditionalRestaurantLayer());
                if (restaurantCat != true){
                  break;
                }
                /* falls through */
              case "Fast Food":
                fastFoodCat = true;
                break;
              case "Sat":
                result.push(thisRef.getSatFastFoodLayer());
                if (fastFoodCat != true){
                  break;
                }
                break;
                /* falls through */
              case "Standing":
                result.push(thisRef.getStandingFastFoodLayer());
                if (restaurantCat != true){
                  break;
                }
                /* falls through */
              case "Beverage":
                beverageCat = true;
                break;
              case "Bar/Coffee":
                result.push(thisRef.getBarCoffeeLayer());
                if (beverageCat != true){
                  break;
                }
                /* falls through */
              case "Tea":
                result.push(thisRef.getTeaLayer());
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Art Gallery":
                result.push(thisRef.getArtGalleryLayer());
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Local Product":
                result.push(thisRef.getLocalProductLayer());
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Souvenir":
                result.push(thisRef.getSouvenirLayer());
                
                break;
                
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
      DataManager.saveOnPlanning(
        {
          user: AuthenticationManager.getUserId(),
          name: this.currentSelectedElementName, 
          type: "zoneTouristique", 
          time: "9:00",
          date: this.date, 
          moment: this.moment
        },
        function(){
          alert("success");
        },
        function(err){
          alert(err);
        }
      );
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
    getMarkers(type, color, data, isPlannifiable){
      var markers = L.markerClusterGroup();
      var thisRef = this;

      data.forEach(element => {

        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        var marker = L.geoJSON(thisRef.getGeojsonFeature(element.id, element.name, type, isPlannifiable, element.geometry), {
            onEachFeature: thisRef.onEachFeature,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        });

        markers.addLayer(marker);

      });
      return markers;
    },
    getToiletsLayer(){
      if (this.toiletsLayer == undefined) {
        this.toilersLayer = this.getMarkers("Toilets", "#00FF00", this.toilets, false);
      }
      
      return this.toilersLayer;
    },
    getMuseumsLayer(){
      if (this.museumsLayer == undefined) {
        this.museumsLayer = this.getMarkers("Museums", "#00FF00", this.museums, true);
      }
      
      return this.museumsLayer;
    },
    getFrenchTraditionalRestaurantLayer(){
      if (this.frenchTraditionalRestaurantLayer == undefined) {
        this.frenchTraditionalRestaurantLayer = this.getMarkers("FrenchTraditionalRestaurant", "#00FF00", this.frenchTraditionalRestaurant, true);
      }
      
      return this.frenchTraditionalRestaurantLayer;
    },
    getSatFastFoodLayer(){
      if (this.satFastFoodLayer == undefined) {
        this.satFastFoodLayer = this.getMarkers("SatFastFoodLayer", "#00FF00", this.satFastFood, true);
      }
      
      return this.satFastFoodLayer;
    },
    getStandingFastFoodLayer(){
      if (this.standingFastFoodLayer == undefined) {
        this.standingFastFoodLayer = this.getMarkers("StandingFastFoodLayer", "#00FF00", this.standingFastFood, true);
      }
      
      return this.standingFastFoodLayer;
    },
    getBarCoffeeLayer(){
      if (this.barCoffeeLayer == undefined) {
        this.barCoffeeLayer = this.getMarkers("BarAndCoffee", "#00FF00", this.barAndCoffee, true);
      }
      
      return this.barCoffeeLayer;
    },
    getTeaLayer(){
      if (this.teaLayer == undefined) {
        this.teaLayer = this.getMarkers("Tea", "#00FF00", this.tea, true);
      }
      
      return this.teaLayer;
    },
    getArtGalleryLayer(){
      if (this.artGalleryLayer == undefined) {
        this.artGalleryLayer = this.getMarkers("ArtGallery", "#00FF00", this.artGallery, true);
      }
      
      return this.artGalleryLayer;
    },
    getLocalProductLayer(){
      if (this.localProductLayer == undefined) {
        this.localProductLayer = this.getMarkers("LocalProduct", "#00FF00", this.localProduct, true);
      }
      
      return this.localProductLayer;
    },
    getSouvenirLayer(){
      if (this.souvenirLayer == undefined) {
        this.souvenirLayer = this.getMarkers("SouvenirShop", "#00FF00", this.souvenirShop, true);
      }
      
      return this.souvenirLayer;
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
