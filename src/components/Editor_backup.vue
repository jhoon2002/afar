<template>
    <v-sheet v-if="editor">
        <v-sheet>
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <v-icon>mdi-format-bold</v-icon>
            </button>
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
            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
                <v-icon>mdi-format-pilcrow</v-icon>
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
            <button @click="editor.chain().focus().undo().run()">
                <v-icon>mdi-undo</v-icon>
            </button>
            <button @click="editor.chain().focus().redo().run()">
                <v-icon>mdi-redo</v-icon>
            </button>


            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                <v-icon>mdi-table</v-icon>
            </button>

            <template>
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
                <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                    <v-icon>mdi-table-off</v-icon>
                </button>
                <button @click="editor.chain().focus().mergeCells().run()" :disabled="!editor.can().mergeCells()">
                    <v-icon>mdi-table-merge-cells</v-icon>
                </button>
                <button @click="editor.chain().focus().splitCell().run()" :disabled="!editor.can().splitCell()">
                    <v-icon>mdi-table-split-cell</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
                    <v-icon>mdi-table-column</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
                    <v-icon>mdi-table-row</v-icon>
                </button>
                <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
                    <v-icon>mdi-tab</v-icon>
                </button>
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
                <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                    <v-icon>mdi-format-align-left</v-icon>
                </button>
                <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                    <v-icon>mdi-format-align-center</v-icon>
                </button>
                <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    <v-icon>mdi-format-align-right</v-icon>
                </button>
                <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                    <v-icon>mdi-format-align-justify</v-icon>
                </button>

                <button @click="editor.chain().focus().setKoAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                    align-center
                </button>
                <button @click="editor.chain().focus().setKoAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                    align-right
                </button>
                <button @click="editor.chain().focus().setKoAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                    justify
                </button>
            </template>
        </v-sheet>

        <v-sheet class="mt-5">
            <editor-content :editor="editor"></editor-content>
        </v-sheet>

        <v-sheet>위치는: {{cursorPosition.left}}</v-sheet>

        <textarea border="1" cols="100%" rows="5" ref="aaa" class="pa-0" style="border: 1px solid blue">

        </textarea>
        <v-btn @click="getcursorPosition">위치확인</v-btn>
    </v-sheet>

</template>

<script>
    import { position } from 'caret-pos'
    import { Editor, EditorContent } from '@tiptap/vue-2'
    import { defaultExtensions } from '@tiptap/starter-kit'
    import Table from '@tiptap/extension-table'
    import TableRow from '@tiptap/extension-table-row'
    import TableCell from '@tiptap/extension-table-cell'
    import TableHeader from '@tiptap/extension-table-header'
    import TextAlign from '@tiptap/extension-text-align'

    import { Extension } from '@tiptap/core'

    const KoAlign = Extension.create({
        defaultOptions: {
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right', 'justify'],
            defaultAlignment: 'left',
        },
        addGlobalAttributes() {
            return [
                {
                    // Extend the following extensions
                    types: [
                        'heading',
                        'paragraph',
                    ],
                    // … with those attributes
                    attributes: {
                        textAlign: {
                            default: 'left',
                            renderHTML: attributes => ({
                                style: `text-align: ${attributes.textAlign}`,
                            }),
                            parseHTML: element => ({
                                textAlign: element.style.textAlign || 'left',
                            }),
                        },
                    },
                },
            ]
        },
        addCommands() {
            return {
                setKoAlign: (alignment) => ({ commands }) => {
                    if (!this.options.alignments.includes(alignment)) {
                        return false
                    }

                    return this.options.types.every(type => commands.updateNodeAttributes(type, { textAlign: alignment }))
                },
                unsetKoAlign: () => ({ commands }) => {
                    return this.options.types.every(type => commands.resetNodeAttributes(type, 'textAlign'))
                },
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
                editor: null,
                cursorPosition: {}
            }
        },
        methods: {
            getcursorPosition() {
                const input = this.$refs.aaa //document.querySelector('.foo');
                const pos = position(input); // { left: 15, top: 30, height: 20, pos: 15 }
                // const off = offset(input); // { left: 15, top: 30, height: 20 }
                this.cursorPosition = pos
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
                    ...defaultExtensions(),
                    Table.configure({
                       resizable: true,
                    }),
                    TableRow,
                    TableCell,
                    TableHeader,
                    TextAlign,
                    KoAlign
                ],
                content: this.value,
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


