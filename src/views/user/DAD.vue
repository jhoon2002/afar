<template>
    <div>
        <nested-test class="col-8" :list="list" />
    </div>
</template>

<script>
    import nestedTest from "@/components/DragNested.vue";
    export default {
        name: "aaaaa",
        components: {
            nestedTest
        },
        data: function() {
            return {
                list: [
                    {
                        id: 1,
                        name: "Shrek",
                        elements: []
                    },
                    {
                        id: 2,
                        name: "Fiona",
                        elements: [
                            {
                                id: 4,
                                name: "Lord Farquad",
                                elements: []
                            },
                            {
                                id: 5,
                                name: "Prince Charming",
                                elements: []
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: "Donkey",
                        elements: []
                    }
                ]
            }
        }
    }
</script>