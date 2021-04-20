<template>
    <v-app>
        <v-container fluid class="d-flex justify-space-between" style="margin-right: 10rem">
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
            <v-card elevation="0" style="width: 23rem" class="mr-16 pt-16">
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
                    </validation-observer>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>
<script>
    // import VueCookies from "vue-cookies"
    import { login } from "@/api/token.js"

    export default {
        name: "Main",
        data: function() {
            return {
                userId: "jhoon",
                password: "1111",
                message: ""
            }
        },
        methods: {
            async submit () {
                this.$refs.observer.validate()

                const ret = await login(this.userId, this.password)

                console.log("ret", ret)

                if (ret.status === 200) {
                    this.message = ""
                    setTimeout(() => ( this.$router.push({ name: "파일업로드" }) ), 300)
                } else {
                    this.message = ""
                    setTimeout(() => ( this.message = "\"아이디 또는 암호가 일치하지 않습니다.\"" ), 100)
                }

                /*
                this.$axios.post("/api/users/check", {
                    userId: this.userId,
                    password: this.password
                }).then(ret => { //로그인 성공(200)
                    console.log("ret", ret)
                    this.message = ""
                    // this.$acl.change("user")
                    VueCookies.set("userId", ret.data.user.userId)
                    VueCookies.set("name", ret.data.user.name)
                    VueCookies.set("token", ret.data.token)
                    VueCookies.set("refresh_token", ret.data.token)
                    setTimeout(() => ( this.$router.push({ name: "파일업로드" }) ), 300)
                }).catch(() => { //로그인 실패(403)
                    this.message = ""
                    setTimeout(() => ( this.message = "\"아이디 또는 암호가 일치하지 않습니다.\"" ), 100)
                })
                */
            }
        },
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