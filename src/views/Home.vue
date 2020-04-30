<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
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
    // console.log("this outside callback");
    // axios.get("/api/rejections").then(response => {
    //   console.log("this inside callback")
    //   console.log(response.data)
    //   this.rejections = response.data;
  },
  methods: {}
};
</script>
