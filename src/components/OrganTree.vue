<template>
    <v-card>
        <v-card-title>
            <div class="mr-7">수신자 지정</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-container>
            <v-row no-gutters>
                <v-col cols="7">
                    <v-text-field
                            v-model="search"
                            label="검색"
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            class="ml-7"
                            style="max-width: 20rem"
                    ></v-text-field>
                    <v-switch
                            class="ml-7"
                            dense
                            v-model="leaf"
                            label="하위 전체 선택"
                            style="max-width: 10rem"
                    >
                        하위선택
                    </v-switch>
                    <v-card style="height: 30rem; overflow-y: auto;" elevation="0" class="px-5">
                        <v-treeview
                            v-model="selection"
                            :items="items"
                            :search="search"
                            :filter="filter"
                            :selection-type="leaf == true ? 'leaf' : 'independent'"
                            :item-disabled="leaf == true ? false : 'locked'"
                            selectable
                            return-object
                            open-all
                            dense
                    ></v-treeview>
                    </v-card>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="4">
                    <v-card style="height: 30rem; overflow-y: auto;" elevation="0" class="pa-5">
                        <v-card-title>
                            선택 목록
                        </v-card-title>
                        <template v-if="!selection.length">
                            선택 내역이 없습니다
                        </template>
                        <template v-else>
                            <template v-for="node in selection">
                                <v-chip
                                        :key="node.id"
                                        class="ma-1"
                                        close
                                        color="secondary"
                                        text-color="white"
                                        @click:close="remove(node.id, selection)"
                                >
                                    <span class="text-truncate">{{ node.name }} ({{ node.role }} {{ node.chief }})</span>
                                </v-chip>
                            </template>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
            <v-btn
                    color="error"
                    @click="$emit('close')"
                    dark
                    elevation="0"
                    class="my-5"
            >
                취소
            </v-btn>
            <v-btn
                    color="primary"
                    @click="$emit('send', selection)"
                    dark
                    elevation="0"
                    class="my-5 mr-5"
            >
                저장
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        data () {
            return {
                search: null,
                selection: [],
                items: [
                    {
                        id: 1,
                        name: '산학협력단',
                        chief: "이정민",
                        role: "단장",
                        children: [
                            {
                                id: 2,
                                name: "본부",
                                locked: true,
                                children: [
                                    {
                                        id: 3,
                                        name: "전략기획팀",
                                        chief: "마진욱",
                                        role: "팀장"
                                    },
                                    {
                                        id: 4,
                                        name: "사업운영팀",
                                        chief: "마진욱",
                                        role: "팀장"
                                    },
                                    {
                                        id: 5,
                                        name: "총무관리팀",
                                        chief: "김소희",
                                        role: "팀장"
                                    }
                                ]
                            },
                            {
                                id: 6,
                                name: "사업단",
                                locked: true,
                                children: [
                                    {
                                        id: 7,
                                        name: "협력종합예술활동 운영 위탁용역",
                                        chief: "최준호",
                                        role: "연구책임자"
                                    },
                                    {
                                        id: 8,
                                        name: "2021 예술세상마을",
                                        chief: "이동연",
                                        role: "연구책임자"
                                    },
                                    {
                                        id: 9,
                                        name: "틱톡 영상콘텐츠 제작 및 홍보",
                                        chief: "최준호",
                                        role: "연구책임자"
                                    },
                                    {
                                        id: 10,
                                        name: "2025 국립중앙박물관 공간개편 기본구상 연구",
                                        chief: "이강민",
                                        role: "연구책임자"
                                    },
                                    {
                                        id: 11,
                                        name: "학교 융복합 문화예술교육 시범사업 운영 <융복합 문화예술교육 프로그램 연구 및 교과과정 연계 시범운영 실행> : 1년차",
                                        chief: "전수환",
                                        role: "연구책임자"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                leaf: false
            }
        },
        methods: {
            remove(id, arr) {
                const itemToFind = arr.find( function(item) { return item.id === id})
                const idx = arr.indexOf(itemToFind)
                if (idx > -1) arr.splice(idx, 1)
            }
        },
        computed: {
            filter() {
                return this.caseSensitive
                    ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                    : undefined
            },
        }
    }
</script>