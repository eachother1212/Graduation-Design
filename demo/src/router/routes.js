// 引入路由组件
const Home = () => import('@/page/Home/Home.vue')
const Search = () => import('@/page/Search/Search.vue')
const Login = () => import('@/page/Login/Login.vue')
const Register = () => import('@/page/Register/Register.vue')
const Detail = () => import('@/page/Detail/Detail.vue')
const AddCartSuccess = () => import('@/page/AddCartSuccess/AddCartSuccess.vue')
const ShopCart = () => import('@/page/ShopCart/ShopCart.vue')
const Trade = () => import('@/page/Trade/Trade.vue')
const Pay = () => import('@/page/Pay/Pay.vue')
const PaySuccess = () => import('@/page/PaySuccess/PaySuccess.vue')
const Center = () => import('@/page/Center/Center.vue')
// 引入二级路由组件
const myOrder = () => import('@/page/Center/myOrder/myOrder.vue')
const groupOrder = () => import('@/page/Center/groupOrder/groupOrder.vue')
// 路由懒加载 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// 路由配置信息
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页',
      show: true,
    },
  },
  {
    path: '*',
    name: 'Deaul',
    redirect: '/home',
    meta: {
      title: '主页',
      show: true,
    },
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: {
      title: '搜索',
      show: true,
    },
    name: 'search',
    // 路由组件能不能传递props数据?
    // 1 布尔值写法 只有params参数
    // props: true,
    // 2 对象写法
    // props: {
    //   a: 1,
    //   b: 2,
    // },
    // 3函数写法：可以params参数query参数，通过props传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k }
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
      show: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      show: false,
    },
  },
  {
    path: '/detail/:skuid',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '详情',
      show: true,
    },
  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: AddCartSuccess,
    meta: {
      title: '购物车详情',
      show: true,
    },
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      title: '购物车',
      show: true,
    },
  },
  {
    path: '/trade',
    name: 'Trade',
    component: Trade,
    meta: {
      title: '交易页面',
      show: true,
    },
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    meta: {
      title: '结算页面',
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: PaySuccess,
    meta: {
      title: '支付成功页面',
      show: true,
    },
  },

  {
    path: '/center',
    name: 'Center',
    component: Center,
    redirect: '/center/myorder',
    meta: {
      title: '个人中心',
      show: true,
    },
    // 子路由
    children: [
      {
        path: 'myorder',
        component: myOrder,
        meta: {
          title: '个人中心',
          show: true,
        },
      },
      {
        path: 'grouporder',
        component: groupOrder,
      },
    ],
  },
]

export default routes
