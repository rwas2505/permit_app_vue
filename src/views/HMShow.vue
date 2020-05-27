<template>
  <div class="rejections-show" style="text-align: center; margin-top: 25px;">
    <div class="card" style="width: 54rem;">
      <div class="card-header" style="background-color: #343a40; color: #C0C0C0;">
        <h3> <a v-bind:href="`/rejections`" class="fas fa-clipboard-check" style="font-size: 48px; color: Dodgerblue;"></a></h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="background-color: #C0C0C0;">id: {{ rejection.id }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">installation: {{ rejection.installation }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">category: {{ rejection.category }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">sub_category: {{ rejection.sub_category }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">product: {{ rejection.product }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">office: {{ rejection.office }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">state: {{ rejection.state }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">ahj: {{ rejection.ahj }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">note: {{ rejection.note }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">level_reviewed: {{ rejection.level_reviewed }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">rejection_source: {{ rejection.rejection_source }}</li>
        <div v-if="rejection.upload_array">
          <li class="list-group-item"><i class="far fa-file-pdf"></i> <a v-bind:href="`${rejection.upload_url}`"> View Correction Upload</a></li>  
        </div>
      </ul>
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