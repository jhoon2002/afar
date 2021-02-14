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

    <v-app-bar app flat dark class="grey darken-1">
      <v-app-bar-nav-icon @click="show = !show"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <section-title></section-title>
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="grey darken-1">
      <v-container fluid>
        <v-scroll-x-transition>
          <router-view></router-view>
        </v-scroll-x-transition>
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