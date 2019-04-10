<template>
  <v-layout id="container">
    <v-flex xs14 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/Logo_Universit%C3%A9_du_Maine.svg.png?alt=media&token=1bc8ae55-5097-4bab-b2e8-e9557c747414"
          aspect-ratio="3.7"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Website Project</h3>
            <div> {{ card_text }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn href="/" flat color="orange">Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default{
  data () {
    return {
      card_text: 'This website was created for a university project. It was designed to help the tourist visiting Paris. This app can help you to organised yourself during your tour and help you to find what you want. It was firstly designed for the tourists but even locals can use it so help yourself and enjoy Paris !'
    }
  }
}
</script>

<style scoped>
  #container{
    padding: 8vw;
  }
</style>
