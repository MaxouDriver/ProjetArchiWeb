<template>
  <v-app light>
    <Toolbar/>
    <v-content>
      <section>
        <Header/>
      </section>
      <section>
         <Content/>
      </section>
      <section>
        <Separator title="Enjoy your trip, by planning every days" 
        subtitle="Be aware of the weather !" 
        image="https://firebasestorage.googleapis.com/v0/b/projetarchiweb-c206d.appspot.com/o/cobblestones-393455_1920.jpg?alt=media&token=d728ef8e-d87a-478b-b96a-b8be68fdb84a"/>
      </section>
      <v-footer class="blue darken-2">
        <Footer/>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import Toolbar from '../components/Toolbar.vue';
  import Header from '../components/Header.vue';
  import Content from '../components/Content.vue';
  import Separator from '../components/Separator.vue';
  import Footer from '../components/Footer.vue';

  export default{
    components: {
      Toolbar,Header,Content,Separator,Footer
    },
    data(){
      return {
      }
    }
  }
 </script>
