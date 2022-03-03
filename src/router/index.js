import Vue from "vue";
import VueRouter from "vue-router";
import EventDetails from "../components/eventdetalis.component.vue";
import SignIn from "../components/Authentification/signin.component.vue";
import SignUp from "../components/Authentification/signup.component.vue";
import Welcome from "../components/welcome.component.vue";
import Footer from "../components/Footer/footer.component.vue";
import addEvent from "../components/addEvent.component.vue";
import Settings from "../components/profileManagement.component.vue";
import Meet from "../components/meet.component.vue";
Vue.use(VueRouter);

function guardMyRoute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem("token")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/"); // go to '/login';
  }
}

const routes = [
  {
    // path: '/',
    // name: 'Welcome',
    // component: Welcome,
    // beforeEnter: guardMyRoute,
    path: "/",
    name: "SignIn",
    component: SignIn,
    meta: {
      hideNavigation: true,
      hideFooter: true,
    },
  },
  {
    path: "/EventDetails/:id",
    name: "EventDetails",
    component: EventDetails,
    beforeEnter: guardMyRoute,
  },
  {
    path: "/Welcome",
    name: "Welcome",
    component: Welcome,
    beforeEnter: guardMyRoute,
  },
  {
    path: "/Registration",
    name: "SignUp",
    component: SignUp,
    meta: {
      hideNavigation: true,
      hideFooter: true,
    },
  },
  {
    path: "/AddEvent",
    name: "addEvent",
    component: addEvent,
    beforeEnter: guardMyRoute,
  },
  {
    path: "/Footer",
    name: "Footer",
    component: Footer,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/meet/:idMeet",
    name: "Meet",
    component: Meet,
    meta: {
      hideNavigation: true,
      hideFooter: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
