<template>
  <div class="data">
    <div id="container" style="width:100%; height:400px;"></div>
      <div class="row ">
        <div class="col-md-12 text-center">
          <div class="btn-group">
            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Charts
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="/data/location" style="color:#C0C0C0;">State</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/ahj"   >AHJ</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/category" style="color:#C0C0C0;">Category</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/product" style="color:#C0C0C0;">Product</a>
            </div>
        </div>
      </div>
    </div>
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
      ahjsCount: {},
      uniqueAhjs: [],
      xAxis: [],
      yAxis: []
    };
  },
  created: function() {
    console.log('in the created');
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the created callback");
      this.rejections = response.data;
      this.makeAhjsArray();
      this.makeChart();
    });
  },
  methods: {
    makeAhjsArray: function() {

      var ahjs = [];
      // add an instance of an ahj for each rejection to a new array
      this.rejections.forEach(function(rejection) {
        ahjs.push(rejection.ahj);
      });
      console.log(ahjs);

      // create an array with only unique ahjs sorted
      // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }
      this.uniqueAhjs = ahjs.filter( onlyUnique ).sort();

      //get count of each ahj in ahjs array
      // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
      this.ahjsCount = ahjs.reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{});

      var ahjsCount = this.ahjsCount;
      var chartAhjs = [];
      var chartAhjsCount = [];
    
      //create arrays where the corresponding index of each array is a key, value pair
      this.uniqueAhjs.forEach(function(ahj) {
        chartAhjs.push(ahj);
        chartAhjsCount.push(ahjsCount[`${ahj}`]);
      });

      // make arrays available in other methods
      this.xAxis = chartAhjs;
      this.yAxis = chartAhjsCount;
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
          text: 'Rejection Count By AHJ'
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
            name: 'AHJ',
            data: this.yAxis
          }
        ]
      });
    }
  },
};
</script>



 