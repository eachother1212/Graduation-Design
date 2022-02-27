import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)
// 引入小仓库
import home from '@/store/Home/home.js'
import search from '@/store/Search/search.js'
import detail from '@/store/Detail/detail.js'
import shopcart from '@/store/ShopCart/ShopCart.js'
import user from '@/store/User/User.js'
import trade from '@/store/Trade/trade.js'
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
})
