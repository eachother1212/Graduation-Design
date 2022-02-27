<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(item, index) in categoryList" :key="item.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex == index }">
                  <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{ item.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem">
                    <dl class="fore" v-for="items in item.categoryChild" :key="items.categoryId">
                      <dt>
                        <a :data-categoryName="items.categoryName" :data-category2Id="items.categoryId">{{ items.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="itemes in items.categoryChild" :key="itemes.categoryId">
                          <a :data-categoryName="itemes.categoryName" :data-category3Id="itemes.categoryId">{{ itemes.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
// 这种引入的方法是把lodash全部的功能函数引入
// 最好的方式是按需引入
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true,
    }
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让show的组件变成false
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    // 对象写法右侧需要的是一个函数，当使用计算属性的时候，右侧的函数会立即执行一次
    // 会注入一个参数为state，其实即为大仓库中的数据
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      // index:鼠标移上某一个一级分类的元素的索引值
      // 正常情况（用户慢慢操作)例如鼠标进入,每一个一级分类h3都会触发，鼠标进入事件
      // 非正常情况(用户操作很快)本身全部的一次分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      // 就是由于用户行为过快,导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index
    }, 20),
    // index:鼠标移上某一个一级分类的元素的索引值
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 路由跳转的方法
    goSearch(event) {
      // 最好的解决方案就是:编程式导航+事件委派
      // 利用事件委派存在一些问题：事件委派，是把全部的子节点【h3 dt dl em】的事件委派给父节点，点击a标签的时候才会进行路由的跳转【怎么能确定点击的是a标签】存在的另外一个问题是 即使确定点击的是a标签，如何区别是一级、二级、还是三级的标签
      // 第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName，其余子节点是没有的
      // this.$router.push('/search')
      let element = event.target
      // 获取到当前出发这个事件的节点【h3 a dt dl】，需要带有data-categoryName这样节点【一定是a标签】
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 如果标签上有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 怎么区分一级分类 二级分类 三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        // 整理完参数
        location.query = query
        // 路由条状
        this.$router.push(location)
      }
    },
    // 当鼠标移入的时候让商品分类列表进行展示
    enterShow() {
      this.show = true
    },
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background-color: skyblue;
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 过度动画的样式
    // 过度动画开始状态(进入)
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    // 动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
