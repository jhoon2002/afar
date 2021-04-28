import VueCookies from 'vue-cookies'
import http from "@/apis/http";

export const login = async (userId, password) => {
    const ret = await http.post('/api/users/login', {
        userId: userId,
        password: password
    })
    VueCookies.set('token', ret.data.token, '60s')
}

/*
export async function refreshToken() {
    const ret = await http.post('/api/users/refresh-token')
    VueCookies.set('token', ret.data.token, '60s')
    return ret
}
*/

export async function checkToken() {
    const ret = await http.get('/api/users/check-token')
    if (ret.status === 201) {
        console.log("예전", VueCookies.get("token"))
        console.log("갱신", ret.data.newToken)
        VueCookies.remove('token')
        VueCookies.set('token', ret.data.newToken, '60s')
    }
}

export const removeToken = () => {
    VueCookies.remove('token')
}