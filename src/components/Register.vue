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
                    사용자 등록
                </v-btn>
            </template>

            <v-stepper v-model="step">
                <v-card-title
                        class="mb-0 px-5"
                >
                    사용자 등록
                    <v-spacer></v-spacer>
                    <v-icon @click="resetAll(), dialog=false, step=1">mdi-close</v-icon>
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
                        약관/개인정보
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            :complete="step > 2"
                            step="2"
                    >
                        기본 정보
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                            :complete="step > 3"
                            step="3"
                    >
                        사용자 정보
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content
                            step="1"
                    >
                        <validation-observer
                                ref="ob1"
                                v-slot="{ invalid, validated, handleSubmit }"
                        >
                            <v-card
                                    flat
                                    height="28rem"
                                    max-height="28rem"
                                    mim-height="28rem"
                                    class="px-13"
                            >
                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-spacer></v-spacer>
                                        <v-switch
                                                v-model="switchAll"
                                                on-icon="ri-checkbox-circle-line"
                                                off-icon="ri-checkbox-blank-circle-line"
                                                hide-details
                                                class="text-h6 mt-0"
                                                @change="agreeAll"
                                        >
                                            <template v-slot:label>
                                                <span
                                                        class="text-h6"
                                                        :class="{ 'blue--text': switchAll }"
                                                >
                                                    모두 동의
                                                </span>
                                            </template>
                                        </v-switch>

                                    </v-row>
                                </v-sheet>
                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-badge
                                                color="green"
                                                content="필수"
                                                offset-x="-8"
                                                offset-y="20"
                                                class="mt-5"
                                        >
                                            사용자 약관 동의
                                        </v-badge>
                                        <v-spacer></v-spacer>
                                        <validation-provider
                                                vid="agree1"
                                                name="약관"
                                                :rules="{ agree: true }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-switch
                                                    v-model="switch1"
                                                    label="동의합니다."
                                                    hide-details
                                                    style="margin-top: 14px"
                                                    :error-messages="errors"
                                                    :success="valid"
                                            >
                                            </v-switch>
                                        </validation-provider>
                                    </v-row>
                                </v-sheet>
                                <v-card
                                        outlined
                                        class="overflow-y-auto pa-3 mt-5 mb-3 grey--text"
                                        height="95"
                                >
                                    <p>
                                        본 약관은 한국예술종합학교 산협력단(이하 '제공자'라 한다.)의 내부 전산시스템(이하 '본 시스템'이라 한다.)
                                        운영과 관련 하여 제공자와 사용자의 권리와 의무를 정하는 것을 목적으로 한다.
                                    </p>
                                    <p>
                                        제1조(제공자 의무) 제공자는 본 시스템을 적절하게 제작, 관리, 운영하여야 하며 사용자의 정보가
                                        노출되지 않도록 보장하며 사용자의 편의를 증대시켜야 한다.
                                    </p>
                                    <p>
                                        제2조(사용자 의무) 사용자는 본 시스템을 이용함에 있어 다음 각호의 의무를 진다.
                                    </p>
                                    <div class="ml-2">
                                        <p>
                                              1. 사용자는 부정한 방법으로 타인의 정보를 이용하여 사용자 등록을 할 수 없다.
                                        </p>
                                        <p>
                                              2. 사용자는 부정한 방법으로 타인의 권한을 획득하여 본 시스템을 이용할 수 없다.
                                        </p>
                                        <p>
                                              3. 사용자는 본 시스템을 이용하여 얻은 타인의 정보를 업무 목적의 범위를 벋어나
                                                 보관, 유통, 전달, 누설하는 등 부정하게 취급하지 않아야 한다.
                                        </p>
                                        <p>
                                              4. 사용자는 기타 부정한 방법으로 본 시스템을 이용할 수 없다.
                                        </p>
                                    </div>
                                    <p>
                                        제3조(제공자 권리) 제공자는 사용자가 본 약관의 규정을 위반한 경우, 본 시스템 사용을 제한 또는 금지 시킬 수 있다.
                                    </p>
                                    <p>
                                        제4조(사용자 권리) 사용자는 자신의 개인정보를 보호받을 권리를 갖으며, 제공자가 본 약관의 의무를 위반하여
                                        자신의 개인정보를 유출한 경우 이에 대한 시정을 요구할 수 있다.
                                    </p>
                                    <p>
                                        제5조(민·형사책임) 본 약관의 규정은 당사자의 민사 또는 형사책임에 영향을 미치지 않는다.
                                    </p>
                                    <p>
                                        제6조(일반규정) 제공자는 산단의 정관, 규정 등 내부 절차에 따라 본 시스템의 이용과 관련 규정 또는
                                        지침 등을 제정할 수 있으며, 이때 사용자는 해당 규정 또는 지침에 동의한 것으로 본다.
                                    </p>
                                </v-card>


                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-badge
                                                color="green"
                                                content="필수"
                                                offset-x="-8"
                                                offset-y="20"
                                                class="mt-5"
                                        >
                                            개인정보 수집 및 이용 동의
                                        </v-badge>
                                        <v-spacer></v-spacer>
                                        <validation-provider
                                                vid="agree2"
                                                name="개인정보"
                                                :rules="{ agree: true }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-switch
                                                    v-model="switch2"
                                                    label="동의합니다."
                                                    hide-details
                                                    style="margin-top: 14px"
                                                    :error-messages="errors"
                                                    :success="valid"
                                            >
                                            </v-switch>
                                        </validation-provider>
                                    </v-row>
                                </v-sheet>

                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-badge
                                                color="green"
                                                content="필수"
                                                offset-x="-8"
                                                offset-y="20"
                                                class="mt-5"
                                        >
                                            주민등록번호 수집 및 이용 동의
                                        </v-badge>
                                        <v-spacer></v-spacer>

                                        <validation-provider
                                                name="주민등록번호"
                                                :rules="{ agree: true }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-switch
                                                    v-model="switch3"
                                                    label="동의합니다."
                                                    hide-details
                                                    style="margin-top: 14px"
                                                    :error-messages="errors"
                                                    :success="valid"
                                            >
                                            </v-switch>
                                        </validation-provider>

                                    </v-row>
                                </v-sheet>

                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-badge
                                                color="orange"
                                                content="선택"
                                                offset-x="-8"
                                                offset-y="20"
                                                class="mt-5"
                                        >
                                            이메일 수신 동의
                                        </v-badge>
                                        <v-spacer></v-spacer>

                                        <validation-provider
                                                name="이메일"
                                                :rules="{ }"
                                                v-slot="{ }"
                                        >
                                            <v-switch
                                                    v-model="switch4"
                                                    label="동의합니다."
                                                    hide-details
                                                    color="orange"
                                                    style="margin-top: 14px"
                                            >
                                            </v-switch>
                                        </validation-provider>

                                    </v-row>
                                </v-sheet>

                                <v-sheet
                                        class="text-h6"
                                >
                                    <v-row no-gutters>
                                        <v-badge
                                                color="orange"
                                                content="선택"
                                                offset-x="-8"
                                                offset-y="20"
                                                class="mt-5"
                                        >
                                            문자 수신 동의
                                        </v-badge>
                                        <v-spacer></v-spacer>

                                        <validation-provider
                                                name="문자"
                                                :rules="{ }"
                                                v-slot="{ }"
                                        >
                                            <v-switch
                                                    v-model="switch5"
                                                    label="동의합니다."
                                                    hide-details
                                                    color="orange"
                                                    style="margin-top: 14px"
                                            >
                                            </v-switch>
                                        </validation-provider>

                                    </v-row>
                                </v-sheet>
                            </v-card>
                            <v-card-actions
                                    class="pa-0 ma-0"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="secondary"
                                        elevation="0"
                                        outlined
                                        class="ml-2 text-body-1"
                                        style="padding-bottom: 2px"
                                        @click="handleSubmit(()=>nextStep(2))"
                                >
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    다음 단계
                                </v-btn>
                            </v-card-actions>
                        </validation-observer>
                    </v-stepper-content>
                    <v-stepper-content
                            step="2"
                    >
                        <validation-observer
                                ref="ob2"
                                v-slot="{ invalid, validated, handleSubmit }"
                        >
                            <v-card
                                    flat
                                    height="28rem"
                                    class="px-16 pt-15 mx-10"
                            >
                                <br/>
                                <validation-provider
                                        name="이름"
                                        :rules="{ required: true, name: true }"
                                        v-slot="{ errors, valid }"
                                >
                                    <v-text-field
                                            label="이름"
                                            v-model="name"

                                            :error-messages="errors"
                                            :success="valid"
                                            class="text-h6"
                                    />
                                </validation-provider>
                                <br/>
                                <v-row>
                                    <v-col
                                            cols="12"
                                            class="d-flex"
                                    >
                                        <validation-provider
                                                name="주민등록번호"
                                                :rules="{ required: true, numeric: true, length: 6, jumin1: { jumin2: jumin2 } }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                    id="input-jumin1"
                                                    label="주민등록번호"
                                                    v-model="jumin1"
                                                    counter="6"
                                                    maxlength="6"
                                                    :error-messages="errors"
                                                    :success="valid"
                                                    style="max-width: 12rem"
                                                    @input="$util.nextFocus($event, 6, 'input-jumin2')"
                                            />
                                        </validation-provider>
                                        <v-icon
                                                color="grey"
                                                small
                                                class="pb-1"
                                                style="margin-right: -0.5rem"
                                        >
                                            ri-subtract-line
                                        </v-icon>
                                        <validation-provider
                                                name="주민등록번호(뒤첫번호)"
                                                :rules="{ required: true, numeric: true, length: 1, juminSex: true }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                    id="input-jumin2"
                                                    label=""
                                                    v-model="jumin2"
                                                    counter="1"
                                                    maxlength="1"
                                                    :error-messages="errors.length ? [''] : null"
                                                    :success="valid"
                                                    class="ml-2"
                                                    style="max-width: 2.7rem"
                                                    @input="$util.nextFocus($event, 1, 'input-jumin3')"
                                                    @keydown="$util.prevFocus($event, 'input-jumin2', 'input-jumin1')"
                                            />
                                        </validation-provider>

                                        <validation-provider
                                                name="주민등록번호(나머지번호)"
                                                :rules="{
                                                    required: true,
                                                    numeric: true,
                                                    length: 6,
                                                    juminMulti: { jumin1: jumin1, jumin2: jumin2 },
                                                    isJumin: { jumin1: jumin1, jumin2: jumin2 }
                                                }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                    id="input-jumin3"
                                                    label=""
                                                    v-model="jumin3"
                                                    counter="6"
                                                    maxlength="6"
                                                    :type="show1 ? 'text' : 'password'"
                                                    :error-messages="errors"
                                                    :success="valid"
                                                    class="ml-1"
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
                                        @click="handleSubmit(()=>nextStep(3))"
                                >
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    다음 단계
                                </v-btn>
                            </v-card-actions>
                        </validation-observer>
                    </v-stepper-content>
                    <v-stepper-content
                            step="3"
                    >
                        <validation-observer
                                ref="ob3"
                                v-slot="{ invalid, validated, handleSubmit }"
                        >
                            <v-card
                                    flat
                                    height="28rem"
                                    class="px-16 pt-7 mx-4"
                            >
                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="아이디" :rules="{ required: true, id: true, userIdDuplicated: true }" v-slot="{ errors, valid}">
                                            <v-text-field label="아이디" v-model="userId"
                                                          :error-messages="errors" :success="valid" :success-messages="valid ? '사용할 수 있는 아이디' : ''"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="6" class="py-2">
                                        <validation-provider name="비밀번호" :rules="{ required: true, password: true }" vid="confirmation" v-slot="{ errors, valid }">
                                            <v-text-field label="비밀번호" v-model="password" :type="show2 ? 'text' : 'password'"
                                                          :error-messages="errors" :success="valid"
                                                          :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                          @click:append="show2 = !show2"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="6" class="py-2">
                                        <validation-provider name="비밀번호 확인" :rules="{ required: true, confirmed:'confirmation' }" v-slot="{ errors, valid }">
                                            <v-text-field label="비밀번호 확인" v-model="confirmPassword" :type="show2 ? 'text' : 'password'"
                                                          :error-messages="errors" :success="valid" :success-messages="valid ? '일치합니다.' : ''"

                                                          :append-icon="show2 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                                          @click:append="show2 = !show2"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="휴대폰" :rules="{ required: true, cellphone: true }" v-slot="{ errors, valid }">
                                            <v-text-field label="휴대폰" v-model="cellphone"
                                                          :error-messages="errors" :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" class="py-2">
                                        <validation-provider name="이메일" :rules="{ required: true, email: true }" v-slot="{ errors, valid }">
                                            <v-text-field label="이메일" v-model="email" type="email"
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
                                        @click="reset3()"
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
                                    <v-icon left>ri-download-line</v-icon>
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
                step: 1,
                switchAll: false,
                switch1: false,
                switch2: false,
                switch3: false,
                switch4: false,
                switch5: false,
                userId: "",
                password: "",
                confirmPassword: "",
                name: "이병헌",
                jumin1: "720911",
                jumin2: "1",
                jumin3: "018111",
                cellphone: "",
                email: "",
                face: "",
                color: "",
                show1: false,
                show2: false,
                bottomSheet1: false,
                bottomSheet2: false
            }
        },
        methods: {
            agreeAll(e) {
                this.switch1 = e
                this.switch2 = e
                this.switch3 = e
                this.switch4 = e
                this.switch5 = e
                return
            },
            async nextStep(step) {
                this.$refs["ob"+ (step - 1)].validate()
                this.step = step
                if (step === 3) {
                    try {
                        const { data: { user: one } } = await this.$http.get("/api/users/jumin/" + this.jumin1 + this.jumin2 + this.jumin3)
                        this.cellphone = one.cellphone
                        this.email = one.email
                    } catch(e) {
                        // console.log(e)
                    }
                }
            },
            resetAll() {
                this.reset1()
                this.reset2()
                this.reset3()
            },
            reset1() {
                this.switchAll = false
                this.switch1 = false
                this.switch2 = false
                this.switch3 = false
                this.switch4 = false
                this.switch5 = false
                this.$refs.ob1.reset()
                setTimeout( () => this.$refs.ob1.reset(), 500) //잠시 후 한번더 해야 깨끗히 리셋
            },
            reset2() {
                this.name = ""
                this.jumin1 = ""
                this.jumin2 = ""
                this.jumin3 = ""
                this.$refs.ob2.reset()
                setTimeout( () => this.$refs.ob2.reset(), 500)
            },
            reset3() {
                this.name = ""
                this.userId = ""
                this.password = ""
                this.confirmPassword = ""
                this.cellphone = ""
                this.email = ""
                this.$refs.ob3.reset()
                setTimeout( () => this.$refs.ob3.reset(), 500)
            },
            async submit() {
                this.$refs.ob3.validate()
                try {
                    const { data: { user: registeredUser } } = await this.$http.post("/api/users/by-user", {
                        user: {
                            userId: this.userId,
                            password: this.password,
                            name: this.name,
                            jumin1: this.jumin1,
                            jumin2: this.jumin2,
                            jumin3: this.jumin3,
                            cellphone: this.cellphone,
                            email: this.email,
                            face: this.$env.face,
                            color: this.$env.color,
                            agree: {
                                terms: this.switch1,
                                info: this.switch2,
                                jumin: this.switch3,
                                email: this.switch4,
                                sms: this.switch5
                            }
                        }
                    })
                    this.resetAll()
                    this.step = 1
                    this.dialog = false
                    this.bottomSheet1 = true
                    this.$emit("registered", registeredUser.userId)
                } catch(e) {
                    console.log(e)
                    this.bottomSheet2 = true
                }
            },
            turnOffSwitch(v) {
                if (v === false) {
                    this.switchAll = false
                }
            },
            test() {
                this.dialog = false
                this.$emit("registered", "jhoon")
            }

        },
        watch: {
            switch1: function(v) {
                this.turnOffSwitch(v)
            },
            switch2: function(v) {
                this.turnOffSwitch(v)
            },
            switch3: function(v) {
                this.turnOffSwitch(v)
            },
            switch4: function(v) {
                this.turnOffSwitch(v)
            },
            switch5: function(v) {
                this.turnOffSwitch(v)
            }
        }
    }
</script>
<style>
    #input-jumin1, #input-jumin3 {
        letter-spacing: 15px;
    }
    #input-jumin2 {
        text-align: center;
    }
</style>