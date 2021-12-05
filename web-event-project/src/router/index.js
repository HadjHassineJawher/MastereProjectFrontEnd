import Vue from 'vue'
import VueRouter from 'vue-router'
import EventDetails from '../components/eventdetalis.component.vue'
import Welcome from '../components/welcome.component.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/EventDetails',
    name: 'EventDetails',
    component: EventDetails
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router