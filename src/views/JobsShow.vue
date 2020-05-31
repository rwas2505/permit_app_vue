<template>
  <div class="jobs-show" style="text-align: center; margin-top: 25px;">
    <div class="card" style="width: 54rem;">
      <div class="card-header" style="background-color: #343a40; color: #C0C0C0;">
        <h3> <a v-bind:href="`/jobs`" class="fas fa-clipboard-check" style="font-size: 48px; color: Dodgerblue;"></a></h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="background-color: #C0C0C0;">installation id: {{ job.installation_id }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">job number: {{ job.job_number }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">state: {{ job.state }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">ahj: {{ job.ahj }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">office: {{ job.office }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">rejection count: {{ job.rejection_count }}</li>
        <div v-for="(rejection, index) in job.rejections">
          <li class="list-group-item" style="background-color: #343a40;"></li>
        <li class="list-group-item" style="background-color: #C0C0C0;"><a v-bind:href="`/rejections/${rejection.id}`">Rejection {{index + 1}}</a></li>
          <li class="list-group-item" style="background-color: #C0C0C0;">Date Entered: {{ rejection.create_at | moment }}
</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">id: {{ rejection.id }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">product: {{ rejection.product }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">level reviewed: {{ rejection.level_reviewed }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">rejection source: {{ rejection.rejection_source }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">corrections uploaded?: {{ rejection.corrections_uploaded }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">categories: {{ rejection.categories }}</li>
        </div>
      </ul>
    </div>
    <!-- <p><a class="btn btn-primary" v-bind:href="`/jobs/${job.id}/edit`" role="button">Edit </a></p> -->
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import WebViewer from '../components/WebViewer.vue';
import moment from 'moment';


export default {
  components: {
    WebViewer,
  },
  data: function() {
    return {
      job: {},
      publicPath: process.env.BASE_URL,
    };
  },
  created: function() {
    console.log("this is in the created");
    axios.get('/api/jobs/' + this.$route.params.id).then(response => {
      console.log(response.data);
      this.job = response.data;
    }); 
  },
  methods: {
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM Do YYYY');
    }
  }
};
</script>