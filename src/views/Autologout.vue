<template>
    <v-app
            style="background: #868686"
    >
        <v-dialog
                v-model="dialog"
                attach
                autofocus
                max-width="30rem"
                width="30rem"
                @keydown.esc="$router.push('/')"
                @keydown.enter="$router.push('/')"
        >
            <v-card elevation="0">
                <v-card-title>
                    로그아웃
                    <v-spacer></v-spacer>
                    <v-btn
                            icon
                            @click="$router.push('/')"
                            style="margin-right: -0.5rem"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="py-8 text-body-1 text-center">
                    일정 시간 사용하지 않아 로그아웃 되었습니다.
                    <br/>
                    다시 로그인 하시기 바랍니다.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="secondary"
                            elevation="0"
                            outlined
                            class="text-body-1 mb-5"
                            style="padding-bottom: 2px"
                            @click="$router.push('/')"
                    >
                        확인
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>
<script>
    export default {
        data: function () {
            return {
                dialog: false
            }
        },
        methods: {
        },
        mounted() {
            // setTimeout( () => {this.dialog = true}, 330)  //318 이하이면 창이 안뜸
            this.dialog = true
        }
    }
</script>