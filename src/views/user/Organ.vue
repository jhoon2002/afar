<template>
    <v-card>
        <v-card-title>
            조직 관리
        </v-card-title>
        <v-sheet class="transparent px-6">
            <v-row class="d-block d-md-flex">
                <v-col cols="12" class="col-md-4">
                    <!--<TreeView :value="treeData" draggable droppable></TreeView>-->
                    <v-card elevation="0" class="px-2 pb-10">
                        <v-card-title class="pl-0">
                            조직
                        </v-card-title>

                        <drag-treeview
                                :value="$_DATA.organs"
                                search
                                draggable
                                droppable
                                style="margin-top: -1rem"
                        >
                            <template v-slot:default="{ node, index, path, tree }">
                                <v-card
                                        elevation="0"
                                        class="d-flex justify-space-between pa-1"
                                        :class="{ 'selectedNode': isSelected(node) }"
                                        @click="editNode(node)"
                                >
                                    <div>
                                        <v-icon class="drag-trigger">
                                            mdi-drag
                                        </v-icon>
                                        <v-icon
                                                small
                                                v-if="node.$folded && node.children && node.children.length > 0"
                                                @click="tree.toggleFold(node, path)"
                                        >
                                            ri-add-line
                                        </v-icon>
                                        <v-icon
                                                small
                                                v-if="!node.$folded && node.children && node.children.length > 0"
                                                @click="tree.toggleFold(node, path)"
                                        >
                                            ri-subtract-line
                                        </v-icon>

                                        {{ node.text }}
                                    </div>
                                    <div>
                                        <v-btn
                                                x-small
                                                icon
                                                @click="() => tree.removeNodeByPath(path)"
                                        >
                                            <v-icon>ri-delete-bin-line</v-icon>
                                        </v-btn>
                                        <v-btn
                                                x-small
                                                icon
                                                @click="() => hideNode(node)"
                                        >
                                            <v-icon>ri-loader-line</v-icon>
                                        </v-btn>
                                    </div>
                                </v-card>
                            </template>

                        </drag-treeview>

                    </v-card>
                </v-col>
                <v-col cols="12" class="col-md-3">
                    <!--
                    <json-viewer
                            :value="treeData"
                            :expand-depth=10
                    ></json-viewer>
                    -->
                    <v-slide-x-transition>
                        <v-card elevation="0" class="px-2 pb-10" v-if="selectedNode.text">
                            <v-card-title class="pl-0">
                                부서
                                <v-menu
                                        v-model="organAddMenu"
                                        :close-on-content-click="false"
                                        :nudge-width="300"
                                        offset-x
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-plus-circle-outline</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card class="pa-4">
                                        <v-card-title class="pa-0">
                                            부서 생성
                                        </v-card-title>

                                        <v-card-text class="pl-0 mt-3">
                                            선택된 <b>"{{ selectedNode.text }}"</b>의 아래에 부서을 생성합니다.
                                        </v-card-text>

                                        <v-text-field
                                                hide-details
                                                outlined
                                                dense
                                                label="사용 명칭"
                                                autofocus
                                                v-model="organText"
                                                class="mt-5"
                                        ></v-text-field>

                                        <v-card-actions class="mt-5 pa-0">
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                    text
                                                    class="mr-0"
                                                    @click="organAddMenu = false"
                                            >
                                                취소
                                            </v-btn>
                                            <v-btn
                                                    color="primary"
                                                    text
                                                    class="mx-0"
                                                    @click="addOrgan"
                                            >
                                                추가
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </v-card-title>
                            <validation-observer
                                    ref="observer1"
                                    v-slot="{ }"
                            >
                                <validation-provider name="사용 명칭" :rules="{ required: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="사용 명칭" v-model="selectedNode.text"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>

                                <validation-provider name="고유 명칭" :rules="{ }" v-slot="{ errors, valid }">
                                    <v-text-field label="고유 명칭" v-model="selectedNode.fulltext"
                                                  :error-messages="errors" :success="valid"
                                    ></v-text-field>
                                </validation-provider>

                                <v-row>
                                    <v-col cols="6">
                                        <validation-provider name="부서장 명칭" :rules="{ }" v-slot="{ errors, valid }">
                                            <v-text-field label="부서장 명칭" v-model="selectedNode.chief"
                                                          :error-messages="errors" :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-switch
                                                v-model="selectedNode.blank"
                                                label="띄어쓰기"
                                        ></v-switch>
                                    </v-col>
                                </v-row>
                                <div style="margin: -2rem 0 0 4rem">
                                    ({{ selectedNode.text }}{{ selectedNode.blank ? " " : "" }}{{ selectedNode.chief }})
                                </div>
                            </validation-observer>
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
                <v-col cols="12" class="col-md-3">
                    <v-slide-x-transition>
                        <v-card elevation="0" class="px-2 pb-10" v-if="selectedNode.text">
                            <v-card-title class="pl-0">
                                구성원
                                <v-menu
                                        v-model="staffAdd"
                                        :close-on-content-click="false"
                                        :nudge-width="300"
                                        offset-x
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-plus-circle-outline</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card class="pa-4">
                                        <v-card-title class="pa-0">
                                            구성원 추가
                                        </v-card-title>

                                        <v-sheet class="pa-4">
                                            <validation-observer
                                                    ref="observer2"
                                                    v-slot="{ }"
                                            >
                                                <v-row no-gutters class="d-flex">
                                                    <validation-provider name="직책" :rules="{ required: true }" v-slot="{ errors, valid }">
                                                        <v-select label="직책" v-model="role1"
                                                                  :items="['연구책임자', '팀장', '공동연구자', '보조연구원', '연구원', '행정원', '행정원보조', '직접 입력']"
                                                                  :error-messages="errors" :success="valid"
                                                                  style="max-width: 7rem"
                                                                  @input="checkSelect"
                                                        ></v-select>
                                                    </validation-provider>
                                                    <validation-provider name="직책" :rules="{ required: true }" v-slot="{ errors, valid }" v-if="isAddRole">
                                                        <v-text-field
                                                                v-if="isAddRole"
                                                                name="직책"
                                                                v-model="role2"
                                                                :error-messages="errors" :success="valid"
                                                                class="ml-4"
                                                                style="max-width: 7rem"
                                                        ></v-text-field>
                                                    </validation-provider>
                                                </v-row>
                                                <validation-provider name="이름" :rules="{ required: true }" v-slot="{ errors, valid }">
                                                    <v-text-field label="이름" v-model="staffName"
                                                                  :error-messages="errors" :success="valid"
                                                                  style="max-width: 15rem"
                                                    ></v-text-field>
                                                </validation-provider>
                                            </validation-observer>
                                        </v-sheet>

                                        <v-card-actions class="mt-5 pa-0">
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                    text
                                                    class="mr-0"
                                                    @click="cancel"
                                            >
                                                취소
                                            </v-btn>
                                            <v-btn
                                                    color="primary"
                                                    text
                                                    class="mx-0"
                                                    @click="addStaff"
                                            >
                                                추가
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </v-card-title>

                            <v-slide-x-transition>
                                <drag-treeview
                                        v-if="selectedNode.staffs"
                                        :value="selectedNode.staffs"
                                        draggable
                                        droppable
                                >
                                    <template v-slot:default="{ node }">
                                        <v-card
                                                elevation="0"
                                                class="d-flex justify-space-between pa-1"
                                                :class="{ 'selectedNode': isSelected(node) }"
                                                @click="editNode(node)"
                                        >
                                            <div>
                                                <v-icon class="drag-trigger">
                                                    mdi-drag
                                                </v-icon>
                                                <v-icon
                                                        small
                                                        v-if="node.$folded && node.children && node.children.length > 0"
                                                        @click="tree.toggleFold(node, path)"
                                                >
                                                    ri-add-line
                                                </v-icon>
                                                <v-icon
                                                        small
                                                        v-if="!node.$folded && node.children && node.children.length > 0"
                                                        @click="tree.toggleFold(node, path)"
                                                >
                                                    ri-subtract-line
                                                </v-icon>
                                                <div style="width: 7rem; display: inline-block; line-height:0.5; padding-left: 0.5rem">
                                                    {{ node.role }}
                                                </div>
                                                <div style="display: inline-block">
                                                    {{ node.name }}
                                                </div>
                                            </div>
                                            <div>
                                                <v-btn
                                                        x-small
                                                        icon
                                                        @click="() => tree.removeNodeByPath(path)"
                                                >
                                                    <v-icon>ri-delete-bin-line</v-icon>
                                                </v-btn>
                                                <v-btn
                                                        x-small
                                                        icon
                                                        @click="() => hideNode(node)"
                                                >
                                                    <v-icon>ri-loader-line</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-card>
                                    </template>
                                </drag-treeview>
                            </v-slide-x-transition>

                            <!--
                            <drag-treeview

                            >
                            </drag-treeview>
                            -->
                            <!--
                            <v-simple-table style="margin-top: -0.2rem">
                                <thead>
                                    <tr>
                                        <th>직책</th>
                                        <th>이름</th>
                                        <th class="text-left">기타</th>
                                    </tr>
                                </thead>
                                <tbody v-if="selectedNode.staffs">
                                    <tr v-for="staff in selectedNode.staffs" :key="staff">
                                        <td>{{ staff.role }}</td>
                                        <td>{{ staff.name }}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="3" class="text-center py-8">
                                            자료가 없습니다.
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            -->
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
                <v-col cols="12" class="col-md-2 d-flex justify-center align-center">
                    <v-icon class="ml-3">ri-arrow-right-fill</v-icon>
                    <v-btn class="ml-3" elevation="0" style="width: 5rem; height: 15rem; border: 2px dotted grey">
                        저장
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </v-card>
</template>
<script>
    import DragTreeview from "@/components/DragTreeview.vue"
    // import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            DragTreeview,
            // JsonViewer
        },
        data: function () {
            return {
                selectedNode: {},
                staffAdd: false,
                searchWord: "",
                organText: "",
                organAdd: false,
                organAddMenu: false,
                isAddRole:false,
                staffUserId: "",
                staffName: "",
                role1: "",
                role2: ""
            }
        },
        computed: {
            treeData() {
                return this.$_DATA.organs
            }
        },
        methods: {
            isSelected: function(node) {
                if (this.selectedNode.text === node.text) {
                    return true
                }
                return false
            },
            editNode(node) {
                this.selectedNode = node
            },
            addOrgan() {
                // this.$_DATA.organs.push({ text: "신규 부서" })
                // console.log(this.selectedNode)
                // if ( !this.selectedNode.children ) {
                //     this.selectedNode.children = []
                // }

                if (!this.selectedNode.children) {
                    this.$set(this.selectedNode, 'children', [])
                    this.$set(this.selectedNode.children, 0, { text: this.organText })
                } else {
                    this.selectedNode.children.unshift({ text: this.organText })
                }
                this.organText = ""
                this.organAddMenu = false
            },
            checkSelect(e) {
                if (e === '직접 입력') {
                    this.isAddRole = true
                    return
                }
                this.isAddRole = false
                return
            },
            cancel() {
                this.role1 = ""
                this.role2 = ""
                this.staffName = ""
                this.$refs.observer2.reset()
                this.staffAdd = false
            },
            addStaff() {
                this.selectedNode.staffs.push({
                    userId: this.staffUserId,
                    name: this.staffName,
                    role: this.role1
                })
                this.staffAdd = false
            }
        },
        mounted() {
            this.selectedNode = this.$_DATA.organs[0]
        }
    }
</script>
<style>
    .he-tree .tree-node {
        padding: 0;
        border: 0;
    }
    .he-tree .tree-node .v-card.selectedNode {
        border: 1px solid black;
        background: lightyellow;
    }
    .he-tree .tree-node .v-card {
        border: 1px solid #bbbbbb;
    }
</style>