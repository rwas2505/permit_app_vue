<template>
  <div class="rejections-show" style="text-align: center; margin-top: 25px;">
    <!-- <h1>{{ rejection }}</h1> -->
      <p>installation: {{ rejection.installation }}</p>
      <p>category: {{ rejection.category }}</p>
      <p>sub_category: {{ rejection.sub_category }}</p>
      <p>product: {{ rejection.product }}</p>
      <p>office: {{ rejection.office }}</p>
      <p>state: {{ rejection.state }}</p>
      <p>ahj: {{ rejection.ahj }}</p>
      <p>note: {{ rejection.note }}</p>
      <p>level_reviewed: {{ rejection.level_reviewed }}</p>
      <p>rejection_source: {{ rejection.rejection_source }}</p>
      <p>corrections_uploaded: {{ rejection.corrections_uploaded }}</p>
      <!-- <img v-bind:src="`${rejection.upload_url}`"> -->
      <!-- <p>upload_url: {{rejection.upload_url}}</p> -->
      <div v-if="rejection.upload_array">
        <p><i class="far fa-file-pdf"></i> <a v-bind:href="`${rejection.upload_url}`"> View Correction Upload</a></p>  
        <!-- <p>arary: {{rejection.upload_array}}</p> -->
      </div>
      <p><a class="btn btn-primary" v-bind:href="`/rejections/${rejection.id}/edit`" role="button">Edit </a></p>
      <!-- <WebViewer :path="`${publicPath}lib`" :url="`${rejection.upload_url}`"/> -->
      <!-- <p><a style="color:Dodgerblue;">Job Link</a></p> --> 
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import WebViewer from '../components/WebViewer.vue';

export default {
  components: {
    WebViewer
  },
  data: function() {
    return {
      rejection: {},
      publicPath: process.env.BASE_URL,
    };
  },
  created: function() {
    console.log("this is in the created");
    axios.get('/api/rejections/' + this.$route.params.id).then(response => {
      console.log(response.data);
      this.rejection = response.data;
    }); 
  }
};
</script>