<template>
    <v-card class="pa-10">

        <tiptap v-model="content" />

        <v-sheet class="content">
            <h3>Content</h3>
            <v-sheet>{{ content }}</v-sheet>
        </v-sheet>
    </v-card>
</template>

<script>
    import Tiptap from '@/components/Tiptap.vue'

    export default {
        components: {
            Tiptap,
        },

        data() {
            return {
                content: '',
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    /* Basic editor styles */
    .ProseMirror {
        margin: 0;
        min-height: 20rem;

        > * + * {
            margin-top: 0.75em;
        }

        p {
            margin-top: 0;
            margin-bottom: 0;
        }

        ul,
        ol {
            padding: 0 1rem;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            line-height: 1.1;
        }

        code {
            background-color: rgba(#616161, 0.1);
            color: #616161;
        }

        pre {
            background: #0D0D0D;
            color: #FFF;
            font-family: 'JetBrainsMono', monospace;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;

            code {
                color: inherit;
                background: none;
                font-size: 0.8rem;
            }
        }

        img {
            max-width: 100%;
            height: auto;
        }

        blockquote {
            padding-left: 1rem;
            border-left: 2px solid rgba(#0D0D0D, 0.1);
        }

        hr {
            border: none;
            border-top: 2px solid rgba(#0D0D0D, 0.1);
            margin: 2rem 0;
        }
    }

    /* Table-specific styling */
    .ProseMirror {
        table {
            border-collapse: collapse;
            table-layout: fixed;
            /*width: 10rem;*/
            margin: 0;
            overflow: hidden;

            td,
            th {
                /*min-width: 1em;*/
                /*width: 10rem;*/
                border: 1px solid grey;
                padding: 3px 5px;
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