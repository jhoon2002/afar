<template>
    <v-sheet
            class="transparent"
    >
        <v-dialog
                v-model="dialog"
                max-width="40rem"
                width="40rem"
                persistent
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs"
                       v-on="on"
                       text
                       small
                       class="px-1"
                >
                    사용자등록
                </v-btn>
            </template>

            <v-stepper v-model="step">
                <v-card-title
                        class="mb-0 px-5"
                >
                    사용자 등록
                    <v-spacer></v-spacer>
                    <v-icon @click="step === 1 ? reset1() : reset2(), dialog=false, step=1">mdi-close</v-icon>
                </v-card-title>

                <v-divider></v-divider>

                <v-stepper-header
                        style="box-shadow: none"
                        class="px-16 mt-5"
                >
                    <v-stepper-step
                            :complete="step > 1"
                            step="1"
                    >
                        1단계: 이름/주민등록번호
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            :complete="step > 2"
                            step="2"
                    >
                        2단계: 나머지 정보
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content
                            step="1"
                            class="pa-7"
                    >
                        <validation-observer
                                ref="ob1"
                                v-slot="{ invalid, validated, handleSubmit }"
                        >
                            <v-card
                                    flat
                                    height="28rem"
                                    class="pa-16"
                            >
                                <br/>
                                <validation-provider name="이름" :rules="{ required: true, name: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="이름" v-model="name" outlined
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                                <br/>
                                <v-row>
                                    <v-col cols="12" class="d-flex">
                                        <validation-provider name="주민등록번호" :rules="{ required: true, numeric: true, length: 6 }" v-slot="{ errors, valid }">
                                            <v-text-field label="주민등록번호" v-model="jumin1" outlined counter="6" maxlength="6"
                                                          :error-messages="errors" :success="valid" id="input-jumin1"
                                                          style="max-width: 10rem"
                                                          @input="$util.nextFocus($event, 6, 'input-jumin2')"

                                            ></v-text-field>
                                        </validation-provider>
                                        <v-icon class="pb-7" style="margin-right: -0.5rem" color="grey lighten-2">ri-subtract-line</v-icon>
                                        <validation-provider name="주민등록번호(뒤첫번호)" :rules="{ required: true, numeric: true, length: 1 }" v-slot="{ errors, valid }">
                                            <v-text-field label="" v-model="jumin2" outlined counter="1" maxlength="1"
                                                          :error-messages="errors" :success="valid" id="input-jumin2"
                                                          class="ml-2" style="max-width: 3rem" hide-details
                                                          @input="$util.nextFocus($event, 1, 'input-jumin3')"
                                                          @keydown="$util.prevFocus($event, 'input-jumin2', 'input-jumin1')"
                                            ></v-text-field>
                                        </validation-provider>

                                        <validation-provider name="주민등록번호(나머지번호)" :rules="{ required: true, numeric: true, length: 6 }" v-slot="{ errors, valid }">
                                            <v-text-field label="" v-model="jumin3" outlined counter="6" :type="show1 ? 'text' : 'password'"
                                                          :error-messages="errors" :success="valid" id="input-jumin3" maxlength="6"
                                                          class="ml-2"
                                                          :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                          @click:append="show1 = !show1"
                                                          @keydown="$util.prevFocus($event, 'input-jumin3', 'input-jumin2')"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card-actions
                                    class="pa-0 ma-0"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="pink"
                                        elevation="0"
                                        outlined
                                        class="text-body-1"
                                        style="padding-bottom: 2px"
                                        @click="reset1()"
                                >
                                    초기화
                                </v-btn>

                                <v-btn
                                        color="secondary"
                                        elevation="0"
                                        outlined
                                        class="ml-2 text-body-1"
                                        style="padding-bottom: 2px"
                                        @click="handleSubmit(next)"
                                >
                                    다음 단계
                                </v-btn>
                            </v-card-actions>
                        </validation-observer>
                    </v-stepper-content>

                    <v-stepper-content
                            step="2"
                            class="pa-7"
                    >
                        <validation-observer
                                ref="ob2"
                                v-slot="{ invalid, validated, handleSubmit }"
                        >
                            <v-card
                                    flat
                                    height="28rem"
                                    class="px-16 py-7"
                            >
                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="아이디" :rules="{ required: true, id: true, duplicated: true }" v-slot="{ errors, valid}">
                                            <v-text-field label="아이디" v-model="userId" outlined
                                                          :error-messages="errors" :success="valid" :success-messages="valid ? '사용할 수 있는 아이디' : ''"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="6" class="py-2">
                                        <validation-provider name="비밀번호" :rules="{ required: true, password: true }" vid="confirmation" v-slot="{ errors, valid }">
                                            <v-text-field label="비밀번호" v-model="password" :type="show2 ? 'text' : 'password'"
                                                          :error-messages="errors" :success="valid" outlined
                                                          :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                          @click:append="show2 = !show2"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="6" class="py-2">
                                        <validation-provider name="비밀번호 확인" :rules="{ required: true, confirmed:'confirmation' }" v-slot="{ errors, valid }">
                                            <v-text-field label="비밀번호 확인" v-model="confirmPassword" :type="show2 ? 'text' : 'password'"
                                                          :error-messages="errors" :success="valid" :success-messages="valid ? '일치합니다.' : ''"
                                                          outlined
                                                          :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                          @click:append="show2 = !show2"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="휴대폰" :rules="{ required: true, cellphone: true }" v-slot="{ errors, valid }">
                                            <v-text-field label="휴대폰" v-model="cellphone" outlined
                                                          :error-messages="errors" :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="이메일" :rules="{ required: true, email: true }" v-slot="{ errors, valid }">
                                            <v-text-field label="이메일" v-model="email" type="email" outlined
                                                          :error-messages="errors" :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-card-actions
                                    class="pa-0 ma-0"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="pink"
                                        elevation="0"
                                        outlined
                                        class="text-body-1"
                                        style="padding-bottom: 2px"
                                        @click="reset2()"
                                >
                                    초기화
                                </v-btn>

                                <v-btn
                                        color="secondary"
                                        elevation="0"
                                        outlined
                                        class="ml-2 text-body-1"
                                        style="padding-bottom: 2px"
                                        @click="handleSubmit(submit)"
                                >
                                    등록
                                </v-btn>
                            </v-card-actions>
                        </validation-observer>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>

        <v-bottom-sheet
                v-model="bottomSheet1"
        >
            <v-sheet
                    class="text-center"
                    height="11rem"
            >
                <v-btn
                        class="mt-6"
                        text
                        color="primary"
                        @click="bottomSheet1 = !bottomSheet1"
                >
                    Close
                </v-btn>
                <div class="py-3 text-h6">
                    사용자 정보를 등록하였습니다.<br/>
                    로그인 하시기 바랍니다.
                </div>
            </v-sheet>
        </v-bottom-sheet>
        <v-bottom-sheet
                v-model="bottomSheet2"
        >
            <v-sheet
                    class="text-center"
                    height="11rem"
            >
                <v-btn
                        class="mt-6"
                        text
                        color="pink"
                        @click="bottomSheet2 = !bottomSheet2"
                >
                    Close
                </v-btn>
                <div class="py-3 text-h6 pink--text">
                    오류가 발생하여 저장되지 않았습니다.<br/>
                    관리자에게 문의하시기 바랍니다.
                </div>
            </v-sheet>
        </v-bottom-sheet>

    </v-sheet>

