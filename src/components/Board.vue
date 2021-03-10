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
                    <span @click="viewDoc(item._id)" style="cursor: pointer">
                        <span v-html="markWord(item.subject, 'subject', search)"></span> <span class="text-overline grey--text" v-if="item.commentCount">[{{item.commentCount}}]</span>
                    </span>
                </template>
                <template v-slot:item.name="{ item }">
                    <span v-html="markWord(item.name, 'name', search)"></span> <span class="text-overline grey--text" v-if="item.commentCount">[{{item.commentCount}}]</span>
                </template>
            </v-data-table>
            <v-row no-gutters class="d-flex justify-space-between">
                <v-btn class="justify-end" color="primary" dark elevation="0">글쓰기</v-btn>
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
                    <v-tooltip bottom v-model="tooltip1" color="primary">
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
            </v-row>
        </v-card>

        <v-dialog
                v-model="dialog"
                width="850"
                scrollable
        >
            <v-card>
                <v-card-title class="grey lighten-2 text-body-1 d-block">
                    <v-row no-gutters>
                        <v-col>
                            <div style="font-size: 1.2rem">{{doc.subject}}</div>
                            <v-sheet class="transparent mt-1">
                                <span class="text-body-2" v-html="markWord(doc.name, 'name', search)"></span>
                                <span class="text-caption" v-html="'(' + markWord(doc.userId, 'userId', search) + ')'"></span><span class="text-caption">  / {{$moment(doc.created).format("YYYY-MM-DD hh:mm:ss")}}</span>
                            </v-sheet>
                        </v-col>
                        <v-col style="max-width: 3rem" class="text-right">
                            <v-icon @click="dialog=false">mdi-close</v-icon>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text class="pa-5" style="min-height: 20rem">
                    <div style="font-size:1rem; line-height: 200%; color: #555555"
                         v-html="this.markWord(this.makeReturn(doc.content), 'content', this.search)"
                    >
                    </div>
                    <v-sheet class="mt-10" v-if="doc.comments && doc.comments.length > 0">
                        <!--
                        <v-chip class="mb-2"
                                color="black"
                                label
                                small
                                text-color="white">Comments</v-chip>
                        -->
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs"
                                        v-on="on" class="mb-2 text-h4">mdi-comment-account-outline</v-icon>
                            </template>
                            <span>코멘트</span>
                        </v-tooltip>

                        <comment :items="doc.comments" :offset=0></comment>
                    </v-sheet>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            elevation="0"
                            @click="dialog = false"
                    >
                        닫기
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>
<script>
    import axios from "axios"
    import Comment from "@/components/Comment.vue"
    export default {
        components: {
            Comment
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
                dialog: false,
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
                tooltip2: false
            }
        },
        methods: {
            async load(addParams) {
                this.loading = true
                let params = Object.assign({}, this.options)
                if (addParams) addParams(params)
                let ret = await axios.get("/api/posts", { params: params }).catch(console.log)
                console.log("return: ", ret)
                this.items = ret.data.items
                this.totalPages = ret.data.totalPages
                this.count = ret.data.count
                this.topNumber = this.count-( (this.options.page-1) * this.options.itemsPerPage )
                await setTimeout(() => (this.loading = false), 500)
            },
            async viewDoc(id) {
                let ret = await axios.get("/api/posts/" + id).catch(console.log)
                console.log("ret", ret)
                this.doc = ret.data
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
            makeReturn(targetString) {
                return targetString.replace(/\n/g, "<br/>")
            },
            markWord(targetString, targetField, searchObject) {
                if (targetString && searchObject.fields.includes(targetField)) {
                    return targetString.replace(new RegExp(searchObject.word, "g"), "<span class='searchWord'>" + searchObject.word + "</span>")
                }
                return targetString
            },
        },
        created() {
            this.registerWatch()
        },
        mounted() {},
        watch: {}
    }
</script>
<style>
    .searchWord {
        background-color: #f1e068;
    }
</style>