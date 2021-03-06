<template>
    <v-data-table
            :headers="commentHeaders"
            hide-default-footer
            :items="items"
            :items-per-page="10"
            dense
    >
        <template v-slot:item.userId="{ item }">
            <p class="ma-0 pa-0 mt-2 text-body-2">{{ item.userId }}</p>
            <p class="ma-0 pa-0 mb-2 text-caption">{{ $moment(item.created).format('YYYY-MM-DD hh:mm:ss') }}</p>
        </template>
        <template v-slot:item.content="{ item }">
            <p class="my-2 pa-0">{{ item.content }}</p>
        </template>
    </v-data-table>
</template>
<script>
    export default {
        props: [
            "items"
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