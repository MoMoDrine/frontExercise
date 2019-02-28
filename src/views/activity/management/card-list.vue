<template>
  <div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column :key="column.label" v-for="column in columns" :label="column.label"
                       :prop="column.prop" :width="changeWidth(column.prop)"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=query.page
      :page-sizes="[10, 20, 50, 100]"
      :page-size=query.limit
      layout="total, sizes, prev, pager, next, jumper"
      :total="sumList[flag]"
    style="float:right;margin-top:5px">
    </el-pagination>
  </div>
</template>

<script>
  import cardModel from './card-model'
  import Dict from '../../../libs/Dict'
  export default {
    name: "card-list",
    computed: {
      columns() {
        return this.cardModel[this.flag] ? this.cardModel[this.flag].columns : []
      },
      tableData() {
        return this.list;
      },
    },
    props: {
      flag: {
        type: String,
        default: "sumActivity"
      },
      sumList: {},
    },
    data() {
      return {
        query: {
          limit: 10,
          page: 0,
        },
        list: [],
        cardModel: _.cloneDeep(cardModel),
        Dict:Dict
      }
    },
    mounted() {
      this.getSumActivity()
    },
    methods: {
      getSumActivity() {
        let postData = {...this.query, type: this.flag};
        this.axios.post('/vue-demo/api/getsumactiivitydata', postData).then((response) => {
          this.list = response.data.data;
          this.list.forEach(item=>{
            item['activityState']=this.filterDict(Dict.activityState,item['activityState'])
          });
        }).catch((response) => {
          console.log(response)
        })
      },
      handleSizeChange(pageSize) {
        this.query.limit = pageSize;
        this.getSumActivity()
      },
      handleCurrentChange(currentPage) {
        this.query.page = currentPage;
        this.getSumActivity()
      },
      changeWidth(val){
        if(val==='activityPlace'){
          return '350px'
        }
      },
      filterDict(dicts, value){
        return _.get(dicts.filter(s => s.value === value), "[0].label", null);
      }
    }

  }
</script>

<style scoped>

</style>
