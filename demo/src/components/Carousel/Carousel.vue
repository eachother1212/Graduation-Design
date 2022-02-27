<template>
  <div>
    <div class="swiper-container" ref="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carouse in list" :key="carouse.id">
          <img :src="carouse.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听
      // 为什么watch监听不到list，因为这个数据从来没有发生过变化，父组件给的时候就是一个对象，里面该有的数据都是有的
      immediate: true,
      handler() {
        // 监听到数据了，但是v-for动态渲染结构我们还没有办法确定，因此还需要用到$nextTick
        this.$nextTick(function () {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
    },
  },
}
</script>

<style></style>
