<template>
    <v-row>
        <v-col>
            <v-stepper v-model="e1" non-linear>
                <v-stepper-header>
                    <v-stepper-step editable edit-icon="mdi-card-bulleted-outline" :complete="e1 == 1" step="1">
                        기본 정보
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step editable edit-icon="mdi-account-multiple" :complete="e1 == 2" step="2">
                        결재 경로
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step editable edit-icon="mdi-pencil" :complete="e1 == 3" step="3">
                        본문 작성
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card style="width: 210mm" class="pa-5" elevation="0" title="기본 정보">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="2">
                                        <v-subheader class="text-body-1">문서종류</v-subheader>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-row class="align-center">
                                            <v-radio-group
                                                    v-model="kind"
                                                    label=""
                                                    row
                                            >
                                                <v-radio
                                                        label="내부결재"
                                                        value="in"
                                                        on-icon="mdi-checkbox-marked-circle"
                                                        off-icon="mdi-checkbox-blank-circle-outline"
                                                ></v-radio>
                                                <v-radio
                                                        label="시행문"
                                                        value="out"
                                                        on-icon="mdi-checkbox-marked-circle"
                                                        off-icon="mdi-checkbox-blank-circle-outline"
                                                ></v-radio>
                                            </v-radio-group>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row class="align-center" v-if="kind === 'out'">
                                    <v-col cols="2">
                                        <v-subheader class="text-body-1">수신자{{receivers.length > 0 ? '(' + receivers.length + ')' : ''}}</v-subheader>
                                    </v-col>
                                    <v-cols cols="10">
                                        <v-sheet width="40rem" class="pa-1">
                                            <template v-if="receivers.length > 0">
                                                <template v-for="(receiver, index) in receivers">
                                                    <v-chip :key="index"
                                                            close
                                                            @click:close="remove(receiver.id, receivers)"
                                                            class="mr-1 mb-1"
                                                            style="max-width: 15rem"
                                                    >
                                                        <span class="text-truncate">{{ receiver.name }}</span>
                                                    </v-chip>
                                                </template>
                                                <template v-if="receivers.length > 3">
                                                    <v-btn color="grey darken-3" elevation="0"
                                                           dark x-small
                                                           style="padding-bottom:0.1rem"
                                                           class="rounded-lg"
                                                           @click="receivers = []"
                                                    >
                                                        모두 삭제
                                                    </v-btn>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <v-dialog
                                                        v-model="dialog"
                                                        max-width="50rem"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn
                                                                color="primary"
                                                                dark
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                icon
                                                        >
                                                            <v-icon>mdi-plus</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <organ-tree @send="setReceivers" @close="dialog = false"></organ-tree>
                                                </v-dialog>
                                            </template>
                                        </v-sheet>
                                    </v-cols>
                                </v-row>
                                <v-row class="align-center">
                                    <v-col cols="2">
                                        <v-subheader class="text-body-1">제목</v-subheader>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-text-field label="" v-model="subject"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="align-center">
                                    <v-col cols="2">
                                        <v-subheader>문서 요지</v-subheader>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-textarea label="" v-model="summary"
                                                    rows="3"
                                        >
                                        </v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row class="align-center">
                                    <v-col cols="2">
                                        <v-subheader>열람범위</v-subheader>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-radio-group
                                                v-model="open"
                                                label=""
                                                row
                                        >
                                            <v-radio
                                                    label="비공개"
                                                    value="open-1"
                                                    on-icon="mdi-checkbox-marked-circle"
                                                    off-icon="mdi-checkbox-blank-circle-outline"
                                            ></v-radio>
                                            <v-radio
                                                    label="부서"
                                                    value="open-2"
                                                    on-icon="mdi-checkbox-marked-circle"
                                                    off-icon="mdi-checkbox-blank-circle-outline"
                                            ></v-radio>
                                            <v-radio
                                                    label="기관"
                                                    value="open-3"
                                                    on-icon="mdi-checkbox-marked-circle"
                                                    off-icon="mdi-checkbox-blank-circle-outline"
                                            ></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>
                                <v-row class="align-center">
                                    <v-col cols="2">
                                        <v-subheader>열람제한기간</v-subheader>
                                    </v-col>
                                    <v-col cols="10">
                                        <v-row class="ma-0 pa-0">
                                            <v-radio-group
                                                    v-model="limit"
                                                    label=""
                                                    row
                                            >
                                                <v-radio
                                                        label="설정안함"
                                                        value="no"
                                                        on-icon="mdi-checkbox-marked-circle"
                                                        off-icon="mdi-checkbox-blank-circle-outline"
                                                ></v-radio>
                                                <v-radio
                                                        label="설정"
                                                        value="yes"
                                                        on-icon="mdi-checkbox-marked-circle"
                                                        off-icon="mdi-checkbox-blank-circle-outline"
                                                ></v-radio>
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
                                                            style="max-width:10rem"
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
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <!--
                        <v-btn color="primary" class="mt=5" @click="nextStep(1)">
                            <v-icon left>mdi-pencil</v-icon>본문작성
                        </v-btn>
                        -->
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card style="width: 210mm" class="pa-5" elevation="0" title="결재 경로">
                            <v-card-text>
                                <p class="display-1 text--primary">
                                    결재 경로
                                </p>
                            </v-card-text>
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

                        <!--
                        <v-btn color="primary" @click="nextStep(1)">
                            <v-icon left>mdi-pencil</v-icon>본문작성
                        </v-btn>
                        -->
                    </v-stepper-content>

                    <v-stepper-content step="3">

                        <v-card style="width: 210mm" outlined elevation="4" id="docu" title="본문 작성">
                            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="pa-2">
                                <div>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.bold() }"
                                            @click="commands.bold"
                                    >
                                        <icon name="mdi-format-bold" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.italic() }"
                                            @click="commands.italic"
                                    >
                                        <icon name="mdi-format-italic" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.strike() }"
                                            @click="commands.strike"
                                    >
                                        <icon name="mdi-format-strikethrough" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.underline() }"
                                            @click="commands.underline"
                                    >
                                        <icon name="mdi-format-underline" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.code() }"
                                            @click="commands.code"
                                    >
                                        <icon name="mdi-code-tags" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.paragraph() }"
                                            @click="commands.paragraph"
                                    >
                                        <icon name="mdi-format-paragraph" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                                            @click="commands.heading({ level: 1 })"
                                    >
                                        <icon name="mdi-format-header-1" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                                            @click="commands.heading({ level: 2 })"
                                    >
                                        <icon name="mdi-format-header-2" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                                            @click="commands.heading({ level: 3 })"
                                    >
                                        <icon name="mdi-format-header-3" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.bullet_list() }"
                                            @click="commands.bullet_list"
                                    >
                                        <icon name="mdi-format-list-bulleted" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.ordered_list() }"
                                            @click="commands.ordered_list"
                                    >
                                        <icon name="mdi-format-list-numbered" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.blockquote() }"
                                            @click="commands.blockquote"
                                    >
                                        <icon name="mdi-format-quote-close" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            :class="{ 'is-active': isActive.code_block() }"
                                            @click="commands.code_block"
                                    >
                                        <icon name="mdi-code-brackets" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            @click="commands.horizontal_rule"
                                    >
                                        <icon name="mdi-minus" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            @click="commands.undo"
                                    >
                                        <icon name="mdi-undo" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            @click="commands.redo"
                                    >
                                        <icon name="mdi-redo" />
                                    </button>
                                    <button
                                            class="menubar__button"
                                            @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
                                    >
                                        <icon name="mdi-table-large" />
                                    </button>
                                    <span v-if="isActive.table()">
                            <button
                                    class="menubar__button"
                                    @click="commands.deleteTable"
                            >
                                <icon name="mdi-table-remove" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.addColumnBefore"
                            >
                                <icon name="mdi-table-column-plus-before" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.addColumnAfter"
                            >
                                <icon name="mdi-table-column-plus-after" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.deleteColumn"
                            >
                                <icon name="mdi-table-column-remove" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.addRowBefore"
                            >
                                <icon name="mdi-table-row-plus-before" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.addRowAfter"
                            >
                                <icon name="mdi-table-row-plus-after" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.deleteRow"
                            >
                                <icon name="mdi-table-row-remove" />
                            </button>
                            <button
                                    class="menubar__button"
                                    @click="commands.toggleCellMerge"
                            >
                                <icon name="mdi-table-merge-cells" />
                            </button>
                        </span>
                                </div>
                            </editor-menu-bar>
                            <v-sheet style="padding: 20mm 20mm 15mm 20mm">
                                <div id="printArea">
                                    <v-sheet id="docu-header">
                                        <v-row class="mb-7">
                                            <v-col cols="2" class="d-flex flex-column align-center justify-center">
                                                <v-img src="@/assets/karts-black.png" width="100" max-height="20"></v-img>
                                            </v-col>
                                            <v-col cols="8">
                                                <div class="text-center text-body-1 mb-3">창작의 산실</div>
                                                <div class="text-center text-h5">한국예술종합학교 산학협력단</div>
                                            </v-col>
                                            <v-col cols="2">

                                            </v-col>
                                        </v-row>
                                        <v-row class="ma-0 pa-1">
                                            <v-col cols="1" class="ma-0 pa-0">
                                                수신
                                            </v-col>
                                            <v-col cols="11" class="ma-0 pa-0">
                                                {{receiverName}}
                                            </v-col>
                                        </v-row>
                                        <v-row class="ma-0 pa-1">
                                            <v-col cols="1" class="ma-0 pa-0">
                                                (경유)
                                            </v-col>
                                            <v-col cols="11" class="ma-0 pa-0">

                                            </v-col>
                                        </v-row>
                                        <v-row class="ma-0 pa-1 mb-1">
                                            <v-col cols="1" class="ma-0 pa-0">
                                                제목
                                            </v-col>
                                            <v-col cols="11" class="ma-0 pa-0">
                                                {{subject}}
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                    <v-divider style="border-color: black; height: 10px;" class="mb-2"></v-divider>
                                    <editor-content class="editor__content pa-1" :editor="editor" id="docu-body" />
                                </div>
                                <div id="docu-footer">
                                    <v-sheet class="mt-4">
                                        <v-row class="mb-2">
                                            <v-col style="max-width:4rem">
                                                {{receiverTitle}}
                                            </v-col>
                                            <v-col>
                                                {{receiverList}}
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                    <v-progress-linear
                                            color="grey lighten-1"
                                            value="100"
                                            height="10"
                                            class="mb-2"
                                    ></v-progress-linear>

                                    <v-row class="d-flex justify-space-between ma-0 pa-0 mb-4">
                                        <v-sheet class="d-flex align-center mb-2 mr-3"
                                                 style="height:10mm; max-width: 36mm" v-for=" (approver, i) in approvers " :key="i">
                                            <v-sheet style="max-width:13mm" class="mr-2">{{approver.role}}</v-sheet>
                                            <v-sheet style="" class="">
                                                <v-sheet style="font-size:8pt; height:10pt; line-height:100%; margin-bottom: 0.2mm"
                                                >{{approver.confirmed}}</v-sheet>
                                                <v-sheet class="font-weight-bold">{{approver.name}}</v-sheet>
                                            </v-sheet>
                                        </v-sheet>
                                    </v-row>
                                    <v-row class="ma-0 pa-1">
                                        <v-col class="ma-0 pa-0">시행 전략기획팀2021-109</v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-1">
                                        <v-col class="ma-0 pa-0">우100-100 서울특별시 성북구 화랑로32길 146-37 research.karts.ac.kr</v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-1">
                                        <v-col class="ma-0 pa-0">전화번호 02-746-9053 팩스번호 02-746-9059 이메일주소 jhoon@karts.ac.kr</v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-1">
                                        <v-col class="ma-0 pa-0 text-center">창작의 산실 산학협력단</v-col>
                                    </v-row>
                                </div>
                            </v-sheet>
                        </v-card>

                        <v-btn color="primary" @click="nextStep(2)">
                            <v-icon left>mdi-card-bulleted-outline</v-icon>문서관리카드
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-col>
        <v-col>

        </v-col>
    </v-row>
