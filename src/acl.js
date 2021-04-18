import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from './router'

Vue.use(AclInstaller)

export default new AclCreate({
    initial: 'public',
    notfound: {
        path: '/error',
        forwardQueryParams: true,
    },
    router,
    acceptLocalRules: true,
    globalRules: {
        isAdmin: new AclRule('admin').generate(),
        isLogged: new AclRule('user').or('admin').generate(),
    },
    middleware: async () => {
        // await timeout(2000) // call your api
        // acl.change('admin')
        // console.log(acl.change.length)
    }
})