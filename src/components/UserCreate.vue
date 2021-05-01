<template>

    <v-dialog
            v-model="dialogOpen"
            width="700"
            scrollable
            @keydown.esc="clear(), $emit('close')"
            @click:outside="clear(), $emit('close')"
    >
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
                        <v-col cols="12">
                            <validation-provider name="이름" :rules="{ required: true, name: true }" v-slot="{ errors, valid }">
                                <v-text-field label="이름" v-model="fname"
                                              :error-messages="errors" :success="valid"
                                ></v-text-field>
                            </validation-provider>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <validation-provider name="주민등록번호" :rules="{ required: true, jumin: true}" v-slot="{ errors, valid }">
                                <v-text-field label="주민등록번호" v-model="fjumin"
                                              :error-messages="errors" :success="valid" :success-messages="valid ? '사용할 수 있는 주민등록번호' : ''"
                                ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <v-col cols="6">
                            {{isJuminMessage}}
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
</template>
<script>


    export default {
        name: "UserCreate",
        props: ["dialog"],
        components: {
        },
        data: function () {
            return {
                data: function() {
                    return {
                        fname: "",
                        fcellphone: "",
                        femail: "",
                        fjumin: "",
                        dialog: false,
                        isJuminMessage: ""
                    }
                },
                dialogOpen: false
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
            submit () {
                this.$refs.observer.validate()
                this.$axios.put("/api/users", {
                    name: this.fname,
                    jumin: this.fjumin,
                    cellphone: this.fcellphone,
                    email: this.femail
                })
            },
            clear() {
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