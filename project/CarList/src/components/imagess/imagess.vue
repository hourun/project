<template>
    <div id="imagess">
      <div class="imagesContent">
          <div class="imageBox" v-for="(v,i) in imagesList" :key="i" @click="banner(v.Id)">
              <img :src="url(v.Url)" alt="" srcset="" >

          </div>
      </div>
    </div>
  </template>

  <script>

export default {
  name: 'App',
  data() {
    return {
      imagesList: []
    }
  },
  created() {
    fetch(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.$route.params.id}`).then(res => res.json()).then(res => {
      this.imagesList = res.data.List
      console.log(res.data.List)
    })
  },

  methods: {
    url(url) {
      let reg = /\{0\}/;
      let str = url.replace(reg, 1);
      return str

    },
    banner(id) {
      this.$router.push(`/banner/${this.$route.params.id}`)
    }
  }

}
</script>


<style src="./imagess.css">
