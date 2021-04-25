<template>
    <div class="content">
        <div>{{this.$route.matched[this.$route.matched.length-1].name}}</div>
        <v-sheet style="height: 45rem" outlined rounded="lg" class="blue lighten-5 pa-2">
            내용을 넣으세요.
            <v-btn @click="gotofirst">쿠키 삭제 후 첫화면으로 가기</v-btn>
        </v-sheet>
    </div>
</template>
<script>
    import VueCookies from "vue-cookies"
    export default {
        methods: {
            gotofirst() {
                VueCookies.remove("token")
                this.$router.push("/")
            }
        }
    }
</script>