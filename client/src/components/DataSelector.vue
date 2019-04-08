<template>
  <div style="height: 100%;">
    <v-data-table :headers="headers" :items="activities" class="elevation-1" style="height: 100%;">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.cathegory }}</td>
        </template>
      </v-data-table>
    <v-card flat style="position: relative;">
      <v-bottom-nav :value="true" absolute color="transparent">
        <v-btn color="teal" flat value="morning" >
          <span>Morning</span>
        </v-btn>

        <v-btn color="teal" flat value="afternoon"  >
          <span>Afternoon</span>
        </v-btn>

        <v-btn color="teal" flat value="evening" >
          <span>Evening</span>
        </v-btn>

        <v-btn color="teal" flat value="night" >
          <span>Night</span>
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
                thisRef.zonesTouristiques.forEach(element => {
                  result.push({name: element.name, cathegory: 'Zones touristiques'});
                });
                break;

              case "Museums":
                thisRef.museums.forEach(element => {
                  result.push({name: element.name, cathegory: 'Museums'});
                });
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
                thisRef.frenchTraditionalRestaurant.forEach(element => {
                  result.push({name: element.name, cathegory: 'French Traditional'});
                });
                if (restaurantCat != true){
                  break;
                }
                /* falls through */
              case "Fast Food":
                fastFoodCat = true;
                break;
              case "Sat":
                thisRef.satFastFood.forEach(element => {
                  result.push({name: element.name, cathegory: 'Sat'});
                });
                if (fastFoodCat != true){
                  break;
                }
                /* falls through */
              case "Standing":
                thisRef.standingFastFood.forEach(element => {
                  result.push({name: element.name, cathegory: 'Standing'});
                });
                if (restaurantCat != true){
                  break;
                }
                /* falls through */
              case "Beverage":
                beverageCat = true;
                break;
              case "Bar/Coffee":
                thisRef.barAndCoffee.forEach(element => {
                  result.push({name: element.name, cathegory: 'Bar/Coffee'});
                });
                if (beverageCat != true){
                  break;
                }
                /* falls through */
              case "Tea":
                thisRef.tea.forEach(element => {
                  result.push({name: element.name, cathegory: 'Tea'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Art Gallery":
                thisRef.artGallery.forEach(element => {
                  result.push({name: element.name, cathegory: 'Art Gallery'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Local Product":
                thisRef.localProduct.forEach(element => {
                  result.push({name: element.name, cathegory: 'Local Product'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Souvenir":
                thisRef.souvenirShop.forEach(element => {
                  result.push({name: element.name, cathegory: 'Souvenir'});
                });
                
                break;
                
            }
          });
       
        return result;
      }
    }
  }
</script>
