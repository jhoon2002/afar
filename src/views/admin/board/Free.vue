<template>
    <div>
        <div>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :server-items-length="count"
                    :options.sync="options"
                    :loading="loading"
                    class="elevation-1"
                    sort-by="created"
                    :sort-desc=true
            ></v-data-table>
            <v-list>
                <v-list-item>count: {{count}}</v-list-item>
                <v-list-item>options: {{options}}</v-list-item>
            </v-list>
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
                headers: [
                    {
                        text: 'Id',
                        align: 'start',
                        sortable: false,
                        value: '_id',
                    },
                    { text: '제목', value: 'subject' },
                    { text: '이름', value: 'userId' },
                    { text: '날짜', value: 'created' },
                ],
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%',
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%',
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%',
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%',
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%',
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%',
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%',
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%',
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%',
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%',
                    },
                ],
            }
        },
        methods: {
            load() {
                this.loading = true
                axios.get("/api/posts",{
                    params: this.options
                }).then((ret) => {
                    console.log(ret)
                    this.items = ret.data.items
                    this.count = ret.data.totalCount
                    this.loading = false
                }).catch((error) => {
                    console.log(error)
                    this.loading = false
                })
            }
        },
        mounted() {
            this.load()
        },
        watch: {
            options: {
                handler () {
                    this.load()
                },
                deep: true
            },
        }
    }
</script>