<template>
  <div id="app">
    <div id="header">

      <!-- Logo -->
        <h1 id="logo"><img height="130" width="130" src="https://www.mendocinocounty.org/home/showimage?id=1179">Permit DB</h1>

      <!-- Nav -->
        <nav id="nav">
          <ul>
            <li class="current"><a href="/">Home</a></li>
            <li>
              <a href="#">Dropdown</a>
              <ul>
                <li><a href="#">Lorem dolor</a></li>
                <li><a href="#">Magna phasellus</a></li>
                <li><a href="#">Etiam sed tempus</a></li>
                <li>
                  <a href="#">Submenu</a>
                  <ul>
                    <li><a href="#">Lorem dolor</a></li>
                    <li><a href="#">Phasellus magna</a></li>
                    <li><a href="#">Magna phasellus</a></li>
                    <li><a href="#">Etiam nisl</a></li>
                    <li><a href="#">Veroeros feugiat</a></li>
                  </ul>
                </li>
                <li><a href="#">Veroeros feugiat</a></li>
              </ul>
            </li>
            <li><a href="left-sidebar.html">Left Sidebar</a></li>
            <li><a href="right-sidebar.html">Right Sidebar</a></li>
            <li><a href="two-sidebar.html">Two Sidebar</a></li>
            <li><a href="no-sidebar.html">No Sidebar</a></li>
          </ul>
        </nav>

    </div>


    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Permit App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/rejections">All</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/rejections/new">New</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Charts
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/data/location">Rejections By State</a>
              <a class="dropdown-item" href="/data/category">Rejections By Category</a>
              <!-- <div class="dropdown-divider"></div> -->
              <!-- <a class="dropdown-item" href="/data/product">Rejections By Product</a>
              <a class="dropdown-item" href="/data/ahj">Rejections By AHJ</a>
            </div>
          </li>
        </ul> -->
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="categoryFilter">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
        </form> -->
      <!-- </div>
    </nav>  -->
    <router-view/>
    <div id="footer">
      <div class="container">
        <div class="row">
          <section class="col-3 col-6-narrower col-12-mobilep">
            <h3>Links to Stuff</h3>
            <ul class="links">
              <li><a href="#">Mattis et quis rutrum</a></li>
              <li><a href="#">Suspendisse amet varius</a></li>
              <li><a href="#">Sed et dapibus quis</a></li>
              <li><a href="#">Rutrum accumsan dolor</a></li>
              <li><a href="#">Mattis rutrum accumsan</a></li>
              <li><a href="#">Suspendisse varius nibh</a></li>
              <li><a href="#">Sed et dapibus mattis</a></li>
            </ul>
          </section>
          <section class="col-3 col-6-narrower col-12-mobilep">
            <h3>More Links to Stuff</h3>
            <ul class="links">
              <li><a href="#">Duis neque nisi dapibus</a></li>
              <li><a href="#">Sed et dapibus quis</a></li>
              <li><a href="#">Rutrum accumsan sed</a></li>
              <li><a href="#">Mattis et sed accumsan</a></li>
              <li><a href="#">Duis neque nisi sed</a></li>
              <li><a href="#">Sed et dapibus quis</a></li>
              <li><a href="#">Rutrum amet varius</a></li>
            </ul>
          </section>
          <section class="col-6 col-12-narrower">
            <h3>Get In Touch</h3>
            <form>
              <div class="row gtr-50">
                <div class="col-6 col-12-mobilep">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div class="col-6 col-12-mobilep">
                  <input type="email" name="email" id="email" placeholder="Email" />
                </div>
                <div class="col-12">
                  <textarea name="message" id="message" placeholder="Message" rows="5"></textarea>
                </div>
                <div class="col-12">
                  <ul class="actions">
                    <li><input type="submit" class="button alt" value="Send Message" /></li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      <!-- Icons -->
        <ul class="icons">
          <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
          <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
          <li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
          <li><a href="#" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
          <li><a href="#" class="icon brands fa-google-plus-g"><span class="label">Google+</span></a></li>
        </ul>

      <!-- Copyright -->
        <div class="copyright">
          <ul class="menu">
            <li>&copy; Untitled. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
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
      categoryFilter: ""
    };
  },
  created: function() {
  },
  methods: {
  },
};
</script>
