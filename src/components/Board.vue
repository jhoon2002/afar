<template>
    <v-sheet class="pa-5">
        <v-card flat>
            <v-row>
                <v-col>
                    <v-card-title @click="resetTable()">
                        <span style="cursor:pointer">{{title}}</span>
                    </v-card-title>
                </v-col>
                <v-col class="d-flex align-center justify-end pr-12" style="max-width: 30rem">

                </v-col>
            </v-row>
            <v-data-table
                    :loader-height="loaderHeight"
                    :headers="headers"
                    :items="items"
                    :server-items-length="count"
                    :options.sync="options"
                    :loading="loading"
                    :items-per-page="itemsPerPage"
                    :sort-by="sortBy"
                    :sort-desc="sortDesc"
                    :footer-props="footerProps"
            >
                <template v-slot:item.No="{ index }">
                    {{topNumber - index}}
                </template>
                <template v-slot:item.created="{ item }">
                    {{ $moment().format("YYYY-MM-DD") === $moment(item.created).format("YYYY-MM-DD") ? $moment(item.created).format("hh:mm:ss") : $moment(item.created).format("YYYY-MM-DD") }}
                </template>
                <template v-slot:item.subject="{ item }">
                    <span @click="view(item._id)" style="cursor: pointer">
                        <span v-html="$util.markWordInBoard(item.subject, search.word, 'subject', search.fields)"></span> <span class="text-overline grey--text" v-if="item.commentCount">[{{item.commentCount}}]</span>
                    </span>
                </template>
                <template v-slot:item.name="{ item }">
                    <span v-html="$util.markWordInBoard(item.name, search.word, 'name', search.fields)"></span> <span class="text-overline grey--text" v-if="item.commentCount">[{{item.commentCount}}]</span>
                </template>
            </v-data-table>
            <v-row
                    no-gutters
            >
                <v-col cols="4">
                </v-col>
                <v-col cols="4">
                    <v-sheet class="d-flex align-center" style="max-width: 25rem">
                        <v-select
                                v-model="search.fields"
                                :items="selectItems"
                                hide-details
                                class="mr-5"
                                :style="{'max-width': `${4+(search.fields.length*2)}rem`}"
                                multiple
                                @keypress.enter="searchSubmit()"
                        >
                        </v-select>

                        <v-text-field
                                v-model="search.word"
                                label="검색어"
                                single-line
                                hide-details
                                class=""
                                @keypress.enter="searchSubmit()"
                        ></v-text-field>
                        <v-tooltip top v-model="tooltip1" color="primary">
                            <template v-slot:activator="{}">
                                <v-icon
                                        color="grey darken-1"
                                        class="mt-5"
                                        @click="searchSubmit()"
                                >
                                    mdi-magnify
                                </v-icon>
                            </template>
                            <span>검색 필드를 선택하십시오</span>
                        </v-tooltip>
                        <v-icon
                                color="grey darken-1"
                                class="mt-5"
                                @click="firstPageNoSearch()"
                        >
                            mdi-refresh
                        </v-icon>
                    </v-sheet>
                </v-col>
                <v-col cols="4" class="text-right">
                    <v-btn
                            class="justify-end" color="primary"
                            dark elevation="0" @click="createDialog = true"
                    >
                        글쓰기
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <post-view :postId="postId" :search="search" :dialog="dialog" @close="dialog=false"></post-view>
        <post-create :boardId="boardId" :dialog="createDialog" @close="createDialog=false"></post-create>
    </v-sheet>
