<template>
    <v-card>
        <plain-data
                title="사용자"
                data-id="user"
                :items-per-page="5"
                :headers="headers"
                :selectItems="selectItems"
        >
            <template v-slot:item.userId="{ item }">
                {{item.userId}}
            </template>
            <template v-slot:item.membership="{ }">
                <v-icon color="primary">mdi-card-account-details</v-icon>
            </template>
            <template v-slot:item.userId="{ item, view }">
                <span @click="view(item._id)" style="cursor: pointer">
                    {{item.userId}}
                </span>
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
                    {text: "아이디 등록", align: "left", value: "membership", sortable: true},
                    {text: "아이디", align: "left", value: "userId", sortable: true},
                    {text: "이름", align: "left", value: "name", sortable: true},
                    {text: "휴대폰", align: "left", value: "cellphone", sortable: true},
                    {text: "이메일", align: "left", value: "email", sortable: true},
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
