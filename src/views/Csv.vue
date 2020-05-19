<template>
  <div class="csv">
    <download-csv
        class   = "btn btn-default"
        :data   = "json_data"
        name    = "filename.csv">
    
        Download CSV (This is a slot)
    
    </download-csv>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "csv",
  data: function() {
    return {
      rejections: [],
      json_data: [
        {
          'name': 'Tony Peña',
          'city': 'New York',
          'country': 'United States',
          'birthdate': '1978-03-15',
          'phone': {
            'mobile': '1-541-754-3010',
            'landline': '(541) 754-3010'
          }
        },
        {
          'name': 'Thessaloniki',
          'city': 'Athens',
          'country': 'Greece',
          'birthdate': '1987-11-23',
          'phone': {
            'mobile': '+1 855 275 5071',
            'landline': '(2741) 2621-244'
          }
        }
      ]
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
    
  }
};
</script>
