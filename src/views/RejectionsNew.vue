<template>
  <div class="new-rejection">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>New Permit Rejection Entry</h1>
        <div class="form-group">
          category: <input placeholder="testtttt" type="text" class="form-control" v-model="category">
          <hr>
        </div>
        <div class="form-group">
          sub_category: <input placeholder="testtttt" type="text" class="form-control" v-model="sub_category">
          <hr>
        </div>
        <div class="form-group">
          product: <input placeholder="testtttt" type="text" class="form-control" v-model="product">
          <hr>
        </div>
        <div class="form-group">
          office: <input placeholder="testtttt" type="text" class="form-control" v-model="office">
          <hr>
        </div>
        <div class="form-group">
          state: <input placeholder="testtttt" type="text" class="form-control" v-model="state">
          <hr>
        </div>
        <div class="form-group">
          ahj: <input placeholder="testtttt" type="text" class="form-control" v-model="ahj">
          <hr>
        </div>
        <div class="form-group">
          note: <input placeholder="testtttt" type="text" class="form-control" v-model="note">
          <hr>
        </div>
        <div class="form-group">
          installation: <input placeholder="testtttt" type="text" class="form-control" v-model="installation">
          <hr>
        </div>
        <div class="form-group">
          level_reviewed: <input placeholder="testtttt" type="text" class="form-control" v-model="level_reviewed">
          <hr>
        </div>
        <div class="form-group">
          rejection_source: <input placeholder="testtttt" type="text" class="form-control" v-model="rejection_source">
          <hr>
        </div>
        <div class="form-group">
          corrections_uploaded: <input placeholder="testtttt" type="text" class="form-control" v-model="corrections_uploaded">
          <hr>
        </div>
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
      category: "",
      sub_category: "",
      product: "",
      office: "",
      state: "",
      ahj: "",
      note: "",
      installation: "",
      level_reviewed: "",
      rejection_source: "",
      corrections_uploaded: ""
    };
  },
  methods: {
    submit: function() {
      var params = {
        category: this.category,
        sub_category: this.sub_category,
        product: this.product,
        office: this.office,
        state: this.state,
        ahj: this.ahj,
        note: this.note,
        installation: this.installation,
        level_reviewed: this.level_reviewed,
        rejection_source: this.rejection_source,
        corrections_uploaded: this.corrections_uploaded
      };
      console.log(params)
      axios
        .post("/api/rejections", params)
        .then(response => {
          this.$router.push("/rejections");
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