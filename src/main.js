import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify.js'
import  "@/ElementTiptap.js"
import "@/assets/basic.css"
import Data from "@/data.js"
//import ElementUI from 'element-ui'
//import locale from 'element-ui/lib/locale/lang/ko'
//import './styles.scss'

//Vue.use(ElementUI, { locale })

Vue.prototype.$_DATA = Data
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
