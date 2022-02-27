import { reqCategoryList, reqBannerList, reqGetFloorList } from '@/api/index.js'
// Home的小仓库
// state:厂库存储数据的地方
const state = {
  // state中的默认初始值不能乱写，服务器返回的是对象还是数组，根据接口返回的初始值
  categoryList: [],
  // 轮播图的数组
  bannerList: [],
  // floor里面的数据
  getFloorList: [],
}
// mutations:修改state的2唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, getFloorList) {
    state.getFloorList = getFloorList
  },
}
// actions:处理actions，书写自己的业务逻辑,也可以处理异步
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data.slice(0, -1))
    }
  },
  // 获取首页轮播图的数据
  async bannerList({ commit }) {
    let result = await reqBannerList()
    if (result.code == 200) {
      commit('BANNERLIST', result.data)
    }
  },
  // 获取floor的数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList()
    if (result.code == 200) {
      // 提交commit
      commit('GETFLOORLIST', result.data)
    }
  },
}
// getters:理解为计算属性，用于简化仓库，让组件仓库的逻辑更加方便
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
