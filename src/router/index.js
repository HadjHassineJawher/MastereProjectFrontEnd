import Vue from 'vue'
import VueRouter from 'vue-router'
import EventDetails from '../components/eventdetalis.component.vue'
import SignIn from '../components/Authentification/signin.component.vue'
import SignUp from '../components/Authentification/signup.component.vue'
import Welcome from '../components/welcome.component.vue'
import Footer from '../components/Footer/footer.component.vue'
import addEvent from '../components/addEvent.component.vue'
Vue.use(VueRouter)

function guardMyRoute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or 
  // centralised way to handle you localstorage data handling 
  if (localStorage.getItem('token'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

const routes = [{
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: guardMyRoute,
  },
  {
    path: '/EventDetails/:id',
    name: 'EventDetails',
    component: EventDetails,
    beforeEnter: guardMyRoute,
  },
  {
    path: '/Login',
    name: 'SignIn',
    component: SignIn,
    meta: {
      hideNavigation: true
    }
  },
  {
    path: '/Registration',
    name: 'SignUp',
    component: SignUp,
    meta: {
      hideNavigation: true
    }
  },
  {
    path: '/AddEvent',
    name: 'addEvent',
    component: addEvent,
    beforeEnter: guardMyRoute,
  },
  {
    path: '/Footer',
    name: 'Footer',
    component: Footer
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router