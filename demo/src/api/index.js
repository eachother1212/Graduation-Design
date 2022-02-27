// 当前这个模块，API进行统一管理
import requests from '@/api/request.js'
import mockRequest from './mockAjax.js'
// 三级联动的接口
// /api/product/getBaseCategoryList get请求 无参数
// 发请求:axios发送请求返回结果promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 获取banner(Home首页轮播图)
export const reqBannerList = () => mockRequest.get('/banner')
// 获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor')
// 获取搜索模块的数据 地址/list 请求方式post 请求需要带参数
/* {
  "category3Id": "61",
 "categoryName": "手机",
 "keyword": "小米",
 "order": "1:desc",
 "pageNo": 1,
 "pageSize": 10,
 "props": ["1:1700-2799:价格", "2:6.65-6.74 英寸:屏幕尺寸"],
 "trademark": "4:小米"
} */
// 当前这个函数需要接收外部传递过来的参数
// 当前的接口，给服务器传递参数params，至少是一个空对象
// 当这个接口(获取搜索模块的数据)，给服务器传递一个默认的参数【至少是一个空对象】
export const reqGetSearchList = (params) =>
  requests({
    url: '/list',
    method: 'post',
    data: params,
  })
// 获取商品详情信息的接口 /api/item/{ skuId } 请求方式为get
export const reqGoodInfo = (skuId) =>
  requests({
    url: `item/${skuId}`,
    method: 'get',
  })
// 商品添加到购物车(获取更新某一个产品的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })
// 获取购物车列表数据
// 请求地址/api/cart/cartList
export const reqCartList = () =>
  requests({
    url: '/cart/cartList',
    method: 'get',
  })
// 删除购物车产品接口 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })
// 修改产品选中的状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
  })
// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 用户注册
// user/passport/register
export const reqUserRegister = (data) =>
  requests({
    url: '/user/passport/register',
    data,
    method: 'post',
  })
// 用户登录 user/passport/login
export const reqUserLogin = (data) =>
  requests({
    url: '/user/passport/login',
    data,
    method: 'post',
  })
// 获取用户信息【需要带着用户的token像服务器要信息】 /user/passport/auth/getUserInfo
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })
//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  })
// 获取商品清单
export const reqOrderInfo = () =>
  requests({
    url: '/order/auth/trade',
    method: 'get',
  })
// 提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post',
  })
// 获取支付信息
export const reqPayInfo = (orderId) =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
  })
// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取个人中心的数据
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
  })
