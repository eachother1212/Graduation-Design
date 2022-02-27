<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action获取商品分类的三级联动数据
    this.$store.dispatch('categoryList')
  },
}
</script>

<style lang="less"></style>
