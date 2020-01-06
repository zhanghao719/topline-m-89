import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// REM适配：动态设置 html 标签字体大小
import 'amfe-flexible'

// 加载注册 Vant 组件模块
import './utils/register-vant'

// 加载全局样式
// 注意：一定要把我们自己的样式引到第三方组件样式之后
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
