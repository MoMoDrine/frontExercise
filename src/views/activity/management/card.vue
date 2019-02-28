<template>
  <el-row :gutter="20">
    <el-col :span="15" style="margin-left: 6%">
      <el-col :span="8" class="card">
        <el-card :body-style="cardStyle">
          <div class="innercard" @click="changeFlag('sumActivity')">
            <h1>{{list.sumActivity}}</h1>
            <span :style="`color:${color['sumActivity'].color}`">活动总数</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="card">
        <el-card :body-style="cardStyle">
          <div class="innercard" @click="changeFlag('sumEnroll')">
            <h1>{{list.sumEnroll}}</h1>
            <span :style="`color:${color['sumEnroll'].color}`">报名总数</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="card">
        <el-card :body-style="cardStyle">
          <div class="innercard" @click="changeFlag('discheck')">
            <h1>{{list.discheck}}</h1>
            <span :style="`color:${color['discheck'].color}`">待审核</span>
          </div>
        </el-card>
      </el-col>
    </el-col>

    <el-col :span="5" style="margin-left:4%">
      <el-col :span="24" class="card">
        <el-card :body-style="cardStyle">
          <div class="innercard" @click="changeFlag('vip')">
            <h1>{{list.vip}}</h1>
            <span :style="`color:${color['vip'].color}`">查看会员</span>
          </div>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: "card",
    computed: {

    },
    data() {
      return {
        cardStyle: {
          'background-color': 'grey',
          'height': '120px',
          'color': 'white'
        },
        list: [],
        color: {
          sumActivity: {color: "#ffd04b"},
          sumEnroll: {color: 'white'},
          discheck: {color: 'white'},
          vip: {color: 'white'}
        },

      }
    },
    watch: {
      list(list) {
        this.$emit("changeList", list)
      },
      value(val) {
        this.color['sumActivity'].color='white';
        this.color['sumEnroll'].color='white'
        this.color["discheck"].color='white'
        this.color['vip'].color='white'
        this.color[val].color="#ffd04b"
      },
    },
    props: {
      value: {
        type: String,
        default: "sumActivity"
      }
    },
    mounted() {
      this.getCardData()
    },
    methods: {
      getCardData() {
        this.axios.get('/vue-demo/api/getcarddata').then((response) => {
          this.list = response.data.data
        }).catch((response) => {
          console.log(response)
        })
      },
      changeFlag(val) {
        this.value = val;
        this.$emit("input", val)
      },

    }
  }
</script>

<style scoped>
  .card {
    padding: 50px 0px !important;

  }

  .innercard {
    height: 80%;
    text-align: center;
    padding-top: 10%;
    cursor: pointer
  }

  h1 {
    margin-top: 2%;
  }


</style>
