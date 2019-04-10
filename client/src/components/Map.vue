<template>
  <div id="leafletMapContainer">
    <div id="leafletMap"></div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add to planning</span>
        </v-card-title>
        <v-card-text>
          <v-stepper vertical v-if="allowedDates == undefined">
            <v-stepper-step :rules="[() => false]">
              You haven't selected a date before, you can add to your planning but the weather prevision won't be taken under consideration
            </v-stepper-step>
          </v-stepper>
          <div v-if="allowedDates !== undefined">
            <v-date-picker
              v-model="date"
              full-width
              landscape
              :allowed-dates="allowedDates"
              class="mt-3"
              v-validate="'required'" :items="items" :error-messages="errors.collect('dateSelection')" data-vv-name="dateSelection" required></v-date-picker>
          </div>
          <div v-else>
            <v-date-picker
              v-model="date"
              full-width
              landscape
              class="mt-3"
              v-validate="'required'" :items="items" :error-messages="errors.collect('dateSelection')" data-vv-name="dateSelection" required
            ></v-date-picker>
          </div>
          <br/>
          <v-select v-model="moment" v-validate="'required'" :items="items" :error-messages="errors.collect('select')" label="Outline style"
              data-vv-name="select" required>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addToPlanning()">Add to my planning</v-btn>
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
    souvenirShop: Array,


    balade : Array,
    atelierCours: Array,
    conferenceDebat: Array,
    stage: Array,
    visiteGuidee: Array,
    loisirsJeux: Array,
    lectureRencontre: Array,
    autreAnimation: Array,
    humour: Array,
    danse: Array,
    theatre: Array,
    projection: Array,
    cirqueArtDeLaRue: Array,
    jeunePublic: Array,
    operaMusical: Array,
    autreSpectacle: Array,
    photographie: Array,
    beauxArts: Array,
    artContemporain: Array,
    streetArt: Array,
    histoireCivilisations: Array,
    illustrationBD: Array,
    autreExpo: Array,
    classique: Array,
    folk: Array,
    hipHop: Array,
    reggae: Array,
    chansonFrancaise: Array,
    popVariete: Array,
    rock: Array,
    jazz: Array,
    musiquesDuMonde: Array,
    electronique: Array,
    autreConcert: Array,
    brocanteMarche: Array,
    evenementSportif: Array,
    festivalCycle: Array,
    soireeBal: Array, 
    salon: Array,
    autreEvenement: Array
  },
  watch: {
    selectedFilters() {
      this.updateLayers.bind(this);
      this.updateLayers();
    }
  },
  mounted() {
    this.initMap();
    this.initLayers();

    var thisRef = this;
    this.isAuthenticated = AuthenticationManager.isAuthenticated();
    //When used connect, update ui.
    this.$root.$on('authenticated', () => {
      thisRef.isAuthenticated = true;
    })
    //When used disconnect, update ui.
    this.$root.$on('notauthenticated', () => {
      thisRef.isAuthenticated = false;
    })
    //When a row is selected, zoom over the corresponding marker
    this.$root.$on('selectedRowChanged', (id) => {
      thisRef.zoomOverMarker(id);
    })
    //When a row is selected, zoom over the corresponding marker
    this.$root.$on('onDateChanged', (data) => {
      thisRef.allowedDates = val => val == data;
    })
  },
  data (){
    return {
      isAuthenticated: false,

      date: new Date().toISOString().substr(0, 10),
      moment: undefined,
      items: ['Morning', 'Afternoon', 'Evening', 'Night'],
      allowedDates: undefined,

      select: null,
      dateSelection: null,

      dictionary: {
        custom: {
          select: {
            required: 'Moment required'
          },
          dateSelection: {
            required: 'You need to select a valid date'
          }
        }
      },


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

      brocanteLayer: undefined,
      evenementSportifLayer: undefined,
      festivalLayer: undefined,
      feteLayer: undefined,
      salonLayer: undefined,
      autreEvenementLayer: undefined,
      baladeLayer: undefined,
      atelierLayer: undefined,
      conferenceLayer: undefined,
      lectureLayer: undefined,
      stageLayer: undefined,
      visiteGuideeLayer: undefined,
      loisirLayer: undefined,
      autreAnimationLayer: undefined,
      humourLayer: undefined,
      danseLayer: undefined,
      theatreLayer: undefined,
      projectionLayer: undefined,
      cirqueLayer: undefined,
      jeuneLayer: undefined,
      operaLayer: undefined,
      autreSpectacleLayer: undefined,
      photographieLayer: undefined,
      beauxArtsLayer: undefined,
      artContemporainLayer: undefined,
      streetArtLayer: undefined,
      histoireLayer: undefined,
      illustrationLayer: undefined,
      autreExpoLayer: undefined,
      classiqueLayer: undefined,
      chansonFrancaiseLayer: undefined,
      popLayer: undefined,
      rockLayer: undefined,
      jazzLayer: undefined,
      musiqueDuMondeLayer: undefined,
      electroniqueLayer: undefined,
      folkLayer: undefined,
      hipHopLayer: undefined,
      reggaeLayer: undefined,
      autreConcertLayer: undefined,

      dialog: false,
      currentSelectedElementName: "",
      currentSelectedElementType: "",


      markersLoaded: []
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

      var eventsCat = false;
      var animationsCat = false;
      var spectaclesCat = false;
      var expositionsCat = false;
      var concertsCat = false;

      //Loop through every filter and add corresponding layer(s) to the map.
      this.selectedFilters.forEach(function(activity){
            shopCat = false;
            restaurantCat = false;
            fastFoodCat = false;
            beverageCat = false;

            eventsCat = false;
            animationsCat = false;
            spectaclesCat = false;
            expositionsCat = false;
            concertsCat = false;

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
                /* falls through */
              case "Events":
                eventsCat = true;
                animationsCat = true;
                spectaclesCat = true;
                expositionsCat = true;
                concertsCat = true;
              /* falls through */
              case "Brocante / Market":
                result.push(thisRef.getBrocanteLayer());
                if (eventsCat != true){
                  break;
                }
              /* falls through */
              case "Sport":
                result.push(thisRef.getEvenementSportifLayer());
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Festival / Cycle":
                result.push(thisRef.getFestivalLayer());
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Party / Parade":
                result.push(thisRef.getFeteLayer());
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Salon":
                result.push(thisRef.getSalonLayer());
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Other":
                result.push(thisRef.getAutreEvenementLayer());
                break;


              /* falls through */
              case "Animations":
                animationsCat = true;
              /* falls through */
              case "Walk":
                result.push(thisRef.getBaladeLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Workshop, Course":
                result.push(thisRef.getAtelierLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Conference / Debate":
                result.push(thisRef.getConferenceLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Reading / Meeting":
                result.push(thisRef.getLectureLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Traineeship":
                result.push(thisRef.getStageLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Guided tour":
                result.push(thisRef.getVisiteGuideeLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Hobbies / Games":
                result.push(thisRef.getLoisirLayer());
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Other animation":
                result.push(thisRef.getAutreAnimationLayer());
                break;
                
              /* falls through */
              case "Shows":
                spectaclesCat = true;
              /* falls through */
              case "Humor":
                result.push(thisRef.getHumourLayer());
                if (spectaclesCat != true){
                  break;
                }
              /* falls through */
              case "Dance":
                result.push(thisRef.getDanseLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Theater":
                result.push(thisRef.getTheatreLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Projection":
                result.push(thisRef.getProjectionLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Circus / Street Art":
                result.push(thisRef.getCirqueLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Young audience":
                result.push(thisRef.getJeuneLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Opera / Musical":
               result.push(thisRef.getOperaLayer());
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Other show":
                result.push(thisRef.getAutreSpectacleLayer());
                break;

              /* falls through */
              case "Expositions":
                expositionsCat = true;
              /* falls through */
              case "Photography":
                result.push(thisRef.getPhotographieLayer());
                if (expositionsCat != true){
                  break;
                }
              /* falls through */
              case "Beaux-Arts":
                result.push(thisRef.getBeauxArtsLayer());
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Contemporary art":
                result.push(thisRef.getArtContemporainLayer());
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Street-art":
                result.push(thisRef.getStreetArtLayer());
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "History / Civilizations":
                result.push(thisRef.getHistoireLayer());
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Illustration / comic":
                result.push(thisRef.getIllustrationLayer());
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Other expositions":
                result.push(thisRef.getAutreExpoLayer());
                break;

              /* falls through */
              case "Concerts":
                concertsCat = true;
              /* falls through */
              case "Classical":
                result.push(thisRef.getClassiqueLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "French song":
                result.push(thisRef.getChansonFrancaiseLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Pop / Variety":
                result.push(thisRef.getPopLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Rock":
                result.push(thisRef.getRockLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Jazz":
                result.push(thisRef.getJazzLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "World music":
                result.push(thisRef.getMusiqueDuMondeLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Electronic":
                result.push(thisRef.getElectroniqueLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Folk":
                result.push(thisRef.getFolkLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Hip-Hop":
                result.push(thisRef.getHipHopLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Reggae":
                result.push(thisRef.getReggaeLayer());
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Other concert":
                result.push(thisRef.getAutreConcertLayer());
                break;
            }
      });

      return result;
    }
  },
  methods: {
    initMap() {
      this.map = L.map('leafletMap').setView([48.860637, 2.340873], 12);

      this.tileLayer = L.tileLayer(
        'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
          id: 'mapbox.streets',
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
    //Method used to zoom to the location of a marker.
    zoomOverMarker(id){
      var thisRef = this;
      this.markersLoaded.forEach(function(marker){
        if (marker.id == id) {
          thisRef.map.flyTo([marker.pos[1], marker.pos[0]], 18);
        }
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
      var thisRef = this;
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
          //Nothing everything good
          thisRef.moment = undefined;
        },
        function(err){
          alert(err);
        }
      );
      this.dialog = false;
    },
    //Method used to show markers in parameter
    showLayer(layer){
      this.map.addLayer(layer);
    },
    //Method used to hide markers in parameter
    hideLayers(layer){
      this.map.removeLayer(layer);
      this.popups[0].zoomOverMarker();
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
    //Methode used to add a popup to a marker.
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

          button = $("<button name='" + feature.properties.title + "' type='" + feature.properties.type + "' class='addToPlanning'>Add to planning</button>");
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
      this.markersLoaded.push({id: feature.properties.id, pos: feature.geometry.coordinates});
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
    //Method used for the creation of markers clusters, for the API data
    getMarkers(type, color, data, isPlannifiable){
      var markers = L.markerClusterGroup();
      var thisRef = this;

      data.forEach(element => {
        //Style of the marker
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        //If why have geometry information then we can create the marker.
        if (element.geometry != undefined) {
          var marker = L.geoJSON(thisRef.getGeojsonFeature(element.id, element.name, type, isPlannifiable, element.geometry), {
              onEachFeature: thisRef.onEachFeature,
              pointToLayer: function (feature, latlng) {
                  return L.circleMarker(latlng, geojsonMarkerOptions);
              }
          });

          markers.addLayer(marker);
        }

      });
      return markers;
    },
    getToiletsLayer(){
      if (this.toiletsLayer == undefined)this.toilersLayer = this.getMarkers("Toilets", "#00FF00", this.toilets, false);
      return this.toilersLayer;
    },
    getMuseumsLayer(){
      if (this.museumsLayer == undefined)this.museumsLayer = this.getMarkers("Museums", "#00FF00", this.museums, true);
      return this.museumsLayer;
    },
    getFrenchTraditionalRestaurantLayer(){
      if (this.frenchTraditionalRestaurantLayer == undefined) this.frenchTraditionalRestaurantLayer = this.getMarkers("FrenchTraditionalRestaurant", "#00FF00", this.frenchTraditionalRestaurant, true);
      return this.frenchTraditionalRestaurantLayer;
    },
    getSatFastFoodLayer(){
      if (this.satFastFoodLayer == undefined) this.satFastFoodLayer = this.getMarkers("SatFastFoodLayer", "#00FF00", this.satFastFood, true);
      return this.satFastFoodLayer;
    },
    getStandingFastFoodLayer(){
      if (this.standingFastFoodLayer == undefined) this.standingFastFoodLayer = this.getMarkers("StandingFastFoodLayer", "#00FF00", this.standingFastFood, true);
      return this.standingFastFoodLayer;
    },
    getBarCoffeeLayer(){
      if (this.barCoffeeLayer == undefined) this.barCoffeeLayer = this.getMarkers("BarAndCoffee", "#00FF00", this.barAndCoffee, true);
      return this.barCoffeeLayer;
    },
    getTeaLayer(){
      if (this.teaLayer == undefined) this.teaLayer = this.getMarkers("Tea", "#00FF00", this.tea, true);
      return this.teaLayer;
    },
    getArtGalleryLayer(){
      if (this.artGalleryLayer == undefined) this.artGalleryLayer = this.getMarkers("ArtGallery", "#00FF00", this.artGallery, true);
      return this.artGalleryLayer;
    },
    getLocalProductLayer(){
      if (this.localProductLayer == undefined)this.localProductLayer = this.getMarkers("LocalProduct", "#00FF00", this.localProduct, true);
      return this.localProductLayer;
    },
    getSouvenirLayer(){
      if (this.souvenirLayer == undefined)this.souvenirLayer = this.getMarkers("SouvenirShop", "#00FF00", this.souvenirShop, true);
      return this.souvenirLayer;
    },
    getBrocanteLayer(){
      if (this.brocanteLayer == undefined) this.brocanteLayer = this.getMarkers("Brocante / Market", "#00FF00", this.brocanteMarche, true);
      return this.brocanteLayer;
    },
    getEvenementSportifLayer(){
      if (this.evenementSportifLayer == undefined) this.evenementSportifLayer = this.getMarkers("Sport", "#00FF00", this.evenementSportif, true);
      return this.evenementSportifLayer;
    },
    getFestivalLayer(){
      if (this.festivalLayer == undefined)this.festivalLayer = this.getMarkers("FestivalLayer", "#00FF00", this.festivalCycle, true);
      return this.festivalLayer;
    },
    getFeteLayer(){
      if (this.feteLayer == undefined)this.feteLayer = this.getMarkers("Party / Parade", "#00FF00", this.soireeBal, true);
      return this.feteLayer;
    },
    getSalonLayer(){
      if (this.salonLayer == undefined) this.salonLayer = this.getMarkers("SalonLayer", "#00FF00", this.salon, true);
      return this.salonLayer;
    },
    getAutreEvenementLayer(){
      if (this.autreEvenementLayer == undefined) this.autreEvenementLayer = this.getMarkers("Other Event", "#00FF00", this.autreEvenement, true);
      return this.autreEvenementLayer;
    },
    getBaladeLayer(){
      if (this.baladeLayer == undefined) this.baladeLayer = this.getMarkers("Walk", "#00FF00", this.balade, true);
      return this.baladeLayer;
    },
    getAtelierLayer(){
       if (this.atelierLayer == undefined) this.atelierLayer = this.getMarkers("Workshop, Course", "#00FF00", this.atelierCours, true);
      return this.atelierLayer;
    },
    getConferenceLayer(){
       if (this.conferenceLayer == undefined) this.conferenceLayer = this.getMarkers("Conference / Debate", "#00FF00", this.conferenceDebat, true);
      return this.conferenceLayer;
    },
    getLectureLayer(){
       if (this.lectureLayer == undefined)this.lectureLayer = this.getMarkers("Reading / Meeting", "#00FF00", this.lectureRencontre, true);
      return this.lectureLayer;
    },
    getStageLayer(){
       if (this.stageLayer == undefined)this.stageLayer = this.getMarkers("Traineeship", "#00FF00", this.stage, true);
      return this.stageLayer;
    },
    getVisiteGuideeLayer(){
       if (this.visiteGuideeLayer == undefined)this.visiteGuideeLayer = this.getMarkers("Guided tour", "#00FF00", this.visiteGuidee, true);
      return this.visiteGuideeLayer;
    },
    getLoisirLayer(){
       if (this.loisirLayer == undefined)this.loisirLayer = this.getMarkers("Hobbies / Games", "#00FF00", this.loisirsJeux, true);
      return this.loisirLayer;
    },
    getAutreAnimationLayer(){
       if (this.autreAnimationLayer == undefined)this.autreAnimationLayer = this.getMarkers("Other animation", "#00FF00", this.autreAnimation, true);
      return this.autreAnimationLayer;
    },
    getHumourLayer(){
       if (this.humourLayer == undefined) this.humourLayer = this.getMarkers("Humor", "#00FF00", this.humour, true);
      return this.humourLayer;
    },
    getDanseLayer(){
       if (this.danseLayer == undefined)this.danseLayer = this.getMarkers("Dance", "#00FF00", this.danse, true);
      return this.danseLayer;
    },
    getTheatreLayer(){
       if (this.theatreLayer == undefined)this.theatreLayer = this.getMarkers("Theater", "#00FF00", this.theatre, true);
      return this.theatreLayer;
    },
    getProjectionLayer(){
       if (this.projectionLayer == undefined) this.projectionLayer = this.getMarkers("ProjectionLayer", "#00FF00", this.projection, true);
      return this.projectionLayer;
    },
    getCirqueLayer(){
       if (this.cirqueLayer == undefined)this.cirqueLayer = this.getMarkers("Circus / Street Art", "#00FF00", this.cirqueArtDeLaRue, true);
      return this.cirqueLayer;
    },
    getJeuneLayer(){
       if (this.jeuneLayer == undefined)this.jeuneLayer = this.getMarkers("Young audience", "#00FF00", this.jeunePublic, true);
      return this.jeuneLayer;
    },
    getOperaLayer(){
       if (this.operaLayer == undefined)this.operaLayer = this.getMarkers("Opera / Musical", "#00FF00", this.operaMusical, true);
      return this.operaLayer;
    },
    getAutreSpectacleLayer(){
       if (this.autreSpectacleLayer == undefined)this.autreSpectacleLayer = this.getMarkers("Other show", "#00FF00", this.autreSpectacle, true);
      return this.autreSpectacleLayer;
    },
    getPhotographieLayer(){
       if (this.photographieLayer == undefined)this.photographieLayer = this.getMarkers("Photography", "#00FF00", this.photographie, true);
      return this.photographieLayer;
    },
    getBeauxArtsLayer(){
       if (this.beauxArtsLayer == undefined)this.beauxArtsLayer = this.getMarkers("BeauxArtsLayer", "#00FF00", this.beauxArts, true);
      return this.beauxArtsLayer;
    },
    getArtContemporainLayer(){
       if (this.artContemporainLayer == undefined)this.artContemporainLayer = this.getMarkers("Contemporary art", "#00FF00", this.artContemporain, true);
      return this.artContemporainLayer;
    },
    getStreetArtLayer(){
       if (this.streetArtLayer == undefined) this.streetArtLayer = this.getMarkers("StreetArtLayer", "#00FF00", this.streetArt, true);
      return this.streetArtLayer;
    },
    getHistoireLayer(){
       if (this.histoireLayer == undefined) this.histoireLayer = this.getMarkers("History / Civilizations", "#00FF00", this.histoireCivilisations, true);
      return this.histoireLayer;
    },
    getIllustrationLayer(){
       if (this.illustrationLayer == undefined)this.illustrationLayer = this.getMarkers("Illustration / comic", "#00FF00", this.illustrationBD, true);
      return this.illustrationLayer;
    },
    getAutreExpoLayer(){
       if (this.autreExpoLayer == undefined)this.autreExpoLayer = this.getMarkers("Other expositions", "#00FF00", this.autreExpo, true);
      return this.autreExpoLayer;
    },
    getClassiqueLayer(){
       if (this.classiqueLayer == undefined) this.classiqueLayer = this.getMarkers("Classical", "#00FF00", this.classique, true);
      return this.classiqueLayer;
    },
    getChansonFrancaiseLayer(){
       if (this.chansonFrancaiseLayer == undefined) this.chansonFrancaiseLayer = this.getMarkers("French song", "#00FF00", this.chansonFrancaise, true);
      return this.chansonFrancaiseLayer;
    },
    getPopLayer(){
       if (this.popLayer == undefined) this.popLayer = this.getMarkers("Pop / Variety", "#00FF00", this.popVariete, true);
      return this.popLayer;
    },
    getRockLayer(){
       if (this.rockLayer == undefined)this.rockLayer = this.getMarkers("RockLayer", "#00FF00", this.rock, true);
      return this.rockLayer;
    },
    getJazzLayer(){
       if (this.jazzLayer == undefined)this.jazzLayer = this.getMarkers("JazzLayer", "#00FF00", this.jazz, true);
      return this.jazzLayer;
    },
    getMusiqueDuMondeLayer(){
      if (this.musiqueDuMondeLayer == undefined)this.musiqueDuMondeLayer = this.getMarkers("World music", "#00FF00", this.musiquesDuMonde, true);
      return this.musiqueDuMondeLayer;
    },
    getElectroniqueLayer(){
      if (this.electroniqueLayer == undefined)this.electroniqueLayer = this.getMarkers("Electronic", "#00FF00", this.electronique, true);
      return this.electroniqueLayer;
    },
    getFolkLayer(){
      if (this.folkLayer == undefined)this.folkLayer = this.getMarkers("FolkLayer", "#00FF00", this.folk, true);
      return this.folkLayer;
    },
    getHipHopLayer(){
      if (this.hipHopLayer == undefined)this.hipHopLayer = this.getMarkers("HipHopLayer", "#00FF00", this.hipHop, true);
      return this.hipHopLayer;
    },
    getReggaeLayer() {
      if (this.reggaeLayer == undefined)this.reggaeLayer = this.getMarkers("ReggaeLayer", "#00FF00", this.reggae, true);
      return this.reggaeLayer;
    },
    getAutreConcertLayer(){
      if (this.autreConcertLayer == undefined) this.autreConcertLayer = this.getMarkers("Other concert", "#00FF00", this.autreConcert, true);
      return this.autreConcertLayer;
    }
  }
}
</script>

<style scoped>
  h1{
    margin: 10vw;
  }
  #leafletMap { 
    height: 30vw;
    z-index: 0;
  }
  #leafletMapContainer{
    height: 100%;
  }
</style>
