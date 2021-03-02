<template>
    <v-row no-gutters>
        <v-col cols="7">
            <v-sheet outlined class="pt-5" style="border-top: none; border-bottom: none; border-left: none">
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
                            :items="$_DATA.organs"
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
            <v-sheet class="pt-5" style="height: 30rem; overflow-y: auto; margin-top: 1px" elevation="0">
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