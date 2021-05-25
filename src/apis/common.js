import Vue from "vue"
import store from "@/store"

Vue.prototype.$user_id = () => {
    return store.state.user._id
}
Vue.prototype.$userId = () => {
    return store.state.user.userId
}
Vue.prototype.$userName = () => {
    return store.state.user.name
}
