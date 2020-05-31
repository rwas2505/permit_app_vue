<template>  
  <div class="jobs-index">
    <section class="wrapper style1" style="text-align: center;">
      <h1> {{ message }} </h1>
      <div v-for="job in jobs"> 
        <a style="color:blue;" v-bind:href="`/jobs/${job.id}`">{{job.installation_id}}</a>
        <br></br>
        <p>job number: {{job.job_number }}</p>
        <p>state: {{job.state }}</p>
        <p>ahj: {{job.ahj }}</p>
        <p>office: {{job.office }}</p>
        <p>rejection count: {{ job.rejections }}</p>
        <p>
        <hr>
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      jobs: [],
      message: "All Entries",
    };
  },
  created: function() {
    console.log('in the created');
    // console.log("this is outside the callback");
    axios.get("/api/jobs").then(response=> {
      console.log("this is inside the callback");
      console.log(response.data);
      this.jobs = response.data;
    });
  },
  methods: {
  }
};
</script>



