import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载
import {
  Button,
  Cell,
  CellGroup
} from 'vant'

// 注册
Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
// Vue.use(Button)
// Vue.use(Cell)
// Vue.use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
