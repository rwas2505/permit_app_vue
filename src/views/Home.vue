<template>
  <div class="home">
    <section id="chartHead" style="text-align:center;" class="wrapper style1">
      <div class="container">
        <div id="content">
          <article>
            <header>
              <h1>Interactive Permit Databse</h1>
            </header>
          </article>
        </div>
      </div>
    </section>
    <section class="wrapper style1">
      <div class="container">
        <div class="row gtr-200">
          <section class="col-4 col-12-narrower">
            <div class="box highlight">
              <span style="font-size: 96px; color: Dodgerblue;">
                <a id="sun" class="fas fa-atom" href="/rejections/new"></a>
              </span>
              <h3>Enter a New Rejection</h3>
            </div>
          </section>
          <section class="col-4 col-12-narrower">
            <div class="box highlight">
              <span style="font-size: 96px; color: Dodgerblue;">
                <a id="sun" class="fas fa-sun" href="/rejections"></a>
              </span>
              <h3>View All Rejections</h3>
            </div>
          </section>
          <section class="col-4 col-12-narrower">
            <div class="box highlight">
              <span style="font-size: 96px; color: Dodgerblue;">
                <a id="sun" class="fas fa-solar-panel" href="/charts"></a>
              </span>
              <h3>View Charts</h3>
            </div>
          </section>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      rejections: []
    };
  },
  methods: {}
};
</script>
