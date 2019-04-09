<template>
  <div id="content-container">
    <v-menu ref="menu1" v-model="menu" :close-on-content-click="false" :nudge-right="40"
      lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format"
          persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
    </v-menu>
    <Filters :onFiltersUpdated="onFiltersUpdated"/>
    <v-layout row wrap fill-height :style="'min-height: ' + size + 'px;'">
          <v-flex  md6 sm12 :style="'min-height: ' + size + 'px;'">
              <DataSelector :selectedFilters="filters" 
              :zonesTouristiques="zonesTouristiques" 
              :toilets="toilets" 
              :museums="museums"
              :frenchTraditionalRestaurant="frenchTraditionalRestaurant"
              :satFastFood="satFastFood"
              :standingFastFood="standingFastFood"
              :barAndCoffee="barAndCoffee"
              :tea="tea"
              :artGallery="artGallery"
              :localProduct="localProduct"
              :souvenirShop="souvenirShop"
              
              :balade="balade"
              :atelierCours="atelierCours"
              :conferenceDebat="conferenceDebat"
              :stage="stage"
              :visiteGuidee="visiteGuidee"
              :loisirsJeux="loisirsJeux"
              :lectureRencontre="lectureRencontre"
              :autreAnimation="autreAnimation"
              :humour="humour"
              :danse="danse"
              :theatre="theatre"
              :projection="projection"
              :cirqueArtDeLaRue="cirqueArtDeLaRue"
              :jeunePublic="jeunePublic"
              :operaMusical="operaMusical"
              :autreSpectacle="autreSpectacle"
              :photographie="photographie"
              :beauxArts="beauxArts"
              :artContemporain="artContemporain"
              :streetArt="streetArt"
              :histoireCivilisations="histoireCivilisations"
              :illustrationBD="illustrationBD"
              :autreExpo="autreExpo"
              :classique="classique"
              :folk="folk"
              :hipHop="hipHop"
              :reggae="reggae"
              :chansonFrancaise="chansonFrancaise"
              :popVariete="popVariete"
              :rock="rock"
              :jazz="jazz"
              :musiquesDuMonde="musiquesDuMonde"
              :electronique="electronique"
              :autreConcert="autreConcert"
              :brocanteMarche="brocanteMarche"
              :evenementSportif="evenementSportif"
              :festivalCycle="festivalCycle"
              :soireeBal="soireeBal" 
              :salon="salon"
              :autreEvenement="autreEvenement"/>
           </v-flex>
           <v-flex  md6 sm12 :style="'min-height: ' + size + 'px; width: ' + size +'px !important;'">
              <Map :selectedFilters="filters" 
              :zonesTouristiques="zonesTouristiques" 
              :toilets="toilets" 
              :museums="museums"
              :frenchTraditionalRestaurant="frenchTraditionalRestaurant"
              :satFastFood="satFastFood"
              :standingFastFood="standingFastFood"
              :barAndCoffee="barAndCoffee"
              :tea="tea"
              :artGallery="artGallery"
              :localProduct="localProduct"
              :souvenirShop="souvenirShop"
              
              :balade="balade"
              :atelierCours="atelierCours"
              :conferenceDebat="conferenceDebat"
              :stage="stage"
              :visiteGuidee="visiteGuidee"
              :loisirsJeux="loisirsJeux"
              :lectureRencontre="lectureRencontre"
              :autreAnimation="autreAnimation"
              :humour="humour"
              :danse="danse"
              :theatre="theatre"
              :projection="projection"
              :cirqueArtDeLaRue="cirqueArtDeLaRue"
              :jeunePublic="jeunePublic"
              :operaMusical="operaMusical"
              :autreSpectacle="autreSpectacle"
              :photographie="photographie"
              :beauxArts="beauxArts"
              :artContemporain="artContemporain"
              :streetArt="streetArt"
              :histoireCivilisations="histoireCivilisations"
              :illustrationBD="illustrationBD"
              :autreExpo="autreExpo"
              :classique="classique"
              :folk="folk"
              :hipHop="hipHop"
              :reggae="reggae"
              :chansonFrancaise="chansonFrancaise"
              :popVariete="popVariete"
              :rock="rock"
              :jazz="jazz"
              :musiquesDuMonde="musiquesDuMonde"
              :electronique="electronique"
              :autreConcert="autreConcert"
              :brocanteMarche="brocanteMarche"
              :evenementSportif="evenementSportif"
              :festivalCycle="festivalCycle"
              :soireeBal="soireeBal" 
              :salon="salon"
              :autreEvenement="autreEvenement"/>
          </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Map from './Map.vue';
