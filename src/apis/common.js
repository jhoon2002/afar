import Vue from "vue"
import store from "@/store"

Vue.prototype.$user = function() {
    return store.state.user
}