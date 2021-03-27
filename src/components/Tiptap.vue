<template>
    <v-sheet v-if="editor">
        <v-sheet class="mb-2">
            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                <v-icon :dark="editor.isActive('paragraph')" small>$j-icon-paragraph</v-icon>
            </button>
            <!--
            <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <v-icon>mdi-format-italic</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                <v-icon>mdi-format-strikethrough</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
                <v-icon>mdi-code-tags</v-icon>
            </button>
            <button @click="editor.chain().focus().unsetAllMarks().run()">
                <v-icon>mdi-format-clear</v-icon>
            </button>
            <button @click="editor.chain().focus().clearNodes().run()">
                <v-icon>mdi-notification-clear-all</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                <v-icon>mdi-format-header-1</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                <v-icon>mdi-format-header-2</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                <v-icon>mdi-format-header-3</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                <v-icon>mdi-format-header-4</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                <v-icon>mdi-format-header-5</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                <v-icon>mdi-format-header-6</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                <v-icon>mdi-format-list-bulleted</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                <v-icon>mdi-format-list-numbered</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                <v-icon>mdi-square-rounded-outline</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                <v-icon>mdi-format-quote-open</v-icon>
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
                <v-icon>mdi-minus</v-icon>
            </button>
            <button @click="editor.chain().focus().setHardBreak().run()">
                <v-icon>mdi-keyboard-return</v-icon>
            </button>
-->
            <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'left' })" small>fas fa-align-left</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'center' })" small>fas fa-align-center</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'right' })" small>fas fa-align-right</v-icon>
            </button>
            <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                <v-icon :dark="editor.isActive({ textAlign: 'justify' })" small>fas fa-align-justify</v-icon>
            </button>
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon :dark="editor.isActive('bold')" small>fas fa-bold</v-icon>
            </button>
            <button @click="editor.chain().focus().setPositionX(cursorPosX()).run()" :class="{ 'is-active': editor.isActive('AutoOutdent') }">
                <v-icon :dark="editor.isActive('AutoOutdent')">$j-icon-auto-outdent</v-icon>
            </button>

            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()" :class="{ 'is-active': editor.isActive('table') }">
                <v-icon :dark="editor.isActive('table')">mdi-table</v-icon>
            </button>

            <template v-if="editor.isActive('table')">
                <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                    <v-icon class="far fa-trash-alt" dense></v-icon>
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
                <!--
                <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
                    <v-icon>mdi-table-column</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
                    <v-icon>mdi-table-row</v-icon>
                </button>
                -->
                <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
                    <v-icon>mdi-tab</v-icon>
                </button>
                <!--
                <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
                    <v-icon>mdi-table-settings</v-icon>
                </button>
                <button @click="editor.chain().focus().setCellAttribute('colspan', 2).run()" :disabled="!editor.can().setCellAttribute('colspan', 2)">
                    <v-icon>mdi-table-cog</v-icon>
                </button>
                <button @click="editor.chain().focus().fixTables().run()" :disabled="!editor.can().fixTables()">
                    <v-icon>mdi-table-lock</v-icon>
                </button>
                <button @click="editor.chain().focus().goToNextCell().run()" :disabled="!editor.can().goToNextCell()">
                    <v-icon>mdi-table-arrow-right</v-icon>
                </button>
                <button @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
                    <v-icon> mdi-table-arrow-left</v-icon>
                </button>
                -->
            </template>
            <button @click="editor.chain().focus().undo().run()">
                <v-icon class="fas fa-undo" small></v-icon>
            </button>
            <button @click="editor.chain().focus().redo().run()">
                <v-icon class="fas fa-redo" small></v-icon>
            </button>
        </v-sheet>

        <v-sheet class="pa-1" outlined>
            <editor-content :editor="editor"></editor-content>
        </v-sheet>
    </v-sheet>
</template>

<script>
    import { Extension } from '@tiptap/core'
    import { Editor, EditorContent } from '@tiptap/vue-2'
    import { defaultExtensions } from '@tiptap/starter-kit'
    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'
    import TextAlign from '@tiptap/extension-text-align'
    import { position, /* offset */ } from 'caret-pos'

    const AutoOutdent = Extension.create({
        defaultOptions: {
            types: ['paragraph'],
            positionX: String,
            defaultPositionX: 0,
        },
        addGlobalAttributes() {
            return [
                {
                    types: [
                        'paragraph',
                    ],
                    attributes: {
                        positionX: {
                            default: '0',
                            renderHTML: attributes => ({
                                style: `margin-left: ${attributes.positionX}px; text-indent: -${attributes.positionX}px`,
                            }),
                            parseHTML: element => ({
                                marginLeft: element.style.marginLeft || '0',
                                textIndent: element.style.textIndent || '0',
                            }),
                        },
                    },
                },
            ]
        },
        addCommands() {
            return {
                setPositionX: ( value ) => ({ commands }) => {
                    // console.log("this.editor.state", this.editor.state)
                    return this.options.types.every(type => commands.updateNodeAttributes(type, { positionX: value }))
                },
                /*
                unsetPositionX: () => ({ commands }) => {
                    return this.options.types.every(type => commands.resetNodeAttributes(type, 'positionX'))
                },*/
            }
        },
        addKeyboardShortcuts() {
            return {
                'Alt-q': () => {
                    console.log("단축키 작동")
                    let posX = position(window.getSelection().anchorNode.parentElement).left //document.querySelector('.ProseMirror')
                    this.editor.commands.updateNodeAttributes('paragraph', {positionX: posX})
                }
            }
        },
    })

    export default {
        components: {
            EditorContent,
        },

        props: {
            value: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                editor: null
            }
        },
        methods: {
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
            },
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
                                     && extension.config.name !== 'heading'
                                     && extension.config.name !== 'hardBreak'
                                     && extension.config.name !== 'strike'
                                     && extension.config.name !== 'blockquote'
                                     && extension.config.name !== 'horizontalRule'
                                     && extension.config.name !== 'bulletList'
                                     && extension.config.name !== 'orderedList'
                                     && extension.config.name !== 'listItem'
                    ),
                    Table.configure({
                       resizable: true,
                    }),
                    TableRow,
                    TableCell,
                    TableHeader,
                    TextAlign,
                    AutoOutdent
                ],
                content: this.value,
                autofocus: true,
                editable: true,
                injectCSS: false,
            })

            this.editor.on('update', () => {
                this.$emit('input', this.editor.getHTML())
            })
        },

        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>
<style scoped>
    button,
    button.is-active {
        margin-right: 0.2rem;
        padding: 0.2rem 0.4rem 0.2rem 0.4rem;
    }
    button {

    }
    .is-active {
        border-radius: 5px;
        background: #555555;
        color: white;
    }
</style>
<style>
    button .v-icon svg {
        fill: #767676;
    }
    button.is-active svg {
        fill: white;
    }

</style>