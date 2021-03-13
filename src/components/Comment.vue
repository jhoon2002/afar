<template>
    <v-sheet>
        <v-card v-for="(comment, index) in items" :key="index" elevation="0">
            <v-divider></v-divider>
            <v-sheet :class="`ml-`+ (offset <= 1 ? 0 : (offset - 1) * 3)">
                <v-row no-gutters>
                    <v-col v-if="offset > 0" align-self="center" style="max-width: 2rem">
                        <v-icon
                                class="text-body-1 j-rotate-180"
                        >
                            mdi-reply
                        </v-icon>
                    </v-col>
                    <v-col align-self="center" class="py-5" style="max-width: 8rem">
                        <p class="ma-0 pa-0 text-body-2">
                            {{ comment.name }}
                        </p>
                        <p class="ma-0 pa-0 text-caption">
                            {{ $moment(comment.created).format('YYYY-MM-DD hh:mm') }}
                        </p>
                    </v-col>
                    <v-col align-self="center" class="py-5">
                        <div v-html="comment.content.replace(/\n/g, '<br/>')"></div>
                    </v-col>
                </v-row>
            </v-sheet>
            <comment :items="comment.comments" :offset="offset + 1"></comment>
        </v-card>
    </v-sheet>
</template>
<script>
    export default {
        name: "Comment", //name을 표기하면 self component는 import 없어도 사용 가능
        components: {
        },
        props: [
            "items",
            "offset",
        ],
        data() {
            return {
                commentHeaders: [
                    {text: 'Comments', sortable: false, value: 'userId', width: 150},
                    {text: '', sortable: false, value: 'content'},
                ],
            }
        }
    }
</script>