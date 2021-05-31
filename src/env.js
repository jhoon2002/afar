import VueCookies from "vue-cookies"

export default {
    url: process.env.VUE_APP_WAS,
    facedir: process.env.VUE_APP_FACE_DIR,
    token: function () {
        return VueCookies("token")
    }
}