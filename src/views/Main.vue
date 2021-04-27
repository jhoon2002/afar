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
                <v-card-title style="min-height: 5rem; line-height: 1.2">
                    {{message}}
                </v-card-title>
                <v-card-text>
                    <validation-observer
                            ref="observer"
                            v-slot="{ invalid, validated, handleSubmit }"
                    >
                        <validation-provider name="아이디" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="아이디" v-model="userId"
                                          autofocus
                                          :error-messages="errors" :success="valid"
                                          @keyup.enter="handleSubmit(submit)"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider name="암호" :rules="{ required: true }" v-slot="{ errors, valid }">
                            <v-text-field label="암호" v-model="password"
                                          type="password"
                                          :error-messages="errors" :success="valid"
                                          @keyup.enter="handleSubmit(submit)"
                            ></v-text-field>
                        </validation-provider>

                        <v-btn outlined
                               class="mt-8"
                               @click="handleSubmit(submit)"
                        >
                            확인
                        </v-btn>

                        <v-sheet class="mt-10">

                            <v-dialog
                                    v-model="dialog"
                                    max-width="40rem"
                                    width="40rem"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-sheet>
                                        <v-btn v-bind="attrs"
                                               v-on="on"
                                               text
                                               small
                                               class="px-1"
                                        >
                                            사용자등록
                                        </v-btn>
                                    </v-sheet>
                                </template>
                                <v-card elevation="0">
                                    <v-card-title>
                                        사용자 등록
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text class="pt-8">
                                        <validation-observer
                                                ref="observer"
                                                v-slot="{ invalid, validated, handleSubmit, validate }"
                                        >

                                            <v-row>
                                                <v-col cols="6">
                                                    <validation-provider name="이름" :rules="{ required: true, name: true }" v-slot="{ errors, valid }">
                                                        <v-text-field label="이름" v-model="fname"
                                                                      :error-messages="errors" :success="valid"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                                <v-col cols="6">
                                                    <validation-provider name="주민등록번호" :rules="{ required: true, jumin: true}" v-slot="{ errors, valid }">
                                                        <v-text-field label="주민등록번호" v-model="fjumin"
                                                                      :error-messages="errors" :success="valid"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="6">
                                                    <validation-provider name="아이디" :rules="{ required: true, id: true, duplicated: true }" v-slot="{ errors, valid}">
                                                        <v-text-field label="아이디" v-model="fuserId"
                                                                      :error-messages="errors" :success="valid" :success-messages="valid ? '사용할 수 있는 아이디' : ''"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                                <v-col cols="6">
                                                    {{isUserIdMessage}}
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="6">
                                                    <validation-provider name="비밀번호" :rules="{ required: true, password: true }" vid="confirmation" v-slot="{ errors, valid }">
                                                        <v-text-field label="비밀번호" v-model="fpassword" :type="show1 ? 'text' : 'password'"
                                                                      :error-messages="errors" :success="valid"
                                                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                                      @click:append="show1 = !show1"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                                <v-col cols="6">
                                                    <validation-provider name="비밀번호 확인" :rules="{ required: true, confirmed:'confirmation' }" v-slot="{ errors, valid }">
                                                        <v-text-field label="비밀번호 확인" v-model="fconfirmPassword" :type="show1 ? 'text' : 'password'"
                                                                      :error-messages="errors" :success="valid" :success-messages="valid ? '일치합니다.' : ''"
                                                                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                                      @click:append="show1 = !show1"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="6">
                                                    <validation-provider name="휴대폰" :rules="{ required: true, cellphone: true }" v-slot="{ errors, valid }">
                                                        <v-text-field label="휴대폰" v-model="fcellphone"
                                                                      :error-messages="errors" :success="valid"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                                <v-col cols="6">
                                                    <validation-provider name="이메일" :rules="{ required: true, email: true }" v-slot="{ errors, valid }">
                                                        <v-text-field label="이메일" v-model="femail" type="email"
                                                                      :error-messages="errors" :success="valid"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-col>
                                            </v-row>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn class="mr-4" @click="reset">초기화</v-btn>
                                                <v-btn class="mr-4" @click="validate()">Validate</v-btn>
                                                <v-btn color="primary" @click="handleSubmit(submit)">확인</v-btn>
                                            </v-card-actions>
                                        </validation-observer>
                                    </v-card-text>
                                  </v-card>
                            </v-dialog>
                            <v-btn text class="px-1 ml-5" small @click="$router.push('/register')">
                                아이디찾기
                            </v-btn>
                        </v-sheet>
                    </validation-observer>
                </v-card-text>
            </v-card>
        </v-card>
    </v-app>
</template>
<script>
    // import VueCookies from "vue-cookies"
    import { login } from "@/api/token.js"
    //import { isUserId } from "@/api/db.js"

    export default {
        name: "Main",
        data: function() {
            return {
                userId: "jhoon",
                password: "1111",
                message: "",
                show1: false,
                fuserId: "",
                fname: "",
                fpassword: "",
                fconfirmPassword: "",
                fcellphone: "",
                femail: "",
                fjumin: "",
                isUserIdMessage: "",
                dialog: false
            }
        },
        methods: {
            async submit () {
                this.$refs.observer.validate()

                try {
                    await login(this.userId, this.password)
                    this.message = ""
                    // setTimeout(() => ( this.$router.push({ path: "/main" }) ), 300)
                    this.$router.push({ path: "/Main" })
                } catch(e) {
                    this.message = ""
                    if (e.response.status === 403) {
                        setTimeout(() => ( this.message = "\"아이디 또는 암호가 일치하지 않습니다.\"" ), 100)
                        return
                    }
                    if (e.response.status === 401) {
                        setTimeout(() => ( this.message = "\"토큰이 정상적으로 생성되지 않았습니다.\"" ), 100)
                        return
                    }
                    setTimeout(() => ( this.message = "\"시스템 문제로 로그인 할 수 없습니다.\"" ), 100)
                }
            },
            reset() {
                this.fuserId = ""
                this.fname = ""
                this.fjumin = ""
                this.fcellphone = ""
                this.femail = ""
                this.fpassword = ""
                this.fconfirmPassword = ""
                this.$refs.observer.reset()
            }
        },
        //watch: {
        //    fuserId: async function(val) {
        //        if (val.length >= 4) {
        //            try {
        //                const ret = await isUserId(val)
        //                if (ret.data.isUserId) {
        //                    this.isUserIdMessage = "사용중인 아이디"
        //                    this.$refs.observer.errors
        //                    return
        //                }
        //                this.isUserIdMessage = "사용할 수 없는 아이디"
        //                return
        //            } catch {
        //                //접속 에러
        //            }
        //        }
        //    }
        //},
        mounted () {
            // this.$acl.onChange = newPermission => {
            //     console.log('Has changed to', newPermission)
            // }
        }
    }
</script>
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