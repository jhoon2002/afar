<template>
    <div>
        <div>

            <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                    :server-items-length="count"
                    :options.sync="options"
                    :loading="loading"
                    loader-height="1"
                    class="elevation-1"
                    sort-by="created"
                    :sort-desc=false
                    :footer-props="{ itemsPerPageOptions: [1,2,5,7,10,15,20,30,40] }"
            >
                <template v-slot:item.created="{ item }">
                    {{ $moment().format('YYYY-MM-DD') == $moment(item.created).format('YYYY-MM-DD') ?
                    $moment(item.created).format('hh:mm:ss') : $moment(item.created).format('YYYY-MM-DD') }}
                </template>
                <template v-slot:item.subject="{ item }">
                    <div @click="viewDoc(item._id)">{{ item.subject }}</div>
                </template>
                <template v-slot:item.userId="{ item }">
                    {{ names[item.userId] }}
                </template>
            </v-data-table>
            <v-dialog
                    v-model="dialog"
                    width="600"
                    scrollable
            >
                <v-card>
                    <v-card-title class="grey lighten-2 text-body-1 d-block">
                        <div>{{doc.subject}}</div>
                        <v-sheet class="text-caption transparent mt-1">
                            {{ names[doc.userId] }}({{doc.userId}}) / {{$moment(doc.created).format('YYYY-MM-DD hh:mm:ss')}}
                        </v-sheet>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text class="pa-5">
                        {{ doc.content }}
                    </v-card-text>


                    <v-data-table
                            :headers="commentHeaders"
                            hide-default-footer
                            :items="doc.comments"
                            :items-per-page="10"
                            dense
                    >
                        <template v-slot:item.userId="{ item }">
                            <p class="ma-0 pa-0 mt-2 text-body-2">{{ names[item.userId] }}</p>
                            <p class="ma-0 pa-0 mb-2 text-caption">{{ $moment(item.created).format('YYYY-MM-DD hh:mm:ss') }}</p>
                        </template>
                        <template v-slot:item.content="{ item }">
                            <p class="my-2 pa-0">{{ item.content }}</p>
                        </template>
                    </v-data-table>

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
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        data() {
            return {
                items: [],
                count: 0,
                options: {},
                loading: false,
                names: {},
                headers: [
                    {text: 'Id', align: 'start', sortable: false, value: '_id'},
                    {text: '제목', value: 'subject'},
                    {text: '이름', value: 'userId', sortable: false,},
                    {text: '날짜', value: 'created'},
                ],
                commentHeaders: [
                    {text: 'Comments', sortable: false, value: 'userId', width: 150},
                    {text: '', sortable: false, value: 'content'},
                ],
                doc: {},
                dialog: false
            }
        },
        methods: {
            load() {
                this.loading = true

                axios.get("/api/posts", {
                    params: this.options
                }).then((ret) => {
                    // console.log("return: ", ret)
                    this.items = ret.data.items
                    this.count = ret.data.totalCount
                    this.names = ret.data.names
                }).catch(
                    console.log
                ).finally(
                    setTimeout(() => (this.loading = false), 500)
                )

            },
            async loadPost(id) {
                await axios.get("/api/posts/" + id).then(ret => {
                    this.doc = ret.data
                })
            },
            async viewDoc(id) {
                await this.loadPost(id)
                this.dialog = true
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