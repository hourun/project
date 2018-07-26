<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  
export default {
  name: 'App'
}
</script>
  
<style>
  body,html,#app{
    width:100%;
    height:100%;
  }
  html{
    font-size:625%;
  }
  #app{
    font-size:0.14rem;
  }
</style>
