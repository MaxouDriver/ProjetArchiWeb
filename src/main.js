import Vue from 'vue';
import Header from './components/Header.vue';
import Map from './components/Map.vue';
import Content from './components/Content.vue';
import Separation from './components/Separation.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(Header),
}).$mount('#header')

new Vue({
  render: h => h(Content),
}).$mount('#content')

new Vue({
  render: h => h(Separation),
}).$mount('#sparation')

new Vue({
  render: h => h(Map),
}).$mount('#map')
