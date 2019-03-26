<template>
  <div>
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
      <section>
        <News/>
      </section>
    </v-content>
  </div>
</template>

<script>
  import Header from '../components/Header.vue';
  import Content from '../components/Content.vue';
  import Separator from '../components/Separator.vue';
  import News from '../components/News.vue';

  export default{
    components: {
      Header,Content,Separator,News
    },
    data(){
      return {
      }
    }
  }
 </script>
