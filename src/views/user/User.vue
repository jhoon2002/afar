<template>
    <v-card>
        <plain-data
                title="사용자"
                data-id="user"
                :items-per-page="5"
                :headers="headers"
                :selectItems="selectItems"
                class="user-table"
        >
            <template v-slot:item.membership="{ }">
                <v-icon color="primary">mdi-card-account-details</v-icon>
            </template>
            <template v-slot:item.userId="{ item, view }">
                <span @click="view(item._id)" style="cursor: pointer">
                    {{ item.userId }}
                </span>
            </template>
            <template v-slot:item.cellphone="{ item }">
                {{ $util.cellphonePhase(item.cellphone) }}
            </template>
            <template v-slot:view="{ targetId, dialog, close }">
                <user-view :userId="targetId" :dialog="dialog" @close="close"></user-view>
            </template>
        </plain-data>
    </v-card>
</template>
<script>
    import PlainData from "@/components/PlainData.vue"
    import UserView from "@/components/UserView.vue"
    export default {
        components: {
            PlainData,
            UserView
        },
        data: function () {
            return {
                headers: [
                    {text: "No", align: "center", value: "No", sortable: false},
                    {text: "이름", align: "center", value: "name", sortable: true},
                    {text: "아이디 등록", align: "center", value: "membership", sortable: true},
                    {text: "아이디", align: "center", value: "userId", sortable: true},
                    {text: "휴대폰", align: "center", value: "cellphone", sortable: true},
                    {text: "이메일", align: "center", value: "email", sortable: true},
                    {text: "날짜", align: "center", value: "created", sortable: true}
                ],
                selectItems: [
                    { text: "아이디", value: "userId", default: true },
                    { text: "이름", value: "name" },
                    { text: "휴대폰", value: "cellphone" },
                    { text: "이메일", value: "email" }
                ],
                selected: []
            }
        }
    }
</script>
<style>
    .user-table table {
        border-collapse: collapse;
    }
    .user-table table td,
    .user-table table th {
        border-right: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
        border-top: 1px solid #dddddd;
    }
    /*.t-cell, .t-head {
        border: 1px solid #dddddd;
    }*/
</style>