<template>
    <v-sheet>
        <!--
        <v-sheet class="mb-3">
            <v-btn @click="editor.chain().focus().printPdf().run()" dark color="primary" elevation="0" class="mr-2">
                <v-icon small left>mdi-monitor</v-icon>
                미리보기
            </v-btn>
            <v-btn @click="pdfgen('download')" dark color="pink" elevation="0">
                <v-icon small left>mdi-download</v-icon>
                다운로드
            </v-btn>
        </v-sheet>
        -->
        <v-sheet class="mb-2">

            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                <v-icon :dark="editor.isActive('paragraph')">ri-paragraph</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'left' })">ri-align-left</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'center' })">ri-align-center</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'right' })">ri-align-right</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'justify' })">ri-align-justify</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon :dark="editor.isActive('bold')">ri-bold</v-icon>
            </button>
            <button @click="editor.chain().focus().outdent(cursorPosX()).run()" :class="{ 'is-active': editor.isActive('AutoOutdent') }">
                <v-icon :dark="editor.isActive('AutoOutdent')">$j-icon-auto-outdent</v-icon>
            </button>

            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()" :class="{ 'is-active': editor.isActive('table') }">
                <v-icon :dark="editor.isActive('table')">ri-table-line</v-icon>
            </button>

            <template v-if="editor.isActive('table')">
                <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                    <v-icon>ri-delete-bin-6-line</v-icon>
                </button>
                <button @click="editor.chain().focus().doIndent(5).run()">
                    <v-icon>$j-icon-table-indent</v-icon>
                </button>
                <button @click="editor.chain().focus().doOutdent(5).run()">
                    <v-icon>$j-icon-table-outdent</v-icon>
                </button>
                <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
                    <v-icon>mdi-table-column-plus-before</v-icon>
                </button>
                <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
                    <v-icon>mdi-table-column-plus-after</v-icon>
                </button>
                <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
                    <v-icon>mdi-table-column-remove</v-icon>
                </button>
                <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
                    <v-icon>mdi-table-row-plus-before</v-icon>
                </button>
                <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
                    <v-icon>mdi-table-row-plus-after</v-icon>
                </button>
                <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
                    <v-icon>mdi-table-row-remove</v-icon>
                </button>
                <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
                    <v-icon>mdi-table-merge-cells</v-icon>
                </button>
                <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
                    <v-icon>mdi-table-split-cell</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
                    <v-icon>mdi-tab</v-icon>
                </button>
            </template>
            <button @click="editor.chain().focus().undo().run()">
                <v-icon class="fas fa-undo" small></v-icon>
            </button>
            <button @click="editor.chain().focus().redo().run()">
                <v-icon class="fas fa-redo" small></v-icon>
            </button>
        </v-sheet>
        <div style="width: 210mm; border: 1px solid #dddddd" outlined elevation="4">
            <div style="padding: 20mm 20mm 15mm 20mm; line-height: 140%" ref="printArea" id="printArea">
                <!--여기부터 printArea-->
                <div>
                    <table class="title-table"
                           style="margin-bottom: 20pt"
                           data-pdfmake="{
                                    &quot;layout&quot;:&quot;noLine&quot;,
                                    &quot;widths&quot;:[120,&quot;*&quot;,120]
                                }"
                    >
                        <tr>
                            <td colspan="3" style="text-align: center; font-size: 10pt">
                                창작의 산실
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 120pt; padding-top: 14pt; margin-top: 14pt">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     x="0px" y="0px"
                                     width="60pt" viewBox="0 0 71.529 14.857" enable-background="new 0 0 71.529 14.857" xml:space="preserve">
                                    <path d="M5.202,5.668h0.044l3.635-5.42h6.009L9.774,6.717l5.592,7.344H9.033L5.246,8.198H5.202v5.859H0V0.248h5.202V5.668z"/>
                                    <path d="M46.276,9.371c0,0,2.285,4.584,2.338,4.688c0.104,0,2.033,0,2.3,0c-0.43-0.826-2.838-5.322-2.838-5.322
                                            c-0.471-0.832-0.779-1.125-1.45-1.358l-0.063-0.022L46.257,7.27V7.201l0.308-0.035l0.078-0.011c1.854-0.293,3.098-1.596,3.098-3.157
                                            c0-3.25-2.825-3.756-5.884-3.756c0,0-3.501,0-3.683,0c0,0.187,0,13.631,0,13.814c0.166,0,1.854,0,2.021,0c0-0.185,0-6.104,0-6.104
                                            h1.416C44.788,7.955,45.567,7.955,46.276,9.371z M42.194,1.82h0.095h2.116c2.023,0,3.186,0.847,3.186,2.218
                                            c0,1.407-1.313,2.342-3.427,2.342h-1.97V1.82z"/>
                                    <path d="M62.282,0.242c-0.187,0-11.413,0-11.598,0c0,0.157,0,1.422,0,1.577c0.182,0,4.789,0,4.789,0s0,12.054,0,12.238
                                            c0.164,0,1.854,0,2.019,0c0-0.187,0-12.238,0-12.238s4.607,0,4.79,0C62.282,1.664,62.282,0.4,62.282,0.242z"/>
                                    <path d="M71.53,10.222c0-2.557-2.079-3.471-3.913-4.271c-1.453-0.64-2.705-1.185-2.705-2.41c0-1.227,1.041-1.959,2.787-1.959
                                            c1.114,0,1.737,0.17,2.813,0.549c0.029-0.185,0.252-1.508,0.275-1.649C69.825,0.177,68.673,0,67.608,0
                                            c-2.944,0-4.852,1.461-4.852,3.72c0,2.293,1.863,3.092,3.66,3.858c1.522,0.648,2.961,1.264,2.961,2.762
                                            c0,1.746-1.863,2.383-3.115,2.383c-1.209,0-2.592-0.455-3.121-0.646c-0.022,0.194-0.184,1.528-0.197,1.67
                                            c0.968,0.28,1.994,0.556,3.054,0.556C69.513,14.299,71.53,12.813,71.53,10.222z"/>
                                    <rect x="15.841" y="0.248" width="4.404" height="4.401"/>
                                    <path d="M32.404,0.242c-0.109,0-2.087,0-2.197,0c-0.049,0.106-6.365,13.551-6.486,13.814c0.254,0,2.002,0,2.108,0l1.751-3.974h7.301
                                            l1.751,3.974c0.107,0,1.944,0,2.194,0C38.706,13.793,32.453,0.35,32.404,0.242z M28.221,8.625l2.922-6.627l0.087-0.194l3.008,6.821
                                            H28.221z"/>
                                </svg>
                            </td>
                            <td style="height: 40pt; font-size: 17pt; text-align: center;
                                       margin-top:12pt; padding-top: 12pt; font-weight: bold">
                                한국예술종합학교 산학협력단
                            </td>
                            <td style="width: 120pt">
                            </td>
                        </tr>
                    </table>
                    <table class="receiver-table"
                           data-pdfmake="{
                                    &quot;layout&quot;:&quot;noLine&quot;,
                                    &quot;widths&quot;:[40, 442]
                                }"
                    >
                        <tr>
                            <td style="width: 40pt; padding-bottom: 5pt; margin-bottom: 5pt;">수신</td>
                            <td style="padding-bottom: 5pt; margin-bottom: 5pt;">산학협력단장</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 5pt; margin-bottom: 5pt;">(경유)</td>
                            <td style="padding-bottom: 5pt; margin-bottom: 5pt;">전략기획팀</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 2pt; margin-bottom: 0pt;">제목</td>
                            <td style="padding-bottom: 2pt; margin-bottom: 0pt;">
                                2021 한국예술종합학교 산학협력단 운영 계획 및 예산안 수립 계획
                            </td>
                        </tr>
                    </table>
                    <hr style="border: none; height: 0.1pt;
                               background: black; margin: 2pt 0 10pt 0"
                        data-pdfmake="{
                            &quot;left&quot;:0,
                            &quot;width&quot;:482,
                            &quot;thickness&quot;:0.1,
                            &quot;color&quot;:&quot;black&quot;,
                            &quot;margin&quot;:[0,5,0,10]
                        }"
                    >
                    <div class="editor">

                        <editor-content :editor="editor"></editor-content>

                    </div>
                </div>

                <div ref="footerSection" id="footerSection">
                    <!--여기부터 footerSection-->
                    <div>
                        <hr style="border: none; height: 7pt;
                                   background: #AAAAAA; margin: 2pt 0 4pt 0"
                            data-pdfmake="{
                                &quot;left&quot;:0,
                                &quot;width&quot;:482,
                                &quot;thickness&quot;:7,
                                &quot;color&quot;:&quot;#AAAAAA&quot;,
                                &quot;margin&quot;:[0,2,0,9]
                            }"
                        >
                        <!--결재-->
                        <confirm-list style="margin-top: 5pt" :items="confirmList" type="formal"></confirm-list>

                        <!--협조자-->
                        <confirm-list style="margin-top: 0pt" v-if="helpList.length" name="협조자" :items="helpList" type="list"></confirm-list>

                        <!--병렬협조자-->
                        <confirm-list style="margin-top: 0pt" v-if="parallelList.length" name="병렬협조자" :items="parallelList" type="list"></confirm-list>
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,0,0,0]}"
                         style="font-size: 9pt; margin-top: 0pt; line-height: 1.2">
                        시행 전략기획팀2021-143
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,4,0,0]}"
                         style="font-size: 9pt; margin-top: 5pt; line-height: 1.2">
                        우 02789 서울특별시 성북구 화랑로 32길 146-37 창조관 2층 208호 / research.karts.ac.kr
                    </div>
                    <div data-pdfmake="{&quot;margin&quot;:[0,4,0,0]}"
                         style="font-size: 9pt; margin-top: 5pt; line-height: 1.2">
                        전화번호 02-746-9051 팩스번호: 02-746-9069 / jhoon@karts.ac.kr
                    </div>
                </div>
            </div>
        </div>
        <!--
        <v-sheet class="mt-3">
            <v-btn @click="pdfgen()" dark color="primary" elevation="0" class="mr-2">
                <v-icon small left>mdi-monitor</v-icon>
                미리보기
            </v-btn>
            <v-btn @click="pdfgen('download')" dark color="pink" elevation="0">
                <v-icon small left>mdi-download</v-icon>
                다운로드
            </v-btn>
        </v-sheet>
        -->
        <!--
        <v-btn color="primary" @click="nextStep(2)">
            <v-icon left>mdi-card-bulleted-outline</v-icon>문서관리카드
        </v-btn>
        -->
    </v-sheet>
