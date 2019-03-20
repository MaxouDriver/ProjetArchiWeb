<template>
  <v-layout row wrap>
          <v-flex xs12 sm6>
              <DataSelector/>
           </v-flex>
           <v-flex xs12 sm6>
              <Map/>
          </v-flex>
    </v-layout>
</template>

<script>
import Map from './Map.vue';
import DataSelector from './DataSelector.vue';

export default {
  name: 'Content',
  components:{
      Map,DataSelector
  },
  data () {
    return {
      
      dropdown_edit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' }
      ],
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [{name:'Frozen Yogurt',calories:159,fat:6,carbs:24,protein:4,iron:'1%'},{name:'Ice cream sandwich',calories:237,fat:9,carbs:37,protein:4.3,iron:'1%'},{name:'Eclair',calories:262,fat:16,carbs:23,protein:6,iron:'7%'},{name:'Cupcake',calories:305,fat:3.7,carbs:67,protein:4.3,iron:'8%'},{name:'Gingerbread',calories:356,fat:16,carbs:49,protein:3.9,iron:'16%'},{name:'Jelly bean',calories:375,fat:0,carbs:94,protein:0,iron:'0%'},{name:'Lollipop',calories:392,fat:.2,carbs:98,protein:0,iron:'2%'},{name:'Honeycomb',calories:408,fat:3.2,carbs:87,protein:6.5,iron:'45%'},{name:'Donut',calories:452,fat:25,carbs:51,protein:4.9,iron:'22%'},{name:'KitKat',calories:518,fat:26,carbs:65,protein:7,iron:'6%'}]
    }
  },
     methods: {
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  }
}
</script>

 <style>
    #calendar{margin-right: 15vw; margin-left: 15vw;}
  </style>
