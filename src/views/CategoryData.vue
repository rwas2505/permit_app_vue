<template>
  <div class="data">
    <h1>{{ message }}</h1>
    <div id="container" style="width:100%; height:400px;"></div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Category Rejections",
      rejections: [],
      categoriesCount: {},
      uniqueCategories: [],
      xAxis: [],
      yAxis: []
    };
  },
  created: function() {
    console.log('in the created');
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the created callback");
      this.rejections = response.data;
      this.makeCategoriesArray();
      this.makeChart();
    });
  },
  methods: {
    makeCategoriesArray: function() {

      var categories = [];
      // add an instance of category for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        categories.push(rejection.category);
      });
      // console.log(categories);

      // create an array with only unique categories sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueCategories = categories.filter( onlyUnique ).sort();

      //get count of each category in categories array
      // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
      this.categoriesCount = categories.reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{});

      var categoriesCount = this.categoriesCount;
      var chartCategories = [];
      var chartCategoriesCount = [];
    
      //create arrays where the index of each array is a key, value pair
      this.uniqueCategories.forEach(function(category) {
        chartCategories.push(category);
        chartCategoriesCount.push(categoriesCount[`${category}`]);
      });

      // make arrays available in other methods
      this.xAxis = chartCategories;
      this.yAxis = chartCategoriesCount;
    },
    makeChart: function() {
      console.log("in makeChart())");
      // comment out  event listener as it is breaking the chart
      // document.addEventListener('DOMContentLoaded', function() {
      var myChart = Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Rejection Count By Category'
        },
        xAxis: {
          categories: this.xAxis
        },
        yAxis: {
          title: {
            text: 'Total Rejections'
          }
        },
        series: [
          {
            name: 'Category',
            data: this.yAxis
          }
        ]
      });
    }
  },
};
</script>


