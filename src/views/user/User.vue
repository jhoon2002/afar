<template>
    <v-card>
        <plain-data
                title="사용자"
                data-id="user"
                :items-per-page="10"
                :headers="headers"
                :selectItems="selectItems"
                class="user-table"
        >
            <template v-slot:item.name="{ item, view }">
                <span @click="view(item._id)" style="cursor: pointer">
                    <a class="px-2 py-1">{{ item.name }}</a>
                </span>
            </template>
            <template v-slot:item.membership="{ }">
                <v-icon color="primary">mdi-card-account-details</v-icon>
            </template>
            <template v-slot:item.userId="{ item, view }">
                <span @click="view(item._id)" style="cursor: pointer">
                    <a class="px-2 py-1">{{ item.userId }}</a>
                </span>
            </template>
            <template v-slot:item.cellphone="{ item }">
                {{ $util.toCellphone(item.cellphone) }}
            </template>
            <template v-slot:view="{ targetId, dialog, close }">
                <user-view :userId="targetId" :dialog="dialog" @close="close"></user-view>
            </template>
            <template v-slot:create="{ dialog, close }">
                <user-create :dialog="dialog" @close="close"></user-create>
            </template>
            <template v-slot:buttons="{ openCreate }">
                <v-btn
                        class="justify-end" color="primary"
                        dark elevation="0" @click="openCreate"
                        style="padding-bottom: 2px"
                >
                    등록
                </v-btn>
            </template>
        </plain-data>
    </v-card>
</template>
<script>
    import PlainData from "@/components/PlainData.vue"
    import UserView from "@/components/UserView.vue"
    import UserCreate from "@/components/UserCreate.vue"
    export default {
        components: {
            PlainData,
            UserView,
            UserCreate
        },
        data: function () {
            return {
                headers: [
                    {text: "No", align: "center", value: "No", sortable: false},
                    {text: "이름", align: "left", value: "name", sortable: true},
                    // {text: "아이디 등록", align: "center", value: "membership", sortable: true},
                    {text: "아이디", align: "left", value: "userId", sortable: true},
                    {text: "휴대폰", align: "left", value: "cellphone", sortable: true},
                    {text: "이메일", align: "left", value: "email", sortable: true},
                    {text: "등록일", align: "center", value: "created", sortable: true}
                ],
                selectItems: [
                    { text: "아이디", value: "userId", default: true },
                    { text: "이름", value: "name", default: true },
                    { text: "휴대폰", value: "cellphone", default: true },
                    { text: "이메일", value: "email", default: true }
                ],
                selected: []
            }
        },
        methods: {

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
    a:hover, a:visited, a:active, a:link {
        /*text-decoration: underline;*/
        background: #2279d2;
        border-radius: 5px;
        color: white;
        transition: all 0.3s;
    }
    /*.t-cell, .t-head {
        border: 1px solid #dddddd;
    }*/
    .v-btn {
        padding-bottom: 2px;
    }
</style>