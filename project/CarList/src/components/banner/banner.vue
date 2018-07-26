<template>
<div class="swiperConent">
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(v,i) in BannerList " :key="i">
                    <div class="swiper-list">
                        <img :src="url(v.Url)" alt="" srcset="" @click="bannerChidren">
                    </div>
              </div>
          </div>
    </div>
</div>
  </template>

<script>

import Swiper from 'swiper'
import "swiper/dist/css/swiper.min.css"
export default {
  data() {
    return {
      BannerList: []
    }
  },

  created() {
    fetch(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.$route.params.id}`).then(res => res.json()).then(res => {
      this.BannerList = res.data.List
      console.log(res.data.List)
    })

  },
  methods: {
    url(url) {
      let reg = /\{0\}/;
      let str = url.replace(reg, 1);
      return str

    },
    bannerChidren() {
      this.$router.back()
    }
  }, mounted() {
    new Swiper(".swiper-container", {
      initialSlide: 0,
      loop: true,
      speed: 400,
      // autoplay: 2000,
      autoplayDisableOnInteraction: false,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true//修改swiper的父元素时，自动初始化swipe
    })
  }
}
</script>

<style src="./banner.css">
