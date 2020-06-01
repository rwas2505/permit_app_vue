<template>
  <div class="rejections-show" style="text-align: center; margin-top: 25px;">
    <div class="card" style="width: 54rem;">
      <div class="card-header" style="background-color: #343a40; color: DodgerBlue;">
        <h3>Permit Rejection Information </h3>
        <span v-on:click="toggleRejectionInfo" style="font-size:12px;">toggle info</span>
      </div>

      <div v-if="toggleInfo">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="background-color: #C0C0C0;">REJECTION ID: {{ rejection.id }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">product: {{ rejection.product }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">level_reviewed: {{ rejection.level_reviewed }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">rejection_source: {{ rejection.rejection_source }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">corrections_uploaded: {{ rejection.corrections_uploaded }}</li>
          <li class="list-group-item" style="background-color: #C0C0C0;">job_id: {{ rejection.job_id }}</li>
        </ul>
      </div>

      <hr>

      <div v-for="(category, index) in rejection.categories">
        <div class="card-header" style="background-color: #343a40; color: DodgerBlue;">
          <h4> Category {{index + 1}}: {{category.name}}</h4>
          <span v-on:click="toggleCategoryInfo" style="font-size:12px;">toggle info</span>
        </div>

        <div v-if="toggleCategory">
          <ul class="list-group list-group-flush">
          <div v-for="(subcategory, index) in rejection.subcategories">
            <div v-if="subcategory.category_id === category.id">
              <li class="list-group-item" style="background-color: #C0C0C0;">Subcategory {{index + 1}}: {{subcategory.name}}</li>
              <div v-for="(note, index) in rejection.notes">
                <div v-if="note.subcategory_id===subcategory.id">
                  <p>Note {{index + 1}}: {{note.text}}</p>
                </div>
              </div>
            </div>
          </div>
          </ul>
          <hr>
        </div>
      <hr>
      </div>
      <!-- <p>{{rejection.notes}}</p> -->
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
      toggleInfo: false,
      toggleCategory: false,
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
    toggleRejectionInfo: function() {
      this.toggleInfo = !this.toggleInfo;
      console.log(this.toggleInfo)
    },
    toggleCategoryInfo: function() {
      this.toggleCategory = !this.toggleCategory;
    }
  }
};
</script>