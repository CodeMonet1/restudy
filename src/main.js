import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {dayjs,yz_test} from  "@/assets/util/yz_main.js"
// Vue.component("Treeselect", Treeselect);
const now = dayjs
console.log(dayjs('1995-12-25'));
console.log(yz_test.name);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
