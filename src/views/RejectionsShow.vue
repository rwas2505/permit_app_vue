<template>
  <div class="rejections-show" style="text-align: center; margin-top: 25px;">
    <div class="card" style="width: 54rem;">
      <div class="card-header" style="background-color: #343a40; color: #C0C0C0;">
        <h3> <a v-bind:href="`/rejections`" class="fas fa-clipboard-check" style="font-size: 48px; color: Dodgerblue;"></a></h3>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="background-color: #C0C0C0;">REJECTION ID: {{ rejection.id }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">product: {{ rejection.product }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">level_reviewed: {{ rejection.level_reviewed }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">rejection_source: {{ rejection.rejection_source }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">corrections_uploaded: {{ rejection.corrections_uploaded }}</li>
        <li class="list-group-item" style="background-color: #C0C0C0;">job_id: {{ rejection.job_id }}</li>
      </ul>
      <hr>
      <div v-for="(category, index) in rejection.categories">
        <div class="card-header" style="background-color: #343a40; color: #C0C0C0;">
          <h3> Category {{index + 1}}: {{category.name}}</h3><h6>id:{{category.id}}</h6>
        </div>
        <ul class="list-group list-group-flush">
        <div v-for="(subcategory, index) in rejection.subcategories">
          <div v-if="subcategory.category_id === category.id">
            <li class="list-group-item" style="background-color: #C0C0C0;">Subcategory {{index + 1}}: {{subcategory.name}}</li>
          </div>
        </div>
        </ul>
        <hr>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import WebViewer from '../components/WebViewer.vue';

export default {
  components: {
    WebViewer
  },
  data: function() {
    return {
      rejection: {},
      publicPath: process.env.BASE_URL,
      number: 0,
    };
  },
  created: function() {
    console.log("this is in the created");
    axios.get('/api/rejections/' + this.$route.params.id).then(response => {
      console.log(response.data);
      this.rejection = response.data;
    }); 
  },
  methods: {
    // increment: function() {
    //   this.number++;
    // }
  }
};
</script>