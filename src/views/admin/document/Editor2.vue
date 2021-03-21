<template>
    <v-card class="pa-10">

        <editor2 v-model="content" />

        <v-sheet class="content">
            <h3>Content</h3>
            <v-sheet>{{ content }}</v-sheet>
        </v-sheet>
    </v-card>
</template>

<script>
    import Editor2 from '@/components/Editor2.vue'

    export default {
        components: {
            Editor2,
        },

        data() {
            return {
                content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
            }
        },
    }
</script>