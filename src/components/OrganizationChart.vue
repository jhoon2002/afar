<template>
    <v-container>
        <v-row no-gutters>
        <v-col cols="7">
            <v-text-field
                    v-if="search"
                    v-model="word"
                    label="검색"
                    clearable
                    prepend-inner-icon="mdi-magnify"
                    class="ml-7"
                    style="max-width: 20rem"
            ></v-text-field>
            <v-switch
                    v-if="leaf == 'option'"
                    class="ml-7"
                    dense
                    v-model="leafVal"
                    label="하위 전체 선택"
                    style="max-width: 10rem"
            >
                하위선택
            </v-switch>
            <v-card style="height: 30rem; overflow-y: auto;" elevation="0" class="px-5">
                <v-treeview
                        v-model="selection"
                        :items="items"
                        :search="word"
                        :filter="filter"
                        :selection-type="isleaf == true ? 'leaf' : 'independent'"
                        :item-disabled="isleaf == true ? false : 'locked'"
                        :selectable="selectable"
                        return-object
                        open-all
                        dense
                        activatable
                        :active.sync="active"
                ></v-treeview>
            </v-card>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="4">
            <v-sheet style="height: 30rem; overflow-y: auto;" elevation="0" class="pa-5">
                <template v-if="selectable">
                    <v-card-title>
                        선택 목록
                    </v-card-title>
                    <v-card-text>
                        {{selection}}
                    </v-card-text>
                </template>
                <template v-else>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">
                                    직책
                                </th>
                                <th class="text-left">
                                    이름
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="(node, index) in active[0].staffs"
                                    :key="index"
                                    @click="$emit('touched', node)"
                            >
                                <td>{{ node.role }}</td>
                                <td>{{ node.name }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-sheet>
        </v-col>
    </v-row>
    </v-container>
</template>
<script>
    export default {
        props: {
            "search": {
                type: Boolean,
                default: true
            },
            "folderonly": {
                type: Boolean,
                default: true
            },
            "leaf": {
                type: String,
                default: "option" //option/yes/no
            },
            "selectable": {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                word: "",
                leafVal: false,
                selection: [],
                items: [
                    {
                        id: 1,
                        name: "산학협력단",
                        staffs: [
                            {
                                role: "단장",
                                name: "이정민",
                                chief: true
                            },
                            {
                                role: "부단장",
                                name: "여종훈"
                            }
                        ],
                        children: [
                            {
                                id: 2,
                                name: "본부",
                                locked: true,
                                children: [
                                    {
                                        id: 3,
                                        name: "전략기획팀",
                                        staffs: [
                                            {
                                                role: "팀장",
                                                name: "마진욱",
                                                chief: true,
                                            },
                                            {
                                                role: "사원",
                                                name: "최형준"
                                            },
                                        ]
                                    },
                                    {
                                        id: 4,
                                        name: "사업운영팀",
                                        staffs: [
                                            {
                                                role: "팀장",
                                                name: "마진욱",
                                                chief: true,
                                            },
                                            {
                                                role: "사원",
                                                name: "이지혜"
                                            },
                                            {
                                                role: "사원",
                                                name: "이희경"
                                            },
                                            {
                                                role: "사원",
                                                name: "유창근"
                                            }
                                        ]
                                    },
                                    {
                                        id: 5,
                                        name: "총무관리팀",
                                        staffs: [
                                            {
                                                role: "팀장",
                                                name: "김소희",
                                                chief: true,
                                            },
                                            {
                                                role: "사원",
                                                name: "김예희"
                                            },
                                            {
                                                role: "사원",
                                                name: "이희경"
                                            },
                                        ],
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
                active: [],
            }
        },
        computed: {
            isLeaf() {
                if (this.leaf == "option") {
                    return this.leafVal
                }
                return this.leaf
            }
        }
    }
</script>