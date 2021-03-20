<template>
    <v-row>
        <v-col>
            <v-stepper v-model="e1" non-linear>
                <v-stepper-header>
                    <v-stepper-step editable edit-icon="mdi-card-bulleted-outline" :complete="e1 == 1" step="1"
                                    class="font-weight-bold text-body-1">
                        기본 정보
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step editable edit-icon="mdi-account-multiple" :complete="e1 == 2" step="2"
                                    class="font-weight-bold text-body-1"
                    >
                        결재 경로
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step editable edit-icon="mdi-paperclip" :complete="e1 == 3" step="3"
                                    class="font-weight-bold text-body-1"
                    >
                        관련 / 붙임
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step editable edit-icon="mdi-pencil" :complete="e1 == 4" step="4"
                                    class="font-weight-bold text-body-1"
                    >
                        본문 작성
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-container style="width: 210mm" elevation="0" title="기본 정보">
                            <v-row no-gutters class="align-center">
                                <v-radio-group
                                        v-model="kind"
                                        label=""
                                        row
                                        class="mt-0 pt-0"
                                >
                                    <v-radio
                                            label="내부결재"
                                            value="in"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                        <template v-slot:label>
                                            <span class="font-weight-medium text-h6">내부결재</span>
                                        </template>
                                    </v-radio>
                                    <v-radio
                                            label="시행문"
                                            value="out"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                        <template v-slot:label>
                                            <span class="font-weight-medium text-h6">시행문</span>
                                        </template>
                                    </v-radio>
                                </v-radio-group>
                            </v-row>
                            <v-row no-gutters class="align-center" :style="kind === 'out' ?
                                    'opacity: 1; max-height: 30rem;                  transition: all 0.3s ease-out;' :
                                    'opacity: 0; max-height: 0;     overflow: hidden; transition: all 0.3s ease-out;'"
                            >
                                <v-sheet outlined rounded style="width: 100%;" class="mb-7 pa-6">
                                    <v-row no-gutters class="align-center">
                                        <v-col style="max-width: 5rem">
                                            <v-badge :value="receivers.length > 0 ? true : false"
                                                     color="primary"
                                                     :content="receivers.length"
                                                     offset-x="5"
                                                     offset-y="7"
                                            >
                                                <span class="text-body-1 font-weight-medium"
                                                      style="color: rgba(0, 0, 0, 0.6)"
                                                >
                                                    수신자
                                                </span>
                                            </v-badge>
                                        </v-col>
                                        <v-col>
                                            <v-sheet class="pa-1 transparent" width="100%" style="max-height: 7.4rem; overflow-y: auto">
                                                <template v-if="receivers.length <= 0">
                                                    <v-dialog
                                                            v-model="dialog"
                                                            max-width="50rem"
                                                            width="50rem"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-sheet>
                                                                <v-btn
                                                                        color="secondary"
                                                                        dark
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        icon
                                                                        class="grey lighten-3"
                                                                        style="margin-top: -2px"
                                                                >
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </v-btn>
                                                            </v-sheet>
                                                        </template>
                                                        <organ-tree @send="setReceivers" @close="dialog = false"></organ-tree>
                                                    </v-dialog>
                                                </template>
                                                <template v-else>
                                                    <template v-for="(receiver, index) in receivers">
                                                        <v-chip :key="index"
                                                                close
                                                                @click:close="remove(receiver.id, receivers)"
                                                                class="mr-1 mb-1"
                                                                style="max-width: 15rem"
                                                        >
                                                            <span class="text-truncate">{{ receiver.name }}{{ receiver.nameBlank ? ' ' : '' }}{{ receiver.chief }}</span>
                                                        </v-chip>
                                                    </template>
                                                    <template v-if="receivers.length > 1">
                                                        <v-btn
                                                                icon
                                                                @click="receivers = []"
                                                        >
                                                            <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </template>
                                                </template>

                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12">
                                            <v-text-field label="(경유)"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="6">
                                            <v-select :items="['산학협력단', '협력예술종합활동 사업단']"
                                                      v-model="sendi" label="발신기관"
                                                      class="mr-5"
                                            >
                                            </v-select>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-select :items="['단장', '연구책임자']" v-model="sender"
                                                      label="발신인"
                                            >
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                </v-sheet>
                            </v-row>
                            <v-row no-gutters class="align-center mt-0">
                                <v-text-field label="제목*"
                                              class="mt-0"
                                              v-model="subject"
                                >
                                    <template v-slot:label>
                                        <span class="font-weight-medium">제목*</span>
                                    </template>
                                </v-text-field>
                            </v-row>
                            <v-row no-gutters class="align-center mt-0">
                                <v-textarea label="문서 요지" v-model="summary"
                                            rows="3"
                                            class="mt-0"
                                >
                                    <template v-slot:label>
                                        <span class="font-weight-medium">문서 요지</span>
                                    </template>
                                </v-textarea>
                            </v-row>
                            <v-row no-gutters class="align-center">
                                <v-radio-group
                                        v-model="open"
                                        label="열람범위"
                                        row
                                        class="mt-0 pt-0"
                                >
                                    <v-radio
                                            label="비공개"
                                            value="no"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                    </v-radio>
                                    <v-radio
                                            label="부서"
                                            value="department"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                    </v-radio>
                                    <v-radio
                                            label="기관"
                                            value="all"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                    </v-radio>
                                    <template v-slot:label>
                                        <span class="font-weight-medium mr-10" style="font-size: 16px">열람범위</span>
                                    </template>
                                </v-radio-group>
                            </v-row>
                            <v-row no-gutters class="align-center">
                                <v-radio-group
                                        v-model="limit"
                                        label=""
                                        row
                                        class="mt-0 pt-0"
                                >
                                    <v-radio
                                            label="설정안함"
                                            value="no"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                    </v-radio>
                                    <v-radio
                                            label="설정"
                                            value="yes"
                                            on-icon="mdi-checkbox-marked"
                                            off-icon="mdi-checkbox-blank-outline"
                                    >
                                    </v-radio>
                                    <template v-slot:label>
                                        <span class="font-weight-medium" style="font-size: 16px; margin-right: 0.7rem;">열람제한기간</span>
                                    </template>
                                </v-radio-group>
                                <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="date"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                        rounded
                                        v-if="limit === 'yes'"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="date"
                                                readonly
                                                label="제한 종료일"
                                                clearable
                                                v-bind="attrs"
                                                v-on="on"
                                                style="max-width:10rem; margin-top: -1.3rem"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="date"
                                            scrollable
                                            color="primary"
                                            :day-format="getDay"
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="menu = false"
                                        >
                                            취소
                                        </v-btn>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.menu.save(date)"
                                        >
                                            확인
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-row>
                        </v-container>

                        <!--
                        <v-btn color="primary" class="mt=5" @click="nextStep(1)">
                            <v-icon left>mdi-pencil</v-icon>본문작성
                        </v-btn>
                        -->
                    </v-stepper-content>
                    <v-stepper-content step="2" class="pt-1">
                        <v-sheet style="width: 210mm" elevation="0" title="결재 경로">
                            <organization-chart
                                    :search="true"
                                    :folderonly="false"
                                    :leaf="false"
                                    :selectable="false"
                                    @touched="addApprover"
                            ></organization-chart>
                            <v-divider></v-divider>
                            <p class="text-h6 mt-5">
                                결재 경로
                            </p>
                            <v-simple-table v-if="approvers.length > 0">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>순서</th>
                                        <th>결재 종류</th>
                                        <th>직책</th>
                                        <th>이름</th>
                                        <th>이동</th>
                                        <th>삭제</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for=" (node, index) in approvers " :key="index">
                                        <td>
                                            {{index+1}}
                                        </td>
                                        <td>
                                            <v-select
                                                    :items="approvalKind"
                                                    label=""
                                                    :value="node.kind"
                                                    style="max-width: 7rem"
                                                    @input="addProperty($event, index)"
                                            ></v-select>
                                        </td>
                                        <td>
                                            {{node.role}}
                                        </td>
                                        <td>
                                            {{node.name}}
                                        </td>
                                        <td>
                                            <v-btn icon
                                                   :disabled="index == 0"
                                                   title="위로"
                                            >
                                                <v-icon @click="move(index, -1)">mdi-chevron-up</v-icon>
                                            </v-btn>
                                            <v-btn icon
                                                   :disabled="index == approvers.length-1"
                                                   title="아래로"
                                            >
                                                <v-icon @click="move(index, 1)">mdi-chevron-down</v-icon>
                                            </v-btn>
                                        </td>
                                        <td>
                                            <v-btn icon title="삭제">
                                                <v-icon @click="del(index)">mdi-trash-can-outline</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <p class="error--text" v-else>
                                결재자를 선택하십시오.
                            </p>
                            <br/>
                            <br/>
                        </v-sheet>

                        <!--
                        <v-btn color="primary" @click="nextStep(1)">
                            <v-icon left>mdi-pencil</v-icon>본문작성
                        </v-btn>
                        -->
                    </v-stepper-content>
                    <v-stepper-content step="3">
                        <v-card width="210mm">
                            내용
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <document-editor></document-editor>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-col>
        <v-col cols="5">
                <iframe id="pdfId" style="height:735px; width: 500px; border: 1px solid grey; background: white"></iframe>
        </v-col>
    </v-row>
