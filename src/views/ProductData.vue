<template>
  <div class="data">
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
      rejections: [],
      productsCount: {},
      uniqueProducts: [],
      xAxis: [],
      yAxis: []
    };
  },
  created: function() {
    console.log('in the created');
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the created callback");
      this.rejections = response.data;
      this.makeProductsArray();
      this.makeChart();
    });
  },
  methods: {
    makeProductsArray: function() {

      var products = [];
      // add an instance of product for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        products.push(rejection.product);
      });

      // create an array with only unique products
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueProducts = products.filter( onlyUnique ).sort();

      //get count of each product in products array
      // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
      this.productsCount = products.reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{});

      var productsCount = this.productsCount;
      var chartProducts = [];
      var chartProductsCount = [];
    
      //create arrays where the index of each array is a key, value pair
      this.uniqueProducts.forEach(function(product) {
        chartProducts.push(product);
        chartProductsCount.push(productsCount[`${product}`]);
      });

      // make arrays available in other methods
      this.xAxis = chartProducts;
      this.yAxis = chartProductsCount;
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
          text: 'Rejection Count By Product'
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
            name: 'Product',
            data: this.yAxis
          }
        ]
      });
    }
  },
};
</script>


