<template>
    <v-sheet>
        <v-card v-for="(item, index) in items" :key="index" elevation="0">
            <v-divider></v-divider>
            <v-sheet :class="`ml-`+ offset*3">
                <v-row no-gutters>
                    <v-col v-if="offset > 0" align-self="center" style="max-width: 2rem">
                        <v-icon class="text-body-1 j-rotate-180">mdi-reply</v-icon>
                    </v-col>
                    <v-col align-self="center" class="py-5" style="max-width: 8rem">
                        <p class="ma-0 pa-0 text-body-2">{{ names[item.userId] }}</p>
                        <p class="ma-0 pa-0 text-caption">{{ $moment(item.created).format('YYYY-MM-DD hh:mm') }}</p>
                    </v-col>
                    <v-col align-self="center" class="py-5">
                        {{item.content}}
                    </v-col>
                </v-row>
            </v-sheet>
            <comment :items="item.comments" :offset="offset + 1" :names="names"></comment>
        </v-card>
    </v-sheet>
</template>
<script>
    export default {
        name: "Comment",
        components: {
        },
        props: [
            "items",
            "offset",
            "names"
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