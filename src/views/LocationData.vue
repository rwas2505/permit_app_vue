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
      message: "Welcome to the Location Data Page!",
      rejections: [],
      // statesTest: ["CA","IL","IA"],
      // numsTest: [1, 10, 5]      
    };
  },
  created: function() {
    console.log('in the created');
    axios.get("/api/rejections").then(response=> {
      console.log("this is inside the created callback");
      console.log(response.data);
      this.rejections = response.data;
      this.makeChart();
    });
  },
  mounted: function() {
    console.log('in mounted hook')
    // var rejectionArray = that.rejections;
  },
  methods: {
    makeChart: function() {
      var statesTest = ["CA","IL","IA"];
      var numsTest = [1, 10, 5];
      console.log(this.rejections)
      // document.addEventListener('DOMContentLoaded', function() {
      var myChart = Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Data chart under construction'
        },
        xAxis: {
          categories: statesTest
        },
        yAxis: {
          title: {
            text: 'Total Rejections'
          }
        },
        series: [
          {
            name: 'State',
            data: numsTest
          }
        ]
      });
      // });
    }
  },
};

// // var rejectionArray = that.rejections;
// var statesTest = ["CA","IL","IA"];
// var numsTest = [1, 10, 5];
// console.log("This is outside of vue");
// console.log("THIS:" + this);

// document.addEventListener('DOMContentLoaded', function() {
//   var myChart = Highcharts.chart('container', {
//     chart: {
//       type: 'column'
//     },
//     title: {
//       text: 'Data chart under construction'
//     },
//     xAxis: {
//       categories: statesTest
//     },
//     yAxis: {
//       title: {
//         text: 'Total Rejections'
//       }
//     },
//     series: [
//       {
//         name: 'State',
//         data: numsTest
//       }
//     ]
//   });
// });
</script>


