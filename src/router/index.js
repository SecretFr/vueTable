import Vue from 'vue'
import Router from 'vue-router'
import Plan from '@/components/Plan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Plan',
      component: Plan
    }
  ]
})