</template>
<script>
    import PostView from "@/components/PostView.vue"
    import PostCreate from "@/components/PostCreate.vue"
    export default {
        components: {
            PostView,
            PostCreate
        },
        props: {
            boardId: {
                default: ""
            },
            title: {
                default: "게시판"
            },
            loaderHeight: {
                default: 1
            },
            headers: {
                default: function () {
                    return [
                        {text: "No", align: "center", sortable: false, value: "No"},
                        {text: "제목", value: "subject"},
                        {text: "이름", align: "center", value: "name", sortable: true,},
                        {text: "날짜", align: "center", value: "created"},
                        {text: "조회", align: "center", value: "hit", sortable: true,}
                    ]
                }
            },
            itemsPerPage: {
                default: 5
            },
            sortBy: {
                default: function () {
                    return ["created"]
                }
            },
            sortDesc: {
                default: function () {
                    return [true]
                }
            },
            footerProps : {
                default: function () {
                    return {
                        itemsPerPageOptions: [1, 5, 10, 15, 20, 30],
                        showFirstLastPage: true,
                        firstIcon: "mdi-menu-left",
                        lastIcon: "mdi-menu-right",
                        showCurrentPage: true,
                    }
                }
            }
        },
        data() {
            return {
                items: [],
                count: 0,
                options: {},
                totalPages: 0,
                topNumber: 0,              //페이지 첫 No
                loading: false,
                commentHeaders: [
                    {text: "Comments", sortable: false, value: "name", width: 150},
                    {text: "", sortable: false, value: "content"},
                ],
                doc: {
                    content: ""
                },
                selectItems: [
                    { text: "제목", value: "subject" },
                    { text: "내용", value: "content" },
                    { text: "이름", value: "name" },
                    { text: "아이디", value: "userId" }
                ],
                search: {
                    fields: ["subject"],
                    word: ""
                },
                tooltip1: false,
                tooltip2: false,
                postId: "",
                dialog: false,
                createDialog: false
            }
        },
        methods: {
            async load(addParams) {
                this.loading = true
                let params = Object.assign({}, this.options)
                if (addParams) addParams(params)
                let ret = await this.$http.get("/api/posts", { params: params }).catch(console.log)
                console.log("return: ", ret)
                this.items = ret.data.items
                this.totalPages = ret.data.totalPages
                this.count = ret.data.count
                this.topNumber = this.count-( (this.options.page-1) * this.options.itemsPerPage )
                await setTimeout(() => (this.loading = false), 500)
            },
            async view(id) {
                this.postId = id
                this.dialog = true
            },
            async searchSubmit() {
                if (this.search.fields.length === 0) {
                    this.tooltip1 = true
                    setTimeout(() => (this.tooltip1 = false), 2000)
                    return
                }
                await this.loadPage({page: 1})
            },
            async resetTable() {
                this.unregisterWatch()
                this.resetSearch()
                this.options.page = 1
                this.options.itemsPerPage = 5
                this.options.sortBy = ["created"]
                this.options.sortDesc = [true]
                this.options.groupBy = []
                this.options.groupDesc = []
                this.options.multiSort = false
                this.options.mustSort = false
                await this.load(this.addParams)
                this.registerWatch()
            },
            async loadPage(newOptions) {
                if (newOptions) { //load with new options
                    this.unregisterWatch()
                    if (newOptions.page) this.options.page = newOptions.page
                    if (newOptions.itemsPerPage) this.options.itemsPerPage = newOptions.itemsPerPage
                    if (newOptions.sortBy) this.options.sortBy = newOptions.sortBy
                    if (newOptions.sortDesc) this.options.sortDesc = newOptions.sortDesc
                    if (newOptions.groupBy) this.options.groupBy = newOptions.groupBy
                    if (newOptions.groupDesc) this.options.groupDesc = newOptions.groupDesc
                    if (newOptions.multiSort) this.options.multiSort = newOptions.multiSort
                    if (newOptions.mustSort) this.options.mustSort = newOptions.mustSort
                    await this.load(this.addParams)
                    this.registerWatch()
                    return
                }
                await this.load(this.addParams) //load without new options
            },
            registerWatch() {
                console.log("===<watch 등록>===")
                this.optionsUnwatch = this.$watch("options", () => {
                    console.log("===<watch 실행>===")
                    this.load(this.addParams)
                }, {deep: true})
            },
            unregisterWatch() {
                console.log("===<watch 해제>===")
                this.optionsUnwatch()
            },
            addParams(params) {
                params["search.boardId"] = this.boardId
                if (this.search.word) {
                    for(let one of this.search.fields) {
                        params["search." + one] = this.search.word
                    }
                }
            },
            firstPageNoSearch: async function() {
                this.resetSearch()
                await this.loadPage({page: 1}) //ex) {page: 2, sortBy: ["subject"], itemsPerPage: 3}
            },
            resetSearch() {
                this.search.fields = ["subject"]
                this.search.word = ""
            },

        },
        created() {
            this.registerWatch()
        },
        mounted() {},
        watch: {}
    }
</script>