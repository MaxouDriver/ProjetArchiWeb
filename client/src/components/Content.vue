<template>
  <div>
    <Filters/>
    <v-layout row wrap>
          <v-flex xs12 sm6>
              <DataSelector/>
           </v-flex>
           <v-flex xs12 sm6>
              <Map/>
          </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Map from './Map.vue';
import DataSelector from './DataSelector.vue';
import Filters from './Filters.vue';

export default {
  name: 'Content',
  components:{
      Map,DataSelector,Filters
  }
}
</script>

 <style>
    #calendar{margin-right: 15vw; margin-left: 15vw;}
  </style>
