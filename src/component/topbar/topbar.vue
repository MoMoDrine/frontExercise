<template>
  <!--<el-row :gutter="24">
    <el-col :span="24" >
      <div class="grid-content bg-purple-light">
        <router-link to="activity">活动</router-link>
        <router-link to="exerciseDemo">练习demo</router-link>
      </div>
    </el-col>
  </el-row>-->
  <el-header class="top">
    <el-menu :default-active="$route.path" class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             router
             active-text-color="#ffd04b">
      <el-menu-item index="/workItem">工作台</el-menu-item>

      <el-submenu index="activity">
        <template slot="title">活动</template>
        <el-menu-item index="/activity/activityRelease">活动发布</el-menu-item>
        <el-menu-item index="/activity/activityManagement">活动管理</el-menu-item>
      </el-submenu>
      <el-submenu index="game">
        <template slot="title">游戏中心</template>
        <el-menu-item index="/game/2048">2048</el-menu-item>
        <el-menu-item index="/game/numberMove">数字华容道</el-menu-item>
        <el-menu-item index="/game/rest">其他游戏</el-menu-item>
      </el-submenu>
      <el-menu-item index="/other">其他</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
  export default {
    name: "topbar",
    data() {
      return {
        //activeIndex: "/workItem"
      }
    }
  }
</script>

<style scoped>
.top{
  width:calc(100%);
  padding:0px 0px
}
</style>
