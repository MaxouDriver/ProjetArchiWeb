<template>
    <v-card>
      <v-menu ref="menu1" v-model="menu" :close-on-content-click="false" :nudge-right="40"
      lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format"
          persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)" v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
    </v-menu>
    <v-layout row wrap>
      <v-flex md6 sm12>
        <v-card-text>
          <v-treeview v-model="tree" :items="items" activatable active-class="grey lighten-4 indigo--text" selected-color="indigo"
            open-on-click selectable expand-icon="navigate_next" on-icon="lens" off-icon="panorama_fish_eye">
          </v-treeview>
        </v-card-text>
      </v-flex>

      <v-flex md6 sm12>
        <v-card-text>
          <div v-if="selectedItems.length === 0" key="title" class="title font-weight-light grey--text pa-3 text-xs-center">
            Select filters
          </div>

          <v-scroll-x-transition group hide-on-leave>
            <v-chip v-for="(selection, i) in selectedItems" :key="i" color="grey" dark small>
              <v-icon left small>mdi-beer</v-icon>
              {{ selection.display_name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import DataManager from '../utils/DataManager.js';

export default {
  name: 'Filters',
  props: {
    onFiltersUpdated: { type: Function }
  },
  data: () => ({
      isLoading: false,
      tree: [],
      items: [],

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: undefined,
      menu: false
    }),
  watch: {
    date () {
      var thisRef = this;
      this.dateFormatted = this.formatDate(this.date)
      if (this.dateFormatted != undefined) {
        DataManager.getWeatherByDate(this.formatDateForServer(this.date), function(data){
          //If we have a weather prediction, then restrict the filters displayed in relation with the weather.
          if (data != undefined) {
            DataManager.getFilters(
              function(res){
                var result = [];
                
                for (var prop in res) {
                    if (res.hasOwnProperty(prop)) {
                        //Only take the filters that are available with the weather prediction.
                        if (res[prop].condition == undefined || res[prop].condition.indexOf(data.condition_key) > -1){
                          result.push(res[prop]);
                        }
                    }
                }

                thisRef.items = result;
              },function(err){
                thisRef.err = err;
              }
            );
          }else{
            //Don't restrict the filters because we haven't any weather prediction
          }
        },
        function(){
          alert("Opps something gone wrong");
        });
      }
    }
  },
  mounted() {
      this.initFilters();
  },
  methods: {
    //Format the date for the UI
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    //Format the date for the request to the server.
    formatDateForServer (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    initFilters(){
      var thisRef = this;
      DataManager.getFilters(
        function(res){
          thisRef.items = res;
        },function(err){
            thisRef.err = err;
        }
      );
    },
    getItemById(items, id){
      for (var i = 0; i < items.length; i++) { 
          if (items[i].id == id) {
            return items[i].children != undefined ? undefined : items[i];
          }
          if (items[i].children != undefined) {
            var temp = this.getItemById(items[i].children, id);
            if (temp != undefined)return temp;
          }
      }
      return undefined;
    }
  },
  computed: {
    selectedItems () {
      const selections = []

      for (const leaf of this.tree) {
        const item = this.getItemById(this.items, leaf);

        if (!item) continue

        selections.push(item)
      }

      this.onFiltersUpdated(selections);

      return selections
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  }
}
</script>

<style>
  #calendar{margin-right: 15vw; margin-left: 15vw;}
</style>