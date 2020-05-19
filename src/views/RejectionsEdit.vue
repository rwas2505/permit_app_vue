<template>
  <div class="edit-rejection" >
    <div class="container">
      <form v-on:submit.prevent="submit()">
          <form>
            <br>
            <div style="background-color: #C0C0C0;" >
            <h1 style="color: #343a40;"> <i class="fas fa-edit" style="color: Dodgerblue; padding-left: 2%;"></i> Edit Rejection</h1>
              <div class="col">
                <label for="exampleFormControlSelect1">Category</label>
                <select class="form-control" id="categorySelect" v-model="rejection.category">
                  <option v-for="category in categories">{{ category }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Sub Category</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.sub_category">
                  <option v-for="subCategory in uniqueSubCategories">{{ subCategory }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Product</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.product">
                  <option v-for="product in products">{{ product }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Office</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.office">
                  <option v-for="office in uniqueOffices">{{ office }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">State</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.state">
                  <option v-for="state in uniqueStates">{{ state }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">AHJ</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.ahj">
                  <option v-for="ahj in uniqueAhjs">{{ ahj }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Level Reviewed</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.level_reviewed">
                  <option v-for="level in levelsReviewed"> {{ level }}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Rejection Source</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="rejection.rejection_source">
                  <option v-for="rejectionSource in rejectionSources">{{ rejectionSource}}</option>
                </select>
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Installation ID</label>
                <input class="form-control" id="exampleFormControlSelect1" v-model="rejection.installation">                  
              </div>
              <div class="col">
                <label for="exampleFormControlSelect1">Note</label>
                <input class="form-control" id="exampleFormControlSelect1" v-model="rejection.note">                  
              </div>
              <br>
             <br>
            </div>
          </form>
          <div class="container">
          <input type="submit" class="btn btn-success" value="Submit"> |
            <a class="btn btn-warning" v-bind:href="`/rejections/${rejection.id}`" role="button">Cancel </a> |
            <a v-if="deleteConfirmation" class="btn btn-danger" v-on:click="delConfirmation()">Delete</a>
            <a v-if="!deleteConfirmation" class="btn btn-outline-danger" v-on:click="deleteRejection()">Click again to delete</a> |
            <a class="btn btn-success" v-on:click="showFileUpload()">Add PDF</a>
          </div>
        <hr>
      </form>
      <div v-if="displayUpload" class="container">
        <div class ="col"> 
              <p><label for="exampleFormControlSelect1">Add PDF</label></p>
              <input 
              type="file" 
              @change="onFileSelected($event)" 
              multiple
              ref="fileInput">
              <!-- <button @click="$refs.fileInput.click()">Pick a File</button> -->
              <button @click="onUpload()">Upload</button>
        </div>
        <hr>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      selectedFile: null,
      displayUpload: false,
      rejection: {},
      rejections: [],
      errors: [],
      deleteConfirmation: true,
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
    console.log("in created on edit page");
    axios.get(`/api/rejections/${this.$route.params.id}`).then(response => {
      // console.log(response.data);
      this.rejection = response.data;
    });
    axios.get("/api/rejections").then(response=> {
      // console.log(response.data);
      this.rejections = response.data;
      this.makeStatesArray();
      this.makeAhjsArray();
      this.makeOfficesArray();
      this.makeSubCategoriesArray();
    });

  },

  methods: {
    showFileUpload: function() {
      this.displayUpload = !this.displayUpload;
    },
    onFileSelected: function(event) {
      console.log(event);
      console.log("FILE SELECTED");
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    onUpload() {
      console.log('uploading...');
      var uploads = new FormData();
      uploads.append('uploads', this.selectedFile, this.selectedFile.name);
      axios.patch(`/api/rejections/${this.rejection.id}`, uploads, {
        onUploadProgress: uploadEvent => {
          console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
        }
      }).then(res => {
        console.log(res.data);
        this.$router.push(`/rejections/${this.rejection.id}`);
      })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.status);
          this.status = error.response.status;
        });
    },
    submit: function() {
      var params = {
        category: this.rejection.category,
        sub_category: this.rejection.sub_category,
        product: this.rejection.product,
        office: this.rejection.office,
        state: this.rejection.state,
        ahj: this.rejection.ahj,
        note: this.rejection.note,
        case: this.rejection.case,
        installation: this.rejection.installation,
        level_reviewed: this.rejection.level_reviewed,
        rejection_source: this.rejection.rejection_source,
        // corrections_uploaded: this.rejection.corrections_uploaded
      };
      console.log('params are below');
      console.log(params);
      axios.patch(`/api/rejections/${this.rejection.id}`, params).then(response => {
        this.$router.push(`/rejections/${this.rejection.id}`);
      })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(this.errors)
        });
    },
    delConfirmation: function() {
      console.log("confirming delete...");
      this.deleteConfirmation = !this.deleteConfirmation;
    },
    deleteRejection: function() {
      console.log("deleting rejection...");
      axios.delete(`/api/rejections/${this.rejection.id}`).then(response => {
        console.log(response.data);
        this.$router.push('/rejections');
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
  }
};
</script>