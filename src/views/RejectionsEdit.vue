<template>
  <div class="new-rejection">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Edit Rejection</h1>
        <div class="form-group">
          category: <input type="text" class="form-control" v-model="rejection.category">
          <hr>
        </div>
        <div class="form-group">
          sub_category: <input type="text" class="form-control" v-model="rejection.sub_category">
          <hr>
        </div>
        <div class="form-group">
          product: <input type="text" class="form-control" v-model="rejection.product">
          <hr>
        </div>
        <div class="form-group">
          office: <input type="text" class="form-control" v-model="rejection.office">
          <hr>
        </div>
        <div class="form-group">
          state: <input type="text" class="form-control" v-model="rejection.state">
          <hr>
        </div>
        <div class="form-group">
          ahj: <input type="text" class="form-control" v-model="rejection.ahj">
          <hr>
        </div>
        <div class="form-group">
          note: <input type="text" class="form-control" v-model="rejection.note">
          <hr>
        </div>
        <div class="form-group">
          installation: <input type="text" class="form-control" v-model="rejection.installation">
          <hr>
        </div>
        <div class="form-group">
          level_reviewed: <input type="text" class="form-control" v-model="rejection.level_reviewed">
          <hr>
        </div>
        <div class="form-group">
          rejection_source: <input type="text" class="form-control" v-model="rejection.rejection_source">
          <hr>
        </div>
        <div class="form-group">
          corrections_uploaded: <input type="text" class="form-control" v-model="rejection.corrections_uploaded">
          <hr>
        </div>
        <div>
          <input type="submit" class="btn btn-success" value="Submit"> |
          <a class="btn btn-warning" v-bind:href="`/rejections/${rejection.id}`" role="button">Cancel </a> |
          <button class="btn btn-danger" v-on:click="deleteRejection()">Delete</button>
        </div>
        <hr>
        <div>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      rejection: {},
      errors: []
    };
  },
  
  created: function() {
    console.log("in created on edit page");
    axios.get(`/api/rejections/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.rejection = response.data;
    });
  },

  methods: {
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
        corrections_uploaded: this.rejection.corrections_uploaded
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
    deleteRejection: function() {
      console.log("deleting the rejection...");
      axios.delete(`/api/rejections/${this.rejection.id}`).then(response => {
        console.log(response.data);
        this.$router.push('/rejections');
      });
    }
  }
};
</script>