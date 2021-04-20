import Vue from "vue"
import App from "@/App.vue"
import router from "@/router"
import store from "@/store"
import vuetify from "@/plugins/vuetify.js"
import "@/VeeValidate.js"
import vueMoment from "vue-moment"
// import acl from "@/acl.js"
import VueCookies from "vue-cookies"

//util
import axios from "axios"
import { util } from "@/api/util.js"
import data from "@/data.js"

//css
import "@/assets/basic.css"

Vue.use(vueMoment)
Vue.use(VueCookies)
Vue.$cookies.config("7d") // expire 7일 (global 설정)
Vue.prototype.$_DATA = data
Vue.prototype.$axios = axios
Vue.prototype.$util = util
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // acl,
  render: h => h(App)
}).$mount('#app')
