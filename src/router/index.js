import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/dashboard/home'
import activityRelease from '../views/activity/release/release'
import activityManagement from '../views/activity/management/index'
import second from '../views/dashboard/second'
import workItem from '../views/workItem/workItem'
import twoZeroFourEight from '../views/game/2048/twoZeroFourEight'
import numberMove from '../views/game/number-move/number-move'
import rest from '../views/game/rest'
import other from '../views/other'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:'/workItem',
      children:[
        {
          path:'/workItem',
          name:'workItem',
          component:workItem,
        },
        {
          path: '/activity',
          name: 'activity',
          component:second,
          children:[
            {
              path: 'activityRelease',
              name: 'activityRelease',
              component: activityRelease
            },
            {
              path: 'activityManagement',
              name: 'activityManagement',
              component: activityManagement
            },

          ]
        },
        {
          path: '/game',
          name: 'game',
          component:second,
          children:[
            {
              path: '2048',
              name: '2048',
              component: twoZeroFourEight
            },
            {
              path: 'numberMove',
              name: 'numberMove',
              component: numberMove
            },
            {
              path: 'rest',
              name: 'rest',
              component: rest
            },

          ]
        },
        {
          path:'/other',
          name:'other',
          component:other,
        },

      ]
    },

  ]
})
