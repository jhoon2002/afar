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
// import axios from "axios"
import http from "@/apis/http.js"
import { util } from "@/apis/util.js"
import data from "@/data.js"

//css
import "@/assets/basic.css"

Vue.use(vueMoment)
Vue.use(VueCookies)
Vue.prototype.$_DATA = data
Vue.prototype.$http = http
Vue.prototype.$util = util
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // acl,
  render: h => h(App)
}).$mount('#app')
