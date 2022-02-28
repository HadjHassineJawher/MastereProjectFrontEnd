import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib";

Vue.config.productionTip = false;
Vue.use(VueTelInputVuetify, {
  vuetify,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
