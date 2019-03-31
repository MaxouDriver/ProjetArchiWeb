<template>
  <div id="content-container">
    <Filters :onFiltersUpdated="onFiltersUpdated"/>
    <v-layout row wrap>
          <v-flex xs12 sm6>
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
              :souvenirShop="souvenirShop"/>
           </v-flex>
           <v-flex xs12 sm6>
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
              :souvenirShop="souvenirShop"/>
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
    this.initZonesTouristiques();
    this.initToilets();
    this.initMuseums();
    this.initShops();
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
      souvenirShop: []
    }
  },
  methods: {
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
    }
  }
}
</script>

 <style>
    #calendar{margin-right: 15vw; margin-left: 15vw;}
  </style>
