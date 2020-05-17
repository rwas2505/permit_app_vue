<template>
  <div ref='viewer'></div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'WebViewer',
  props: {
    path: String,
    url: "http://localhost:3000/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9JYTJWNVNTSWhaakYxWVRWeVpUQmhaM1Z0ZFRabGMyMTVZWEJoTWpoNmMyRnNOUVk2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUFdsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SW1SMWJXMTVMbkJrWmlJN0lHWnBiR1Z1WVcxbEtqMVZWRVl0T0NjblpIVnRiWGt1Y0dSbUJqc0dWRG9SWTI5dWRHVnVkRjkwZVhCbFNTSVVZWEJ3YkdsallYUnBiMjR2Y0dSbUJqc0dWQT09IiwiZXhwIjoiMjAyMC0wNS0xN1QxNTo1MjoyMS44NjdaIiwicHVyIjoiYmxvYl9rZXkifX0=--8ebffdd2f927f7ce8225e0092d07eed33cd7cb51/dummy.pdf?content_type=application%2Fpdf&disposition=inline%3B+filename%3D%22dummy.pdf%22%3B+filename%2A%3DUTF-8%27%27dummy.pdf"
  },
  mounted: function () {
        WebViewer({
            path: this.path,
            initialDoc: this.url, // replace with your own PDF file
          }, this.$refs.viewer).then((instance) => {
            // call apis here
          });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%; 
  height: 100vh;
}
</style>