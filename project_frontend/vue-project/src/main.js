import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import VuexStore from './vuex/store';

const app = createApp(App);
app.use(router);
app.use(VuexStore); // Inject Vuex store vào ứng dụng Vue của bạn
app.mount('#app');