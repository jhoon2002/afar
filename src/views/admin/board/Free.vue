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
                    :sort-desc=true
                    :footer-props="{ itemsPerPageOptions: [1,2,5,7,10,15,20,30,40] }"
            >
                <template v-slot:item.created="{ item }">
                    {{ $moment().format('YYYY-MM-DD') == $moment(item.created).format('YYYY-MM-DD') ? $moment(item.created).format('hh:mm:ss') : $moment(item.created).format('YYYY-MM-DD') }}
                </template>
                <template v-slot:item.userId="{ item }">
                    {{ names[item.userId] }}
                </template>
            </v-data-table>
        </div>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        data () {
            return {
                items: [],
                count: 0,
                options: {},
                loading: false,
                names: {},
                headers: [
                    {
                        text: 'Id',
                        align: 'start',
                        sortable: false,
                        value: '_id',
                    },
                    { text: '제목', value: 'subject' },
                    { text: '이름', value: 'userId' },
                    {
                        text: '날짜',
                        value: 'created',
                    },
                ],
            }
        },
        methods: {
            load() {
                this.loading = true
                let url = "/api/posts"
                let config = {
                    params: this.options
                }

                console.log("send:", url, config.params)

                axios.get(url, config).then((ret) => {
                    console.log("return: ", ret)
                    this.items = ret.data.items
                    this.count = ret.data.totalCount
                    this.names = ret.data.names
                    setTimeout(() => ( this.loading = false ), 250)
                }).catch((error) => {
                    console.log(error)
                    setTimeout(() => ( this.loading = false ), 250)
                })

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