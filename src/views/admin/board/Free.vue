<template>
    <div>
        <v-card class="pb-2">
            <v-row>
                <v-col>
                    <v-card-title @click="refresh()">
                        자유게시판 {{search}}
                    </v-card-title>
                </v-col>
                <v-col class="d-flex align-center justify-end pr-12">
                    <v-select
                            v-model="search.fields"
                            :items="searchFields"
                            hide-details
                            dense
                            class="mt-5 mr-5 mb-5"
                            style="max-width: 7rem"
                            multiple
                    >
                    </v-select>
                    <v-text-field
                            v-model="search.word"
                            label="검색어"
                            single-line
                            hide-details
                            dense
                            class="mt-5 mb-5"
                            style="max-width: 16rem"
                            @keypress.enter="searchSubmit()"
                    ></v-text-field>
                    <v-tooltip bottom v-model="tooltip" color="primary">
                        <template v-slot:activator="{  }">
                            <v-btn
                                    elevation="0"
                                    color="secondary"
                                    fab
                                    dark
                                    x-small
                                    style="max-width: 1.4rem; max-height: 1.4rem"
                                    @click="searchSubmit()"
                            >
                                <v-icon dark>mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                        <span>검색 필드를 선택하십시오</span>
                    </v-tooltip>
                    <v-btn
                            elevation="0"
                            color="grey"
                            fab
                            dark
                            x-small
                            style="max-width: 1.4rem; max-height: 1.4rem"
                            @click="refresh()"
                            class="ml-1"
                    >
                        <v-icon dark>mdi-refresh</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table
                    loader-height="1"
                    :headers="headers"
                    :items="items"
                    :server-items-length="count"
                    :options.sync="options"
                    :loading="loading"
                    :items-per-page="defaultLimit"
                    :sort-by="defaultSortBy"
                    :sort-desc="defaultSortDesc"
                    :footer-props="{
                        itemsPerPageOptions: [1,5,10,15,20,30,40,50,100],
                        showFirstLastPage: true,
                        firstIcon: 'mdi-menu-left',
                        lastIcon: 'mdi-menu-right',
                        showCurrentPage: true
                    }"
            >
                <template v-slot:item.No="{ index }">
                    {{topNumber - index}}
                </template>
                <template v-slot:item.created="{ item }">
                    {{ $moment().format('YYYY-MM-DD') == $moment(item.created).format('YYYY-MM-DD') ?
                    $moment(item.created).format('hh:mm:ss') : $moment(item.created).format('YYYY-MM-DD') }}
                </template>
                <template v-slot:item.subject="{ item }">
                    <span @click="viewDoc(item._id)" style="cursor: pointer">{{ item.subject }}{{ item.commentCount > 0 ? " (" + item.commentCount + ")" : "" }}</span>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog
                v-model="dialog"
                width="800"
                scrollable
        >
            <v-card>
                <v-card-title class="grey lighten-2 text-body-1 d-block">
                    <v-row no-gutters>
                        <v-col>
                            <div>{{doc.subject}}</div>
                            <v-sheet class="transparent mt-1">
                                <span class="text-body-2">{{ doc.name }}</span>
                                <span class="text-caption">({{doc.userId}}) / {{$moment(doc.created).format('YYYY-MM-DD hh:mm:ss')}}</span>
                            </v-sheet>
                        </v-col>
                        <v-col style="max-width: 3rem" class="text-right">
                            <v-icon @click="dialog=false">mdi-close</v-icon>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text class="pa-5" style="min-height: 20rem">
                    <div v-html="doc.content.replace(/\n/g, '<br/>')"></div>
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
    </div>
</template>
<script>
    import axios from "axios"
    import Comment from "@/components/Comment.vue"
    export default {
        components: {
            Comment,
        },
        data() {
            return {
                defaultLimit: 5,           //table default value
                defaultSortBy: "created",  //table default value
                defaultSortDesc: true,     //table default value
                items: [],
                count: 0,
                options: {},
                totalPages: 0,
                topNumber: 0,
                loading: false,
                headers: [
                    {text: 'No', align: 'center', sortable: false, value: "No"},
                    {text: '제목', value: 'subject'},
                    {text: '이름', align: 'center', value: 'name', sortable: true,},
                    {text: '조회', align: 'center', value: 'hit', sortable: true,},
                    {text: '날짜', align: 'center', value: 'created'},
                ],
                commentHeaders: [
                    {text: 'Comments', sortable: false, value: 'name', width: 150},
                    {text: '', sortable: false, value: 'content'},
                ],
                doc: {
                    content: ""
                },
                dialog: false,
                searchFields: [
                    { text: "제목", value: "subject" },
                    { text: "내용", value: "content" }
                ],
                search: {
                    fields: ["subject"],
                    word: "",
                    onSearch: false
                },
                tooltip: false
            }
        },
        methods: {
            load(isSearch) {
                this.loading = true

                let params = Object.assign({}, this.options)
                params["search.boardId"] = "free"

                if (isSearch && this.search.word) {
                    for(let one of this.search.fields) {
                        params["search." + one] = this.search.word
                    }
                }

                //if (this.search.onSearch) {
                //
                //}

                axios.get("/api/posts", {
                    params: params
                }).then((ret) => {
                    console.log("return: ", ret)
                    this.items = ret.data.items
                    this.totalPages = ret.data.totalPages
                    this.count = ret.data.count
                    this.topNumber = this.count-( (this.options.page-1) * this.options.itemsPerPage )
                }).catch(
                    console.log
                ).finally(
                    setTimeout(() => (this.loading = false), 500)
                )
            },
            async loadPost(id) {
                await axios.get("/api/posts/" + id).then(ret => {
                    this.doc = ret.data.item
                })
            },
            async viewDoc(id) {
                await this.loadPost(id)
                this.dialog = true
            },
            optionsReset() {
                /* options {                {
                       page: number,
                       itemsPerPage: number,
                       sortBy: string[],
                       sortDesc: boolean[],
                       groupBy: string[],
                       groupDesc: boolean[],
                       multiSort: boolean,
                       mustSort: boolean
                }*/
                this.options.page = 1
                this.options.itemsPerPage = this.defaultLimit
                this.options.sortBy = [this.defaultSortBy]
                this.options.sortDesc = [this.defaultSortDesc]
                this.options.groupBy = []
                this.options.groupDesc = []
                this.options.multiSort = false
                this.options.mustSort = false
            },
            async searchSubmit() {
                if (this.search.fields.length == 0) {
                    this.tooltip = true
                    setTimeout(() => (this.tooltip = false), 2000)
                } else {
                    this.optionsReset()
                    await this.load(true)
                    this.search.onSearch = true
                }
                return
            },
            refresh() {
                this.search.fields = ["subject"]
                this.search.word = ""
                this.onSearch = false
                this.optionsReset()
                this.load()
            }
        },
        mounted() {
            //this.load()
        },
        watch: {
            options: {
                handler() {
                    this.load(this.search.onSearch)
                },
                deep: true,
                // immediate: true
            }
        }
    }
</script>