</template>
<script>
    export default {
        name: "Register",
        data: function () {
            return {
                dialog: false,
                userId: "",
                password: "",
                confirmPassword: "",
                name: "한동희",
                jumin: "",
                jumin1: "",
                jumin2: "",
                jumin3: "",
                juminValue: "",
                cellphone: "",
                email: "",
                face: "",
                color: "",
                isUserIdMessage: "",
                show1: false,
                show2: false,
                bottomSheet1: false,
                bottomSheet2: false,
                step: 1,
            }
        },
        methods: {
            next() {
                this.$refs.ob1.validate()
                this.step = 2
            },
            // reset() {
            //     this.reset1()
            //     this.reset2()
            // },
            reset1() {
                this.resetField()
                this.$refs.ob1.reset()
            },
            reset2() {
                this.resetField()
                this.$refs.ob2.reset()
            },
            resetField() {
                this.name = ""
                this.jumin = ""
                this.jumin1 = ""
                this.jumin2 = ""
                this.jumin3 = ""
                this.userId = ""
                this.password = ""
                this.confirmPassword = ""
                this.cellphone = ""
                this.email = ""
            },
            async submit() {
                this.$refs.ob2.validate()
                try {
                    await this.$http.post("/api/users/new", {
                        userId: this.userId,
                        password: this.password,
                        name: this.name,
                        jumin: this.jumin,
                        cellphone: this.cellphone,
                        email: this.email,
                        face: this.$env.face,
                        color: this.$env.color
                    })
                    this.dialog = false
                    this.bottomSheet1 = true
                } catch(e) {
                    console.log(e)
                    this.bottomSheet2 = true
                }
            }
        },
        watch: {
            // jumin1: (v) => {
            //     if (v.length > 6) {
            //         this.$refs
            //     }
            // }
        }
    }
</script>
<style>
    #input-jumin1, #input-jumin3 {
        letter-spacing: 10px;
    }
    #input-jumin2 {
        text-align: center;
    }
</style>