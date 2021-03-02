<template>
    <v-card>
        <v-card-title>
            <div class="mr-7">수신자 지정</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-tabs v-model="tab">
            <v-tab key="1">대내</v-tab>
            <v-tab key="2">대외(문서24)</v-tab>
            <v-tab key="3">대외(직접입력)</v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-tabs-items v-model="tab">
            <v-tab-item key="1" style="height: 38rem">
                <v-row no-gutters>
                    <v-col cols="7">
                        <v-text-field
                                v-model="search"
                                label="검색"
                                clearable
                                prepend-inner-icon="mdi-magnify"
                                class="ml-7 mt-5"
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
                                    :items="$_DATA.organs"
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
                            <p class="text-h6">
                                선택 목록
                            </p>
                            <p class="error--text" v-if="!selection.length">
                                수신자를 선택하십시오.
                            </p>
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
                                        <span class="text-truncate">{{ node.name }}{{ node.nameBlank ? ' ' : '' }}{{ node.chief }}</span>
                                    </v-chip>
                                </template>
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
            </v-tab-item>
            <v-tab-item key="2" style="height: 38rem">

            </v-tab-item>
            <v-tab-item key="3" style="height: 38rem">
                <v-row no-gutters>
                    <v-col cols="7" class="pa-10">
                        <v-card flat>
                            <v-text-field label="수신자" v-model="inputReceiver"
                            >
                            </v-text-field>
                        </v-card>
                        <v-btn @click="pushData(inputReceiver)">추가</v-btn>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="4">
                        <template v-for="node in selection2">
                            <v-chip
                                    :key="node"
                                    class="ma-1"
                                    close
                                    color="secondary"
                                    text-color="white"
                                    @click:close="remove2(node, selection2)"
                            >
                                <span class="text-truncate">{{ node }}</span>
                            </v-chip>
                        </template>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>

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
                selection2: [],
                result: [],
                inputReceiver: "",
                leaf: false,
                tab: null,
                total: 1,
            }
        },
        methods: {
            remove(id, arr) {
                const itemToFind = arr.find( function(item) { return item.id === id})
                const idx = arr.indexOf(itemToFind)
                if (idx > -1) arr.splice(idx, 1)
            },
            remove2(id, arr) {
                const itemToFind = arr.find( function(item) { return item === id})
                const idx = arr.indexOf(itemToFind)
                if (idx > -1) arr.splice(idx, 1)
            },
            pushData(id) {
                const itemToFind = this.selection2.find( function(item) { return item === id})
                if (itemToFind == undefined) {
                    this.selection2.push(this.inputReceiver)
                }
            }
        },
        computed: {
            filter() {
                return this.caseSensitive
                    ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                    : undefined
            },
        },
        /*
        watch: {
            selection() {
                console.log("this.selection2", this.selection2)
            }
        }*/
    }
</script>