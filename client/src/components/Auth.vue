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