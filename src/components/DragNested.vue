<template>
    <draggable
            v-bind="dragOptions"
            tag="div"
            class="item-container"
            :list="list"
            :value="value"
            @input="emitter"
    >
        <div class="item-group" :key="el.id" v-for="el in realValue">
            <div class="item">
                <v-icon>
                    mdi-drag
                </v-icon>
                {{ el.text }}
            </div>
            <drag-nested class="item-sub" :list="el.children" />
        </div>
    </draggable>
</template>
<script>
    import draggable from "vuedraggable";
    export default {
        name: "DragNested",
        methods: {
            emitter(value) {
                this.$emit("input", value);
            }
        },
        components: {
            draggable
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },
            // this.value when input = v-model
            // this.list  when input != v-model
            realValue() {
                return this.value ? this.value : this.list;
            }
        },
        props: {
            value: {
                required: false,
                type: Array,
                default: null
            },
            list: {
                required: false,
                type: Array,
                default: null
            }
        }
    };
</script>
<style scoped>
    .item-container {
        margin: 0;
    }
    .item {
        padding: 0.5rem;
        border: 1px solid darkgrey;
        margin-bottom: 0.2rem;
    }
    .item-sub {
        margin: 0 0 0 1rem;
    }
</style>