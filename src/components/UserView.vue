<template>
    <v-dialog
            v-model="dialogOpen"
            width="500"
            scrollable
            @keydown.esc="$emit('close')"
            @click:outside="$emit('close')"
    >
        <v-card>
            <v-card-title class="grey lighten-2 pt-4 pb-0 pr-4 mb-5">
                <v-row no-gutters class="d-flex justify-space-between mb-3">
                    <div>
                        <span>{{user.name}}</span>
                        <span class="ml-3 text-caption" style="color: #777777">
                            <v-icon x-small color="grey">mdi-key-variant</v-icon>
                            {{user._id}}
                        </span>
                    </div>
                    <v-btn icon elevation="0" @click="$emit('close')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                항목
                            </th>
                            <th class="text-left">
                                내용
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>아이디</td>
                            <td>{{ user.userId }}</td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>{{ user.name }}</td>
                        </tr>
                        <tr>
                            <td>휴대폰</td>
                            <td>{{ $util.cellphonePhase(user.cellphone) }}</td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td>등록일시</td>
                            <td>{{ $moment(user.created).format("YYYY-MM-DD hh:mm:ss") }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        elevation="0"
                        @click="$emit('close')"
                        style="padding-bottom: 2px;"
                >
                    닫기
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import http from "@/apis/http"
    export default {
        name: "UserView",
        props: ["userId", "dialog"],
        components: {
        },
        data: function () {
            return {
                user: {},
                dialogOpen: false
            }
        },
        methods: {
            async load(id) {
                try {
                    let ret = await http.get("/api/users/" + id).catch(console.log)
                    this.user = ret.data.user
                } catch {
                    //
                }
                this.dialog = true
            }
        },
        watch: {
            dialog: {
                async handler (newVal) {
                    if (newVal === true) {
                        await this.load(this.userId)
                        this.dialogOpen = true
                    } else {
                        this.user = {}
                        this.dialogOpen = false
                    }
                }
            }
        }
    }
</script>