</template>
<script>
    import { pdfmakeUtil } from "@/apis/pdfmake/pdfmakeUtil.js"
    import ConfirmList from "@/components/ConfirmList.vue"
    import { Editor, EditorContent } from '@tiptap/vue-2'
    import { defaultExtensions } from '@tiptap/starter-kit'
    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'
    import TextAlign from '@tiptap/extension-text-align'
    import { position, /* offset */ } from 'caret-pos'
    import AutoOutdent from "@/components/tiptap/AutoOutdent.js"
    import TableInOutdent from "@/components/tiptap/TableInOutdent.js"
    import PdfPrint from "@/components/tiptap/PdfPrint.js"
    import Paragraph from '@tiptap/extension-paragraph'

    export default {
        components: {
            ConfirmList,
            EditorContent,
        },
        data () {
            return {
                confirmList: [
                    { role: "직원", name: "최형준" },
                    { role: "전략기획팀장", name: "마진욱" },
                    { role: "부단장", name: "여종훈" },
                    { role: "단장", name: "이정민", kind: "결재", date: "2021.11.20."}
                ],
                helpList: [
                ],
                parallelList: [
                ],
                editor: null,
                content: ""
            }
        },
        methods: {
            pdfgen() {
                pdfmakeUtil.docPdfGen(this.$refs.printArea)
            },
            cursorPosX() {
                //커서가 포함된 element 구하기
                let ele = window.getSelection().anchorNode.parentElement //window.getSelection().anchorNode.parentElement //document.querySelector('.ProseMirror')
                ele.contentEditable = "true" //"caret-pos(v.2.0.0)"는 이 값이 false인 element는 다루지 않음

                //caret-pos는 text-indent룰 무시하고 margin을 기준으로만 위치를 계산하므로 text-indent를 따로 얻어 결과 값을 보정하기로 함
                let numArray = /[+-]?\d+\.?\d+/.exec(ele.style.textIndent)
                let addMargin = numArray ? Math.abs(numArray[0] * 1) : 0

                //커서 위치 구하기(by caret-pos)
                let cursorPos = position(ele); // { left: 15, top: 30, height: 20, pos: 15 }
                // this.cursorOff = offset(this.input); // { left: 15, top: 30, height: 20 }

                return cursorPos.left + addMargin
            }
        },
        watch: {
            value(value) {
                const isSame = this.editor.getHTML() === value

                if (isSame) {
                    return
                }

                this.editor.commands.setContent(this.value, false)
            },
        },
        mounted() {
            this.editor = new Editor({
                extensions: [
                    ...defaultExtensions().filter(
                        extension => extension.config.name !== 'dropcursor'
                            && extension.config.name !== 'italic'
                            && extension.config.name !== 'code'
                            && extension.config.name !== 'codeBlock'
                            // && extension.config.name !== 'heading' //헤딩을 포함시키지 않으면 textAlign이 작동 안함
                            && extension.config.name !== 'hardBreak'
                            && extension.config.name !== 'strike'
                            && extension.config.name !== 'blockquote'
                            && extension.config.name !== 'horizontalRule'
                            && extension.config.name !== 'bulletList'
                            && extension.config.name !== 'orderedList'
                            && extension.config.name !== 'listItem'
                            && extension.config.name !== 'paragraph'
                    ),
                    Paragraph.configure({
                        HTMLAttributes: {
                            class: "p-in-editor"
                        }
                    }),
                    Table.configure({ //table은 HTMLAttributes 옵션 동작 안함(TableView가 렌더링 하면서 동작을 방해하는 듯함)
                        resizable: true,
                        allowTableNodeSelection: true,
                        handleWidth: 8
                    }),
                    TableCell,
                    TableRow,
                    TableHeader,
                    TextAlign,
                    AutoOutdent,
                    TableInOutdent,
                    PdfPrint
                ],
                content: this.value,
                autofocus: true,
                editable: true,
                injectCSS: false,
            })

            // this.editor.on('update', () => {
            //     this.content = this.editor.getHTML()
            //     this.$emit('input', this.editor.getHTML())
            // })
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>
<style scoped>
    .title-table,
    .receiver-table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .title-table td,
    .receiver-table td,
    .confirm-table td {
        /*border: 1px solid blue;*/
        vertical-align: top;
    }
    .title-table td {
        font-size: 11.7pt;
    }
    .title-table,
    .receiver-table {
        width: 100%;
    }
    .receiver-table td {
        line-height: 1.3;
    }
    .title-table {
        margin-bottom: 20pt;
    }
    .editor {
        padding-bottom: 10pt;
    }
</style>
<style>
    #printArea * {
        font-family: "Spoqa Han Sans Neo Coding";
    }
    button,
    button.is-active {
        margin-right: 3px;
        padding: 2px 2px;
    }
    button.is-active {
        border-radius: 5px;
        background: #555555;
        color: white;
    }
    button .v-icon svg {
        fill: #767676;
    }
    button.is-active svg {
        fill: white;
    }
</style>
<style lang="scss">
    /* Basic editor styles */
    .ProseMirror {
        margin: 0;
        min-height: 20rem;
        font-family: 'Spoqa Han Sans Neo Coding';

        > * + * {
            margin-top: 0;
        }

        p {
            line-height: 1.6;
            font-size: 11.7pt;
            margin-bottom: 0;
        }

        blockquote {
            padding-left: 1rem;
            border-left: 2px solid rgba(#0D0D0D, 0.1);
        }

    }

    /* Table-specific styling */
    .ProseMirror {
        table {
            border-collapse: collapse;
            table-layout: fixed;
            /*width: 10rem;*/
            margin: 2pt 2pt 2pt 2pt;

            td,
            th {
                /*min-width: 1em;*/
                /*width: 100px;*/
                border: 1px solid grey;
                padding: 1pt 3pt;
                vertical-align: middle;
                box-sizing: border-box;
                position: relative;

                > * {
                    margin-bottom: 0;
                }
            }

            th {
                font-weight: bold;
                text-align: left;
                background-color: #f1f3f5;
            }

            p {
                line-height: 1.3;
            }

            .selectedCell:after {
                z-index: 2;
                position: absolute;
                content: "";
                left: 0; right: 0; top: 0; bottom: 0;
                background: rgba(200, 200, 255, 0.4);
                pointer-events: none;
            }

            .column-resize-handle {
                position: absolute;
                right: -2px;
                top: 0;
                bottom: -2px;
                width: 4px;
                background-color: #adf;
                pointer-events: none;
            }
        }
    }

    .tableWrapper {
        overflow-x: auto;
    }

    .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
    }
    .ProseMirror-focused:focus {
        outline: 0;
    }
</style>
