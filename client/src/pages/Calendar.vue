<template>
    <section>
      <v-layout id="container">
        <v-flex v-if="isAuthenticated">
          <v-sheet height="100%">
            <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
            <v-calendar ref="calendar" :now="today" :value="today" color="primary" type="week">
              <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                <template v-for="event in eventsMap[date]">
                  <div v-if="event.time" :key="event.id" :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px', backgroundColor: event.color}"
                    class="my-event with-time" @click="open(event)" v-html="event.title"></div>
                </template>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>

        <v-flex v-if="!isAuthenticated">
          <v-card class="mx-auto" max-width="400">
            <v-card-title>
              <span class="title font-weight-light">Oops</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              You need to be authenticated to get a planning
            </v-card-text>

            <v-card-actions>
              <v-btn class="blue lighten-2 mt-5" dark block v-on:click="connect()">
                {{buttonName}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </section>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'
import DataManager from '../utils/DataManager.js'
  export default {
    data: () => ({
      isAuthenticated: false,
      today: '1998-03-27',
      events: [],
      buttonName: "Connection"
    }),
    mounted() {
      var thisRef = this;
      
      this.isAuthenticated = AuthenticationManager.isAuthenticated();
      this.$root.$on('authenticated', () => {
        thisRef.isAuthenticated = true;
      })
      this.$root.$on('notauthenticated', () => {
        thisRef.isAuthenticated = false;
      })

      var current = new Date();
      var dd = String(current.getDate()).padStart(2, '0');
      var mm = String(current.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = current.getFullYear();

      this.today = yyyy + '-' + mm + '-' + dd;

      DataManager.getPlanning(AuthenticationManager.getUserId(), 
        function(data){
          thisRef.events = [];
          var eventToAdd = {};
          var idForRender = 0;

          var tempEvent = [];
        
          data.forEach(function(d){
            for (var date in d) {
              for (var moment in d[date]) {
                for (var event in d[date][moment]) {
                  eventToAdd.id = idForRender++;
                  eventToAdd.date = date;
                  
                  for (var item in d[date][moment][event]) {
                    eventToAdd[item] = d[date][moment][event][item];
                  }
                  tempEvent.push(eventToAdd);
                  eventToAdd = {};
                }   

                var nbOfEvent = tempEvent.length;
                var startTime = undefined;
                var i = 0;
                var color = undefined;

                switch(moment){
                  case "Morning":
                    startTime = 6;
                    color = "#BBDEFB";
                    break;
                  case "Afternoon":
                    startTime = 12;
                    color = "#EF9A9A";
                    break;
                  case "Evening":
                    startTime = 18;
                    color = "#CE93D8";
                    break;
                  case "Night":
                    startTime = 0;
                    color = "#546E7A";
                    break;
                }

                tempEvent.forEach(function(event){
                  event.color = color;
                  event.duration = 360 / nbOfEvent;
                  event.time = startTime + (event.duration / 60 * i++) + ":00";
                  thisRef.events.push(event);
                });

                tempEvent = [];

              }
            }   
          });
        },
        function(){
          
        }
      );
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      }
    },
    methods: {
      connect () {
        this.$router.push("/login");
      },
      open (event) {
        alert(event.title)
      }
    }
  }

</script>


<style scoped>
  #container{
    padding: 8vw;
  }
  .my-event {
    border: 2px solid rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
    left: 4px;
    padding: 8px;
    position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

</style>