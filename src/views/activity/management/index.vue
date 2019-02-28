<template>
  <div>
    <card v-model="flag" @changeList="changeList"></card>
    <cardList :flag="flag" :sumList="sumList"></cardList>
  </div>
</template>

<script>
  import card from "./card"
  import cardList from "./card-list"

  export default {
    name: "index",
    components: {card, cardList},
    data() {
      return{
        flag:'sumActivity',
        sumList:{},
      }
    },
    methods:{
      changeList(val){
        this.sumList={...val}
        console.log(this.sumList)
      }
    }
  }
</script>

<style scoped>

</style>
