<template>
  <Loading v-model:active="isLoading" />
  <div class="container mt-4">
    <div class="d-flex justify-content-center align-items-center">
      <h1>高雄 YouBike2.0 公共自行車租賃站即時資訊</h1>
    </div>
    <!-- 內容 -->
    <select name="" id="" class="form-select input-lg mt-4" v-model="currentLocation">
      <option value="">--- 全部 ---</option>
      <option :value="item" v-for="(item, index) in locations" :key="index">{{ item }}</option>
    </select>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="(item, index) in filterData[currentPage]" :key="index">
        <div class="card h-100">
          <iframe height="200" :src="item.map"></iframe>
          <div class="card-body">
            <p class="card-text">
              站號 : {{ item.sno }} <br />
              地點 : {{ item.scity }}{{ item.sarea }}{{ item.ar }} <br />
              總車位 : {{ item.tot }} 格 <br />
              可還車位 : {{ item.bemp }} 格 <br />
              可借車輛 : {{ item.sbi }} 輛
            </p>
          </div>
          <div class="card-footer text-muted d-flex justify-content-between align-items-center">
            更新時間 : {{ item.updated }}
            <small><a :href="item.map" target="_blank" class="text-decoration-none">查看地圖</a></small>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ filterData[currentPage] }} -->
    <!-- 分頁 -->
    <nav class="d-flex justify-content-center mt-4" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled ': currentPage === 0}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="currentPage -= 1"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ active: currentPage === page - 1 }"
        v-for="(page, index) in filterData.length" :key="index">
          <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled ': currentPage === filterData.length - 1}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="currentPage += 1"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <Footer />
  <GoTop />
</template>

<script>
import Footer from './components/Footer.vue';
import GoTop from './components/GoTop.vue';

export default {
  name: 'App',
  components: {
    GoTop,
    Footer,
  },
  data() {
    return {
      data: [],
      updatedTime: '',
      currentPage: 0,
      locations: [],
      currentLocation: '',
      isLoading: false,
    };
  },
  methods: {
    getLocations() {
      const locations = new Set();
      this.data.forEach((item) => {
        locations.add(item.sarea);
      });
      this.locations = Array.from(locations);
    },
  },
  watch: {
    currentPage() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2500);
    },
    currentLocation() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2500);
    },
  },
  computed: {
    filterData() {
      let items = [];
      if (this.currentLocation !== '') {
        items = this.data.filter((item) => item.sarea === this.currentLocation);
      } else {
        items = this.data;
      }
      const newData = [];
      items.forEach((item, index) => {
        // 一頁 50 筆，算有幾頁
        if (index % 50 === 0) {
          newData.push([]);
        }
        // 每頁內容
        const page = parseInt(index / 50, 0);
        const updated = `${item.mday.substr(0, 4)}-${item.mday.substr(4, 2)}-${item.mday.substr(6, 2)} ${item.mday.substr(8, 2)}:${item.mday.substr(10, 2)}`;
        const map = `https://www.openstreetmap.org/export/embed.html?bbox=${item.lng}%2C${item.lat}&layer=mapnik&marker=${item.lat}%2C${item.lng}`;
        const newItem = {
          ...item,
          updated,
          map,
        };
        newData[page].push(newItem);
      });
      return newData;
    },
  },
  mounted() {
    const api = 'http://od-oas.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092';
    this.axios.get(api).then((response) => {
      this.data = response.data.data.retVal;
      this.updatedTime = response.data.data.updated_at;
      this.getLocations();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2500);
    });
  },
};
</script>

<style lang="scss">
@import "bootstrap";
</style>
