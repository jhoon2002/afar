<template>
    <v-card>
        <board
                title="자유게시판"
                board-id="free"
                :items-per-page="5"
        >
        </board>
    </v-card>
</template>
<script>
    import Board from "@/components/Board.vue"
    export default {
        components: {
            Board
        },
        data: function () {
            return {
                headers: [
                    {text: "No", align: "center", sortable: false, value: "No"},
                    {text: "제목", value: "subject"},
                    {text: "이름", align: "center", value: "name", sortable: true,},
                    {text: "날짜", align: "center", value: "created"},
                    {text: "조회", align: "center", value: "hit", sortable: true,}
                ],
            }
        }
    }
</script>
