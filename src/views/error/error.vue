<template>
    <v-card>
        <v-card-title>
            접근 권한 없음
        </v-card-title>
        <v-card-subtitle class="text-body-2">
            현재 권한: {{$acl.get}}
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
            권한이 필요합니다. 현재 권한을 확인하고 필요한 권한을 얻은 후 접근하시기 바랍니다.
            <br/>
            <br/>
            <br/>
            <br/>
        </v-card-text>
    </v-card>
</template>