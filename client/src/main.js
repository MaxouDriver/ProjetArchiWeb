import Vue from 'vue';
import Vuetify from 'vuetify'
import Vuefire from 'vuefire'
import 'vuetify/dist/vuetify.min.css'
import '../node_modules/firebaseui/dist/firebaseui.css'

import AuthenticationManager from './utils/AuthenticationManager.js'

import App from './App.vue'
import firebaseui from 'firebaseui'
import VueRouter from 'vue-router'
import routes from './routes.js'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(VueRouter)
Vue.use(Vuefire)
Vue.use(Vuetify)
Vue.use(firebaseui)
Vue.config.productionTip = false

const router = new VueRouter({mode: 'history', routes});

Vue.use(router);

new Vue({
  render: h => h(App),
  router,
  created() {
    var thisRef = this;
    AuthenticationManager.init(function(){
      thisRef.$root.$emit('authenticated')
    },function(){
      thisRef.$root.$emit('notauthenticated')
    })
  }
}).$mount('#app')
