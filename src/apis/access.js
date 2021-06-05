import VueCookies from 'vue-cookies'
import http from "@/apis/http"
import store from "@/store"
// import jwt from "jsonwebtoken"
// import env from "@/env.js"

// const intervalNumber = "4"
// const intervalUnit = "s"
// const interval = intervalNumber + intervalUnit

/*
 * <토큰 처리 방식>
 * Request: 토큰은 항상 헤더의 'token'에 실어 보냄
 * Response: 토큰이 생성되는 경우(신규, 갱신)에 한하여 헤더의 'newToken'으로 받음
 * 저장: Response Interceptor 가 response.headers.newtoken 값이 있는 경우 (1)쿠키와 (2)스토어에 그 값을 저장
 * 검사: (1)Vue 라우터를 통해 경로가 바뀌는 경우: Express 서버에 검사를 요청, 이때 토큰은 헤더의 'token'으로 보냄은 동일
 *      (2)DB에 접근하는 경우: Express 서버에 서비스를 요청하게 되면 서버의 미들웨어(verifyToken)가 요청을 수행하기 전 검사를 수행,
 *         이때 토큰은 헤더의 'token'으로 보냄은 동일
 * 
 * <토큰 갱신>
 * 1. 토큰은 만료 전 일정 시간(갱신 시간) 내에 검사(1), (2)의 요청이 있는 경우, Express 서버는 새로운
 *    토큰을 만들어 Response 함(201), 이때 토큰은 res.headers.newToken 에 담아 보냄
 * 2. 갱신 시간 전에 검사(1), (2)의 요청이 있는 경우는 200 응답을 보내고 토큰은 보내지 않음, res.headers.newToken 값은 공백 ''
 * 3. 갱신 시간 이후에 검사(1), (2)의 요청이 있는 경우는 front 에서 이미 토큰을 expire 하기 때문에 토큰을 전송하지 못함,
 *    Express 는 400 응답. 간혹 416으로 응답 하는 경우가 있는 데, 이에 대해서는 해당 Express 코드 주석을 참고할 것
 *
 * <토큰 삭제>
 * front 에서 (1)기간이 만료되거나(front에서 자동 삭제) (2)검사 결과 예외가 발생한 경우(400, 401, 416) 
 * response 헤더에 'badToken' = 'true' 를 저장하여 Interceptor 에서 이를 감지하면 토큰 삭제
 *
 * 토큰의 저장과 삭제 시에는
 *
 */


export const login = async (userId, password) => {
    const { data: { user } } = await http.post('/api/users/login', {
        userId: userId,
        password: password
    })
    store.commit('user/set_id', user._id)
    store.commit('user/setUserId', user.userId)
    store.commit('user/setName', user.name)
    store.commit('user/setJumin', user.jumin)
    store.commit('user/setCellphone', user.cellphone)
    store.commit('user/setEmail', user.email)
    store.commit("user/setFace", user.face)
    store.commit('user/setColor', user.color)
}

export async function checkToken() {
    try {
        await http.get('/api/users/check-token')
    } catch(e) {
        //사실상 예외처리는 interceptor 에서 수행, 여긴 에러 출력만
        console.group()
        console.log("checkToken 결과: 예외,",
            "status: " + e.response.status,
            "data:", e.response.data, new Date(), e)
        console.groupEnd()
        // removeCookies() //interceptor 삭제 수행
    }
}

export const removeCookies = () => {
    //쿠기 삭제
    VueCookies.remove('token')

    //스토어 삭제
    store.commit('user/setToken', null)
    store.commit('user/set_id', null)
    store.commit('user/setUserId', null)
    store.commit('user/setName', null)
    store.commit('user/setJumin', null)
    store.commit('user/setCellphone', null)
    store.commit('user/setEmail', null)
    store.commit('user/setColor', null)

    //face 가 나오는 페이지에서 삭제 순간 오류 로그가 발생하는 현상(이미지를 순간적으로 http://localhost:3000/null 로 요청) 방지를 위해 삭제하지 않음
    // store.commit('user/setFace', null)
}

export const logout = () => {
    removeCookies()
}

//쿠기, 스토어 동기화
export const syncCookies = async function() {
    try {
        //쿠키에서 user._id를 검출하고 해당 사용자 정보를 얻어옴
        const { data: { _id }  } = await http.get('/api/users/_id/token')
        const { data: { user } } = await http.get('/api/users/' + _id)

        store.commit('user/setToken', VueCookies.get("token"))
        store.commit('user/set_id', user._id)
        store.commit('user/setUserId', user.userId)
        store.commit('user/setName', user.name)
        store.commit('user/setJumin', user.jumin)
        store.commit('user/setCellphone', user.cellphone)
        store.commit('user/setEmail', user.email)
        store.commit("user/setFace", user.face)
        store.commit('user/setColor', user.color)

    } catch(e) {
        console.log(e)
        // removeCookies() 삭제는 interceptor 에서 수행
    } finally {
        //
    }
}
