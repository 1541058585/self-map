import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/tianditu',
      name: '天地图API为例子',
      component: () => import('@/page/tianditu-map')
    },
    {
      path: '/olmap',
      name: 'olmap',
      component: () => import('@/page/olmap')
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: () => import('@/page/heatmap')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/page/test')
    }
  ]
})
