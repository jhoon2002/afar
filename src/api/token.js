import VueCookies from 'vue-cookies'
import http from "@/api/http";

export async function login(userId, password) {

    try {
        const ret = await http.post('/api/users/login', {
            userId: userId,
            password: password
        })
        //VueCookies.set('token', ret.data.token, '60s')
        // VueCookies.set('refresh_token', ret.data.refresh_token, '70s')
        // http.defaults.headers['refresh_token'] = VueCookies.get('refresh_token')

        let expired = new Date()
        expired.setMinutes(expired.getMinutes() + 1)

        //console.log("timestamp(now):", new Date().getTime())
        //console.log("timestamp(+120):", expired.getTime())
        //
        //console.log("date(now):", new Date(new Date().getTime()))
        //console.log("date(+120):", new Date(expired.getTime()))

        const session = window.sessionStorage
        session.setItem("token", ret.data.token)
        session.setItem("expired", expired.getTime())

        return ret
    } catch(err) {
        return err
    }

}

export async function refreshToken() {
    try {
        const ret = await http.post('/api/users/refresh-token')
        VueCookies.set('token', ret.data.token, '60s')
        return ret
    } catch(err) {
        return err
    }
}

export async function checkToken() {
    try {
        const ret = await http.get('/api/users/check-token')
        // VueCookies.set('token', ret.data.token, '60s')
        return ret
    } catch(err) {
        return err
    }
}