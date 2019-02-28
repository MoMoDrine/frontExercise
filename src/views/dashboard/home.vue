<template>
  <div>
    <topbar></topbar>
    <router-view></router-view>
  </div>

</template>

<script>
import  topbar from "../../component/topbar/topbar"
  export default {
    name: "home",
    components:{topbar}
  }
</script>

<style scoped>

</style>
