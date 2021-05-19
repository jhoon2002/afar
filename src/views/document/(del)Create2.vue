<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">

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
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.alignment({ align: 'left' })"
                >
                    <icon name="mdi-format-align-left"></icon>
                </button>


                <v-btn plain small
                       type="button"
                       class="menubar__button"
                       :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                       @click="commands.alignment({ align: 'center' })"
                >
                    <v-icon>mdi-format-align-center</v-icon>
                </v-btn>


            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
    import Icon from '@/components/Icon/index.vue'
    import Alignment from '@/Alignment2'
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
    } from 'tiptap-extensions'
    export default {
        components: {
            EditorContent,
            EditorMenuBar,
            Icon,
        },
        data() {
            return {
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
                        new Alignment()
                    ],
                    content: `
          <h2>
            Trailing Paragraph
          </h2>
          <p>
            In this demo we force to render a paragraph at the end of the document. This can be useful in some situations, for example after adding images.
          </p>
          <pre><code>Also, sometimes it's hard to remember to type \`cmd/ctrl + enter\` to leave a code block.</code></pre>
        `,
                }),
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>