import axios from "axios"
import VueCookies from "vue-cookies"
import store from "@/store"
import moment from "moment"

const intervalNumber = "60"
const intervalUnit = "min"
const interval = intervalNumber + intervalUnit

/* 
<vue-cookies 시간 단위>
* jwt와 다름에 유의
---------------------
Unit	full name
---------------------
y	year
m	month
d	day
h	hour
min	minute
s	second
--------------------*/

/*
 *
 * <baseURL: 빌드 방법에 따라 동적 적용>
 * '/dev'(개발 모드) 또는 '/pro'(배포 모드) 두 가지 .env.development, .env.production 연동
 * 예컨데, 개발 모드(npm run serve) 시, URI 는 '/dev/api/login' 식으로 되며,
 * 호스트는 vue.config.js 에서 baseURL 에 따라 설정된 값(http://localhost:3000)이 적용됨
 * URI 중 '/dev' 부분은 vue.config.js 의 pathRewrite 설정에 따라 수정될 것이므로,
 * 따라서 최종 URL 은 http://localhost:3000/api/login 가 됨
 * 
 */
const instance = axios.create({ 
    baseURL: process.env.VUE_APP_WAS  
})

instance.interceptors.request.use( (config) => {

    config.headers.token = VueCookies.get("token")
    return config

}, function (error) {

    return Promise.reject(error)

})

instance.interceptors.response.use( (response) => {

    const {
        headers: {
            "verified-token": verifiedToken
        },
        config: {
            url: requestURL,
            headers: {
                token: oldToken
            }
        }
    } = response

    // 로그인 전 (회원 가입 중... 등)
    if (!verifiedToken && !oldToken) {
        console.log("<RES ICP> " + requestURL)
        return response
    }

    if (verifiedToken === oldToken) { //verifiedToken 또는 oldToken 이 null 이거나 '' 이면 아래 error 로 빠진 상태
        console.log(`%c<RES ICP>%c ${requestURL} => %c정상 토큰 %c ${verifiedToken && verifiedToken.slice(-5)} %c ${moment().format("HH:mm:ss")}`,
            'background:#3075e3; color: white', '', 'color: #3075e3', 'background: #333; color:white', '')
    } else {
        console.log(`%c<RES ICP>%c ${requestURL} => %c신규 토큰(저장) %c ${verifiedToken && verifiedToken.slice(-5)} %c ${moment().format("HH:mm:ss")} ${moment().add(intervalNumber, intervalUnit).format("HH:mm:ss")}`,
            'background:#f16c06; color: white', '', 'color: #f16c06', 'background: #333; color:white', '')
    }

    //토큰 저장
    VueCookies.set('token', verifiedToken, interval)
    store.commit("user/setToken", verifiedToken)

    return response

}, (error) => {

    const {
        headers: {
           "verified-token": verifiedToken
        },
        config: {
            url: requestURL
        },
        data: {
            type,
            msg
        }
    } = error.response

    //VerifyToken 과정에서 발생한 예외
    if ( type === "DELETE_REQUIRED" ) {
        
        //토큰 삭제
        VueCookies.remove('token')
        store.commit('user/setToken', "")
        console.log(`%c<RES ICP>%c ${requestURL} => %c무효 토큰(${msg}) 삭제 %c ${verifiedToken && verifiedToken.slice(-5)} %c ${moment().format('HH:mm:ss')}`,
            'background:#c42f72; color: white', '', 'color: #c42f72', 'background: #333; color:white', '')
        return Promise.reject(error)
    }

    //다른 일반 예외, VerifyToken 은 통과했으므로 여기서 발생한 토큰은 저장
    VueCookies.set('token', verifiedToken, interval)
    store.commit("user/setToken", verifiedToken)
    console.log("[http.js]", msg)
    return Promise.reject(error)

})

export default instance