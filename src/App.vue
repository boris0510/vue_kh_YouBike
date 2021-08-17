<template>
  <h1>高雄YouBike2.0公共自行車租賃站即時資訊</h1>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [],
      updatedTime: '',
    };
  },
  mounted() {
    const api = 'http://od-oas.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092';
    this.axios.get(api).then((response) => {
      this.data = response.data.data.retVal;
      this.updatedTime = response.data.data.updated_at;
      console.log(response);
    });
  },
};
</script>

<style lang="scss">
@import 'bootstrap';
</style>
