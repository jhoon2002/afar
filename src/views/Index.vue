<template>
    <v-app>
        <v-card elevation="0" class="d-flex justify-space-between ma-5" style="max-width: 100rem;">
            <v-card elevation="0" style="width: 23rem">
                <v-sheet class="logo transparent" style="width: 15rem">
                    <span class="stress">K</span>orea
                    National
                    University
                    of <span class="stress">Arts</span>

                    Industry
                    <span class="stress">A</span>cademy
                    <span class="stress">Co</span>operation
                    Foundation
                    <div style="position: absolute; left: 0; top: 0; display: none">
                        <div class="logo-ko" style="font-size: 5rem; left: 12rem; top: 3rem;">한</div>
                        <div class="logo-ko" style="font-size: 3.5rem; left: 15rem; top: 8rem;">국</div>
                        <div class="logo-ko" style="font-size: 4rem; left: 20rem; top: 5rem;">예</div>
                        <div class="logo-ko" style="font-size: 3rem; left: 20rem; top: 9rem;">술</div>
                        <div class="logo-ko" style="font-size: 6rem; left: 15rem; top: 11rem;">종</div>
                        <div class="logo-ko" style="font-size: 4.5rem; left: 20rem; top: 15rem;">합</div>
                        <div class="logo-ko" style="font-size: 4rem; left: 18rem; top: 19rem;">학</div>
                        <div class="logo-ko" style="font-size: 4.5rem; left: 18rem; top: 22.5rem;">교</div>
                    </div>
                    <div style="position: absolute; left: 13rem; top: 5rem; display: none">
                        <div class="logo-ko" style="font-size: 5rem; left: 12rem; top: 3rem;">산</div>
                        <div class="logo-ko" style="font-size: 3.5rem; left: 15rem; top: 8rem;">학</div>
                        <div class="logo-ko" style="font-size: 4rem; left: 14rem; top: 11rem;">협</div>
                        <div class="logo-ko" style="font-size: 3rem; left: 13rem; top: 15rem;">력</div>
                        <div class="logo-ko" style="font-size: 3.5rem; left: 14rem; top: 18rem;">단</div>
                    </div>
                </v-sheet>
            </v-card>
            <v-card elevation="0" style="width: 23rem" class="pt-16">
                <v-card-title style="min-height: 5rem; line-height: 1.2" class="text-body-1">
                    {{ message }}
                </v-card-title>
                <v-card-text>
                    <validation-observer
                            ref="observer"
                            v-slot="{ invalid, validated, handleSubmit }"
                    >
                        <validation-provider name="아이디" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field id="input-id" label="아이디" v-model="fuserId"
                                          :error-messages="errors" :success="valid"
                                          @keyup.enter="handleSubmit(submit)"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider name="비밀번호" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field id="input-password" label="비밀번호" v-model="fpassword"
                                          :error-messages="errors" :success="valid"
                                          :type="show ? 'text' : 'password'"
                                          :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                          @click:append="show = !show"
                                          @keyup.enter="handleSubmit(submit)"
                            ></v-text-field>
                        </validation-provider>

                        <v-btn outlined
                               @click="handleSubmit(submit)"
                               class="mt-8 text-body-1"
                               style="padding-bottom: 2px"
                        >
                            확인
                        </v-btn>
                    </validation-observer>
                </v-card-text>

                <v-card-text>
                    <v-sheet class="d-flex">

                        <register @registered="putId" />

                        <v-dialog
                                v-model="dialog2"
                                max-width="25rem"
                                width="25rem"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        text
                                        small
                                        class="px-1 ml-5"
                                        @click="$router.push('/register')"
                                >
                                    아이디 비밀번호 찾기
                                </v-btn>
                            </template>
                            <v-card elevation="0">
                                <v-card-title>
                                    아이디 비밀번호 찾기
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            icon
                                            @click="dialog2=false"
                                            style="margin-right: -0.5rem"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text class="py-8 text-body-1 text-center">
                                    산학협력단으로 연락주시기 바랍니다.
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="secondary"
                                            elevation="0"
                                            outlined
                                            @click="dialog2=false"
                                            class="text-body-1 mb-5"
                                            style="padding-bottom: 2px"
                                    >
                                        확인
                                    </v-btn>
                                    <v-spacer></v-spacer>아
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-sheet>
                </v-card-text>
            </v-card>
        </v-card>
    </v-app>
</template>
<script>
    // import { store } from 'vuex'
    // import VueCookies from "vue-cookies"
    import { login } from "@/apis/access.js"
    //import { isUserId } from "@/api/db.js"
    // import { logCookies } from "@/apis/access.js"
    import Register from "@/components/Register.vue"

    export default {
        name: "Index",
        components: {
            Register
        },
        data: function() {
            return {
                message: "",
                fuserId: "",
                fpassword: "",
                dialog2: false,
                show: false
            }
        },
        computed: {
        },
        methods: {
            async submit () {
                this.$refs.observer.validate()
                // await this.$store.dispatch('user/login', { userId: this.fuserId, password: this.fpassword })

                try {
                    await login(this.fuserId, this.fpassword)
                    this.message = ""
                    // setTimeout(() => ( this.$router.push({ path: "/main" }) ), 300)
                    this.$router.push({ path: "/main" }).catch(()=>{})
                } catch(e) {
                    this.message = ""
                    const { status } = e.response
                    if (status === 403) {
                        setTimeout(() => ( this.message = "\"아이디 또는 비밀번호가 일치하지 않습니다.\"" ), 100)
                        return
                    }
                    setTimeout(() => ( this.message = "\"시스템 문제로 로그인 할 수 없습니다.\"" ), 100)
                }
            },
            async putId() {
                this.fuserId = ""
                // const arr = e.split('')
                // for (const c of arr) {
                //     this.fuserId = this.fuserId + c
                //     await setTimeout( ()=>{}, 1000 )
                // }
                this.fuserId = "j"
                setTimeout( ()=>{ console.log(1) }, 2000 )
                this.fuserId = this.fuserId + "h"
                setTimeout( ()=>{ console.log(2) }, 2000 )
                this.fuserId = this.fuserId + "o"
                setTimeout( ()=>{ console.log(3) }, 2000 )
                this.fuserId = this.fuserId + "o"
                setTimeout( ()=>{ console.log(4) }, 2000 )
                this.fuserId = this.fuserId + "n"
            }
        },
        mounted () {
            // this.$acl.onChange = newPermission => {
            //     console.log('Has changed to', newPermission)
            // }
            // console.log("<Index.vue>")
            // logCookies()
            // console.log("</Index.vue>")
        }
    }
</script>
<style>
    input#input-id, input#input-password {
        letter-spacing: 3px;
    }
</style>
<style scoped>
    .logo {
        font-family: 'Inconsolata', monospace;
        font-size: 2.5rem;
    }
    .logo-ko {
        font-family: 'RIDIBatang';
        position: absolute;
    }
    .stress {
        color: white;
        background: black;
        border-radius: 0.4rem;
        padding: 0 0.4rem 0 0.4rem;
    }
</style>