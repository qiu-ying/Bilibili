import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import Vant from 'vant';
import '@/assets/style.css'
import 'vant/lib/index.css';
import { Toast } from 'vant'
Vue.prototype.$msg = Toast
import http from '../http'
Vue.prototype.$http = http
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
