<template>
  <div style="height: 100%;">
    <v-data-table :headers="headers" :items="activities" class="elevation-1" style="height: 100%;">
      <template v-slot:items="props">
        <td v-on:click="onSelectedRow(props.item.id)">{{ props.item.name }}</td>
        <td v-on:click="onSelectedRow(props.item.id)" class="text-xs-right">{{ props.item.cathegory }}</td>
      </template>
    </v-data-table>
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
      autreEvenement: Array,


      onSelectedRow: { type: Function }
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

              case "Tourist areas":
                thisRef.zonesTouristiques.forEach(element => {
                  result.push({id: element.id, name: element.name, cathegory: 'Tourist areas'});
                });
                break;

              case "Museums":
                thisRef.museums.forEach(element => {
                  result.push({id: element.id, name: element.name, cathegory: 'Museums'});
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
                  result.push({id: element.id, name: element.name, cathegory: 'French Traditional'});
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
                  result.push({id: element.id, name: element.name,  cathegory: 'Sat'});
                });
                if (fastFoodCat != true){
                  break;
                }
                /* falls through */
              case "Standing":
                thisRef.standingFastFood.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Standing'});
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
                  result.push({id: element.id, name: element.name,  cathegory: 'Bar/Coffee'});
                });
                if (beverageCat != true){
                  break;
                }
                /* falls through */
              case "Tea":
                thisRef.tea.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Tea'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Art Gallery":
                thisRef.artGallery.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Art Gallery'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Local Product":
                thisRef.localProduct.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Local Product'});
                });
                if (shopCat != true){
                  break;
                }
                /* falls through */
              case "Souvenir":
                thisRef.souvenirShop.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Souvenir'});
                });
                
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
                thisRef.brocanteMarche.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Brocante / Market'});
                });
                if (eventsCat != true){
                  break;
                }
              /* falls through */
              case "Sport":
                thisRef.evenementSportif.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Sport'});
                });
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Festival / Cycle":
                thisRef.festivalCycle.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Festival / Cycle'});
                });
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Party / Parade":
                thisRef.soireeBal.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Party / Parade'});
                });
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Salon":
                thisRef.salon.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Salon'});
                });
                if (eventsCat != true){
                  break;
                }
                /* falls through */
              case "Other":
                thisRef.autreEvenement.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Other Event'});
                });
                break;


              /* falls through */
              case "Animations":
                animationsCat = true;
              /* falls through */
              case "Walk":
                thisRef.balade.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Walk'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Workshop, Course":
                thisRef.atelierCours.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Workshop, Course'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Conference / Debate":
                thisRef.conferenceDebat.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Conference / Debate'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Reading / Meeting":
                thisRef.lectureRencontre.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Reading / Meeting'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Traineeship":
                thisRef.stage.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Traineeship'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Guided tour":
                thisRef.visiteGuidee.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Guided tour'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Hobbies / Games":
                thisRef.loisirsJeux.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Hobbies / Games'});
                });
                if (animationsCat != true){
                  break;
                }
              /* falls through */
              case "Other animation":
                thisRef.autreAnimation.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Other animation'});
                });
                break;
                
              /* falls through */
              case "Shows":
                spectaclesCat = true;
              /* falls through */
              case "Humor":
                thisRef.humour.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Humor'});
                });
                if (spectaclesCat != true){
                  break;
                }
              /* falls through */
              case "Dance":
                thisRef.danse.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Dance'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Theater":
                thisRef.theatre.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Theater'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Projection":
                thisRef.projection.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Projection'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Circus / Street Art":
                thisRef.cirqueArtDeLaRue.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Circus / Street Art'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Young audience":
                thisRef.jeunePublic.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Young audience'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Opera / Musical":
                thisRef.operaMusical.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Opera / Musical'});
                });
                if (spectaclesCat != true){
                  break;
                }
                /* falls through */
              case "Other show":
                thisRef.autreSpectacle.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Other show'});
                });
                break;

              /* falls through */
              case "Expositions":
                expositionsCat = true;
              /* falls through */
              case "Photography":
                thisRef.photographie.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Photography'});
                });
                if (expositionsCat != true){
                  break;
                }
              /* falls through */
              case "Beaux-Arts":
                thisRef.beauxArts.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Beaux-Arts'});
                });
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Contemporary art":
                thisRef.artContemporain.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Contemporary art'});
                });
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Street-art":
                thisRef.streetArt.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Street-art'});
                });
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "History / Civilizations":
                thisRef.histoireCivilisations.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'History / Civilizations'});
                });
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Illustration / comic":
                thisRef.illustrationBD.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Illustration / comic'});
                });
                if (expositionsCat != true){
                  break;
                }
                /* falls through */
              case "Other expositions":
                thisRef.autreExpo.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Other expositions'});
                });
                break;

              /* falls through */
              case "Concerts":
                concertsCat = true;
              /* falls through */
              case "Classical":
                thisRef.classique.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Classical'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "French song":
                thisRef.chansonFrancaise.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'French song'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Pop / Variety":
                thisRef.popVariete.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Pop / Variety'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Rock":
                thisRef.rock.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Rock'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Jazz":
                thisRef.jazz.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Jazz'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "World music":
                thisRef.musiquesDuMonde.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'World music'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Electronic":
                thisRef.electronique.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Electronic'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Folk":
                thisRef.folk.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Folk'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Hip-Hop":
                thisRef.hipHop.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Hip-Hop'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Reggae":
                thisRef.reggae.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Reggae'});
                });
                if (concertsCat != true){
                  break;
                }
                /* falls through */
              case "Other concert":
                thisRef.autreConcert.forEach(element => {
                  result.push({id: element.id, name: element.name,  cathegory: 'Other concert'});
                });
                break;
            }
          });
       
        return result;
      }
    }
  }
</script>