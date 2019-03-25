<template>
  <v-toolbar class="white">
          <v-toolbar-title v-text="title">
          </v-toolbar-title>

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
            <v-btn slot="activator" icon color="success">
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
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'

export default {
  name: 'Toolbar',
  data () {
      return {
          title: "ParisGo",
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
          {value: "Logout", route: "/"},
          {value: "Settings", route: "/"}
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