</template>

<script>
    import DocumentEditor from "@/components/DocumentEditor.vue"

    export default {
        components: {
            DocumentEditor
        },
        data () {
            return {
                e1: 1,
                steps: 2,
                value: "",
                kind: "in",
                receiver: [],
                subject: "",
                confirm1: "",
                confirm2: "",
                open: "all",
                date: "", /* 오늘로 셋팅할 경우 new Date().toISOString().substr(0, 10) */
                menu: false,
                modal: false,
                menu2: false,
                limit: "no",
                dialog: "",
                receivers: [],
                items: [],
                summary: "",
                sendi: "협력예술종합활동 사업단",
                sender: "연구책임자",
                approvers: [],
                approvalKind: ['협조', '병렬협조', '검토', '전대결', '대결', '전결', '결재'],
                absenceKind: ["출장", "휴가", "교육", "외출", "조퇴", "연가", "병가", "공가", "특별휴가", "결근", "지각", "부재", "기타", "미발령", "대체휴무"],
            }
        },
        computed: {
            receiverName() {
                if (this.kind == "in") return "내부결재"
                if (this.receivers.length > 1) return "수신자 참조"
                else if (this.receivers.length == 0) return ""
                else return this.receivers[0]
            },
            receiverTitle: function() {
                if (this.kind == "out" && this.receivers.length > 1) {
                    return "수신자"
                }
                return ""
            },
            receiverList: function () {
                if (this.kind == "out" && this.receivers.length > 1) {
                    let arr = []
                    for (let obj of this.receivers) {
                        arr.push(obj.name)
                    }
                    return arr.toString().replace(/,/g, ", ")
                }
                return ""
            }
        },
        methods: {
            nextStep (n) {
                if (n === this.steps) {
                    this.e1 = 1
                } else {
                    this.e1 = n + 1
                }
            },
            getDay(date){
                let value = new Date(date).getDate()
                return value
            },
            setReceivers(arr) {
                this.receivers = arr
                this.dialog = false
            },
            remove(id, arr) {
                const itemToFind = arr.find( function(item) { return item.id === id})
                const idx = arr.indexOf(itemToFind)
                if (idx > -1) arr.splice(idx, 1)
            },
            addApprover(obj) {
                this.approvers.push(obj)
            },
            changeArrayOrder(list, targetIdx, moveValue) {
                // 배열값이 없는 경우 나가기
                if (list.length < 0) return;

                // 이동할 index 값을 변수에 선언
                const newPosition = targetIdx + moveValue;

                // 이동할 값이 0보다 작거나 최대값을 벗어나는 경우 종료
                if (newPosition < 0 || newPosition >= list.length) return;

                // 임의의 변수를 하나 만들고 배열 값 저장
                const tempList = JSON.parse(JSON.stringify(list));

                // 옮길 대상을 target 변수에 저장하기
                const target = tempList.splice(targetIdx, 1)[0];

                // 새로운 위치에 옮길 대상을 추가하기
                tempList.splice(newPosition, 0, target);

                return tempList;
            },
            move(targetIdx, moveValue) {
                this.approvers = this.changeArrayOrder(this.approvers, targetIdx, moveValue)
            },
            addProperty(event, index) {
                this.approvers[index].kind = event
                this.approvers.push()
            },
            del(index) {
                this.approvers.splice(index, 1)
            }
        },
        watch: {
            steps(val) {
                if (this.e1 > val) {
                    this.e1 = val
                }
            }
        }
    }
