import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify.js'
import  "@/ElementTiptap.js"
import "@/VeeValidate.js";
import "@/assets/basic.css"
import Data from "@/data.js"
import vueMoment from "vue-moment"
Vue.use(vueMoment)

Vue.prototype.$_DATA = Data
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
