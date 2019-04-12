<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary class="white">
        <v-list two-line>
            <template v-for="(item, index) in menu">
              <v-list-tile :key="item.title" avatar ripple :to="item.link" @click="drawer = false">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < menu.length" :key="index"></v-divider>
            </template>
          </v-list>
      </v-navigation-drawer>      
      <v-toolbar class="white" fixed app>
        <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title" style="font-size: 5vw;"></v-toolbar-title>
        <img 
        src="https://cdn.discordapp.com/attachments/550304221342466071/560212107933777941/ParisGo9.png" style="width: 6vw;"/>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="item in menu"
            :key="item.id"
            :to="item.link"
            flat
          >{{ item.title }}</v-btn>
        </v-toolbar-items>

        <v-menu>
            <v-btn slot="activator" icon color="#00a8ff">
              <v-icon>face</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in getCorrectList()" v-bind:key="item.value">
                <v-list-tile-action>
                  <a v-on:click="logout(item.route)">
                    {{item.value}}
                  </a>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
        </v-menu>
      </v-toolbar>   
  </div>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'

export default {
  name: 'Toolbar',
  data () {
      return {
          drawer: false,

          title: "Paris",
          isAuthenticated: false,
          img: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png",
          menu: [
            { 
              id: 0,
              title: 'Home',
              link: '/'
            },
            { 
              id: 1,
              title: 'Calendar',
              link: '/calendar'
            },
            { 
              id: 2,
              title: 'Contact',
              link: '/contact'
            },
            { 
              id: 3,
              title: 'About',
              link: '/about' 
            }
          ]
      }
  },
  mounted() {
    var thisRef = this;
    this.isAuthenticated = AuthenticationManager.isAuthenticated();
    this.$root.$on('authenticated', () => {
      thisRef.isAuthenticated = true;
    })
    this.$root.$on('notauthenticated', () => {
      thisRef.isAuthenticated = false;
    })
  },
  methods: {
    getCorrectList(){
      if (this.isAuthenticated) {
        return [
          {value: "Logout", route: "/"}
          ];
      }else{
        return [
          {value: "Connection", route: "/login"}
          ];
      }
    },
    logout(path){
      this.$router.push(path);
      if (AuthenticationManager.isAuthenticated()) {
        AuthenticationManager.logout();
      }
    },
    menuItems () {
      return this.menu
    }
  }
}
</script>

<style scoped>
a { color: inherit; } 
</style>
