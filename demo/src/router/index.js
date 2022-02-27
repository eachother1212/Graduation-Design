// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '@/store/index.js'
// 使用路由插件
Vue.use(VueRouter)
// 需要重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0代表的滚动条再最上方
    return { y: 0 }
  },
})
// 全局前置守卫，前置守卫，(路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  // to 可以获取到你要跳转到那个路由信息
  // from 可以获取到你从那个路由来的信息
  // next 放行的函数 next()放行 next('/+path)放行到执行的路由 next(false)驳回
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 用户登陆了才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  // 用户已经登陆了
  if (token) {
    // 用户已经登陆了还想去login只能停留在首页
    if (to.path == '/login') {
      next('/')
    } else {
      // 登陆了但不是去login的其他页面
      // 如果用户名有
      if (name) {
        next()
      } else {
        // 没有用户信息 仓库派发action然后再跳转
        // 获取用户信息在首页展示
        try {
          //  获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了获取不到用户信息，需要重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去交易相关，不能去支付相关 不能去个人中心
    // 未登录上去这些路由--------登录
    // 去的不是这些路由---放行
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去而没有去成的信息存储与路由当中
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
export default router
