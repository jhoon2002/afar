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
            <v-card elevation="0">
                <v-card-title>
                    사용자 등록
                    <v-spacer></v-spacer>
                    <v-btn
                            icon
                            @click="reset(), dialog=false"
                            style="margin-right: -0.5rem"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <!-- '검사' 버튼 사용시 v-slot 안에 validate 추가(현재는 사용 안함) -->
                    <validation-observer
                            ref="observer"
                            v-slot="{ invalid, validated, handleSubmit }"
                    >

                        <v-row>
                            <v-col cols="6">
                                <validation-provider name="이름" :rules="{ required: true, name: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="이름" v-model="name"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="6">
                                <validation-provider name="주민등록번호" :rules="{ required: true, jumin: true}" v-slot="{ errors, valid }">
                                    <v-text-field label="주민등록번호" v-model="jumin"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <validation-provider name="아이디" :rules="{ required: true, id: true, duplicated: true }" v-slot="{ errors, valid}">
                                    <v-text-field label="아이디" v-model="userId"
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
                                    <v-text-field label="비밀번호" v-model="password" :type="show1 ? 'text' : 'password'"
                                                  :error-messages="errors" :success="valid"
                                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                  @click:append="show1 = !show1"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="6">
                                <validation-provider name="비밀번호 확인" :rules="{ required: true, confirmed:'confirmation' }" v-slot="{ errors, valid }">
                                    <v-text-field label="비밀번호 확인" v-model="confirmPassword" :type="show1 ? 'text' : 'password'"
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
                                    <v-text-field label="휴대폰" v-model="cellphone"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                            <v-col cols="6">
                                <validation-provider name="이메일" :rules="{ required: true, email: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="이메일" v-model="email" type="email"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    @click="reset()"
                                    color="pink"
                                    elevation="0"
                                    outlined
                                    class="text-body-1"
                                    style="padding-bottom: 2px"
                            >
                                초기화
                            </v-btn>
                            <!--
                            <v-btn
                                    class="ml-2"
                                    color="info"
                                    @click="validate()"
                            >
                                검사
                            </v-btn>
                            -->
                            <v-btn
                                    color="secondary"
                                    elevation="0"
                                    outlined
                                    @click="handleSubmit(submit)"
                                    class="ml-2 text-body-1"
                                    style="padding-bottom: 2px"
                            >
                                확인
                            </v-btn>
                        </v-card-actions>
                    </validation-observer>
                </v-card-text>
            </v-card>
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
                name: "",
                jumin: "",
                cellphone: "",
                email: "",
                face: "",
                color: "",
                isUserIdMessage: "",
                show1: false,
                bottomSheet1: false,
                bottomSheet2: false
            }
        },
        methods: {
            reset() {
                this.userId = ""
                this.password = ""
                this.confirmPassword = ""
                this.name = ""
                this.jumin = ""
                this.cellphone = ""
                this.email = "",
                this.$refs.observer.reset()
            },
            async submit() {
                this.$refs.observer.validate()
                try {
                    await this.$http.post("/api/users/by-user", {
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
        }

    }
</script>