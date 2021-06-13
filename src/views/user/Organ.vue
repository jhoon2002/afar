<template>
    <v-card>
        <v-card-title>
            조직 관리
        </v-card-title>
        <v-sheet class="transparent px-6" v-if="totalNode.length > 0">
            <v-row class="d-block d-md-flex">
                <v-col cols="12" class="col-md-3">
                    <v-card elevation="0" class="px-2 pb-10">
                        <v-card-title class="pl-0">
                            부서
                            <v-menu
                                    v-model="organMenu"
                                    :close-on-content-click="false"
                                    :close-on-click="false"
                                    max-width="350"
                                    min-width="350"
                                    offset-x
                                    @input="organFormReset()"
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
                                    <validation-observer
                                            ref="valiOrganForm"
                                            v-slot="{ handleSubmit }"
                                    >
                                        <v-card-title class="pa-0">
                                            부서 생성
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    icon
                                                    style="margin-top: -6px; margin-right: -2px;"
                                                    @click="organMenu=false"
                                            >
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-card-title>
                                        <v-card-text class="pl-0 mt-3">
                                            선택된 <b>"{{ selectedNode.text }}"</b> 아래에 부서를 생성합니다.
                                        </v-card-text>
                                        <validation-provider
                                                name="사용 명칭"
                                                :rules="{ required: true }"
                                                v-slot="{ errors, valid }"
                                        >
                                            <v-text-field
                                                    v-model="organText"
                                                    outlined
                                                    label="사용 명칭"
                                                    autofocus
                                                    :error-messages="errors"
                                                    :success="valid"
                                                    class="mt-5"
                                                    @keyup.enter="handleSubmit(addOrgan)"
                                            ></v-text-field>
                                        </validation-provider>

                                        <v-card-actions class="mt-5 pa-0">
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                    text
                                                    class="mr-0"
                                                    @click="organMenu=false"
                                            >
                                                취소
                                            </v-btn>
                                            <v-btn
                                                    color="primary"
                                                    text
                                                    class="mx-0"
                                                    @click="handleSubmit(addOrgan)"
                                            >
                                                추가
                                            </v-btn>
                                        </v-card-actions>
                                    </validation-observer>
                                </v-card>
                            </v-menu>
                        </v-card-title>

                        <drag-treeview
                                :value="totalNode"
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
                                        <!--
                                        <v-btn
                                                x-small
                                                icon
                                                @click="() => hideNode(node)"
                                        >
                                            <v-icon>ri-loader-line</v-icon>
                                        </v-btn>
                                        -->
                                    </div>
                                </v-card>
                            </template>

                        </drag-treeview>

                    </v-card>
                </v-col>
                <v-col cols="12" class="col-md-6">
                    <v-slide-x-transition>
                        <v-card
                                :loading="loadingOrgan"
                                outlined
                                elevation="1"
                                class="pa-0"
                                v-if="selectedNode.text"
                        >
                            <template slot="progress">
                                <v-progress-linear
                                        color="primary"
                                        height="2"
                                        indeterminate
                                        absolute
                                ></v-progress-linear>
                            </template>

                            <v-sheet
                                    class="transparent pa-10"
                            >
                                <v-card-title class="pl-0 pt-0">
                                    {{ selectedNode.text }}
                                </v-card-title>

                                <v-card-subtitle class="pl-0">
                                    {{ selectedNode.fulltext }}
                                </v-card-subtitle>

                                <v-row>
                                    <v-col cols="6">

                                        <v-card-title class="pl-0">
                                            일반 정보
                                        </v-card-title>


                                        <!--
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        항목
                                                    </th>
                                                    <th class="text-left">
                                                        내용
                                                    </th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>사용 명칭</td>
                                                    <td>{{ selectedNode.text }}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>고유 명칭</td>
                                                    <td>
                                                        {{ selectedNode.fulltext }}
                                                    </td>
                                                    <td>
                                                        <v-edit-dialog
                                                                :return-value.sync="kkk"
                                                                large
                                                                save-text="저장"
                                                                cancel-text="취소"
                                                                @save="save('name')"
                                                                @cancel="cancel"
                                                                @open="open('name')"
                                                                @close="close"
                                                        >
                                                            수정
                                                            <template v-slot:input>
                                                                <validation-observer ref="observer" v-slot="{}">
                                                                    <validation-provider
                                                                            name="고유 명칭"
                                                                            :rules="{ required: true }"
                                                                            v-slot="{ errors, valid }">
                                                                        <v-text-field
                                                                                v-model="selectedNode.chief"
                                                                                label="고유 명칭"
                                                                                class="mt-4"
                                                                                :error-messages="errors"
                                                                                :success="valid"
                                                                        ></v-text-field>
                                                                    </validation-provider>
                                                                    <v-switch
                                                                            v-model="selectedNode.blank"
                                                                            label="띄어쓰기"
                                                                            class="mt-4"
                                                                            :error-messages="errors"
                                                                            :success="valid"
                                                                    ></v-switch>
                                                                </validation-observer>
                                                            </template>
                                                        </v-edit-dialog>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>부서장 명칭</td>
                                                    <td>{{ selectedNode.text }}{{ selectedNode.blank ? " " : "" }}{{ selectedNode.chief }}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>등록일시</td>
                                                    <td>{{ $moment(selectedNode.created).format("YYYY-MM-DD HH:mm:ss") }}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>수정일시</td>
                                                    <td>{{ $moment(selectedNode.updated).format("YYYY-MM-DD HH:mm:ss") }}</td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        -->

                                        <div class="text-body-2">
                                            사용 명칭
                                        </div>
                                        <div class="text-body-1">
                                            {{ selectedNode.text }}
                                        </div>
                                        <div class="text-body-2 mt-6">
                                            고유 명칭
                                        </div>
                                        <div class="text-body-1">
                                            {{ selectedNode.fulltext ? selectedNode.fulltext : "없음" }}
                                        </div>
                                        <div class="text-body-2 mt-6">
                                            부서장 명칭
                                        </div>
                                        <div class="text-body-1">
                                            {{ selectedNode.text }}{{ selectedNode.blank ? " " : "" }}{{ selectedNode.chief }}
                                        </div>
                                        <div class="text-body-2 mt-6">
                                            등록 일시
                                        </div>
                                        <div class="text-body-1">
                                            {{ $moment(selectedNode.created).format("YYYY-MM-DD HH:mm:ss") }}
                                        </div>
                                        <div class="text-body-2 mt-6">
                                            수정 일시
                                        </div>
                                        <div class="text-body-1">
                                            {{ $moment(selectedNode.updated).format("YYYY-MM-DD HH:mm:ss") }}
                                        </div>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-card-title class="pl-0">
                                            구성원
                                            <v-menu
                                                    v-model="staffMenu"
                                                    :close-on-content-click="false"
                                                    :close-on-click="false"
                                                    max-width="350"
                                                    min-width="350"
                                                    offset-x
                                                    @input="staffFormReset()"
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
                                                    <validation-observer
                                                            ref="valiStaffForm"
                                                            v-slot="{ handleSubmit }"
                                                    >
                                                        <v-card-title class="pa-0">
                                                            구성원 추가
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                    icon
                                                                    style="margin-top: -6px; margin-right: -2px;"
                                                                    @click="staffMenu=false"
                                                            >
                                                                <v-icon>mdi-close</v-icon>
                                                            </v-btn>
                                                        </v-card-title>
                                                        <v-sheet class="pa-4">
                                                            <v-row no-gutters class="d-flex">
                                                                <validation-provider
                                                                        name="직책"
                                                                        :rules="{ required: true }"
                                                                        v-slot="{ errors, valid }"
                                                                >
                                                                    <v-select
                                                                            v-model="role1"
                                                                            label="직책"
                                                                            :items="['연구책임자', '공동연구자', '보조연구원', '연구원', '행정원', '직접 입력']"
                                                                            :error-messages="errors"
                                                                            :success="valid"
                                                                            style="max-width: 7rem"
                                                                            @input="checkSelect"
                                                                    ></v-select>
                                                                </validation-provider>
                                                                <validation-provider
                                                                        name="직책"
                                                                        :rules="{ required: true }"
                                                                        v-slot="{ errors, valid }"
                                                                        v-if="isDirect"
                                                                >
                                                                    <v-text-field
                                                                            v-if="isDirect"
                                                                            v-model="role2"
                                                                            label="직책(직접 입력)"
                                                                            :autofocus="isDirect"
                                                                            :error-messages="errors" :success="valid"
                                                                            class="ml-4"
                                                                            style="max-width: 7rem"
                                                                    ></v-text-field>
                                                                </validation-provider>
                                                            </v-row>

                                                            <validation-provider
                                                                    name="이름"
                                                                    :rules="{ required: true }"
                                                                    v-slot="{ errors, valid }"
                                                            >
                                                                <v-autocomplete
                                                                        v-model="addedStaff"
                                                                        :loading="loading"
                                                                        :items="searchedStaffs"
                                                                        item-text="text"
                                                                        :cache-items="false"
                                                                        :search-input.sync="searchingStaffWord"
                                                                        return-object
                                                                        chips
                                                                        hide-no-data
                                                                        label="이름"
                                                                        :error-messages="errors"
                                                                        :success="valid"
                                                                        class="addStaff"
                                                                ></v-autocomplete>
                                                            </validation-provider>

                                                        </v-sheet>
                                                        <v-card-actions class="mt-5 pa-0">
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                    text
                                                                    @click="staffMenu=false"
                                                            >
                                                                취소
                                                            </v-btn>
                                                            <v-btn
                                                                    color="primary"
                                                                    text
                                                                    @click="handleSubmit(addStaff)"
                                                            >
                                                                추가
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </validation-observer>
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
                                                <template v-slot:default="{ node, tree, path }">
                                                    <v-card
                                                            elevation="0"
                                                            class="d-flex justify-space-between pa-1"
                                                            :class="{ 'selectedNode': isSelected(node) }"
                                                            @click="editStaff(node)"
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
                                                            <!--
                                                            <v-btn
                                                                    x-small
                                                                    icon
                                                                    @click="() => hideNode(node)"
                                                            >
                                                                <v-icon>ri-loader-line</v-icon>
                                                            </v-btn>
                                                            -->
                                                        </div>
                                                    </v-card>
                                                </template>
                                            </drag-treeview>
                                        </v-slide-x-transition>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
                <v-col cols="12" class="col-md-3">
                    <v-slide-x-transition>
                        <v-card
                                :loading="loadingStaff"
                                outlined
                                elevation="1"
                                class="px-6 pb-10 rounded-lg"
                                v-if="selectedStaff.name"
                        >

                            <template slot="progress">
                                <v-progress-linear
                                        color="primary"
                                        height="2"
                                        indeterminate
                                        absolute
                                ></v-progress-linear>
                            </template>

                            <v-card-title class="pl-0 mb-4">
                                {{ selectedStaff.name }}
                                <v-spacer></v-spacer>
                                <v-icon
                                        x-small
                                        color="grey"
                                        class="ml-3"
                                >
                                    mdi-key-variant
                                </v-icon>
                                <span class="text-caption ml-1" style="color: #777777">{{selectedStaff.user_id}}</span>
                            </v-card-title>

                            <v-row>
                                <v-col cols="3">
                                    <v-avatar
                                            color="grey lighten-2"
                                            size="65"
                                            class="mt-1"
                                    >
                                        <img
                                                :src="`${ $env.url + $store.state.user.faceURL }`"
                                        />
                                    </v-avatar>
                                </v-col>
                                <v-col cols="9">
                                    <div class="text-body-2">
                                        이름
                                    </div>
                                    <div class="text-h6">
                                        {{ selectedStaff.name }}
                                    </div>
                                    <div class="text-body-2 mt-2">
                                        직책
                                    </div>
                                    <div class="text-h6">
                                        {{ selectedStaff.role }}
                                        <v-btn
                                                icon
                                        >
                                            <v-icon small>ri-pencil-line</v-icon>
                                        </v-btn>
                                    </div>
                                    <div class="text-body-2 mt-2">
                                        생년월일
                                    </div>
                                    <div class="text-body-1">
                                        {{ $util.toBirthday(httpUser.jumin, true) }}
                                    </div>
                                    <div class="text-body-2 mt-2">
                                        휴대폰
                                    </div>
                                    <div class="text-body-1">
                                        {{ httpUser.cellphone.substr(0, 3) }}-{{ httpUser.cellphone.substr(3, 4) }}-{{ httpUser.cellphone.substr(7, 4) }}
                                    </div>
                                    <div class="text-body-2 mt-2">
                                        이메일
                                    </div>
                                    <div class="text-body-1">
                                        {{ httpUser.email }}
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-slide-x-transition>
                </v-col>
            </v-row>
            <v-row>
                <json-viewer
                        :value="totalNode"
                        :expand-depth=10
                ></json-viewer>
            </v-row>
            <v-row class="pb-5">
                <v-spacer></v-spacer>
                <v-btn
                        outlined
                        elevation="0"
                        style="padding-bottom: 2px"
                        @click="save()"
                >
                    저장
                </v-btn>
                <v-spacer></v-spacer>
            </v-row>
        </v-sheet>
        <v-sheet class="transparent pa-15 pt-7" v-else>
            <v-card
                    flat
                    style="max-width: 30rem"
            >
                <v-card-title>
                    조직이 없습니다. 최상위 조직을 생성하십시오.
                </v-card-title>

                <validation-observer
                        ref="validationTop"
                        v-slot="{ validate, handleSubmit }"
                >
                    <v-card-text>
                        <validation-provider
                                name="사용 명칭"
                                :rules="{ required: true }"
                                v-slot="{ errors, valid }"
                        >
                            <v-text-field
                                    v-model="topOrganText"
                                    label="조직명"
                                    outlined
                                    autofocus
                                    :error-messages="errors"
                                    :success="valid"
                                    @keyup.enter="handleSubmit(addTopOrgan)"
                            ></v-text-field>
                        </validation-provider>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                outlined
                                color="secondary"
                                @click="handleSubmit(addTopOrgan)"
                        >
                            확인
                        </v-btn>
                    </v-card-actions>
                </validation-observer>
            </v-card>
        </v-sheet>
    </v-card>
