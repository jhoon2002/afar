import VueCookies from 'vue-cookies'
import http from "@/api/http";

export async function login(userId, password) {

    try {
        const ret = await http.post('/api/users/login', {
            userId: userId,
            password: password
        })
        VueCookies.set('token', ret.data.token, '60s')
        // VueCookies.set('refresh_token', ret.data.refresh_token, '70s')
        // http.defaults.headers['refresh_token'] = VueCookies.get('refresh_token')
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