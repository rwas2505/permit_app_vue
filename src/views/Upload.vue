<template>
  <div class="container">
    <h1>upload</h1>
    <input type="file" @change="onFileSelected($event)" multiple>
    <button @click="onUpload()">Upload</button>
  </div>
 
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      selectedFile: null,
      rejections: []
    };
  },
  created: function() {
    // console.log('in the created');
    // console.log("this is outside the callback");
    axios.get("/api/rejections").then(response=> {
    // console.log("this is inside the callback");
      // console.log(response.data);
      this.rejections = response.data;
    });
  },
  methods: {
    onFileSelected: function(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    onUpload() {
      console.log('uploading...');
      const uploads = new FormData();
      uploads.append('uploads', this.selectedFile, this.selectedFile.name);
      axios
        .post('/api/rejections', uploads)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.status);
          this.status = error.response.status;
        });
    }
  }
};
</script>
