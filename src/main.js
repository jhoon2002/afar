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
import http from "@/apis/http.js"
import { util } from "@/apis/util.js"
import dummy from "@/dummy.js"
import env from "@/env.js"

//
import "@/apis/common.js"

//css
import "@/assets/basic.css"

Vue.use(vueMoment)
Vue.use(VueCookies)
Vue.prototype.$dummy = dummy
Vue.prototype.$env = env
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
