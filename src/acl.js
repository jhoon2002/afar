import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl-5'
import router from '@/router'

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
        isPublic: new AclRule('public').or('admin').generate(),
        isLogged: new AclRule('user').and('inside').generate()
    },
    middleware: async () => {
        //await setTimeout(2000) // call your api
        //acl.change('admin')
    }
})