import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import JsonCSV from 'vue-json-csv';
// import VueJsonToCsv from 'vue-json-to-csv'


axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false

Vue.component('downloadCsv', JsonCSV);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
