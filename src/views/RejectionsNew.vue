<template>
  <div class="new-rejection">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>New Permit Rejection Entry</h1>
          <form>
            <!-- <div class="form-row"> -->
              <div class="col">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="categorySelect" v-model="categorySelect">
                  <option v-for="category in categories">{{ category }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Sub Category</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="subCategorySelect">
                  <option v-for="subCategory in uniqueSubCategories">{{ subCategory }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Product</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="productSelect">
                  <option v-for="product in products">{{ product }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Office</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="officeSelect">
                  <option v-for="office in uniqueOffices">{{ office }}</option>
                </select>
              </div>
            <!-- </div> -->
            <!-- <div class="form-row"> -->
              <div class="col">
                <label for="exampleFormControlSelect1">State</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="stateSelect">
                  <option v-for="state in uniqueStates">{{ state }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">AHJ</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="ahjSelect">
                  <option v-for="ahj in uniqueAhjs">{{ ahj }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Level Reviewed</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="levelReviewedSelect">
                  <option v-for="level in levelsReviewed"> {{ level }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Rejection Source</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejectionSourceSelect">
                  <option v-for="rejectionSource in rejectionSources">{{ rejectionSource}}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Corrections Uploaded</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="correctionsUploadedSelect">
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Installation ID</label>
                <input class="form-control" id="exampleFormControlSelect1" v-model="installationIdSelect">                  
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Note</label>
                <input class="form-control" id="exampleFormControlSelect1" v-model="noteSelect">                  
              </div>
            <!-- </div> -->
            <br>
          </form>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      updatedResponse: {},
      categorySelect: "",
      subCategorySelect: "",
      productSelect: "",
      officeSelect: "",
      ahjSelect: "",
      stateSelect: "",
      levelReviewedSelect: "",
      rejectionSourceSelect: "",
      rejections: [],
      filteredRejections: [],
      correctionsUploadedSelect: "",
      installationIdSelect: "",
      noteSelect: "",
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
  methods: {
    submit: function() {
      var params = {
        category: this.categorySelect,
        sub_category: this.subCategorySelect,
        product: this.productSelect,
        office: this.officeSelect,
        state: this.stateSelect,
        ahj: this.ahjSelect,
        note: this.noteSelect,
        installation: this.installationIdSelect,
        level_reviewed: this.levelReviewedSelect,
        rejection_source: this.rejectionSourceSelect,
        corrections_uploaded: this.correctionsUploadedSelect,
      };
      console.log(params);
      axios
        .post("/api/rejections", params)
        .then(response => {
          this.$router.push("/rejections/" + response.data.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.status);
          this.status = error.response.status;
        });
    },
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

};
</script>