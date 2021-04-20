<template>
  <v-app>
    <v-navigation-drawer app dark :value="show" class="blue-grey darken-3">
      <v-sheet class="transparent text-center py-4">

        <v-icon size="35" class="d-block red--text j-rotation aaa">
          mdi-periodic-table
        </v-icon>

        <div class="text-h6 yellow--text text--lighten-3 text-uppercase font-weight-bold">administrator</div>
      </v-sheet>

      <v-sheet style="height: 8rem;" class="mt-2 blue-grey darken-2 rounded-1">

      </v-sheet>

      <v-sheet class="mt-10 ml-5 transparent" style="width: 13rem;">
        <global-menu :rts="routes"></global-menu>
      </v-sheet>
    </v-navigation-drawer>

    <v-app-bar app flat hide-on-scroll dark class="grey darken-2">
      <v-app-bar-nav-icon @click="show = !show"></v-app-bar-nav-icon>
      <div class="text-h6">
        <section-title></section-title>
      </div>
      <v-spacer></v-spacer>
      <v-sheet class="transparent">현재 권한:</v-sheet>
      <v-btn small
             dark
             elevation="0"
             class="blue ml-2"
             @click="$router.push( { name: '첫화면' } )"
      >
        LOGOUT
      </v-btn>
    </v-app-bar>

    <v-main class="grey darken-1">
      <v-container fluid class="pa-7">
          <router-view></router-view>
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
  export default {
    components: {
      GlobalMenu,
      SectionTitle
    },
    data: function () {
      return {
        show: true,
        routes: this.$router.options.routes,
      }
    }
  }
</script>