<template>
  <h1>{{ text }}</h1>
</template>

<script>
export default {
  name: 'Separation',
  data () {
      return {
          text: "Ici des informations"
      }
  }
}
</script>

<style scoped>
    h1{
        margin: 10vw;
    }
</style>
