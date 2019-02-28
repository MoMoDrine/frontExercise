import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  topNavState: 'home',
  leftNavState: 'home'
}
const Store=new Vuex.Store({
  state
})

export default Store
