<template>
  <div>
    <!-- 三级联动全局组件:三级联动已经注册为全局组件，因此不需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in getFloorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/page/Home/ListContainer/ListContainer.vue'
import Recommend from '@/page/Home/Recommend/Recommend.vue'
import Rank from '@/page/Home/Rank/Rank.vue'
import Like from '@/page/Home/Like/Like.vue'
import Floor from '@/page/Home/Floor/Floor.vue'
import Brand from '@/page/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      getFloorList: (state) => state.home.getFloorList,
    }),
  },
}
</script>

<style></style>
