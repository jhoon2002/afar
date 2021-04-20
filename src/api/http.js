import axios from "axios"
import store from "@/store"
import VueCookies from 'vue-cookies'

const instance = axios.create({ 
    baseURL: process.env.WEB_APP_SERVER 
});

instance.interceptors.request.use( (config) => {

    // Do something before request is sent
    config.headers.token = VueCookies.get('token')
    config.headers.refresh_token = VueCookies.get('refresh_token')

    console.log("config", config)

    return config

}, function (error) {
    // Do something with request error
    return Promise.reject(error);

    /*
    if (store.state.auth.token !== null) {
        config['headers'] = {
            Authorization: `Bearer ${store.state.auth.token}`
        }
    }
    return config;
    */
 });

instance.interceptors.response.use( (response) => {
    store.commit('error/setValidationError', {});
    return response;
}, (error) => {
    if (error.response.status === 422) {
        store.commit('error/setValidationError', error.response.data.data);
    } else {
        return Promise.reject(error);
    }
});

export default instance;