import Vue from 'vue'
import VueRouter from 'vue-router'
import EventDetails from '../components/eventdetalis.component.vue'
import SignIn from '../components/Authentification/signin.component.vue'
import SignUp from '../components/Authentification/signup.component.vue'
import Welcome from '../components/welcome.component.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/EventDetails/:id',
    name: 'EventDetails',
    component: EventDetails
  },
  {
    path:'/Login',
    name: 'SignIn',
    component: SignIn
  },
  {
    path:'/Registration',
    name: 'SignUp',
    component: SignUp
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router