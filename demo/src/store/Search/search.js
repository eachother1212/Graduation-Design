import { reqGetSearchList } from '@/api/index.js'
// state:厂库存储数据的地方
const state = {
  // 仓库的初始状态
  getSearchList: {},
} // state:仓库存储数据的地方
// mutations:修改state的2唯一手段
const mutations = {
  GETSEARCHLIST(state, getSearchList) {
    state.getSearchList = getSearchList
  },
}
// actions:处理actions，书写自己的业务逻辑,也可以处理异步
const actions = {
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchLis在调用请求数据时至少传递参数(空对象)
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchList(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
// getters:理解为计算属性，用于简化仓库，让组件仓库的逻辑更加方便
// 在项目中getters是简化仓库中的数据
// getters可以将以后在组件中要用的数据简化 组件获取数据就方便了
const getters = {
  // 当前形参state 当前仓库中的state并非大仓库中的state
  goodsList(state) {
    // 如果服务器数据回来了没问题是个数组，假如网络不给力应该返回的是underfine
    // 计算新的属性值至少给一个空数组
    return state.getSearchList.goodsList || []
  },
  trademarkList(state) {
    return state.getSearchList.trademarkList
  },
  attrsList(state) {
    return state.getSearchList.attrsList
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
