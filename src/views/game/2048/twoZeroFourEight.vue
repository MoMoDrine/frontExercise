<template>
  <div>
    <el-row :gutter="24" >
      <el-col :span="4" :offset="10">
        <p style="font-size:25px;text-align:center">分数：{{score}}</p>
      </el-col>
    </el-row>

    <el-row :gutter="24" v-loading="loading">
      <el-col class="container">
        <el-row :gutter="24">
          <el-col class="inBox" v-for="(item,index) in board" :key="index" style="padding-left: 0px;padding-right: 0px">
            <el-row>
              <el-col :class="`numberCellCommon numberCell${board[index]}`">{{board[index]}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="5" :offset="12">
        <el-button @click="newGame()" type="info">新游戏</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Mock from "mockjs"

  export default {
    data() {
      return {
        loading: false,
        board: [],
        isNewGame: false,
      }
    },
    computed: {
      score() {
        let sum = 0;
        this.board.forEach(item => {
          sum += item
        })
        return sum;
      }
    },
    created() {


    },
    mounted() {
      let This = this
      document.onkeyup = function (e) {
        let key = window.event.keyCode;
        if ((key == 37 || key == 65)&& This.loading===false) {
          This.keyAction(0)
          return false
        } else if ((key == 38 || key == 87)&& This.loading===false) {
          This.keyAction(3)
          return false
        } else if ((key == 39 || key == 68)&& This.loading===false) {
          This.keyAction(2)
          return false
        } else if ((key == 40 || key == 83)&& This.loading===false) {
          This.keyAction(1)
          return false
        }
      };
      this.newGame();

    },
    directives: {},
    methods: {
      keyAction(i) {
        if (this.moveLeft(i)) {
          this.generateNumber()
        }
        if (!this.isOver()) {

          this.$alert(`您的总得分为${this.score}`, '游戏结束', {
            confirmButtonText: '重新开始游戏',
            callback: ()=> {
             this.newGame()
              this.loading=false;
            }
          });
        }
      },


      isOver() {
        let canMove = false;
        for (let i = 0; i < 4; i++) {
          let arr = this.T(this.board, i);
          arr.forEach((item, index) => {
            if (item === 0) {
              canMove = true
            }
            if (index % 4 !== 0 && item !== 0) {
              if (arr[index - 1] === 0 || arr[index - 1] === arr[index]) {
                canMove = true
              }

            }

          })
        }
        if(!canMove){
          this.loading=true;
        }

        return canMove
      },
      init() {
        for (let i = 0; i < 16; i++) {
          this.board[i] = 0;

        }
      },
      generateNumber() {
        let newSpace = this.newSpace();

        if (newSpace.isNew) {
          let positionIndex = Mock.Random.natural(0, newSpace.zeroPosition.length - 1);
          let number = Math.random() < 0.5 ? 2 : 4;
          //Vue.set(vm.items, indexOfItem, newValue)
          this.$set(this.board, newSpace.zeroPosition[positionIndex], number)
          //this.board[newSpace.zeroPosition[positionIndex]] = number;
        }
      },
      newSpace() {
        let isNew = {isNew: false, zeroPosition: []};
        this.board.forEach((item, index) => {

          if (item === 0) {
            isNew.isNew = true;
            isNew.zeroPosition.push(index)
          }
        });
        return isNew
      },
      moveLeft(i) {
        if (this.isMove(i)) {
          this.testMove(i)
          return true
        } else {
          return false
        }

      },
      isMove(i) {
        this.board = this.T(this.board, i);
        let canMove = false;
        this.board.forEach((item, index) => {
          if (item === 0) {
            canMove = true
          }
          if (index % 4 !== 0 && item !== 0) {
            if (this.board[index - 1] === 0 || this.board[index - 1] === this.board[index]) {
              canMove = true
            }

          }

        })
        if (!canMove) {
          this.board = this.T(this.board, 4 - i);
        }
        return canMove
      },
      testMove(i) {

        this.board.forEach((item, index) => {

          if (index % 4 !== 0 && item !== 0) {

            for (let k = Math.floor((index / 4)) * 4; k < index; k++) {

              if (this.board[k] === 0 && this.noBlock(k, index, this.board)) {
                this.$set(this.board, k, this.board[index]);
                this.$set(this.board, index, 0);
                //this.board[index]=0;

              } else if (this.board[k] === this.board[index] && this.noBlock(k, index, this.board)) {

                this.$set(this.board, k, this.board[k] + this.board[index]);
                this.$set(this.board, index, 0);
                /*this.board[k] += this.board[index];
                this.board[index] = 0;*/

              }
            }
          }

        })
        this.board = this.T(this.board, 4 - i);

      },
      noBlock(colStart, colEnd, list) {
        for (let i = colStart + 1; i < colEnd; i++) {

          if (list[i] !== 0) {
            return false
          }

        }
        return true
      },

      T(arr, n) {

        n = n % 4;

        if (n === 0) return arr;
        let l = arr.length, d = Math.sqrt(l), tmp = [];
        for (let i = 0; i < d; i += 1)
          for (let j = 0; j < d; j += 1)
            tmp[d - i - 1 + j * d] = arr[i * d + j];
        if (n > 1) tmp = this.T(tmp, n - 1);

        return tmp;
      },
      newGame() {
        this.isNewGame = true;
        this.init();
        this.generateNumber();
        this.generateNumber();
        //console.log(this.board);
      }
    }
  }
</script>

<style scoped>
  @import url(./twoZeroFourEight.css);
</style>
