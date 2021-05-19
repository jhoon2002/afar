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
                <editor-menu-bar class="mb-3" :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
                    <v-btn-toggle>
                        <v-btn
                                plain small
                                class="menubar__button"
                                :class="{ 'is-active': isActive.bold() }"
                                @click="commands.bold"
                        >
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>


                        <v-btn plain small
                               type="button"
                               class="menubar__button"
                               :class="{ 'is-active': getMarkAttrs('alignment').align === 'left' }"
                               @click="commands.alignment({ align: 'left' })"
                        >
                            <v-icon>mdi-format-align-left</v-icon>
                        </v-btn>

                        <v-btn plain small
                               type="button"
                               class="menubar__button"
                               :class="{ 'is-active': getMarkAttrs('alignment').align === 'center' }"
                               @click="commands.alignment({ align: 'center' })"
                        >
                            <v-icon>mdi-format-align-center</v-icon>
                        </v-btn>

                        <v-btn plain small
                               type="button"
                               class="menubar__button"
                               :class="{ 'is-active': getMarkAttrs('alignment').align === 'right' }"
                               @click="commands.alignment({ align: 'right' })"
                        >
                            <v-icon>mdi-format-align-right</v-icon>
                        </v-btn>

                        <v-btn plain small
                               type="button"
                               class="menubar__button"
                               :class="{ 'is-active': getMarkAttrs('alignment').align === 'justify' }"
                               @click="commands.alignment({ align: 'justify' })"
                        >
                            <v-icon>mdi-format-align-justify</v-icon>
                        </v-btn>

                        <v-btn plain small
                               type="button"
                               class="menubar__button"
                               @click="commands.indent(
                                   {
                                       size: getMarkAttrs('indent').newSize
                                   }
                               )"
                        >
                            <v-icon>mdi-format-horizontal-align-right</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
                        >
                            <v-icon>mdi-table-large</v-icon>
                        </v-btn>

                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.deleteTable"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-large-remove</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.addColumnBefore"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-column-plus-before</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.addColumnAfter"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-column-plus-after</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.deleteColumn"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-column-remove</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.addRowBefore"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-row-plus-before</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.addRowAfter"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-row-plus-after</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.deleteRow"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-row-remove</v-icon>
                        </v-btn>
                        <v-btn plain small
                                class="menubar__button"
                                @click="commands.toggleCellMerge"
                               v-if="isActive.table()"
                        >
                            <v-icon>mdi-table-merge-cells</v-icon>
                        </v-btn>

                        <v-btn
                                plain small
                                class="menubar__button"
                                @click="commands.undo"
                        >
                            <v-icon>mdi-undo</v-icon>
                        </v-btn>

                        <v-btn
                                plain small
                                class="menubar__button"
                                @click="commands.redo"
                        >
                            <v-icon>mdi-redo</v-icon>
                        </v-btn>


                    </v-btn-toggle>
                </editor-menu-bar>
                <v-card class="pa-14" elevation="2" outlined>
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
                    <editor-content class="editor__content pa-2 mb-5" style="border: 0px solid #eeeeee;" :editor="editor"  />
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
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    import {
        Bold,
        Table,
        TableHeader,
        TableCell,
        TableRow
    } from 'tiptap-extensions'
    import Alignment from '@/Alignment'
    import Indent from '@/Indent'
    export default {
        components: {
            EditorContent,
            EditorMenuBar,
        },
        data() {
            return {
                row: "radio-1",
                subject: "",
                confirm1: "",
                confirm2: "",
                editor: new Editor({
                    extensions: [
                        new Bold(),
                        new Table({
                            resizable: true,
                        }),
                        new TableHeader(),
                        new TableCell(),
                        new TableRow(),
                        new Alignment(),
                        new Indent()
                    ],
                    content: ``,
                }),
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
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
</style>