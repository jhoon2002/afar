<template>
    <v-app>
        <v-navigation-drawer
                app
                dark
                :value="show"
                :style="bg"
                @input="syncShow"
        >
            <v-card
                    flat
                    class="transparent py-6"
                    @click="$router.push('/Main')"
            >
                <!--
                <v-icon size="35" class="d-block red&#45;&#45;text j-rotation aaa">
                    mdi-periodic-table
                </v-icon>
                -->
                <!--<div class="text-h6 yellow&#45;&#45;text text&#45;&#45;lighten-3 text-uppercase font-weight-bold">산학협력단</div>-->

                <v-img
                        src="@/assets/kaco4.svg"
                        contain
                        height="25"
                ></v-img>

                <div
                        class="text-body-2 white--text lighten-3 text-center mt-3"
                >
                    한국예술종합학교 산학협력단
                </div>

            </v-card>

            <v-divider></v-divider>

            <div
                    flat
                    class="transparent px-6 py-4 d-flex"
            >
                <v-avatar
                        color="grey lighten-1"
                        size="56"
                        class="mt-1"
                >
                    <!--<v-icon large>ri-user-line</v-icon>-->
                    <img
                            :src="`${ $env.url + $store.state.user.faceURL }`"
                    />
                </v-avatar>

                <v-sheet
                        class="transparent ml-5"
                >
                    <div class="text-h6">
                        여종훈
                    </div>
                    <div>
                        처리할 결재
                        <v-badge
                                color="green"
                                content="6"
                                offset-x="-1"
                        >
                        </v-badge>
                    </div>
                    <div>
                        진행중
                        <v-badge
                                color="pink"
                                content="2"
                                offset-x="-1"
                        >
                        </v-badge>
                    </div>
                    <!--
                    <div>
                        쪽지함
                        <v-badge
                                color="orange darken-2"
                                content="13"
                                offset-x="-1"
                        >
                        </v-badge>
                    </div>
                    -->
                </v-sheet>
            </div>

            <v-divider></v-divider>

            <v-sheet class="mt-10 ml-5 transparent" style="width: 13rem;">
                <global-menu :rts="routes"></global-menu>
            </v-sheet>

            <v-card
                    flat
                    class="transparent text-center"
            >
                <v-btn
                        icon
                        x-small
                        @click="selectBg('#31596c')"
                >
                    <v-icon color="blue">mdi-checkbox-blank-circle</v-icon>
                </v-btn>
                <v-btn
                        icon
                        x-small
                        @click="selectBg('#7A3C54')"
                >
                    <v-icon color="red">mdi-checkbox-blank-circle</v-icon>
                </v-btn>
                <v-btn
                        icon
                        x-small
                        @click="selectBg('#2F664C')"
                >
                    <v-icon color="green">mdi-checkbox-blank-circle</v-icon>
                </v-btn>
                <v-btn
                        icon
                        x-small
                        @click="selectBg('#424242')"
                >
                    <v-icon color="grey">mdi-checkbox-blank-circle</v-icon>
                </v-btn>
                <v-btn
                        icon
                        x-small
                        @click="selectBg('#85582F')"
                >
                    <v-icon color="orange">mdi-checkbox-blank-circle</v-icon>
                </v-btn>

                <v-menu
                        :close-on-content-click="false"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                text
                                class="px-1"
                        >
                            Custom
                        </v-btn>
                    </template>
                    <v-color-picker
                            v-model="color"
                            dot-size="25"
                            swatches-max-height="200"
                            show-swatches
                            @input="selectBg"
                    ></v-color-picker>
                </v-menu>
            </v-card>
        </v-navigation-drawer>

        <v-app-bar app flat hide-on-scroll dark class="grey darken-2">
            <v-app-bar-nav-icon @click="show = !show"></v-app-bar-nav-icon>
            <div class="text-h6">
                <section-title></section-title>
            </div>
            <v-spacer></v-spacer>
            <!--<v-sheet class="transparent">현재 권한:</v-sheet>-->

            <v-btn
                    elevation="0"
                    color="primary"
                    small
                    @click="$router.push('/mypage')"
            >
                My page
            </v-btn>

            <v-btn small
                   color="blue"
                   elevation="0"
                   class="ml-2"
                   @click="logout"
            >
                Logout
            </v-btn>
        </v-app-bar>

        <v-main class="grey darken-1">
            <v-container fluid class="pa-7">
                <v-fade-transition hide-on-leave >
                    <router-view></router-view>
                </v-fade-transition>
            </v-container>
        </v-main>

        <v-footer app inset dark class="text-overline grey darken-2">
            <v-icon size="18" class="mr-1">mdi-copyright</v-icon>
            Korea National University of Arts K-Aco
        </v-footer>
    </v-app>
</template>
<script>
    import GlobalMenu from "@/components/GlobalMenu.vue"
    import SectionTitle from "@/components/SectionTitle.vue"
    import { logout } from "@/apis/access.js"
    export default {
        components: {
            GlobalMenu,
            SectionTitle
        },
        data: function () {
            return {
                show: true,
                routes: this.$router.options.routes,
                bg: {
                    backgroundColor: '#31596c'
                },
                color: "#31596c"
            }
        },
        methods: {
            logout() {
                logout()
                this.$router.push("/")
            },
            syncShow(e) {
                this.show = e
            },
            selectBg(color) {
                this.bg.backgroundColor = color
                this.color = color
            }
        },
        /*
        watch: {
            color(v) {
                this.bg.backgroundColor = v
            }
        }
        */
    }
</script>
<style scoped>
    .bg-blue {
        background-color: #0d47a1;
    }
    .bg-red {

    }
    .bg-grey {

    }
    .bg-green {

    }
    .bg-teal {

    }
</style>