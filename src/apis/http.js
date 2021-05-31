import axios from "axios"
import VueCookies from "vue-cookies"
import store from "@/store"
import moment from "moment"

const intervalNumber = "4"
const intervalUnit = "s"
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

    // Do something with request error
    return Promise.reject(error)

    /*
    if (store.state.user.token !== null) {
        config['headers'] = {
            Authorization: `Bearer ${store.state.user.token}`
        }
    }
    return config
    */
 })

instance.interceptors.response.use( (response) => {

    // store.commit('error/setValidationError', {})
    
    /*
     * response.headers.newtoken 은 토큰이 생성되거나 새 토큰으로 갱신될 때 존재
     * 이때 newToken은 쿠키와 스토어에 저장
     */

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

    if (verifiedToken === oldToken) {
        //store.commit('user/setToken', oldToken) //sync를 위해서 스토어에 재저장(화면 refresh의 경우 필요)
        console.log(`%c<RES ICP>%c ${requestURL} => %c정상 토큰 %c ${verifiedToken && verifiedToken.slice(-5)} %c ${moment().format("HH:mm:ss")}`,
            'background:#3075e3; color: white', '', 'color: #3075e3', 'background: #333; color:white', '')
    } else {
        // const { newtoken: newToken } = response.headers //애초 headers 내에서는 소문자로 저장되기 때문에, Camel case로 변경
        //VueCookies.remove('token')
        //VueCookies.set('token', newToken, interval)
        //store.commit('user/setToken', newToken)
        console.log(`%c<RES ICP>%c ${requestURL} => %c신규 토큰(저장) %c ${verifiedToken && verifiedToken.slice(-5)} %c ${moment().format("HH:mm:ss")} ${moment().add(intervalNumber, intervalUnit).format("HH:mm:ss")}`,
            'background:#f16c06; color: white', '', 'color: #f16c06', 'background: #333; color:white', '')
    }

    VueCookies.set('token', verifiedToken, interval)
    store.commit("user/setToken", verifiedToken)
    return response

}, (error) => {

    const {
        //headers: {
        //    "verified-token": verifiedToken
        //},
        config: {
            url: requestURL
        },
        data: {
            msg
        }
    } = error.response

    if (msg === "NO_TOKEN" || msg === "EXPIRED_TOKEN" || msg === "INVALID_TOKEN") {
        VueCookies.remove('token')
        store.commit('user/setToken', "")
        console.log(`%c<RES ICP>%c ${requestURL} => %c무효 토큰(삭제) %c %c ${moment().format('HH:mm:ss')}`,
            'background:#c42f72; color: white', '', 'color: #c42f72', 'background: #333; color:white', '')
    }

    //else {
    //    console.log(`%c<RES ICP>%c ${requestURL} => %c토큰 문제 아닌 에러%c ${moment().format('HH:mm:ss')}`,
    //        'background:red; color: white', '', 'color: red', '')
    //}

    // console.log( error.response.headers )
    // if (error.response.status === 422) {
        // store.commit('error/setValidationError', error.response.data.data)
    // } else {
        return Promise.reject(error)
    // }
})

export default instance