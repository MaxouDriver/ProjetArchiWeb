<template>
  <v-toolbar class="white">
          <v-toolbar-title v-text="title">
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-menu>
            <v-btn slot="activator" icon color="success">
              <v-icon>face</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in getCorrectList()" v-bind:key="item.value">
                <v-list-tile-action>
                  <v-btn v-on:click="logout(item.route)">
                    {{item.value}}
                  </v-btn>
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
          title: "PArchi",
          isAuthenticated: false,
          img: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
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
        return [{
              value: "Logout",
              route: "/"
            }];
      }else{
        return [{
              value: "Connection",
              route: "/login"
            }];
      }
    },
    logout(path){
      this.$router.push(path);
      if (AuthenticationManager.isAuthenticated()) {
        AuthenticationManager.logout();
      }
    }
  }
}
</script>

<style scoped>
</style>
