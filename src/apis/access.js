import VueCookies from 'vue-cookies'
import http from "@/apis/http"
import store from "@/store"
import jwt from "jsonwebtoken"
import env from "@/env.js"

const expiredInterval = "2m"

export const login = async (userId, password) => {
    const ret = await http.post('/api/users/login', {
        userId: userId,
        password: password
    })
    putCookies(ret.data, expiredInterval)
}

/*
export async function refreshToken() {
    const ret = await http.post('/api/users/refresh-token')
    VueCookies.set('token', ret.data.token, '60s')
    return ret
}
*/

export async function checkToken() {
    console.log("-------checkToken 시작---------")
    try {
        const ret = await http.get('/api/users/check-token')
        if (ret.status === 201) {
            console.log("checkToken 결과 201 => 갱신")
            removeCookies()
            await updateCookies(ret.data, expiredInterval)
        }
        console.log("checkToken 결과 200, 또는 304 => 이상 없음(갱신 아님)")
    } catch(e) {
        console.log("checkToken 결과 예외 발생(기간 만료)", e)
        removeCookies()
    } finally {
        console.log("--------checkToken 종료--------")
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

const updateCookies = async function( httpResData, interval )  {
    console.log("<<<<<<<< updateCookies 시작 >>>>>>>>>> ")
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

    await syncCookies()

    logCookies("(갱신)")
    console.log("<<<<<<<< updateCookies 종료 >>>>>>>>>> ")
}

export const removeCookies = () => {
    console.log("removeCookies 시작")
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
    console.log("removeCookies 종료")
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
    //console.log("face", store.state.user.face)
    //console.log("faceURL", store.state.user.faceURL)
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

/*const getUser_idFromToken = async (token) => {

    await http.get('/api/user/_id')

    return
}*/


//쿠기, 스토어 동기화
export const syncCookies = async function() {
    console.log("---syncCookies----")
    try {
        console.log(1)
        //쿠키에서 user._id를 검출하고 해당 사용자 정보를 얻어옴 
        const user = await verifyToken(VueCookies.get('token'))
        //await getUser_idFromToken(token)

        console.log(2)
        console.log("user", user)
        const ret = await http.get('/api/users/' + user._id)

        console.log("syncCookies 실행 중, ret", ret)

        store.commit('user/setToken', VueCookies.get('token'))
        store.commit('user/set_id', ret.data.user._id)
        store.commit('user/setUserId', ret.data.user.userId)
        store.commit('user/setName', ret.data.user.name)
        console.log(3)
        if (ret.data.user.face) {
            store.commit("user/setFace", ret.data.user.face)
            store.commit("user/setFaceURL", env.facedir + ret.data.user.face + "?t=" + new Date().getTime())
        }
    } catch(e) {
        //쿠키 기간이 만료되었거나 그 밖에 쿠키 검사 과정에서 예외 발생시 쿠키 제거
        console.log(e)
        removeCookies()
    } finally {
        //
    }
    console.log("---//syncCookies----")
}
