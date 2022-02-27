import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store'
// 引入mock.js
import '@/mock/mockServe.js'
// 引入Swiper样式
import 'swiper/css/swiper.min.css'
// 三级联动组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 轮播图
import Carousel from '@/components/Carousel/Carousel.vue'
// 分页
import Pagination from '@/components/Pagination/Pagination.vue'
// 统一接收api文件夹全部的请求函数
import * as API from '@/api'
import { MessageBox } from 'element-ui'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入图片
import defaultImg from '@/assets/default.png'
// 第一个参数:全局组件的名字，第二个参数:组件的名字
Vue.component(TypeNav.name, TypeNav)
// 第一个参数:全局组件的名字，第二个参数:组件的名字
Vue.component(Carousel.name, Carousel)
// 第一个参数:全局组件的名字，第二个参数:组件的名字
Vue.component(Pagination.name, Pagination)
// 统一引入
Vue.prototype.$API = API
// 注册组件的时候还有一种写法是挂载到原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: defaultImg,
})
// 表单验证插件
import '@/plugins/validate.js'
new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')
