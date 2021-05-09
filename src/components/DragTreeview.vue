<template>
    <v-sheet class="transparent">

        <v-text-field
                v-if="search"
                hide-details
                v-model="searchWord"
                class="mb-5 pt-2"
                prepend-inner-icon="mdi-magnify"
                placeholder="검색"
                @keyup="searchNode"
        ></v-text-field>

        <v-sheet
                class="transparent pr-3"
                style="height:500px; overflow: auto">
            <Tree
                    :value="value"
                    :triggerClass="triggerClass"
                    :draggable="draggable"
                    :droppable="droppable"
                    :edgeScroll="edgeScroll"
            >

                <template v-slot:default="{node, index, path, tree}">
                    <slot
                            :node="node"
                            :index="index"
                            :path="path"
                            :tree="tree"
                    >
                        {{ node.text }}
                    </slot>
                    <!--
                    <v-card
                            elevation="0"
                            class="d-flex justify-space-between pa-1"
                            :class="{ 'selectedNode': isSelected(node) }"
                            @click="editNode(node)"
                    >
                        <div>
                            <v-icon class="drag-trigger">
                                mdi-drag
                            </v-icon>
                            <v-icon
                                    small
                                    v-if="node.$folded && node.children && node.children.length > 0"
                                    @click="tree.toggleFold(node, path)"
                            >
                                ri-add-line
                            </v-icon>
                            <v-icon
                                    small
                                    v-if="!node.$folded && node.children && node.children.length > 0"
                                    @click="tree.toggleFold(node, path)"
                            >
                                ri-subtract-line
                            </v-icon>

                            {{ node.text }}
                        </div>
                        <div>
                            <v-btn
                                    x-small
                                    icon
                                    @click="() => tree.removeNodeByPath(path)"
                            >
                                <v-icon>ri-delete-bin-line</v-icon>
                            </v-btn>
                            <v-btn
                                    x-small
                                    icon
                                    @click="() => hideNode(node)"
                            >
                                <v-icon>ri-loader-line</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                    -->
                </template>
            </Tree>
        </v-sheet>

    </v-sheet>
</template>
<script>
    import "he-tree-vue/dist/he-tree-vue.css"
    import {Tree, Fold, Check, Draggable} from "he-tree-vue"
    import * as hp from 'helper-js'

    export default {
        extends: Tree,
        mixins: [Fold, Check, Draggable],
        components: {
            Tree: Tree.mixPlugins([Fold, Draggable])
        },
        data: function () {
            return {
                selectedNode: {},
                staffAdd: false,
                searchWord: "",
                organText: "",
                organAdd: false
            }
        },
        props: {
            triggerClass: {
                default: 'drag-trigger'
            },
            //prevent drag by default.
            draggable: {
                type: [Boolean, Function],
                default: false
            },
            droppable: {
                type: [Boolean, Function],
                default: false
            },
            edgeScroll: {
                type: [Boolean, Function],
                default: false
            },
            value: {
                type: Array,
                default: function() {
                    return []
                }
            },
            search: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            treeData() {
                return this.values
            }
        },
        methods: {
            add() {
                this.treeData.push({text: `node ${hp.randString(3).toLowerCase()}`})
            },
            hideNode(node) {
                this.$set(node, '$hidden', true)
            },
            editNode(node) {
                this.selectedNode = node
                this.$emit('takeNode', this.selectedNode)
            },
            searchNode() {
                this.walkTreeData((node, index, parent, path) => {

                    this.$set(node, '$hidden', !node.text.includes(this.searchWord))

                    if (node.text.includes(this.searchWord)) {

                        for (const { node } of this.iteratePath(path, {reverse: true})) {
                            this.$set(node, '$hidden', false)
                        }
                    }

                })
            },
            /*
            overrideSlotDefault({node, path, tree}, original) {
                return <div class="node-content">
                    <button class="mrs drag-trigger">Drag</button>
                    <button class="mrs fold-btn" onClick={() => tree.toggleFold(node, path)}>{node.$folded ? '+' : '-'}</button>
                    {original()}
                    <button class="mls">edit</button>
                    <button class="mls" onClick={() => this.removeNodeByPath(path)}>remove</button>
                    <button class="mls" onClick={() => this.hideNode(node)}>hidden</button>
                </div>
            },
            blockHeader() {
                return <div class="header">
                    <div>
                        <button onClick={this.add}>add</button>
                        <button onClick={this.showHidden} class="mls">show hidden</button>
                    </div>
                    <input onKeydown={(e) => e.key === 'Enter' && this.search(e)} placeholder="Search"  />
                </div>
            },
            blockFooter() {
                return <div class="footer">
                    <i>Nodes count:</i> {this.total}
                </div>
            },
            */
        }
    }
</script>