</script>
<style>
    .ProseMirror-focused:focus {
        outline: none;
    }
    .editor__content {
        line-height: 180%;
    }
    .editor__content p {
        margin: 0;
    }
    .tableWrapper table {
        border-collapse: collapse;
        margin: 0.5rem 0.5rem 0.5rem 1rem;
    }
    .tableWrapper table th, .tableWrapper table td {
        border: 1px solid grey;
        padding: 0.3rem;
        line-height: 140%;
    }
    .tableWrapper table th, .tableWrapper table td, .tableWrapper table td p {
        margin: 0;
    }
    .tableWrapper table .selectedCell {
        background: #fff181;
    }
    .el-tiptap-editor__content [data-indent="1"] {
        text-indent: -20px;
    }
    .el-tiptap-editor__content [data-indent="2"] {
        text-indent: -20px;
    }
    #docu * {
        line-height: 140%;
    }
    #docu-header {
        /* font-family: 돋움; */
        font-size: 12pt;
        color: black;
    }
    #docu-body {
        /* font-family: 돋움체; */
        font-size: 12pt;
        color: black;
    }
    #docu-footer {
        /* font-family: 돋움; */
        font-size: 9pt;
    }
    #docu-footer * {
        font-size: 9pt;
        line-height: 110%;
    }
    #docu-footer div {
        color: black;
    }
    .approver-box {
        width: 34mm;
    }
    .role-name {
        font-size: 9pt;
    }
    #docu-table td {
        border: 0;
    }
</style>