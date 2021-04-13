<template>
    <v-app>
        <v-container fluid>
            <v-sheet class="logo transparent" style="width: 10rem">
                <span class="stress">K</span>orea
                National
                University
                of <span class="stress">Arts</span>

                Industry
                <span class="stress">A</span>cademy
                <span class="stress">Co</span>operation
                Foundation
            </v-sheet>
            <div style="position: absolute; left: 0; top: 0; display: none">
                <div class="logo-ko" style="font-size: 5rem; left: 12rem; top: 3rem;">한</div>
                <div class="logo-ko" style="font-size: 3.5rem; left: 15rem; top: 8rem;">국</div>
                <div class="logo-ko" style="font-size: 4rem; left: 20rem; top: 5rem;">예</div>
                <div class="logo-ko" style="font-size: 3rem; left: 20rem; top: 9rem;">술</div>
                <div class="logo-ko" style="font-size: 6rem; left: 15rem; top: 11rem;">종</div>
                <div class="logo-ko" style="font-size: 4.5rem; left: 20rem; top: 15rem;">합</div>
                <div class="logo-ko" style="font-size: 4rem; left: 18rem; top: 19rem;">학</div>
                <div class="logo-ko" style="font-size: 4.5rem; left: 18rem; top: 22.5rem;">교</div>
            </div>
            <div style="position: absolute; left: 13rem; top: 5rem; display: none">
                <div class="logo-ko" style="font-size: 5rem; left: 12rem; top: 3rem;">산</div>
                <div class="logo-ko" style="font-size: 3.5rem; left: 15rem; top: 8rem;">학</div>
                <div class="logo-ko" style="font-size: 4rem; left: 14rem; top: 11rem;">협</div>
                <div class="logo-ko" style="font-size: 3rem; left: 13rem; top: 15rem;">력</div>
                <div class="logo-ko" style="font-size: 3.5rem; left: 14rem; top: 18rem;">단</div>
            </div>
            <div style="position: absolute; right: 10rem; top: 10rem; width: 20rem;">
                <v-text-field
                        label="아이디"
                        autofocus
                >
                </v-text-field>
                <v-text-field
                        label="암호"
                >
                </v-text-field>
                <v-btn
                        outlined
                        class="mt-8"
                >
                    확인
                </v-btn>
            </div>
        </v-container>
    </v-app>
</template>
<style scoped>
    .logo {
        font-family: 'Inconsolata', monospace;
        font-size: 2.5rem;
    }
    .logo-ko {
        font-family: 'RIDIBatang';
        position: absolute;
    }
    .stress {
        color: white;
        background: black;
        border-radius: 0.4rem;
        padding: 0 0.4rem 0 0.4rem;
    }
</style>