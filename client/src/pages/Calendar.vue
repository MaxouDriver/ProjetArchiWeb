<template>
    <section>
      <v-layout id="container">
        <v-flex v-if="isAuthenticated">
          <v-sheet height="100%">
            <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
            <v-calendar ref="calendar" :now="today" :value="today" color="primary" type="week">
              <!-- the events at the top (all-day) -->
              <template v-slot:dayHeadere="{ date }">
                <template v-for="event in eventsMap[date]">
                  <!-- all day events don't have time -->
                  <div v-if="!event.time" :key="event.title" class="my-event" @click="open(event)" v-html="event.title"></div>
                </template>
              </template>
              <!-- the events at the bottom (timed) -->
              <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                <template v-for="event in eventsMap[date]">
                  <!-- timed events -->
                  <div v-if="event.time" :key="event.title" :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                    class="my-event with-time" @click="open(event)" v-html="event.title"></div>
                </template>
              </template>
            </v-calendar>
          </v-sheet>
        </v-flex>

        <v-flex v-if="!isAuthenticated">
          <h1>You need to be authenticated to get a planning</h1>
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
      today: '2019-03-27',
      events: []
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


      DataManager.getPlanning(AuthenticationManager.getUserId(), 
        function(data){
          thisRef.events = data;
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
      open (event) {
        alert(event.title)
      }
    }
  }

</script>


<style scoped>
  #container{
    padding: 4vw;
  }
  .my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #fff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

</style>