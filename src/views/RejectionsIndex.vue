<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="rejection in rejections">
      <p>id: {{ rejection.id }}</p>
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
      <hr>
      <hr>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the index page!",
      rejections: []
    };
  },
  created: function() {
    console.log('in the created');
    console.log("this is outside the callback");
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the callback");
      console.log(response.data);
      this.rejections = response.data;
    });
  },
  methods: {}
};
</script>
