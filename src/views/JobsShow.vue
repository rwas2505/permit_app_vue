<template>
  <div class="jobs-show" style="text-align: center; margin-top: 25px;">
    <div class="card" style="width: 54rem;">
      <div class="card-header" style="background-color: #343a40; color: DodgerBlue;">
        <h3> JB-{{job.job_number}}-00</h3>
        <span v-on:click="toggleJobInfo" style="font-size:12px;">toggle job info</span>
      </div>

      <ul class="list-group list-group-flush">
        <div v-if="showJobInfo">
          <li class="list-group-item" style="background-color: #C0C0C0;"><a href="(/jobs)">https://grid.com/installations/{{ job.installation_id }}</a></li>
          <li class="list-group-item" style="background-color: #C0C0C0;">State: {{ job.state }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">Ahj: {{ job.ahj }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">Office: {{ job.office }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">Rejection count: {{ job.rejection_count }}</li>
        </div>
        <hr>
        
          <div v-for="(rejection, index) in job.rejections">
      
            <div class="card-header" style="background-color: #343a40; color: DodgerBlue;">
              <h4><a v-bind:href="`/rejections/${rejection.id}`">Rejection {{index + 1}}</a></h4>
              <span v-on:click="toggleRejectionInfo" style="font-size:12px;">toggle rejection info</span>
            </div>
  


            <div v-if="rejection.id === rejectionId">
              <li class="list-group-item" style="background-color: #C0C0C0;">Date Entered: {{ rejection.create_at | moment }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">id: {{ rejection.id }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">product: {{ rejection.product }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">level reviewed: {{ rejection.level_reviewed }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">rejection source: {{ rejection.rejection_source }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">corrections uploaded?: {{ rejection.corrections_uploaded }}</li>
              <li class="list-group-item" style="background-color: #C0C0C0;">categories: {{ rejection.categories }}</li>
            </div>
            <hr>
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
      showJobInfo: true,
      showRejectionInfo: false,
      rejectionId: null,
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
    toggleJobInfo: function() {
      this.showJobInfo = !this.showJobInfo;
      console.log("showJobInfo: " + this.showJobInfo);
    },
    toggleRejectionInfo: function() {
      this.rejectionId = this.rejection.id;
      console.log("showRejectionInfo: " + this.showRejectionInfo);
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format('MMMM Do YYYY');
    }
  }
};
</script>