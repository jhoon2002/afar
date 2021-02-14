<template>
    <v-row>
        <v-col cols="3">
            <v-radio-group
                    v-model="row"
                    label="문서종류"
                    row
            >
                <v-radio
                        label="내부결재"
                        value="radio-1"
                ></v-radio>
                <v-radio
                        label="시행문"
                        value="radio-2"
                ></v-radio>
            </v-radio-group>
            <v-select
                    v-model="value"
                    :items="['전략기획팀장', '사업운영팀장', '총무관리팀장', '협력종합예술활동 책임자', '예술세상마을 책임자']"
                    attach
                    label="수신자"
                    chips
                    multiple
                    :disabled="row === 'radio-1'"
            ></v-select>
            <v-text-field label="제목" v-model="subject"></v-text-field>


            <v-radio-group
                    v-model="row"
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
        </v-col>
        <v-col cols="9">
            <v-sheet style="width: 900px">

                <v-btn
                        :loading="making"
                        :disabled="making"
                        color="red darken-2"
                        class="ma-2 white--text"
                        @click="makePDF"
                        small
                >
                    <v-icon left dark>mdi-adobe-acrobat</v-icon>
                    PDF
                </v-btn>
                <v-card elevation="2" outlined class="pa-14">
                    <div id="printArea" ref="printArea">
                        <v-row class="mb-7">
                            <v-col cols="2" class="d-flex flex-column align-center justify-center">
                                <v-img src="@/assets/karts-black.png" width="100" max-height="20"></v-img>
                            </v-col>
                            <v-col cols="8">
                                <div class="text-center text-body-1 mb-3">미래의 고전</div>
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
                                한국대학교육협의회
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-1">
                            <v-col cols="1" class="ma-0 pa-0">
                                (경유)
                            </v-col>
                            <v-col cols="11" class="ma-0 pa-0">

                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-1 mb-4">
                            <v-col cols="1" class="ma-0 pa-0">
                                제목
                            </v-col>
                            <v-col cols="11" class="ma-0 pa-0">
                                {{subject}}
                            </v-col>
                        </v-row>
                        <!--
                        <el-tiptap
                                :extensions="myExtensions"
                                :charCounterCount="false"
                                width="100%"
                        />
                        -->
                        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                            <div class="menubar" id="data-html2canvas-ignore" data-html2canvas-ignore>
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
                        <editor-content class="editor__content" :editor="editor" />
                    </div>
                    <div id="printFooter">
                        <v-progress-linear
                                color="grey lighten-3"
                                value="100"
                                height="15"
                                class="mb-3"
                        ></v-progress-linear>
                        <v-row class="ma-0 pa-1">
                            <v-col class="ma-0 pa-0">행정원 최형준 (1.21.)<br>기안</v-col>
                            <v-col class="ma-0 pa-0">팀장 마진욱 (1.22.)<br>검토</v-col>
                            <v-col class="ma-0 pa-0">부단장 여종훈 (1.22.)<br>검토</v-col>
                            <v-col class="ma-0 pa-0">단장 이정민 (1.25.)<br>대결</v-col>
                            <v-col class="ma-0 pa-0">총장 김봉렬 (1.25.)<br>출장</v-col>
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
                </v-card>
                <v-btn
                        :loading="making"
                        :disabled="making"
                        color="red darken-2"
                        class="ma-2 white--text"
                        @click="makePDF"
                        small
                >
                    <v-icon left dark>mdi-adobe-acrobat</v-icon>
                    PDF
                </v-btn>
            </v-sheet>
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
    */
    import html2canvas from "html2canvas";
    import jsPDF from "jspdf";
    /*
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
    import Icon from "@/components/Icon/index"; // autoCloseTags
    export default {
        components: {
            EditorContent,
            EditorMenuBar,
            Icon,
        },
        data () {
            return {
                value: "",
                row: "radio-1",
                subject: "",
                confirm1: "",
                confirm2: "",
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
                propTitle: 'mypdf',
                making: false,
                making2: false,
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
            }
        },
        methods: {
            makePDF (selector = 'body') {
                window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
                let that = this
                that.making = true
                let pdf = new jsPDF('p', 'mm', 'a4')
                let canvas = pdf.canvas
                const pageWidth = 210 //캔버스 너비 mm
                const pageHeight = 297 //캔버스 높이 mm
                //canvas.width = pageWidth

                let scale = 2.5 //이미지 렌더링 스케일(높을 수로 해상도 증가)
                let topMargin = 20
                let bottomMargin = 20
                let leftMargin = 20
                let rightMargin = 20

                let contentWidth = pageWidth - leftMargin - rightMargin
                let contentHeight = pageHeight - topMargin - bottomMargin

                canvas.width = contentWidth
                canvas.height = contentHeight
                let whiteSpaceImageData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAACAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKAAD//Z"


                //제외영역 data-html2canvas-ignore
                //let minus = document.querySelector("#data-html2canvas-ignore")

                //printArea
                let ele = document.querySelector("#printArea")
                let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
                let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
                //let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환
                let imgHeight = contentWidth * height/width // 이미지 높이값 px to mm 변환

                //printFooter
                let elef = document.querySelector("#printFooter")
                let widthf = elef.offsetWidth
                let heightf = elef.offsetHeight
                //let imgHeightf = pageWidth * heightf/widthf
                let imgHeightf = contentWidth * heightf/widthf

                if(!ele){
                    console.warn(selector + ' is not exist.')
                    return false
                }

                //마지막 페이지의 빈공간 높이 계산(이 보다 footer 높이가 높으면 다음 페이지 추가)
                let whiteSpaceHeight = contentHeight - (imgHeight % contentHeight)
                console.log(whiteSpaceHeight)

                console.log("area 높이", imgHeight )
                console.log("footer 높이", imgHeightf)
                console.log("content 높이", contentHeight)
                console.log("시작높이", topMargin + (contentHeight-imgHeightf) )
                console.log("canvas width", canvas.width )
                console.log("canvas height", canvas.height )

                html2canvas(ele, {
                    scale: scale
                }).then (function(canvas) { //printArea 렌더링
                        let position = 0
                        const imgData = canvas.toDataURL('image/jpeg', 0.5)

                        pdf.addImage(imgData, 'jpeg', leftMargin, topMargin, contentWidth, imgHeight, undefined, 'slow')
                        pdf.addImage(whiteSpaceImageData, 'jpeg', leftMargin, pageHeight-bottomMargin, contentWidth, imgHeight, undefined, 'slow')

                        //Paging 처리
                        let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
                        //heightLeft -= pageHeight
                        heightLeft -= contentHeight
                        let aaa = heightLeft
                        let p = 1

                        console.log("총페이지: " + Math.floor(imgHeight / contentHeight) )
                        console.log("마지막 페이지 콘텐츠 길이: " + imgHeight % contentHeight)

                        while (aaa >= 0) { //페이지 높이보다 이미지 높이가 큰 경우, 즉은 남은 페이지가 있는 경우
                            position = heightLeft - imgHeight + topMargin
                            pdf.addPage();
                            pdf.addImage(imgData, 'jpeg', leftMargin, position, contentWidth, imgHeight, undefined, 'slow')
                            pdf.addImage(whiteSpaceImageData, 'jpeg', leftMargin, 0, contentWidth, topMargin, undefined, 'slow')
                            pdf.addImage(whiteSpaceImageData, 'jpeg', leftMargin, pageHeight-bottomMargin, contentWidth, imgHeight, undefined, 'slow')
                            heightLeft -= contentHeight
                            aaa = heightLeft
                            p += 1
                            console.log("페이지: " + p)
                            console.log("position: " + position)
                            console.log("imgHeight: " + imgHeight)
                            console.log("heightLeft: " + heightLeft)
                            console.log("aaa: " + aaa)
                            console.log("=================")
                        }
                        //pdf.save(that.propTitle.toLowerCase() +'.pdf')

                    }
                ).then ( () => {  //printFooter 렌더링
                        html2canvas(elef, {
                            scale: scale
                        }).then ( function(canvas) {
                                if (imgHeightf > whiteSpaceHeight) { //footer 높이가 높으면 다음 페이지 추가, 아니면 해당 페이지에 추가
                                    pdf.addPage()
                                }
                                pdf.addImage(canvas.toDataURL('image/jpeg', 0.5), 'jpeg', leftMargin, topMargin + (contentHeight-imgHeightf), contentWidth, imgHeightf)
                                pdf.save(that.propTitle.toLowerCase() +'.pdf')
                            }
                        )
                    }
                )
                setTimeout(() => ( that.making = false ), 1000)
            },
        }
    };
</script>
<style>
    .ProseMirror-focused:focus {
        outline: none;
    }/*
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
    }*/
</style>