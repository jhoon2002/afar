<template>
    <v-dialog
            v-model="dialogOpen"
            width="500"
            scrollable
            @keydown.esc="$emit('close')"
            @click:outside="$emit('close')"
    >
        <v-card>
            <v-card-title>
                <v-row no-gutters class="d-flex justify-space-between">
                    <span class="">{{user.name}}</span>
                    <span class="text-caption">
                        <v-icon x-small>mdi-key-variant</v-icon>
                        {{user._id}}
                    </span>
                </v-row>
            </v-card-title>
            <v-card-subtitle>{{user.userId}}</v-card-subtitle>
            <v-card-text>

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