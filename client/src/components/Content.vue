<template>
  <h1>{{ text }}</h1>
</template>

<script>
export default {
  name: 'Content',
  data () {
      return {
          text: "Ici les informations relatives à la météo"
      }
  }
}
</script>

<style scoped>
    h1{
        margin: 10vw;
    }
</style>
