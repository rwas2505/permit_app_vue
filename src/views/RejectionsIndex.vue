<template>
  <div class="rejections-index">
    <h1>{{ message }}</h1>
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
                  <option v-for="subCategory in uniqueSubCategories">{{ subCategory }}</option>
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
                  <option v-for="office in uniqueOffices">{{ office }}</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <label for="exampleFormControlSelect1">State</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="stateSelect">
                  <option>All</option>
                  <option v-for="state in uniqueStates">{{ state }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">AHJ</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="ahjSelect">
                  <option>All</option>
                  <option v-for="ahj in uniqueAhjs">{{ ahj }}</option>
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
          </form>
        </ul>
      </div>
    <hr>
    <p>Total number of entries: {{rejections.length}}</p>
    <p>Number of filtered results: {{filteredRejections.length}}</p>
    <p>Filtered results as a precentage of total: {{((filteredRejections.length/rejections.length)*100).toFixed(2)}}%</p>
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
        "Flat Plate",
        "Powerwall", 
        "Solar Roof" 
      ],
      levelsReviewed: [
        "Online submittal method required additional info that was not available",
        "Submitted successfully, received rejection", 
        "When submitting, AHJ would NOT allow submittal", 
      ],
      rejectionSources: [
        "As Built Does Not Match Approved Plans",
        "Conditional AHJ Approval",	
        "Incorrect AHJ Assigned",	
        "New AHJ Requirement",	
        "PIDM Review", 
        "Unique Requirement",	
        "Unknown Source",	
      ],
      uniqueStates: [],
      uniqueAhjs: [],
      uniqueOffices: [],
      uniqueSubCategories: []
    };
  },
  created: function() {
    console.log('in the created');
    // console.log("this is outside the callback");
    axios.get("/api/rejections").then(response=> {
      // console.log("this is inside the callback");
      console.log(response.data);
      this.rejections = response.data;
      this.makeStatesArray();
      this.makeAhjsArray();
      this.makeOfficesArray();
      this.makeSubCategoriesArray();
    });
  },
  methods: {
    makeOfficesArray: function() {
      var offices = [];
      // add an instance of office for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        offices.push(rejection.office);
      });

      // create an array with only unique offices sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueOffices = offices.filter( onlyUnique ).sort();
      // console.log(this.uniqueOffices);
    },
    makeSubCategoriesArray: function() {
      var subCategories = [];
      // add an instance of sub_category for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        subCategories.push(rejection.sub_category);
      });

      // create an array with only unique sub_categories sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueSubCategories = subCategories.filter( onlyUnique ).sort();
      // console.log(this.uniqueSubCategories);
    },

    makeStatesArray: function() {
      var states = [];
      // add an instance of state for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        states.push(rejection.state);
      });

      // create an array with only unique states sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueStates = states.filter( onlyUnique ).sort();
    },
    makeAhjsArray: function() {

      var ahjs = [];
      // add an instance of an ahj for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        ahjs.push(rejection.ahj);
      });

      // create an array with only unique ahjs sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueAhjs = ahjs.filter( onlyUnique ).sort();
    },
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
      if (this.levelReviewedSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.level_reviewed === this.levelReviewedSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
      if (this.rejectionSourceSelect !== 'All') {
        const filtered = this.filteredRejections.filter(entry => entry.rejection_source === this.rejectionSourceSelect);
        // console.log(filtered);
        this.filteredRejections = filtered;
      }
    }
  }
};
</script>



