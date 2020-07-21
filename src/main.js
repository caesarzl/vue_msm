import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import './assets/font/iconfont.css'
import '@/router/permission'
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.VUE_APP_SERVICE_URL);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
