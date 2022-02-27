import { reqGoodInfo, reqAddUpdateShopCart } from '@/api/index.js'
import { getUUID } from '@/utils/uuid_token.js'
// state:厂库存储数据的地方
const state = {
  getGoodList: {},
  // 游客的临时身份
  uuid_token: getUUID(),
}
// mutations:修改state的2唯一手段
const mutations = {
  GETGOODLIST(state, getGoodList) {
    state.getGoodList = getGoodList
  },
}
// actions:处理actions，书写自己的业务逻辑,也可以处理异步
const actions = {
  // 获取产品信息
  async getGoodList({ commit }, skuid) {
    let result = await reqGoodInfo(skuid)
    if (result.code == 200) {
      commit('GETGOODLIST', result.data)
    }
  },
  // 将产品添加到购物车
  async addorUpdateShopCart({ commit }, { skuid, skuNum }) {
    // 加入购物车返回的结果
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code为200代表这次操作成功
    // 服务器没有返回服务器数据所以state不需要三连环
    // 服务器存储成功。。。。。进行路由跳转
    // 失败，给用户进行提示
    const result = await reqAddUpdateShopCart(skuid, skuNum)
    // 当前的这个函数如果执行返回的是一个promise
    // 代表服务器加入购物车成功
    if (result.code == 200) {
      return '成功'
    } else {
      // 代表加入购物车失败
      return Promise.reject(new Error('faile'))
    }
  },
}
// getters:理解为计算属性，用于简化仓库，让组件仓库的逻辑更加方便
const getters = {
  categoryView(state) {
    // state.getGoodList的初始状态是空，空对象的categoryView属性值是underfind
    // 当前计算出来的的categoryView属性值至少是一个空对象
    return state.getGoodList.categoryView || {}
  },
  skuInfo(state) {
    return state.getGoodList.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.getGoodList.spuSaleAttrList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
