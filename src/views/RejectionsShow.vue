<template>
  <div class="rejections-show">
    <h1>{{ message }}</h1>
    <h1>{{ rejection }}</h1>
    <a class="btn btn-primary" v-bind:href="`/rejections/${rejection.id}/edit`" role="button">Edit </a>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the Show Page",
      rejection: {}
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