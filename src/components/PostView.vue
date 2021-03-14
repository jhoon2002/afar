<template>
    <v-dialog
            v-model="dialogOpen"
            width="850"
            scrollable
            @keydown.esc="$emit('close')"
            @click:outside="$emit('close')"
    >
        <v-card>
            <v-card-title class="grey lighten-2 text-body-1 d-block">
                <v-row no-gutters>
                    <v-col>
                        <div style="font-size: 1.2rem">{{post.subject}}</div>
                        <v-sheet class="transparent mt-1">
                            <span class="text-body-2" v-html="this.$util.markWordInBoard(post.name, search.word, 'name', search.fields)"></span>
                            <span class="text-caption" v-html="'(' + this.$util.markWordInBoard(post.userId, search.word, 'userId', search.fields) + ')'"></span><span class="text-caption">  / {{$moment(post.created).format("YYYY-MM-DD hh:mm:ss")}}</span>
                        </v-sheet>
                    </v-col>
                    <v-col style="max-width: 3rem" class="text-right">
                        <v-icon @click="$emit('close')">mdi-close</v-icon>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text class="pa-5" style="min-height: 20rem">
                <div style="font-size:1rem; line-height: 200%; color: #555555"
                     v-html="this.$util.markWordInBoard(this.$util.htmlReturn(post.content), search.word, 'content', search.fields)"
                >
                </div>
                <v-sheet class="mt-10" v-if="post.comments && post.comments.length > 0">
                    <!--
                    <v-chip class="mb-2"
                            color="black"
                            label
                            small
                            text-color="white">Comments</v-chip>
                    -->
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs"
                                    v-on="on" class="mb-2 text-h4">mdi-comment-account-outline</v-icon>
                        </template>
                        <span>코멘트</span>
                    </v-tooltip>

                    <comment :items="post.comments" :offset=0></comment>
                </v-sheet>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        elevation="0"
                        @click="$emit('close')"
                >
                    닫기
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import Comment from "@/components/Comment.vue"
    export default {
        name: "PostView",
        props: ["postId", "search", "dialog"],
        components: {
            Comment
        },
        data: function () {
            return {
                post: {},
                dialogOpen: false
            }
        },
        methods: {
            async load(id) {
                let ret = await this.$axios.get("/api/posts/" + id).catch(console.log)
                console.log("ret", ret)
                this.post = ret.data
                this.dialog = true
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            dialog: {
                async handler (newVal) {
                    if (newVal === true) {
                        await this.load(this.postId)
                        this.dialogOpen = true
                    } else {
                        this.post = {}
                        this.dialogOpen = false
                    }
                }
            }
        }
    }
</script>