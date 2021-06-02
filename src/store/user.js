import { login } from "@/apis/access.js"
import router from "@/router"
// import env from "@/env";
// import env from "@/env.js"

export default {
    namespaced: true,

    state: { 
        token: null ,
        _id: null,
        userId: null,
        name: null,
        jumin: null,
        cellphone: null,
        email: null,
        face: "none.svg",
        //faceURL: "files/faces/none.svg",
        color: "#31596c",
        t: ""
    },
    getters: {
        isLogin(state) {
            // console.log("state._id", state._id)
            if (state._id === "607e68e6bd257006b866e7ba") {
                return true
            }
            return false
        },
        // getFaceURL(state) {
        //     return env.facedir + state.face + "?t=" + new Date().getTime()
        // }
    },
    mutations: {
        setToken(state, token) { 
            state.token = token 
        },
        set_id(state, _id) {
            state._id = _id
        },
        setUserId(state, userId) {
            state.userId = userId
        },
        setName(state, name) {
            state.name = name
        },
        setJumin(state, jumin) {
            state.jumin = jumin
        },
        setCellphone(state, cellphone) {
            state.cellphone = cellphone
        },
        setEmail(state, email) {
            state.email = email
        },
        setMessage(state, message) {
            state.message = message
        },
        setFace(state, face) {
            state.face = face
        },
        setColor(state, color) {
            state.color = color
        },
        resetFace(state) {
            state.face = "none.svg"
            //state.faceURL = "files/faces/none.svg"
            //console.log("state.faceURL", state.faceURL)
        },
        setT(state, t) {
            state.t = t
        },
    },
    actions: {
        async login( { commit }, payload ) {
            try {
                await login(payload.userId, payload.password)
                // token, _id, userId, name 등은 api(access.js)에서 처리
                commit('setMessage', "")
                router.push({ path: "/main" })
            } catch(e) {
                commit('setMessage', "")
                if (e.response.status === 403) {
                    setTimeout(() => ( commit('setMessage', "\"아이디 또는 암호가 일치하지 않습니다.\"") ), 100)
                    return
                }
                if (e.response.status === 401) {
                    setTimeout(() => ( commit('setMessage', "\"토큰이 정상적으로 생성되지 않았습니다.\"") ), 100)
                    return
                }
                setTimeout(() => ( commit('setMessage', "\"시스템 문제로 로그인 할 수 없습니다.\"") ), 100)
            }
        }
    }
}