</template>
<script>
    import DragTreeview from "@/components/DragTreeview.vue"
    import JsonViewer from 'vue-json-viewer'
    import { getUsersByUserIdName } from "@/apis/db.js"
    export default {
        components: {
            DragTreeview,
            JsonViewer
        },
        data: function () {
            return {
                organMenu: false,
                staffMenu: false,
                totalNode: {},
                topOrganText: "",
                selectedNode: {},
                selectedStaff: {},
                searchWord: "",
                organText: "",
                organAdd: false,
                isDirect: false,
                staffUserId: "",
                staffName: "",
                role1: "",
                role2: "",
                userIdName: "",
                srdUser: "",
                users: [],
                isChips: false,
                loading: false,
                searchedStaffs: [],
                addedStaff: null,
                searchingStaffWord: null,
                httpUser: {},
                loadingOrgan: false,
                loadingStaff: false
            }
        },
        computed: {
            // treeData() {
            //     return this.$_DATA.organs
            // }
        },
        mounted() {
            // this.selectedNode = this.$_DATA.organs[0]
            try {
                // const ret = await this.$http.get("/api/organs")
                // this.totalNode = ret.data.organ
                this.totalNode = [{
                    id: "1",
                    text: "산학협력단",
                    chief: "장",
                    blank: false,
                    disable: false,
                    staffs: [
                        {
                            user_id: "607e68e6bd257006b866e7ba",
                            role: "연구책임자",
                            name: "여종훈"
                        },
                        {
                            user_id: "607e68e6bd257006b866e7bd",
                            role: "팀장",
                            name: "김유신"
                        }
                    ],
                    created: "2021-02-24T02:09:22.006+00:00",
                    updated: "2021-02-24T02:09:22.006+00:00"
                }]
            } catch {
                //
            }
        },
        watch: {
            searchingStaffWord (val) {
                // val && val !== this.addedStaff.user.name && this.querySelections(val)
                // console.log(val && val !== this.select && this.querySelections(val))
                this.addedStaff = null
                val && this.querySelections(val)
            },
        },
        methods: {
            addTopOrgan() {
                this.$refs.validationTop.validate()
                const organ = {
                    id: "1",
                    text: this.topOrganText,
                    chief: "장",
                    blank: false
                }
                this.totalNode.push( organ )
                this.editNode( organ )
            },
            addOrgan() {
                this.$refs.valiOrganForm.validate()
                const id = this.maxId(this.selectedNode)
                const organ = {
                    id: id,
                    text: this.organText,
                    chief: "",
                    blank: false
                }
                if (!this.selectedNode.children) {
                    this.$set(this.selectedNode, 'children', [])
                    this.$set(this.selectedNode.children, 0, organ)
                } else {
                    this.selectedNode.children.unshift(organ)
                }
                this.organMenu = false
            },
            maxId(parent) {
                if (!parent.children) {
                    return parent.id + "1".padStart(4,'0')
                }
                let arr = []
                for (let child of parent.children) {
                    arr.push(child.id)
                }
                return ( Math.max.apply(null, arr) + 1 ).toString().padStart(4,'0')
            },
            isSelected: function(node) {
                if (this.selectedNode.text === node.text) {
                    return true
                }
                return false
            },
            async editNode(node) {
                this.loadingOrgan = true
                await setTimeout(() => (this.loadingOrgan = false), 800)
                this.selectedStaff = {}
                this.selectedNode = node
            },
            async editStaff(node) {
                this.loadingStaff = true
                try {
                    const ret = await this.$http.get("/api/users/_id/" + node.user_id)
                    this.httpUser = ret.data.user
                } catch {
                    //
                } finally {
                    //
                }
                this.selectedStaff = node
                await setTimeout(() => (this.loadingStaff = false), 800)
            },
            checkSelect(e) {
                if (e === '직접 입력') {
                    this.isDirect = true
                    return
                }
                this.isDirect = false
                return
            },
            organFormReset() {
                this.organText = ""
                this.$nextTick(() => {
                    this.$refs.valiOrganForm.reset()
                })
            },
            staffFormReset() {
                this.role1 = ""
                this.role2 = ""
                this.searchedStaffs = []
                this.addedStaff = null
                this.isDirect = false
                this.$nextTick(() => {
                    this.$refs.valiStaffForm.reset()
                })
            },
            addStaff() {
                this.$refs.valiStaffForm.validate()
                this.addedStaff.user.role = this.role1 === "직접 입력" ? this.role2 : this.role1

                if (!this.selectedNode.staffs) {
                    this.$set(this.selectedNode, 'staffs', [])
                    this.$set(this.selectedNode.staffs, 0, this.addedStaff.user)
                } else {
                    this.selectedNode.staffs.unshift(this.addedStaff.user)
                }
                this.staffMenu = false
            },
            async search2() {
                try {
                    const ret = await getUsersByUserIdName(this.userIdName)
                    this.users = ret.data.users
                    if (ret.data.users.length === 1) {
                        this.srdUser = ret.data.users[0].name // + "<.." + ret.data.users[0]._id.substr(20,4) + ">"
                        this.isChips = true
                        this.userIdName = ""
                    }
                } catch {
                    //
                }
            },
            async querySelections (v) {
                this.loading = true
                // Simulated ajax query
                this.searchedStaffs = []
                try {
                    const ret = await getUsersByUserIdName(v)
                    for (let user of ret.data.users) {
                        let info = user.userId ? ", " + user.userId : ""
                        this.searchedStaffs.push({
                            text: user.name + ", " + user.jumin.substr(0, 6) + info,
                            user: {
                                user_id: user._id,
                                name: user.name
                            }
                        })
                    }

                    //this.items = ret.data.users
                    //console.log(this.items)
                    //if (ret.data.users.length === 1) {
                    //    this.srdUser = ret.data.users[0].name // + "<.." + ret.data.users[0]._id.substr(20,4) + ">"
                    //    this.isChips = true
                    //    this.userIdName = ""
                    //}
                } catch {
                    this.items = []
                } finally {
                    this.loading = false
                }
                //setTimeout(() => {
                //    this.items = this.states.filter(e => {
                //        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                //    })
                //    this.loading = false
                //}, 500)
            },
            async save() {
                try {
                    await this.$http.post("/api/organs", { organ: this.selectedNode })
                } catch {
                    //
                }
            }
        },
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
    .addStaff .v-select__selections {
        flex-wrap: nowrap;
    }
</style>