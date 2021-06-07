<template>
    <v-dialog
            v-model="dialogOpen"
            width="550"
            scrollable
            @keydown.esc="reset(), $emit('close')"
            @click:outside="reset(), $emit('close')"
    >
        <v-card elevation="0">
            <v-card-title class="grey lighten-2 mb-2">
                사용자 등록
                <v-spacer></v-spacer>
                <v-icon
                        elevation="0"
                        @click="reset(), $emit('close')"
                >
                    mdi-close
                </v-icon>
            </v-card-title>
            <v-card-text class="pt-8">
                <validation-observer
                        ref="observer"
                        v-slot="{ invalid, validated, handleSubmit }"
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
                            <validation-provider
                                    name="주민등록번호"
                                    :rules="{ required: true, jumin: true, juminValidate: true, isJumin: true }"
                                    v-slot="{ errors, valid }"
                            >
                                <v-text-field label="주민등록번호" v-model="fjumin"
                                              :error-messages="errors" :success="valid" :success-messages="valid ? '사용할 수 있는 주민등록번호' : ''"
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
                        <v-btn
                                color="warning"
                                elevation="0"
                                @click="reset"
                                style="padding-bottom: 2px"
                        >
                            초기화
                        </v-btn>
                        <!--<v-btn class="mr-4" @click="validate()">Validate</v-btn>-->
                        <v-btn
                                color="primary"
                                elevation="0"
                                @click="handleSubmit(submit)"
                                class="ml-2"
                                style="padding-bottom: 2px"
                        >
                            확인
                        </v-btn>
                    </v-card-actions>
                </validation-observer>
            </v-card-text>
        </v-card>

        <v-bottom-sheet v-model="alertBottom">
            <v-sheet
                    class="text-center"
                    height="200px"
            >
                <v-btn
                        class="mt-6"
                        text
                        color="red"
                        @click="alertBottom = false"
                >
                    close
                </v-btn>
                <div class="py-3">
                    시스템 문제로 저장하지 못했습니다.<br/>
                    관리자에게 문의하시기 바랍니다.
                </div>
            </v-sheet>
        </v-bottom-sheet>

    </v-dialog>
</template>
<script>
    export default {
        name: "UserCreate",
        props: ["dialog"],
        components: {},
        data: function() {
            return {
                fname: "이병헌",
                fcellphone: "01098765432",
                femail: "some@naver.com",
                fjumin: "7301261018122",
                dialogOpen: false,
                alertBottom: false
            }
        },
        methods: {
            onSubmit () {
                this.$refs.observer.validate().then(success => {
                    if (!success) {
                        this.$refs.userId.focus() //esc 키가 작동하도록 포커스를 유지
                        return
                    }
                    alert('Form has been submitted!');

                    // Wait until the models are updated in the UI
                    // this.$nextTick(() => {
                    //     this.$refs.form.reset();
                    // })
                })
            },
            async submit () {
                this.$refs.observer.validate()
                try {
                    const ret = await this.$http.post("/api/users", {
                        name: this.fname,
                        jumin: this.fjumin,
                        cellphone: this.fcellphone,
                        email: this.femail
                    })
                    console.log("ret.data.user", ret.data.user)
                    this.reset()
                    this.$emit('close', true)
                } catch {
                    this.alertBottom = true
                }
            },
            reset() {
                this.fname = ""
                this.fjumin = ""
                this.fcellphone = ""
                this.femail = ""
                this.$refs.observer.reset()
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            dialog: {
                async handler (newVal) {
                    if (newVal === true) {
                        this.dialogOpen = true
                    } else {
                        this.user = {}
                        this.dialogOpen = false
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>
<style lang="scss" scoped>
    .vuetify-class {
        ::v-deep other-class {
            // your custom css properties
        }
    }
</style>