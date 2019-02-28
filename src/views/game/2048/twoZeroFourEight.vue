<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="4" :offset="10">
        <p style="font-size:25px;text-align:center">分数：</p>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col  class="container">
        <el-row :gutter="24">
          <el-col class="inBox" v-for="index in 16" :key="index">

          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-button @click="newGame()" type="info">新游戏</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        score: 0,
        board: [[]],

      }
    },
    mounted() {
      this.init()
    },
    directives: {},
    methods: {
      init(){},
      newGame() {
      }
    }
  }
</script>

<style>
  @import url(./twoZeroFourEight.css);
</style>
