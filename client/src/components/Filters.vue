<template>
    <v-card>
    <v-layout>
      <v-flex>
        <v-card-text>
          <v-treeview v-model="tree" :items="items" activatable active-class="grey lighten-4 indigo--text" selected-color="indigo"
            open-on-click selectable expand-icon="navigate_next" on-icon="lens" off-icon="panorama_fish_eye">
          </v-treeview>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex xs12 md6>
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
      items: []
    }),
  mounted() {
      this.initFilters();
    },
    methods: {
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
      }
    }
}
</script>

 <style>
    #calendar{margin-right: 15vw; margin-left: 15vw;}
  </style>