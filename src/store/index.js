import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
// import error from "./error"
// import employee from "./employee"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    // error,
    // employee
  }
})