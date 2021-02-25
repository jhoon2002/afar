<template>
    <v-row no-gutters>
        <v-col cols="7">
            <v-sheet outlined style="border-top: none; border-bottom: none; border-left: none">
                <v-text-field
                        v-if="search"
                        v-model="word"
                        label="검색"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                ></v-text-field>
                <v-switch
                        v-if="leaf == 'option'"
                        dense
                        v-model="leafVal"
                        label="하위 전체 선택"
                        style="max-width: 10rem"
                >
                    하위선택
                </v-switch>
                <v-card style="height: 30rem; overflow-y: auto;" elevation="0">
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
            </v-sheet>
        </v-col>
        <v-col cols="5">
            <v-sheet style="height: 30rem; overflow-y: auto; margin-top: 1px" elevation="0">
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
                                <th class="text-left">
                                    추가
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="(node, index) in active[0].staffs"
                                    :key="index"
                            >
                                <td>{{ node.role }}</td>
                                <td>{{ node.name }}</td>
                                <td>
                                    <v-btn icon title="추가">
                                        <v-icon @click="$emit('touched', node)">mdi-plus</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-sheet>
        </v-col>
    </v-row>
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
                        rank: 1,
                        name: "산학협력단",
                        nameBlank: false,
                        chief: "장",
                        staffs: [
                            {
                                id: 444,
                                rank: 1,
                                role: "단장",
                                name: "이정민",
                            },
                            {
                                id: 789,
                                rank: 2,
                                role: "부단장",
                                name: "여종훈"
                            }
                        ],
                        children: [
                            {
                                id: 2,
                                rank: 2,
                                name: "본부",
                                locked: true,
                                children: [
                                    {
                                        id: 3,
                                        rank: 1,
                                        name: "전략기획팀",
                                        chief: "장",
                                        staffs: [
                                            {
                                                id: 98,
                                                rank: 1,
                                                role: "팀장",
                                                name: "마진욱",
                                            },
                                            {
                                                id: 54,
                                                rank: 2,
                                                role: "사원",
                                                name: "최형준"
                                            },
                                        ]
                                    },
                                    {
                                        id: 4,
                                        rank: 2,
                                        name: "사업운영팀",
                                        chief: "장",
                                        staffs: [
                                            {
                                                id: 56,
                                                rank: 1,
                                                role: "팀장",
                                                name: "마진욱"
                                            },
                                            {
                                                id: 44,
                                                rank: 2,
                                                role: "사원",
                                                name: "이지혜"
                                            },
                                            {
                                                id: 23,
                                                rank: 3,
                                                role: "사원",
                                                name: "이희경"
                                            },
                                            {
                                                id: 99,
                                                rank: 4,
                                                role: "사원",
                                                name: "유창근"
                                            }
                                        ]
                                    },
                                    {
                                        id: 5,
                                        rank: 3,
                                        name: "총무관리팀",
                                        nameBlank: false,
                                        chief: "장",
                                        staffs: [
                                            {
                                                id: 65,
                                                rank: 1,
                                                role: "팀장",
                                                name: "김소희"
                                            },
                                            {
                                                id: 66,
                                                rank: 2,
                                                role: "사원",
                                                name: "김예희"
                                            },
                                            {
                                                id: 33,
                                                rank: 3,
                                                role: "사원",
                                                name: "이희경"
                                            },
                                        ],
                                    }
                                ]
                            },
                            {
                                id: 6,
                                rank: 2,
                                name: "사업단",
                                locked: true,
                                children: [
                                    {
                                        id: 7,
                                        rank: 1,
                                        fullName: "협력종합예술활동 운영 위탁용역",
                                        name: "2021 협력종합예술활동",
                                        nameBlank: true,
                                        chief: "연구책임자",
                                    },
                                    {
                                        id: 8,
                                        rank: 2,
                                        fullName: "2021 예술세상마을",
                                        name: "2021 예술세상마을",
                                        nameBlank: true,
                                        chief: "연구책임자"
                                    },
                                    {
                                        id: 9,
                                        rank: 3,
                                        fullName: "틱톡 영상콘텐츠 제작 및 홍보",
                                        name: "틱톡 영상콘텐츠",
                                        nameBlank: true,
                                        chief: "연구책임자",
                                    },
                                    {
                                        id: 10,
                                        rank: 4,
                                        fullName: "2025 국립중앙박물관 공간개편 기본구상 연구",
                                        name: "국립중앙박물관 공간개편",
                                        nameBlank: true,
                                        chief: "연구책임자"
                                    },
                                    {
                                        id: 11,
                                        rank: 5,
                                        fullName: "학교 융복합 문화예술교육 시범사업 운영 <융복합 문화예술교육 프로그램 연구 및 교과과정 연계 시범운영 실행> : 1년차",
                                        name: "학교 융복합 문화예술교육 시범사업",
                                        nameBlank: true,
                                        chief: "연구책임자"
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