</template>

<script>
    // import PdfButton from "@/components/PdfButton.vue"
    import Alignment from '@/Alignment'
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    import OrganTree from "@/components/OrganTree";
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
        TrailingNode,
        Table,
        TableHeader,
        TableCell,
        TableRow,
    } from 'tiptap-extensions'
    import Icon from "@/components/Icon/index";
    export default {
        components: {
            // PdfButton,
            EditorContent,
            EditorMenuBar,
            OrganTree,
            Icon,
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
                open: "",
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false,
                limit: "no",
                dialog: "",
                receivers: [],
                items: [],
                summary: "",
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new TrailingNode({
                            node: 'paragraph',
                            notAfter: ['paragraph'],
                        }),
                        new Alignment(),
                        new Table({
                            resizable: true,
                        }),
                        new TableHeader(),
                        new TableCell(),
                        new TableRow(),
                    ],
                    content: ``,
                }),
                approvers: [
                    {
                        name: "최형준",
                        role: "주무관",
                        confirmed: ""
                    },
                    {
                        name: "마진욱",
                        role: "전략기획팀장",
                        confirmed: ""
                    },
                    {
                        name: "여종훈",
                        role: "부단장",
                        confirmed: ""
                    },
                    {
                        name: "이정민",
                        role: "단장",
                        confirmed: ""
                    },
                    {
                        name: "김봉렬",
                        role: "총장",
                        confirmed: "결재 2021.12.30."
                    }
                ]
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
</style>