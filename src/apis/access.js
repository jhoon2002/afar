import VueCookies from 'vue-cookies'
import http from "@/apis/http"
import store from "@/store"
import jwt from "jsonwebtoken"
import env from "@/env.js"

export const login = async (userId, password) => {
    const ret = await http.post('/api/users/login', {
        userId: userId,
        password: password
    })
    putCookies(ret.data, "120m")
}

/*
export async function refreshToken() {
    const ret = await http.post('/api/users/refresh-token')
    VueCookies.set('token', ret.data.token, '60s')
    return ret
}
*/

export async function checkToken() {
    try {
        const ret = await http.get('/api/users/check-token')
        if (ret.status === 201) {
            removeCookies()
            updateCookies(ret.data, "120m")
            logCookies("(갱신)")
        }
    } catch {
        console.log("checkToken 예외 처리")
        removeCookies()
    }
}

const putCookies = function( httpResData, interval )  {
    //쿠키 저장
    VueCookies.set('token', httpResData.token, interval)
    // VueCookies.set('_id', httpResData._id, interval)
    // VueCookies.set('userId', httpResData.userId, interval)
    // VueCookies.set('name', httpResData.name, interval)
    // VueCookies.set('face', httpResData.face, interval)

    //스토어 저장
    store.commit('user/setToken', httpResData.token)
    store.commit('user/set_id', httpResData._id)
    store.commit('user/setUserId', httpResData.userId)
    store.commit('user/setName', httpResData.name)
    if (httpResData.face) {
        store.commit("user/setFace", httpResData.face)
        store.commit("user/setFaceURL", env.facedir + httpResData.face + "?t=" + new Date().getTime())
    }

    console.log("putCookies 수행")
    logCookies()
}

const updateCookies = function( httpResData, interval )  {
    //쿠키 저장
    VueCookies.set('token', httpResData.token, interval)
    // VueCookies.set('_id', VueCookies.get("_id"), interval)
    // VueCookies.set('userId', VueCookies.get("userId"), interval)
    // VueCookies.set('name', VueCookies.get("name"), interval)
    // VueCookies.set('face', VueCookies.get("face"), interval)

    //스토어 저장
    // store.commit('user/setToken', httpResData.token)
    // store.commit('user/set_id', httpResData._id)
    // store.commit('user/setUserId', httpResData.userId)
    // store.commit('user/setName', httpResData.name)
    // store.commit("user/setFace", httpResData.face)

    console.log("putCookies 수행")
    logCookies("(갱신)")
}

export const removeCookies = () => {
    //쿠기 삭제
    VueCookies.remove('token')
    // VueCookies.remove('_id')
    // VueCookies.remove('userId')
    // VueCookies.remove('name')
    // VueCookies.remove('face')

    //스토어 삭제
    store.commit('user/setToken', null)
    store.commit('user/set_id', null)
    store.commit('user/setUserId', null)
    store.commit('user/setName', null)
    store.commit('user/setFace', null)
    store.commit('user/setFaceURL', null)
    console.log("removeCookies 수행")
}

export const logCookies = (v="") => {
    console.log("token" + v + ":", VueCookies.get("token"))
    // console.log("_id" + v + ":", VueCookies.get("_id"))
    // console.log("userId" + v + ":", VueCookies.get("userId"))
    // console.log("name" + v + ":", VueCookies.get("name"))
    // console.log("face" + v + ":", VueCookies.get("face"))

    console.log("_id", store.state.user._id)
    console.log("userId", store.state.user.userId)
    console.log("name", store.state.user.name)
    console.log("face", store.state.user.face)
    console.log("faceURL", store.state.user.faceURL)
}

export const logout = () => {
    removeCookies()
}

const verifyToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, "U-Koz56^--Yui", function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
    })
})

//쿠기, 스토어 동기화
export const syncCookies = async () => {
    try {
        const user = await verifyToken(VueCookies.get('token'))
        const ret = await http.get('/api/users/' + user._id)

        store.commit('user/setToken', VueCookies.get('token'))
        store.commit('user/set_id', ret.data.user._id)
        store.commit('user/setUserId', ret.data.user.userId)
        store.commit('user/setName', ret.data.user.name)
        if (ret.data.user.face) {
            store.commit("user/setFace", ret.data.user.face)
            store.commit("user/setFaceURL", env.facedir + ret.data.user.face + "?t=" + new Date().getTime())
        }
    } catch {
        //
    }
}
