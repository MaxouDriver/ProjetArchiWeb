<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import AuthenticationManager from '../utils/AuthenticationManager.js'


export default {
  name: 'auth',
  mounted() {
    AuthenticationManager.setAuthUI("#firebaseui-auth-container");
  }
}
</script>

<style scoped>
  #firebaseui-auth-container{
    padding: 8vw;
  }
</style>