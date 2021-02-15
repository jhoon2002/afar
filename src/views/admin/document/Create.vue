<template>
        <v-row>
            <v-col cols="3">
                <v-card class="pa-5" elevation="4" title="문서관리카드">
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
                            :items="['전략기획팀장', '사업운영팀장', '총무관리팀장', '협력종합예술활동 책임자', '예술세상마을 책임자', '단장', '정신문화연구소장']"
                            attach
                            label="수신자"
                            chips
                            multiple
                            :disabled="kind === 'in'"
                    ></v-select>
                    <v-text-field label="제목" v-model="subject"></v-text-field>
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
                                :items="['검토', '전결', '결재', '대결']"
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
            <v-col>
                <v-card style="width: 210mm" elevation="4" id="docu">
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
                            <!--
                            <el-tiptap
                                    :extensions="myExtensions"
                                    :charCounterCount="false"
                                    width="100%"
                            />
                            -->
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
                                    color="grey lighten-2"  
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
                                        <v-sheet class="">{{approver.name}}</v-sheet>
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
            </v-col>
            <v-col>
                <v-btn large elevation="4" class="white d-block mb-3 text-body-1" style="width:10rem"><v-icon left>mdi-draw</v-icon>결재하기</v-btn>
                <v-btn large elevation="4" class="white d-block mb-3 text-body-1" style="width:10rem"><v-icon left>mdi-close-thick</v-icon>반려하기</v-btn>
                <v-card elevation="4" style="width: 10rem; height: 20rem" class="mb-3">
                    <v-system-bar
                            color="grey darken-3"
                            dark
                    >
                        <v-icon>mdi-lead-pencil</v-icon>TOOLS
                    </v-system-bar>
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
                </v-card>
                <pdf-button area="printArea"
                            footer="docu-footer"
                            scale="3"
                            quality="0.8"
                            compression="FAST"
                            style="width:10rem"
                            class="red white--text text-body-1"
                >
                </pdf-button>
            </v-col>
        </v-row>
</template>

<script>
    /*
    import {
        Doc,
        Text,
        Paragraph,
        Bold,
        TextAlign,
        Indent,
        Table,
        TableHeader,
        TableCell,
        TableRow,
        TrailingNode,
        Print,
        Preview,
        History,
        CodeView,
    } from 'element-tiptap';

    import codemirror from 'codemirror';
    import 'codemirror/lib/codemirror.css'; // import base style
    import 'codemirror/mode/xml/xml.js'; // language
    import 'codemirror/addon/selection/active-line.js'; // require active-line.js
    import 'codemirror/addon/edit/closetag.js';
    import {
        Blockquote,
        BulletList, Code,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule, Italic, Link,
        ListItem,
        OrderedList, Strike, TodoItem, TodoList, Underline
    } from "tiptap-extensions"
     */
    import PdfButton from "@/components/PdfButton.vue"
    import Alignment from '@/Alignment'
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
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
            PdfButton,
            EditorContent,
            EditorMenuBar,
            Icon,
        },
        data () {
            return {
                value: "",
                kind: "in",
                receiver: [],
                subject: "",
                confirm1: "",
                confirm2: "",
                open: "",
                /*
                myExtensions: [
                    new Doc(),
                    new Text(),
                    new Paragraph(),
                    new Bold(),
                    new TextAlign(),
                    new Indent(),
                    new Table({ resizable: true }),
                    new TableHeader(),
                    new TableCell(),
                    new TableRow(),
                    new History(),
                    new Print(),
                    new Preview(),
                    new TrailingNode(),
                    new CodeView({
                        codemirror,
                        codemirrorOptions: {
                            styleActiveLine: true,
                            autoCloseTags: true,
                        },
                    }),
                ],
                 */
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