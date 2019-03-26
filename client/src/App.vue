<template> 
  <v-app light>
    <Toolbar/>
    <router-view></router-view> 
    <Footer/>
  </v-app>
</template> 
d
<script> 
import Toolbar from './components/Toolbar.vue';
import Footer from './components/Footer.vue';

  export default { 
    name: 'App',
    components: {
      Toolbar, Footer
    }
  }
</script>