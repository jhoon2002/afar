import Vue from "vue"
import store from "@/store"

Vue.prototype.$user = function() {
    return {
        token: store.state.user.token,
        _id: store.state.user._id,
        userId: store.state.user.userId,
        jumin: store.state.user.jumin,
        name: store.state.user.name,
        cellphone: store.state.user.cellphone,
        email: store.state.user.email,
        face: store.state.user.face,
        color: store.state.user.color,
        t: store.state.user.t
    }
}
Vue.prototype.$token = () => {
    return store.state.user.token
}
Vue.prototype.$user_id = () => {
    return store.state.user._id
}
Vue.prototype.$userId = () => {
    return store.state.user.userId
}
Vue.prototype.$userJumin = () => {
    return store.state.user.jumin
}
Vue.prototype.$userName = () => {
    return store.state.user.name
}
Vue.prototype.$userCellphone = () => {
    return store.state.user.cellphone
}
Vue.prototype.$userEmail = () => {
    return store.state.user.email
}
Vue.prototype.$userFace = () => {
    return store.state.user.face
}
Vue.prototype.$userColor = () => {
    return store.state.user.color
}
Vue.prototype.$userT = () => {
    return store.state.user.t
}
