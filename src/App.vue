<template>
  <div id="app">
    <div id="header">

      <!-- Logo -->
        <h1 id="logo"><img height="130" width="130" src="https://www.mendocinocounty.org/home/showimage?id=1179">Permit DB</h1>

      <!-- Nav -->
        <nav id="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rejections">All</a></li>
            <li><a href="/rejections/new">New</a></li>
            <li>
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Charts</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="color:#37c0fb; background-color:#333">
                <a class="dropdown-item" href="/data/location" style="color:#C0C0C0;">State</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/data/ahj" style="color:#C0C0C0;">AHJ</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/data/category" style="color:#C0C0C0;">Category</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/data/product" style="color:#C0C0C0;">Product</a>
              </div>
            </li>
          </ul>
        </nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      categoryFilter: ""
    };
  },
  created: function() {
  },
  methods: {
  },
};
</script>
