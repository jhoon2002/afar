<template>
    <v-card>
        <v-card-title>
            조직
        </v-card-title>
        <v-sheet class="transparent px-6">
            <v-row>
                <v-col cols="4">
                    <v-card elevation="0" class="px-2 pb-10">
                        <v-card-title class="pl-0">
                            조직도 <v-btn icon><v-icon>mdi-plus-circle-outline</v-icon></v-btn>
                        </v-card-title>
                        <v-text-field
                                hide-details
                                v-model="searchWord"
                                @keyup="search"
                                placeholder="Search"
                        ></v-text-field>

                        <v-treeview
                                :items="list"
                                item-key="text"
                                item-text="text"
                                item-children="children"
                                :open.sync="open"
                                activatable
                                color="warning"
                                dense
                                transition
                                return-object
                                open-all
                        >
                            <template v-slot:label="{ item }">
                                <div id="item.id" >{{item.text}}</div>
                            </template>
                        </v-treeview>

                        <json-viewer
                                :value="list"
                                :expand-depth=10
                        ></json-viewer>
                    </v-card>
                </v-col>
                <v-col cols="4">
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
                            </v-card-title>
                            <validation-observer
                                    ref="observer"
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
                                        <validation-provider name="부서장 명칭" :rules="{ required: true }" v-slot="{ errors, valid }">
                                            <v-text-field label="부서장 명칭" v-model="selectedNode.chief"
                                                          :error-messages="errors" :success="valid"
                                            ></v-text-field>
                                        </validation-provider>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-switch
                                                v-model="selectedNode.blank"
                                                label="부서장 명칭 띄어쓰기"
                                        ></v-switch>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -3rem;">
                                    <v-col cols="6"></v-col>
                                    <v-col cols="6" class="text-center">
                                        ({{ selectedNode.text }}{{ selectedNode.blank ? " " : "" }}{{ selectedNode.chief }})
                                    </v-col>
                                </v-row>
                            </validation-observer>
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
                <v-col cols="4">
                    <v-slide-x-transition>
                        <v-card elevation="0" class="px-2 pb-10" v-if="selectedNode.text">
                            <v-card-title class="pl-0">
                                구성원 <v-btn icon @click="staffAdd=true"><v-icon>mdi-plus-circle-outline</v-icon></v-btn>
                            </v-card-title>
                            <v-simple-table>
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
                            <v-sheet v-if="staffAdd" class="d-flex pa-4 rounded v-sheet--outlined justify-center">
                                <validation-provider name="직책" :rules="{ required: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="직책" v-model="role"
                                                  :error-messages="errors" :success="valid" style="max-width: 7rem"
                                    ></v-text-field>
                                </validation-provider>
                                <validation-provider name="이름" :rules="{ required: true }" v-slot="{ errors, valid }">
                                    <v-text-field label="이름" v-model="name"
                                                  :error-messages="errors" :success="valid" class="ml-4"
                                    ></v-text-field>
                                </validation-provider>
                                <v-btn elevation="0" class="primary mt-5 ml-2" small>
                                    확인
                                </v-btn>
                            </v-sheet>
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
            </v-row>
        </v-sheet>
    </v-card>
</template>
<script>
    // import DragNested from "@/components/DragNested.vue"
    // import draggable from "vuedraggable"
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            // DragNested,
            // draggable,
            JsonViewer
        },
        data: function () {
            return {
                list: this.$_DATA.organs,
                selectedNode: {},
                staffAdd: false,
                searchWord: "",
                active: [],
                open: [],
                users: [],
                selectedItems: [],
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                }
            },
            selected() {
                if (!this.active.length) return undefined
                return this.active[0];
            },
        },
        methods: {
            hideNode(node) {
                this.$set(node, '$hidden', true)
            },
            editNode(node) {
                this.selectedNode = node
            },
            search() {
                // const value = e.target.value || ''
                this.walkTreeData((node) => {
                    // const regex = new RegExp(this.searchWord)
                    // // console.log(regex, node.text, regex.test(node.text))
                    // this.$set(node, '$hidden', !regex.test(node.text))
                    console.log(node.text, this.searchWord, node.text.includes(this.searchWord))
                    this.$set(node, '$hidden', !node.text.includes(this.searchWord))
                })
            },
            findTreeItem: function (items, id) {
                if (!items) {
                    return;
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    // Test current object
                    if (item.Id === id) {
                        return item;
                    }
                    // Test children recursively
                    const child = this.findTreeItem(item.Children, id);
                    if (child) {
                        return child;
                    }
                }
            },
            checkStart: function (evt) {
                var self = this;
                self.active = [];
                self.active.push(self.findTreeItem(self.users, evt.from.id))
            },
            checkEnd: function (evt) {
                var self = this;
                var itemSelected = self.active[0];
                var fromParent = itemSelected.ParentId ? self.findTreeItem(self.users, itemSelected.ParentId) : null;
                var toParent = self.findTreeItem(self.users, evt.to.id);
                var objFrom = fromParent ? fromParent.Children : self.users;
                objFrom.splice(objFrom.indexOf(itemSelected), 1);

                if (toParent.Id === itemSelected.Id) {
                    itemSelected.ParentId = null;
                    self.users.push(itemSelected);
                }
                else {
                    itemSelected.ParentId = toParent.Id;
                    toParent.Children.push(itemSelected);
                }
                self.saveUser(itemSelected);
                //   self.active = [];
                return false;
            }
        }

    }
    /*
    import TreeView from '@/components/DragTreeview.vue'
    import JsonViewer from 'vue-json-viewer'
    export default {
        components: {
            TreeView,
            JsonViewer
        },
        data() {
            return {
                treeData: this.$_DATA.organs
            }
        },
    }
     */
</script>