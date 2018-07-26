<template>

</template>
<script>
export default {
  data() {
    return {
      Inquiry: []
    }
  },
  created() {
    fetch(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${this.$route.params.id}`).then(res => res.json()).then(res => {
      //this.Inquiry = res.data.List
      console.log(res)
    })

  },
}
</script>
