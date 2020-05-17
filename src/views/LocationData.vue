<template>
  <div class="data">
    <div id="placeChart" style="width:100%; height:400px;"></div>
      <div class="row ">
        <div class="col-md-12 text-center">
          <div class="btn-group">
            <button type="button" class="btn btn-light dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              Charts
            </button>
            <div class="dropdown-menu" >
              <a class="dropdown-item" href="/data/location">State</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/ahj">AHJ</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/category">Category</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/data/product">Product</a>
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
      uniqueStates: [],
      statesCount: {},
      statesXAxis: [],
      statesYAxis: []   
    };
  },
  created: function() {
    console.log('in the created');
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the created callback");
      this.rejections = response.data;
      this.makeStatesArray();
      this.makeChart();
    });
  },
  methods: {
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

      //get count of each state in states array
      // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
      this.statesCount = states.reduce(function(acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      },{});
      var statesCount = this.statesCount;
      var chartStates = [];
      var chartStatesCount = [];
    
      //create arrays where the index of each array is a key, value pair
      this.uniqueStates.forEach(function(state) {
        // console.log(state);
        chartStates.push(state);
        // console.log(statesCount[`${state}`]);
        chartStatesCount.push(statesCount[`${state}`]);
      });

      // make arrays available in other methods
      this.statesXAxis = chartStates;
      this.statesYAxis = chartStatesCount;


    },
    makeChart: function() {
      console.log("in makeChart())");
      // comment out  event listener as it is breaking the chart
      // document.addEventListener('DOMContentLoaded', function() {
      var myChart = Highcharts.chart('placeChart', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Rejection Count By State'
        },
        xAxis: {
          categories: this.statesXAxis
        },
        yAxis: {
          title: {
            text: 'Total Rejections'
          }
        },
        series: [
          {
            name: 'State',
            data: this.statesYAxis
          }
        ]
      });
      // });
    }
  },
};
</script>


