<template>
    <v-parallax :src="image" height="380">
        <v-layout column align-center justify-center>
        <div class="headline white--text mb-3 text-xs-center">Enjoy your trip, by planning every days</div>
        <em>Be aware of the weather !</em>
        </v-layout>
    </v-parallax>
</template>

<script>
export default {
  name: 'Separator',
  props: {
    title: String,
    subtitle: String,
    image: String
  }
}
</script>
