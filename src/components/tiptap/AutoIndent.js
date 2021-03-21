import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Count from '@/components/Count.vue'

export default Node.create({
    name: 'AutoIndent',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            positionX: {
                default: 10,
            },
        }
    },

    parseHTML() {
        return [
            {
                marginLeft: 'vue-component',
            },
        ]
    },

    renderHTML() {
        return { style: 'margin-left: 3'}
    },

    addNodeView() {
        return VueNodeViewRenderer(Count)
    },
})