import DataSelector from './DataSelector.vue';
import Filters from './Filters.vue';
import DataManager from '../utils/DataManager';

export default {
  name: 'Content',
  components: {
    Map,Filters,DataSelector
  },
  mounted(){
    this.onResize();

    this.initZonesTouristiques();
    this.initToilets();
    this.initMuseums();
    this.initShops();
    this.initEvents();
  },
  data() {
    return{
      err: "",
      filters: [],
      zonesTouristiques: [],
      toilets: [],
      museums: [],
      frenchTraditionalRestaurant: [],
      satFastFood: [],
      standingFastFood: [],
      barAndCoffee: [],
      tea: [],
      artGallery: [],
      localProduct: [],
      souvenirShop: [],

      balade : [],
      atelierCours: [],
      conferenceDebat: [],
      stage: [],
      visiteGuidee: [],
      loisirsJeux: [],
      lectureRencontre: [],
      autreAnimation: [],
      humour: [],
      danse: [],
      theatre: [],
      projection: [],
      cirqueArtDeLaRue: [],
      jeunePublic: [],
      operaMusical: [],
      autreSpectacle: [],
      photographie: [],
      beauxArts: [],
      artContemporain: [],
      streetArt: [],
      histoireCivilisations: [],
      illustrationBD: [],
      autreExpo: [],
      classique: [],
      folk: [],
      hipHop: [],
      reggae: [],
      chansonFrancaise: [],
      popVariete: [],
      rock: [],
      jazz: [],
      musiquesDuMonde: [],
      electronique: [],
      autreConcert: [],
      brocanteMarche: [],
      evenementSportif: [],
      festivalCycle: [],
      soireeBal: [], 
      salon: [],
      autreEvenement: [],

      size: 0,


      date: new Date().toISOString().substr(0, 10),
      dateFormatted: undefined,
      menu: false
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
      if (this.dateFormatted != undefined) {
        DataManager.getWeatherByDate(this.formatDateForServer(this.date), function(data){
          if (data != undefined) {
            //Do something
          }else{
            //No weather prevision
          }
        },
        function(){
          alert("Opps something gone wrong");
        });
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    formatDateForServer (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      alert(year + ', ' +  month + ', ' + day);
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    onResize () {
        this.size = window.innerWidth < 960 ? window.innerWidth  : window.innerWidth/4;
    },
    onFiltersUpdated(filters){
      this.filters = filters;
    },
    initZonesTouristiques(){
      var thisRef = this;
      DataManager.getZonesTouristiques(function(res){
        thisRef.zonesTouristiques = res;
      },function(err){
          thisRef.err = err;
      });
    },
    initToilets(){
      var thisRef = this;

      DataManager.getToilets(function(res){
         thisRef.toilets = res;
      },function(err){
         thisRef.err = err;
      });
    },
    initMuseums(){
      var thisRef = this;
      
      DataManager.getMuseums(function(res){
        thisRef.museums = res;
      },function(err){
         thisRef.err = err;
      });
    },
    initShops(){
      var thisRef = this;
      
      DataManager.getFrenchTraditionalRestaurant(function(res){
        thisRef.frenchTraditionalRestaurant = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getSatFastFood(function(res){
        thisRef.satFastFood = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getStandingFastFood(function(res){
        thisRef.standingFastFood = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getBarAndCoffee(function(res){
        thisRef.barAndCoffee = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getTea(function(res){
        thisRef.tea = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getArtGallery(function(res){
        thisRef.artGallery = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getLocalProduct(function(res){
        thisRef.localProduct = res;
      },function(err){
         thisRef.err = err;
      });

      DataManager.getSouvenirShop(function(res){
        thisRef.souvenirShop = res;
      },function(err){
         thisRef.err = err;
      });
    },
    initEvents(){
      var thisRef = this;
      DataManager.getBalade (function(res){         thisRef.balade = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAtelierCours(function(res){         thisRef.atelierCours = res;       },function(err){          thisRef.err = err;       });
      DataManager.getConferenceDebat(function(res){         thisRef.conferenceDebat = res;       },function(err){          thisRef.err = err;       });
      DataManager.getStage(function(res){         thisRef.stage = res;       },function(err){          thisRef.err = err;       });
      DataManager.getVisiteGuidee(function(res){         thisRef.visiteGuidee = res;       },function(err){          thisRef.err = err;       });
      DataManager.getLoisirsJeux(function(res){         thisRef.loisirsJeux = res;       },function(err){          thisRef.err = err;       });
      DataManager.getLectureRencontre(function(res){         thisRef.lectureRencontre = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAutreAnimation(function(res){         thisRef.autreAnimation = res;       },function(err){          thisRef.err = err;       });
      DataManager.getHumour(function(res){         thisRef.humour = res;       },function(err){          thisRef.err = err;       });
      DataManager.getDanse (function(res){         thisRef.danse = res;       },function(err){          thisRef.err = err;       });
      DataManager.getTheatre(function(res){         thisRef.theatre = res;       },function(err){          thisRef.err = err;       });
      DataManager.getProjection(function(res){         thisRef.projection = res;       },function(err){          thisRef.err = err;       });
      DataManager.getCirqueArtDeLaRue(function(res){         thisRef.cirqueArtDeLaRue = res;       },function(err){          thisRef.err = err;       });
      DataManager.getJeunePublic(function(res){         thisRef.jeunePublic = res;       },function(err){          thisRef.err = err;       });
      DataManager.getOperaMusical(function(res){         thisRef.operaMusical = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAutreSpectacle(function(res){         thisRef.autreSpectacle = res;       },function(err){          thisRef.err = err;       });
      DataManager.getPhotographie(function(res){         thisRef.photographie = res;       },function(err){          thisRef.err = err;       });
      DataManager.getBeauxArts(function(res){         thisRef.beauxArts = res;       },function(err){          thisRef.err = err;       });
      DataManager.getArtContemporain(function(res){         thisRef.artContemporain = res;       },function(err){          thisRef.err = err;       });
      DataManager.getStreetArt(function(res){         thisRef.streetArt = res;       },function(err){          thisRef.err = err;       });
      DataManager.getHistoireCivilisations(function(res){         thisRef.histoireCivilisations = res;       },function(err){          thisRef.err = err;       });
      DataManager.getIllustrationBD(function(res){         thisRef.illustrationBD = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAutreExpo(function(res){         thisRef.autreExpo = res;       },function(err){          thisRef.err = err;       });
      DataManager.getClassique(function(res){         thisRef.classique = res;       },function(err){          thisRef.err = err;       });
      DataManager.getFolk(function(res){         thisRef.folk = res;       },function(err){          thisRef.err = err;       });
      DataManager.getHipHop(function(res){         thisRef.hipHop = res;       },function(err){          thisRef.err = err;       });
      DataManager.getReggae(function(res){         thisRef.reggae = res;       },function(err){          thisRef.err = err;       });
      DataManager.getChansonFrancaise(function(res){         thisRef.chansonFrancaise = res;       },function(err){          thisRef.err = err;       });
      DataManager.getPopVariete(function(res){         thisRef.popVariete = res;       },function(err){          thisRef.err = err;       });
      DataManager.getRock(function(res){         thisRef.rock = res;       },function(err){          thisRef.err = err;       });
      DataManager.getJazz(function(res){         thisRef.jazz = res;       },function(err){          thisRef.err = err;       });
      DataManager.getMusiquesDuMonde(function(res){         thisRef.musiquesDuMonde = res;       },function(err){          thisRef.err = err;       });
      DataManager.getElectronique(function(res){         thisRef.electronique = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAutreConcert(function(res){         thisRef.autreConcert = res;       },function(err){          thisRef.err = err;       });
      DataManager.getBrocanteMarche(function(res){         thisRef.brocanteMarche = res;       },function(err){          thisRef.err = err;       });
      DataManager.getEvenementSportif(function(res){         thisRef.evenementSportif = res;       },function(err){          thisRef.err = err;       });
      DataManager.getFestivalCycle(function(res){         thisRef.festivalCycle = res;       },function(err){          thisRef.err = err;       });
      DataManager.getSoireeBal(function(res){         thisRef.soireeBal = res;       },function(err){          thisRef.err = err;       });
      DataManager.getSalon(function(res){         thisRef.salon = res;       },function(err){          thisRef.err = err;       });
      DataManager.getAutreEvenement(function(res){         thisRef.autreEvenement = res;       },function(err){          thisRef.err = err;       });
    }
  }
}
</script>

 <style scoped>
  </style>
