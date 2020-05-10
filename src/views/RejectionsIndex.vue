<template>
  <div class="rejections-index">
    
    <h1>{{ message }}</h1>
    
    <!-- <label>Category</label><input v-model="searchCategory">
    <br>
    <label>Product</label><input v-model="searchProduct"> -->
    <button v-on:click="filterOptions()" type="button" class="btn btn-outline-secondary">Hide/Show Filters</button>
      <div v-if="showFilter">
        <ul class="nav justify-content-center">
          <form>
            <div class="form-row">
              <div class="col">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="categorySelect" v-model="categorySelect">
                  <option>All</option>
                  <option v-for="category in categories">{{ category }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Sub Category</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="subCategorySelect">
                  <option>All</option>
                  <!-- <option>try to only display sub categories that match category?</option> -->
                  <option>Best Practices</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Product</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="productSelect">
                  <option>All</option>
                  <option v-for="product in products">{{ product }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Office</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="officeSelect">
                  <option>All</option>
                  <option>Norristown</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <label for="exampleFormControlSelect1">State</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="stateSelect">
                  <option>All</option>
                  <option>PA</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">AHJ</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="ahjSelect">
                  <option>All</option>
                  <!-- <option>Only pull from seeded AHJs</option> -->
                  <option>Borough of Middletown (PA)</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Level Reviewed</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="levelReviewedSelect">
                  <option>All</option>
                  <option v-for="level in levelsReviewed"> {{ level }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Rejection Source</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejectionSourceSelect">
                  <option>All</option>
                  <option v-for="rejectionSource in rejectionSources">{{ rejectionSource}}</option>
                </select>
              </div>
            </div>
              <br>
              <button v-on:click="applyFilter()" type="button" class="btn btn-outline-secondary">Apply Filter</button> 
              <!-- display selected options for testing -->
              <p>Category: {{ categorySelect }}</p>     
              <p>Product: {{ productSelect }}</p>     
          </form>
        </ul>
      </div>
    <hr>
    <!-- <div v-for="rejection in rejections">
      <div v-if="rejection.category === categorySelect">
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
    </div> -->
    <div v-for="rejection in filteredRejections">
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
      message: "All Entries Live Here",
      categorySelect: "All",
      subCategorySelect: "All",
      productSelect: "All",
      officeSelect: "All",
      ahjSelect: "All",
      stateSelect: "All",
      levelReviewedSelect: "All",
      rejectionSourceSelect: "All",
      rejections: [],
      filteredRejections: [],
      searchCategory: "",
      searchProduct: "",
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
    filterOptions: function() {
      this.showFilter = !this.showFilter;
    },
    applyFilter: function() {
      console.log('applying filter...');
      // reset filteredRejections array to unfiltered rejections array
      this.filteredRejections = this.rejections;

      if (this.categorySelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.category === this.categorySelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.stateSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.state === this.stateSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.productSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.product === this.productSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.subCategorySelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.sub_category === this.subCategorySelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.officeSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.office === this.officeSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.ahjSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.ahj === this.ahjSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
    }
  }
};


// when clicking apply filter:

// v-on:change instead of clicking apply filter for select box
</script>



levelReviewedSelect
rejectionSourceSelect

