import Vue from 'vue';
import Home from './pages/Home.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.config.productionTip = false

new Vue({
  render: h => h(Home),
}).$mount('#app')
