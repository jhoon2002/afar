<!-- Demo6CustomTreeView.vue -->
<template>
    <Tree :value="treeData">
        <div
                slot-scope="{node, index, path, tree}"
                style="cursor: pointer"
                class="d-flex justify-space-between"
                @click="editNode(node)"
        >
            <div>
                <v-icon>
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
        </div>
    </Tree>
</template>
<script>
    import 'he-tree-vue/dist/he-tree-vue.css'
    import {Tree, Fold, Check, Draggable} from 'he-tree-vue'
    import * as hp from 'helper-js'

    export default {
        extends: Tree,
        mixins: [Fold, Check, Draggable],
        props: {
            triggerClass: {
                default: 'drag-trigger'
            },
            draggable: {
                type: [Boolean, Function],
                default: false
            },
            droppable: {
                type: [Boolean, Function],
                default: false
            },
            items: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data() {
            return {
                treeClass: 'my-tree-view1',
            }
        },
        computed: {
            total() {
                let i = 0
                this.walkTreeData(() => {
                    i++
                })
                return i
            },
            treeData() {
                return this.items
            }
        },
        methods: {
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
            //
            add() {
                this.treeData.push({text: `node ${hp.randString(3).toLowerCase()}`})
            },
            showHidden() {
                this.walkTreeData((node) => {
                    this.$set(node, '$hidden', false)
                })
            },
            hideNode(node) {
                this.$set(node, '$hidden', true)
            },
            search() {
                this.walkTreeData((node, index, parent, path) => {

                    this.$set(node, '$hidden', !node.text.includes(this.searchWord))

                    if (node.text.includes(this.searchWord)) {

                        for (const { node } of this.iteratePath(path, {reverse: true})) {
                            this.$set(node, '$hidden', false)
                        }

                        //let now = this.treeData
                        //for (let i of path) {
                        //    this.$set(now[i], '$hidden', false)
                        //    now = now[i].children
                        //}
                    }

                })
            }
        },
    }
</script>

<style>
    .my-tree-view1 .mls{
        margin-left: 5px;
    }
    .my-tree-view1 .mrs{
        margin-right: 5px;
    }
    .my-tree-view1 .tree-node{
        padding: 0;
        border: none;
    }
    .my-tree-view1 .node-content{
        display: flex;
    }
    .my-tree-view1 .node-content .fold-btn{
        display: flex;
        justify-content: center;
        width: 22px;
        border-radius: 100%;
        border: none;
        background: #fcf1a8;
    }
    .my-tree-view1 .tree-node-back:hover{
        background: #f5f5f5;
    }
    .my-tree-view1 .header{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }
    .my-tree-view1 .footer{
        border-top: 1px solid #ccc;
        margin-top: 10px;
    }
</style>