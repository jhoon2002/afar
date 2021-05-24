import VueCookies from 'vue-cookies'
import http from "@/apis/http";

export const login = async (userId, password) => {
    const ret = await http.post('/api/users/login', {
        userId: userId,
        password: password
    })
    putCookies(ret.data, "120m")
    logCookies()
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
        removeCookies()
        putCookies(ret.data, "120m")
        logCookies("(갱신)")
    }
}

const putCookies = function( httpResData, interval )  {
    VueCookies.set('token', httpResData.token, interval)
    VueCookies.set('_id', httpResData._id, interval)
    VueCookies.set('userId', httpResData.userId, interval)
    VueCookies.set('name', httpResData.name, interval)
}

export const removeCookies = () => {
    VueCookies.remove('token')
    VueCookies.remove('_id')
    VueCookies.remove('userId')
    VueCookies.remove('name')
}

export const logCookies = (v="") => {
    console.log("token" + v + ":", VueCookies.get("token"))
    console.log("_id" + v + ":", VueCookies.get("_id"))
    console.log("userId" + v + ":", VueCookies.get("userId"))
    console.log("name" + v + ":", VueCookies.get("name"))
}