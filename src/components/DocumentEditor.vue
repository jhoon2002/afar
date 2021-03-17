<template>
    <v-sheet>
        <v-sheet class="mb-3">
            <v-btn @click="pdfgen()" dark color="primary" elevation="0" class="mr-2">
                <v-icon small left>mdi-monitor</v-icon>
                미리보기
            </v-btn>
            <v-btn @click="pdfgen('download')" dark color="pink" elevation="0">
                <v-icon small left>mdi-download</v-icon>
                다운로드
            </v-btn>
        </v-sheet>
        <div style="width: 210mm; border: 1px solid #dddddd" outlined elevation="4">
            <div style="padding: 20mm 20mm 15mm 20mm; line-height: 140%" ref="printArea">
                <div  style="border: 1px solid red" id="printArea">
                    <table style="width:100%; margin-bottom: 20pt" data-pdfmake="{&quot;layout&quot;:&quot;noLine&quot;}">
                        <tr>
                            <td colspan="3" style="text-align: center; vertical-align: top">창직의 산실</td>
                        </tr>
                        <tr>
                            <td style="width:20%; height: 40pt; text-align: center; vertical-align: top">
                                <img style="width: 55pt; margin-top: 12pt;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAABJCAYAAACzSto0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTI5NDhBRUZCRjdFMTFFMzgzMjZFMDU2NDc2ODk2N0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTI5NDhBRjBCRjdFMTFFMzgzMjZFMDU2NDc2ODk2N0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Mjk0OEFFREJGN0UxMUUzODMyNkUwNTY0NzY4OTY3QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5Mjk0OEFFRUJGN0UxMUUzODMyNkUwNTY0NzY4OTY3QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PofeJeEAABB2SURBVHja7F0JlBbF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">
                            </td>
                            <td style="width:60%; height: 40pt; text-align: center; vertical-align: top">
                                <div style="font-size: 17pt; margin-top: 10pt">한국예술종합학교 산학협력단</div>
                            </td>
                            <td style="width:20%; height: 40pt; text-align: center; vertical-align: top"></td>
                        </tr>
                    </table>
                    <table data-pdfmake="{&quot;layout&quot;:&quot;noLine&quot;}" style="margin-bottom: 0pt">
                        <tr>
                            <td style="width: 40pt; margin-bottom: 4pt; vertical-align: top">수신</td>
                            <td style="width: 442pt; margin-bottom: 4pt; vertical-align: top">산학협력단장</td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 4pt; vertical-align: top">(경유)</td>
                            <td style="margin-bottom: 4pt; vertical-align: top">전략기획팀</td>
                        </tr>
                        <tr>
                            <td style="margin-bottom: 4pt; vertical-align: top">제목</td>
                            <td style="margin-bottom: 4pt; vertical-align: top">
                                2021 한국예술종합학교 산학협력단 운영 계획 및 예산안 수립 계획
                            </td>
                        </tr>
                    </table>
                    <hr style="border: none; border-top: 1px solid black; margin-top:2pt;" data-pdfmake="{&quot;left&quot;:0, &quot;width&quot;:482, &quot;color&quot;:&quot;black&quot;, &quot;margin&quot;:[0,2,0,20], &quot;thickness&quot;:0.1}">

                    <div style="height: 100pt">

                    </div>
                </div>

                <div ref="footerArea">
                    <div>
                        <hr style="border: none; height: 7pt; background: #999999;" data-pdfmake="{&quot;left&quot;:0, &quot;width&quot;:482, &quot;color&quot;:&quot;black&quot;, &quot;margin&quot;:[0,2,0,20], &quot;thickness&quot;:0.1}">
                        <table data-pdfmake="{&quot;layout&quot;:&quot;noLine&quot;}" style="margin-bottom: 0pt">
                            <tr>
                                <td style="width: 40pt; margin-bottom: 4pt; vertical-align: top">수신</td>
                                <td style="width: 442pt; margin-bottom: 4pt; vertical-align: top">산학협력단장</td>
                            </tr>
                            <tr>
                                <td style="margin-bottom: 4pt; vertical-align: top">(경유)</td>
                                <td style="margin-bottom: 4pt; vertical-align: top">전략기획팀</td>
                            </tr>
                            <tr>
                                <td style="margin-bottom: 4pt; vertical-align: top">제목</td>
                                <td style="margin-bottom: 4pt; vertical-align: top">
                                    2021 한국예술종합학교 산학협력단 운영 계획 및 예산안 수립 계획
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!--
        <v-btn color="primary" @click="nextStep(2)">
            <v-icon left>mdi-card-bulleted-outline</v-icon>문서관리카드
        </v-btn>
        -->
    </v-sheet>
