<template>
    <v-row>
        <v-col cols="6">
            <v-card class="pa-10" elevation="4" title="문서관리카드">
                <v-card-text>
                    <p class="display-1 text--primary">
                        문서관리카드
                    </p>
                    <p>문서 기본 정보 설정</p>
                </v-card-text>
                <v-radio-group
                        v-model="kind"
                        label="문서종류"
                        row
                >
                    <v-radio
                            label="내부결재"
                            value="in"
                    ></v-radio>
                    <v-radio
                            label="시행문"
                            value="out"
                    ></v-radio>
                </v-radio-group>
                <v-select
                        v-model="receiver"
                        :items="['전략기획팀장', '사업운영팀장', '총무관리팀장', '산학협력단 부단장', '협력종합예술활동 책임자', '예술세상마을 책임자', '산학협력단 단장', '정신문화연구소장']"
                        attach
                        label="수신자"
                        chips
                        multiple
                        :disabled="kind === 'in'"
                        v-if="kind === 'out'"
                ></v-select>
                <v-text-field label="제목" v-model="subject"></v-text-field>
                <v-text-field label="관련 문서" v-model="subject"></v-text-field>
                <v-text-field label="문서 요지" v-model="subject"></v-text-field>
                <v-radio-group
                        v-model="open"
                        label="열람범위"
                        row
                >
                    <v-radio
                            label="비공개"
                            value="open-1"
                    ></v-radio>
                    <v-radio
                            label="부서"
                            value="open-2"
                    ></v-radio>
                    <v-radio
                            label="기관"
                            value="open-3"
                    ></v-radio>
                </v-radio-group>
                <v-row>
                    <v-col>
                        결재선 지정
                        <v-btn x-small class="blue mr-1" elevation="0" dark>추가</v-btn>
                        <v-btn x-small class="red" elevation="0" dark>삭제</v-btn>
                    </v-col>
                </v-row>
                <v-row v-for=" n in 3 " :key="n">
                    <v-col cols="1">
                        {{n}}
                    </v-col>
                    <v-col cols="4">
                        <v-select
                                v-model="confirm1[n]"
                                :items="['검토', '협조', '병렬협조', '전결', '결재', '대결']"
                                label="결재종류"
                        ></v-select>
                    </v-col>
                    <v-col cols="7">
                        <v-select
                                v-model="confirm2[n]"
                                :items="['팀장 마진욱', '부단장 여종훈', '단장 이정민', '총장 김봉렬']"
                                label="결재자"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col cols="6">
        </v-col>
    </v-row>
</template>

<script>
     export default {
        components: {
        },
        data () {
            return {
                value: "",
                kind: "in",
                receiver: [],
                subject: "",
                confirm1: "",
                confirm2: "",
                open: ""
            }
        },
        computed: {
            receiverName() {
                if (this.kind == "in") return "내부결재"
                if (this.receiver.length > 1) return "수신자 참조"
                else if (this.receiver.length == 0) return ""
                else return this.receiver[0]
            },
            receiverTitle: function() {
                if (this.kind == "out" && this.receiver.length > 1) {
                    return "수신자"
                }
                return ""
            },
            receiverList: function () {
                if (this.kind == "out" && this.receiver.length > 1) {
                    return this.receiver.toString().replace(/,/g, ", ")
                }
                return ""
            }
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>