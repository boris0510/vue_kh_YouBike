<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-end">
      <h1>高雄YouBike2.0公共自行車租賃站即時資訊</h1>
      <p>更新時間 : {{ updatedTime }}</p>
    </div>
    {{ filterData[currentPage] }}
    <!-- 分頁 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination" >
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{active: currentPage === page - 1}"
          v-for="(page, index) in filterData.length" :key="index">
          <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [],
      updatedTime: '',
      currentPage: 0,
      pagination: {},
    };
  },
  computed: {
    filterData() {
      const newData = [];
      this.data.forEach((item, index) => {
        // 有幾頁
        if (index % 40 === 0) {
          newData.push([]);
        }
        // 每頁內容
        const page = parseInt(index / 40, 0);
        newData[page].push(item);
      });
      return newData;
    },
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
@import './assets/scss/all.scss';
</style>
