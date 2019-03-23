<template>
    <v-carousel>
        <v-carousel-item v-for="(n, k) in news" v-bind:key="k">
            <New
                :title="n.title"
                :source="n.source"
                :description="n.description"
                :date="n.date"
                :url="n.url"
                :image="n.image"/>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import New from './New.vue';
import DataManager from '../utils/DataManager';

export default {
  name: 'News',
  components: {
      New
    },
  data (){
    return {
      news: []
    }
  },
    mounted() {
        this.initNews();
    },
    methods: {
        initNews(){
            var thisRef = this;
            DataManager.getNews(
                function(res){
                    res.articles.forEach(element => {
                        thisRef.news.push(
                            {
                                title: element.title, 
                                source: element.source.name,
                                description : element.description,
                                date: element.publishedAt,
                                url: element.url,
                                image: element.urlToImage
                            }
                        );
                    });
                
                },function(err){
                    thisRef.err = err;
                }
            );
        }
    }
}
</script>

<style scoped>
  
</style>
