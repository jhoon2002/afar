<template>
    <v-sheet class="pa-5">
        <v-card flat>
            <v-row no-gutters class="justify-space-between mb-4">

                <v-card-title @click="resetTable()">
                    <span style="cursor:pointer" class="text-h5">{{title}}</span>
                </v-card-title>

                <v-sheet class="transparent d-flex pt-3">

                    <v-select
                            v-model="search.fields"
                            :items="selectItems"
                            class="mr-5 text-body-2 pa-0 plain-data-select"
                            multiple
                            hide-details
                            :style="{ maxWidth: selectWidth + 'rem'}"
                            :menu-props="{ offsetY: true }"
                            @keypress.enter="searchSubmit()"
                    ></v-select>
                    <!--:style="{'max-width': `${4+(search.fields.length*2)}rem`}"-->
                    <v-text-field
                            v-model="search.word"
                            label="검색어"
                            single-line
                            hide-details
                            class="text-body-2 pa-0"
                            @keypress.enter="searchSubmit()"
                    ></v-text-field>

                    <v-tooltip top v-model="tooltip1" color="primary">
                        <template v-slot:activator="{}">
                            <v-icon
                                    color="grey darken-1"
                                    @click="searchSubmit()"
                                    style="width: 1.5rem; height: 1.5rem"
                                    class="mt-2"
                            >
                                mdi-magnify
                            </v-icon>
                        </template>
                        <span>{{ tooltip1Content }}</span>
                    </v-tooltip>

                    <v-icon
                            color="grey darken-1"
                            @click="firstPageNoSearch()"
                            style="width: 1.5rem; height: 1.5rem"
                            class="mt-2"
                    >
                        mdi-refresh
                    </v-icon>

                </v-sheet>
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
                    v-model="selected"
                    :single-select="false"
                    item-key="userId"
                    show-select
            >
                <!--
                <template
                        v-slot:header.data-table-select="{ on, props }"
                >
                    <v-simple-checkbox
                            color="purple"
                            v-bind="props"
                            v-on="on"
                    ></v-simple-checkbox>
                </template>
                -->
                <template v-for="header in headers"
                          v-slot:[`item.${header.value}`]="{ expand, index, item, isExpanded, isMobile, isSelected, select, headers }">
                    <slot
                            v-if="header.value !== 'No' && header.value !== 'created'"
                            :name="'item.' + header.value"
                            :expand="expand"
                            :index="index"
                            :item="item"
                            :isExpanded="isExpanded"
                            :isMobile="isMobile"
                            :isSelected="isSelected"
                            :select="select"
                            :headers="headers"
                            :view="view"
                    >
                        {{ item[header.value] }}
                    </slot>
                </template>

                <template v-slot:item.No="{ expand, index, item, isExpanded, isMobile, isSelected, select, headers }">
                    <slot
                            name="item.No"
                            :expand="expand"
                            :index="index"
                            :item="item"
                            :isExpanded="isExpanded"
                            :isMobile="isMobile"
                            :isSelected="isSelected"
                            :select="select"
                            :headers="headers"
                            :topNumber="topNumber"
                            :view="view"
                    >
                        {{ topNumber - index }}
                    </slot>
                </template>
                <template v-slot:item.created="{ expand, index, item, isExpanded, isMobile, isSelected, select, headers }">
                    <slot
                            name="item.created"
                            :expand="expand"
                            :index="index"
                            :item="item"
                            :isExpanded="isExpanded"
                            :isMobile="isMobile"
                            :isSelected="isSelected"
                            :select="select"
                            :headers="headers"
                            :topNumber="topNumber"
                            :view="view"
                    >
                        {{
                            $moment().format("YYYY-MM-DD") === $moment(item.created).format("YYYY-MM-DD") ?
                            $moment(item.created).format("HH:mm:ss") : $moment(item.created).format("YYYY-MM-DD")
                        }}
                    </slot>
                </template>

            </v-data-table>
            <slot name="buttons" :openCreate="openCreate"></slot>
        </v-card>
        <slot name="view" :targetId="targetId" :dialog="dialog" :close="close"></slot>
        <slot name="create" :dialog="createDialog" :close="close"></slot>
    </v-sheet>
</template>
<script>
    // import PostView from "@/components/PostView.vue"
    // import PostCreate from "@/components/PostCreate.vue"
    export default {
        components: {
            // PostView,
            // PostCreate
        },
        props: {
            dataId: {
                default: ""
            },
            title: {
                default: "게시판"
            },
            loaderHeight: {
                default: 1
            },
            headers: {},
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
            },
            selectItems: {}
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
                search: {
                    fields: [],
                    word: ""
                },
                tooltip1: false,
                tooltip1Content: "",
                tooltip2: false,
                targetId: "",
                dialog: false,
                createDialog: false,
                selected: []
            }
        },
        computed: {
            selectWidth() {
                let a = []
                for (let one of this.selectItems) {
                    for (let o of this.search.fields) {
                        if (o === one.value) {
                            a.push(one.text)
                        }
                    }
                }
                return 2.1 + this.$util.getByteLength(a.join(', ')) * 0.4
            }
        },
        methods: {
            async load(addParams) {
                this.loading = true
                let params = Object.assign({}, this.options)
                if (addParams) addParams(params)
                let ret = await this.$http.get("/api/" + this.dataId + "s", { params: params }).catch(console.log)
                // console.log("return: ", ret)
                this.items = ret.data.items
                this.totalPages = ret.data.totalPages
                this.count = ret.data.count
                this.topNumber = this.count-( (this.options.page-1) * this.options.itemsPerPage )
                await setTimeout(() => (this.loading = false), 500)
            },
            view(id) {
                this.targetId = id
                this.dialog = true
            },
            async searchSubmit() {
                if (this.search.fields.length === 0) {
                    this.tooltip1Content = "검색 필드를 선택하십시오."
                } else if (!this.search.word) {
                    this.tooltip1Content = "검색어를 입력하십시오."
                }
                if (!this.search.word || this.search.fields.length === 0) {
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
                this.options.itemsPerPage = this.itemsPerPage
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
                // console.log("===<watch 등록>===")
                this.optionsUnwatch = this.$watch("options", () => {
                    // console.log("===<watch 실행>===")
                    this.load(this.addParams)
                }, {deep: true})
            },
            unregisterWatch() {
                // console.log("===<watch 해제>===")
                this.optionsUnwatch()
            },
            addParams(params) {
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
                this.search.fields = []
                for (let one of this.selectItems) {
                    if (one.default) {
                        this.search.fields.push(one.value)
                    }
                }
                this.search.word = ""
            },
            close(refresh) {
                this.dialog = false
                this.createDialog = false
                if (refresh) {
                    this.resetTable()
                }
            },
            openCreate() {
                this.createDialog = true
            }
        },
        created() {
            this.registerWatch()
        },
        mounted() {
            //console.log("this.selectItems", this.selectItems)
            for (let one of this.selectItems) {
                if (one.default) {
                    this.search.fields.push(one.value)
                }
            }
        },
        watch: {}
    }
</script>