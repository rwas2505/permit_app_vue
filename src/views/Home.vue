<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <a class="nav-link" href="/rejections/new">Enter a New Rejection</a>
    <a class="nav-link" href="/rejections">View All Rejections</a>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Welcome to the home page!",
      rejections: []
    };
  },
  methods: {}
};
</script>
