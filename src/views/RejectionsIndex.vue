<template>
  <div class="rejections-index">
    
    <h1>{{ message }}</h1>
    
    <!-- <input v-model="searchCategory"> -->
    <button v-on:click="filter()" type="button" class="btn btn-outline-secondary">Filter Options</button>
    <div v-if="showFilter">
      <ul class="nav justify-content-center">
        <form>
          <div class="form-row">
            <div class="col">
              <label for="exampleFormControlSelect1">Category</label>
              <select class="form-control" id="categorySelect">
                <option></option>
                <option v-for="category in categories">{{ category }}</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>try to only display sub categories that match category?</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Product</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option v-for="product in products">{{ product }}</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Office</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>Only pull from seeded offices</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <label for="exampleFormControlSelect1">State</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>Only pull from seeded states</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">AHJ</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>Only pull from seeded AHJs</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Level Reviewed</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option v-for="level in levelsReviewed"> {{ level }}</option>
              </select>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Rejection Source</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option v-for="rejectionSource in rejectionSources">{{ rejectionSource}}</option>
              </select>
            </div>
          </div>
        </form>
      </ul>
    </div>
    <hr>
    <!-- <div v-for="rejection in rejections"> -->
    <div v-for="rejection in filterBy(rejections, searchCategory, 'category')">
      <p><a v-bind:href="`/rejections/${rejection.id}`"> id: {{ rejection.id }}</a></p>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to the index page!",
      rejections: [],
      searchCategory: "",
      showFilter: false,
      categories: [
        "Design Electrical",
        "Design Layout",
        "Design Planset Edits",
        "Design Resources",
        "Design Restrictions", 
        "Design Structural", 
        "Generic Design Planset Requirements", 
        "SolarRoof Requirements"
      ],
      products: [
        "Solar Roof", 
        "Powerwall", 
        "Flat Plate"
      ],
      levelsReviewed: [
        "When submitting, AHJ would NOT allow submittal", 
        "Submitted successfully, received rejection", 
        "Online submittal method required additional info that was not available",
      ],
      rejectionSources: [
        "New AHJ Requirement",	
        "Unique Requirement",	
        "Unknown Source",	
        "Incorrect AHJ Assigned",	
        "Conditional AHJ Approval",	
        "PIDM Review", 
        "As Built Does Not Match Approved Plans"
      ]
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
  methods: {
    filter: function() {
      this.showFilter = !this.showFilter;
    }
  }
};

</script>
