<template>
    <div>
        <v-card class="pb-2">
            <v-row>
                <v-col>
                    <v-card-title>
                        자유게시판
                    </v-card-title>
                </v-col>
                <v-col class="d-flex align-center justify-end pr-12">
                    <v-select
                            v-model="search.field"
                            :items="searchFields"
                            hide-details
                            dense
                            class="mt-5 mr-5 mb-5"
                            style="max-width: 7rem"
                    >
                    </v-select>
                    <v-text-field
                            v-model="search.word"
                            label="검색"
                            single-line
                            hide-details
                            dense
                            class="mt-5 mb-5"
                            style="max-width: 16rem"
                            @keypress.enter="searchSubmit"
                    ></v-text-field>
                    <v-btn
                            elevation="0"
                            color="secondary"
                            fab
                            dark
                            x-small
                            style="max-width: 1.4rem; max-height: 1.4rem"
                            @click="searchSubmit"
                    >
                        <v-icon dark>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    :server-items-length="count"
                    :options.sync="options"
                    :loading="loading"
                    loader-height="1"
                    sort-by="created"
                    :sort-desc=true
                    :footer-props="{
                        itemsPerPageOptions: [5,10,15,20,30,40,50,100],
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
                <template v-slot:item.userId="{ item }">
                    {{ names[item.userId] }}
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
                                <span class="text-body-2">{{ names[doc.userId] }}</span>
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

                        <comment :items="doc.comments" :offset=0 :names="docNames"></comment>
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
                items: [],
                count: 0,
                options: {},
                totalPage: 0,
                topNumber: 0,
                loading: false,
                names: {},
                headers: [
                    {text: 'No', align: 'center', sortable: false, value: "No"},
                    {text: '제목', value: 'subject'},
                    {text: '이름', align: 'center', value: 'userId', sortable: false,},
                    {text: '날짜', align: 'center', value: 'created'},
                ],
                commentHeaders: [
                    {text: 'Comments', sortable: false, value: 'userId', width: 150},
                    {text: '', sortable: false, value: 'content'},
                ],
                doc: {
                    content: ""
                },
                docNames: {},
                dialog: false,
                searchFields: [
                    { text: "제목", value: "subject" },
                    { text: "내용", value: "content" },
                    { text: "제목+내용", value: "subject+content" }
                ],
                search: {
                    field: "subject",
                    word: ""
                }
            }
        },
        methods: {
            load(search) {
                this.loading = true

                if (search) {
                    this.options.searchField = this.search.field
                    this.options.searchWord = this.search.word
                }

                console.log("this.search", this.search)

                axios.get("/api/posts", {
                    params: this.options
                }).then((ret) => {
                    // console.log("return: ", ret)
                    this.items = ret.data.items
                    this.totalPage = ret.data.totalPage
                    this.count = ret.data.totalCount
                    this.names = ret.data.names
                    this.topNumber = this.count-( (this.options.page-1) * this.options.itemsPerPage )
                }).catch(
                    console.log
                ).finally(
                    setTimeout(() => (this.loading = false), 500)
                )
            },
            async loadPost(id) {
                await axios.get("/api/posts/" + id).then(ret => {
                    console.log("docRet", ret)
                    this.doc = ret.data.item
                    this.docNames = ret.data.names
                })
            },
            async viewDoc(id) {
                await this.loadPost(id)
                this.dialog = true
            },
            async searchSubmit() {
                await this.load(true)
            }
        },
        mounted() {
            //this.load()
        },
        watch: {
            options: {
                handler: "load", //or handler() { this.load() }
                deep: true,
                // immediate: true
            }
        }
    }
</script>