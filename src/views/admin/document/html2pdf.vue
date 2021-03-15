<template>
    <div class="vuepdf">
        <h1>11111</h1>
        <div id="pdf">
            <button v-on:click="pdfgen">Generate PDF</button>
        </div>
    </div>
</template>

<script>
    var pdfMake = require("pdfmake/build/pdfmake.js")
    var pdfFonts = require("pdfmake/build/vfs_fonts.js")
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    export default {
        data() {
            return {};
        },
        methods: {
            pdfgen() {
                var docDefinition = {
                    content: "This is an sample PDF printed with pdfMake"
                };
                pdfMake.createPdf(docDefinition).download("optionalName.pdf");
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>