</template>
<script>
    import pdfMake from '@/assets/pdfmake.js'
    import htmlToPdfmake from "html-to-pdfmake"

    export default {
        methods: {
            pdfgenOri(flag) {
                console.log(this.$refs.printArea.innerHTML)
                let html = htmlToPdfmake(this.$refs.printArea.innerHTML, {
                    tableAutoSize:true
                })

                let docDefinition = {
                    content: html
                }
                if (flag == "download") {
                    pdfMake.createPdf(docDefinition).download("optionalName.pdf")
                } else {
                    pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc) {
                        document.getElementById('pdfId').src = outDoc;
                    })
                }
            },
            pdfgen(flag) {
                // let str1 = "대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다. "
                // let str2 = "FOOTER FOOTER FOOTER FOOTER FOOTER FOOTER FOOTER "
                let content = ""
                let footer = "---------------"
                /*
                for (let i=0; i < 211; i++) {
                    content = content + str1
                }
                for (let i=0; i < 16; i++) {
                    footer = footer + str2
                }
                */
                content = htmlToPdfmake(this.$refs.printArea.innerHTML, {
                    tableAutoSize:true
                })

                footer = htmlToPdfmake(this.$refs.footerArea.innerHTML, {
                    tableAutoSize:true
                })
                footer[0].headlineLevel = "footer"
                footer.push({
                    text: "1",
                    headlineLevel: "end",
                    fontSize: 1
                })
                console.log("footer", footer)

                let styles = {
                    'html-table': {
                    },
                    'html-td': {
                    }
                }

                let retThin = function () { return 0.1 }
                let retZero = function () { return 0 }
                let retBalck = function () { return 'black' }

                pdfMake.tableLayouts = {
                    thinLine: {
                        hLineWidth: retThin,
                        vLineWidth: retThin,
                        hLineColor: retBalck,
                        vLineColor: retBalck,
                        paddingLeft: retZero,
                        paddingRight: retZero,
                        paddingTop: retZero,
                        paddingBottom: retZero
                    },
                    noLine: {
                        hLineWidth: retZero,
                        vLineWidth: retZero,
                        paddingLeft: retZero,
                        paddingRight: retZero,
                        paddingTop: retZero,
                        paddingBottom: retZero
                    }
                }

                //단위: point
                let pageHeight = 841.89  //297mm pageWidth = 595.276(210mm)
                let leftMargin = 56.7    //20mm
                let topMargin = 56.7     //20mm
                let rightMargin = 56.7   //20mm
                let bottomMargin = 42.5  //15mm


                //--1. footerHeight 구하기 (Page Break 기능을 이용함)
                let footerHeight = 0

                /*
                 * 다음 노드가 동일 페이지에 있을 경우 followingNodesOnPage 배열에 나타나며
                 * 다음 페이지에 있을 경우는 nodesOnNextPage 배열에 나타남
                 */
                let extractFooterHeight = function(currentNode, followingNodesOnPage) {
                    if (currentNode.headlineLevel === 'footer') {
                        let footerTop = currentNode.startPosition.top
                        //풋터가 한페이지에 꽉차거나 넘쳐서 마지막 노드가 다음 페이지에 나타나는 경우 todo: 수정 필요
                        if (followingNodesOnPage.length <= 0) {
                            footerHeight = 0
                        } else { //한페이지 이내
                            footerHeight = followingNodesOnPage[followingNodesOnPage.length-1].startPosition.top - footerTop + 5 //+5는 여분
                        }
                    }
                }
                const prePdf1 = pdfMake.createPdf({
                    content: footer,
                    pageBreakBefore: extractFooterHeight,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                })
                prePdf1.getStream();

                console.log("footerHeight", footerHeight)

                //--2. footerInterPages (풋터가 2페이지 이상 걸쳐 있는지 여부) 구하기 (Page Break 기능을 이용함)
                let footerInterPages = false

                let extractFooterInterPages = function(currentNode) {
                    if (currentNode.headlineLevel === 'footer' && currentNode.pageNumbers.length > 1) {
                        footerInterPages = true
                    } else {
                        footerInterPages = false
                    }
                }

                content[content.length-1].headlineLevel = "footer"
                //console.log("content2", content)

                console.log("content(여기):", content)

                const prePdf2 = pdfMake.createPdf({
                    content: [],
                    pageBreakBefore: extractFooterInterPages,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                });
                prePdf2.getStream();

                //--3. PDF 생성
                let pageBreaker = function(currentNode) {
                    //노드가 풋터이면서, 페이지에 걸쳐 있는 경우는 페이지 나눔
                    if (currentNode.headlineLevel === 'footer' && footerInterPages === true) {
                        return true
                    }
                }

                content[content.length-1].absolutePosition = { x: leftMargin, y: pageHeight - footerHeight - bottomMargin }
                console.log(pageHeight)
                //console.log("content3", content)
                /*
                content.push({
                    text: footer,
                    headlineLevel: "footer",
                    absolutePosition: { x: leftMargin, y: pageHeight - footerHeight - bottomMargin}
                })
                 */
                console.log("content(여기2):", content)
                let docDefinition = {
                    content: content,
                    pageBreakBefore: pageBreaker,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
                    styles: styles
                }
                if (flag == "download") {
                    pdfMake.createPdf(docDefinition).download("optionalName.pdf")
                } else {
                    pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc) {
                        document.getElementById('pdfId').src = outDoc;
                    })
                }
            }
        }
    }
</script>
<style scoped>
    #printArea td {
        font-size: 11.9pt;
    }
    .kkk {
        color: blue
    }
</style>