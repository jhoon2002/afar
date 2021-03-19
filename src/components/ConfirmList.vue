<template>
    <div>
        <template v-if="type === 'formal'">
            <table class="confirm-table"
                   data-pdfmake="{&quot;layout&quot;:&quot;noLine&quot;}"
                   style="border-spacing: 0; margin-bottom:3pt;"
            >
                <tr>
                    <td v-if="name"
                        rowspan="2"
                        class="tdLineHeight"
                        style="font-size: 9pt; padding-right: 10pt; margin-right: 10pt;"
                    >
                        {{name}}
                    </td>
                    <template v-for="(item, index) of items">
                        <td :key="index+'01'"
                            rowspan="2"
                            class="tdLineHeight"
                            style="font-size: 9pt;
                                   margin-right: 3pt; padding-right: 3pt"
                        >
                            {{item.role}}
                        </td>
                        <td :key="index+'02'"
                            class="tdLineHeight"
                            style="font-size: 8.5pt;"
                        >
                            {{item.kind}} {{item.date}}
                        </td>
                        <td v-if="items.length !== index+1"
                            :key="index+'03'"
                            class="tdLineHeight"
                            :style="`width: ${ items.length < 5 ? '40' : '30' }pt`"
                        >
                        </td>
                    </template>
                </tr>
                <tr>
                    <template v-for="(item, index) of items">
                        <td :key="index+'04'"
                            class="tdLineHeight"
                            style="font-size: 9pt;"
                        >
                            <span style="font-weight: bold">
                                {{item.name}}
                            </span>
                        </td>
                        <td v-if="items.length !== index+1"
                            :key="index+'05'"
                            class="tdLineHeight"
                        >
                        </td>
                    </template>
                </tr>
            </table>
        </template>
        <template v-else-if="type === 'list'">
            <table class="confirm-table"
                   data-pdfmake="{
                        &quot;layout&quot;: &quot;noLine&quot;,
                        &quot;widths&quot;: [45, &quot;*&quot;]
                   }"
                   style="border-spacing: 0; margin-top: 3pt"
            >
                <td class="tdLineHeight" style="font-size: 9pt; width: 45pt" v-if="name">
                    {{name}}
                </td>
                <td class="tdLineHeight" style="font-size: 9pt">
                    <template v-for="(item, index) of items">
                        <span :key="index+'01'"
                              style=""
                        >
                            {{item.role}}
                        </span>
                        <span :key="index+'02'"
                              style="font-weight: bold; margin-right: 4pt"
                        >
                            {{item.name + " " + " " + " "}}
                        </span>
                    </template>
                </td>
            </table>
        </template>
    </div>
</template>
<script>
    export default {
        name: "ConfirmList",
        props: ["name", "items", "type"]
    }
</script>
<style scoped>
    .confirm-table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    .title-table td,
    .receiver-table td,
    .confirm-table td {
        /*border: 1px solid blue;*/
        vertical-align: top;
    }
    .tdLineHeight {
        line-height: 120%;
    }
</style>