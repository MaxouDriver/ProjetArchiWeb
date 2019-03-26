<template>
  <div>
    <v-data-table :headers="headers" :items="activities" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.cathegory }}</td>
        </template>
      </v-data-table>

    <div class="headline text-xs-center pa-5">
      
    </div>
    <v-card flat>
      <v-bottom-nav :value="true" absolute color="transparent" >
        <v-btn color="teal" flat value="recent" >
          <span>Morning</span>
          <v-icon>history</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="favorites"  >
          <span>Afternoon</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="nearby" >
          <span>Evening</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>
<script>

  export default {
    name: 'DataSelector',
    props: {
      selectedFilters: Array,
      zonesTouristiques: Array,
      toilets: Array
    },
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
          {
            text: 'Nom',
            align: 'left',
            sortable: false,
            value: 'nom'
          },
          { text: 'Cathegory', value: 'cathergory' }
        ]
    }),
    mounted(){
    },
    computed: {
      activities: function(){
        var result = [];
        var thisRef = this;

          this.selectedFilters.forEach(function(activity){
            if (activity.name == "Touristiques area") {
              thisRef.zonesTouristiques.forEach(element => {
                result.push({name: element.name, cathegory: 'zones touristiques'});
              });
            }
          });
       
        return result;
      }
    }
  }
</script>
