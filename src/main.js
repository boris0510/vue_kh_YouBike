import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';

const app = createApp(App);
app.use(VueAxios, axios);
app.component('Loading', Loading);
app.mount('#app');
