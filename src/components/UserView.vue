<template>
    <v-dialog
            v-model="dialogOpen"
            width="500"
            scrollable
            @keydown.esc="$emit('close')"
            @click:outside="$emit('close')"
    >
        <v-card>
            <v-card-title class="grey lighten-2 mb-5" style="min-height: 4rem">
                <span>{{user.name}}</span>
                <v-icon
                        x-small
                        color="grey"
                        class="ml-3"
                >
                    mdi-key-variant
                </v-icon>
                <span class="text-caption ml-1" style="color: #777777">{{user._id}}</span>
                <v-spacer></v-spacer>
                <v-icon
                        elevation="0"
                        @click="$emit('close')"
                >
                    mdi-close
                </v-icon>
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                항목
                            </th>
                            <th class="text-left">
                                내용
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>아이디</td>
                            <td>{{ user.userId }}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>
                                {{ user.name }}
                            </td>
                            <td>
                                <v-edit-dialog
                                        :return-value.sync="kkk"
                                        large
                                        save-text="저장"
                                        cancel-text="취소"
                                        @save="save('name')"
                                        @cancel="cancel"
                                        @open="open('name')"
                                        @close="close"
                                >
                                    수정
                                    <template v-slot:input>
                                        <validation-observer ref="observer" v-slot="{}">
                                            <validation-provider
                                                    name="이름"
                                                    :rules="{ required: true, name: true }"
                                                    v-slot="{ errors, valid }">
                                                <v-text-field
                                                        v-model="fname"
                                                        label="이름"
                                                        class="mt-4"
                                                        :error-messages="errors"
                                                        :success="valid"
                                                ></v-text-field>
                                            </validation-provider>
                                        </validation-observer>
                                    </template>
                                </v-edit-dialog>
                            </td>
                        </tr>
                        <tr>
                            <td>휴대폰</td>
                            <td>{{ $util.cellphonePhase(user.cellphone) }}</td>
                            <td>
                                <v-edit-dialog
                                        :return-value.sync="kkk"
                                        large
                                        save-text="저장"
                                        cancel-text="취소"
                                        @save="save('cellphone')"
                                        @cancel="cancel"
                                        @open="open('cellphone')"
                                        @close="close"
                                >
                                    수정
                                    <template v-slot:input>
                                        <validation-observer ref="observer" v-slot="{}">
                                            <validation-provider
                                                    name="휴대폰"
                                                    :rules="{ required: true, cellphone: true }"
                                                    v-slot="{ errors, valid }">
                                                <v-text-field
                                                        v-model="fcellphone"
                                                        label="휴대폰"
                                                        class="mt-4"
                                                        :error-messages="errors"
                                                        :success="valid"
                                                ></v-text-field>
                                            </validation-provider>
                                        </validation-observer>
                                    </template>
                                </v-edit-dialog>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <v-edit-dialog
                                        :return-value.sync="kkk"
                                        large
                                        save-text="저장"
                                        cancel-text="취소"
                                        @save="save('email')"
                                        @cancel="cancel"
                                        @open="open('email')"
                                        @close="close"
                                >
                                    수정
                                    <template v-slot:input>
                                        <validation-observer ref="observer" v-slot="{}">
                                            <validation-provider
                                                    name="이메일"
                                                    :rules="{ required: true, email: true }"
                                                    v-slot="{ errors, valid }">
                                                <v-text-field
                                                        v-model="femail"
                                                        label="이메일"
                                                        class="mt-4"
                                                        :error-messages="errors"
                                                        :success="valid"
                                                ></v-text-field>
                                            </validation-provider>
                                        </validation-observer>
                                    </template>
                                </v-edit-dialog>
                            </td>
                        </tr>
                        <tr>
                            <td>등록일시</td>
                            <td>{{ $moment(user.created).format("YYYY-MM-DD HH:mm:ss") }}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>수정일시</td>
                            <!--<td>{{ user.updated.substr(0, 4) === "1970" ? "" : $moment(user.updated).format("YYYY-MM-DD hh:mm:ss") }}</td>-->
                            <td>{{ $moment(user.updated).format("YYYY-MM-DD HH:mm:ss") }}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        elevation="0"
                        @click="$emit('close')"
                        style="padding-bottom: 2px;"
                >
                    닫기
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar
                v-model="snack"
                :timeout="3000"
                :color="snackColor"
        >
            {{ snackText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        v-bind="attrs"
                        text
                        @click="snack = false"
                        style="padding-bottom: 2px"
                >
                    닫기
                </v-btn>
            </template>
        </v-snackbar>
    </v-dialog>
</template>
<script>
    // import http from "@/apis/http"
    export default {
        name: "UserView",
        props: ["userId", "dialog"],
        components: {
        },
        data: function () {
            return {
                user: {},
                dialogOpen: false,
                fname: "",
                fcellphone: "",
                femail: "",
                snack: false,
                snackColor: '',
                snackText: '',
                max25chars: v => v.length <= 25 || 'Input too long!',
                kkk: "",
                rule: {
                    "name": function(v) {
                        let pattern = /^([a-zA-Z]+\s?|[가-힣])+[a-zA-Z가-힣]$/
                        return pattern.test(v)
                    },
                    "cellphone": function(v) {
                        let pattern = /^01[01679][0-9]{7,8}$/
                        return pattern.test(v)
                    },
                    "email": function(v) {
                        let pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
                        return pattern.test(v)
                    }
                }
            }
        },
        methods: {
            async load(id) {
                try {
                    let ret = await this.$http.get("/api/users/" + id).catch(console.log)
                    this.user = ret.data.user
                } catch {
                    //
                }
                this.dialog = true
            },
            ruleName(v) {
                let pattern = /^([a-zA-Z]+\s?|[가-힣])+[a-zA-Z가-힣]$/
                if ( pattern.test(v) ) {
                    return true
                }
                return false
            },
            async save(field) {
                if ( !this.rule[field]( this['f' + field] ) ) {
                    this.snack = true
                    this.snackColor = "error"
                    this.snackText = "입력값이 지정 형식에 맞지 않아 저장하지 않았습니다."
                    return
                }

                try {
                    let param = {}
                    param[field] = this['f' + field]
                    const ret = await this.$http.put("/api/users/" + this.user._id, param)
                    this.user = ret.data.user
                    this.snack = true
                    this.snackColor = "success"
                    this.snackText = "저장했습니다."
                } catch {
                    this.snack = true
                    this.snackColor = "error"
                    this.snackText = "저장에 실패했습니다."
                }
                return
            },
            cancel() {
                this.snack = true
                this.snackColor = "warning"
                this.snackText = "취소했습니다."
            },
            open(field) {
                this['f' + field] = this.user[field]
                this.snack = true
                this.snackColor = "info"
                this.snackText = "수정 상태입니다."
            },
            close() {
                // console.log('Dialog closed')
            }
        },
        watch: {
            dialog: {
                async handler (newVal) {
                    if (newVal === true) {
                        await this.load(this.userId)
                        this.dialogOpen = true
                    } else {
                        this.user = {}
                        this.dialogOpen = false
                    }
                }
            },
            kkk: {
                handler(newVal) {
                    console.log("kkk newVal", newVal)
                }
            }
        }
    }
</script>