import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "@/api/pdfmake/pdfmake";

export const pdfmakeUtil = {

    docPdfGen: function (targetElement, footerElementId = 'footerSection') {

        let tds = targetElement.querySelectorAll(".tableWrapper p")

        for (let p of tds) {
            p.className = "intable"
        }

        let ps = targetElement.querySelectorAll(".ProseMirror p:not(.intable)")

        for (let p of ps) {
            p.className = "outtable"
        }

        let allHtml = targetElement.innerHTML

        if (!targetElement.querySelector("#" + footerElementId)) {
            alert("올바른 Footer Element ID를 입력하십시오.")
            return
        }

        let footerHtml = targetElement.querySelector("#" + footerElementId).innerHTML

        let defaultStyles = {
            'p': {
                // lineHeight: 1.3,
                fontSize: 11.75,
                // margin: [0,0,0,0]
            },
            'table': {
                marginBottom: 5,
                // lineHeight: 1.2
            }
        }

        let styles = { //적용안되고 있음...
            'outtable': {
                lineHeight: 1.3
            },
            'intable': {
                lineHeight: 1
            }
        }

        allHtml = allHtml.replace(/<div data-v-[a-z0-9]*=""\svalue="((.|\n)*)>">/g, "")
        allHtml = allHtml.replace(/&nbsp;/g, " ")
        allHtml = allHtml.replace(/&amp;/g, "&")
        allHtml = allHtml.replace(/text-indent:\s*-?[0-9]+.?[0-9]+(pt|px|em|rem|mm|cm)?\s*;?/g, "") //이 부분을 삭제하지 않으면 paragraph(p tag) 안에 볼드 처리된(strong tag) 부분이 있을 경우 Outdent가 적용되지 않음
        allHtml = allHtml.replace(/colwidth="([0-9]+)"/g, (all, letter) => {
            return "style=\"width:" + ( letter * 1 - 8 ) +"px\""
        })
        allHtml = allHtml.replace(/<table\s+style="(width|min-width):\s*([0-9]+)px\s*;?"/g, "<table data-pdfmake=\"{&quot;layout&quot;:&quot;padding&quot;}\" style=\"$1: $2px\"")

        // console.log("allHtml", allHtml)

        let content = htmlToPdfmake(allHtml, {
            tableAutoSize: true,
            defaultStyles: defaultStyles
        })

        // console.log("content", content)

        let footer = htmlToPdfmake(footerHtml, {
            tableAutoSize: true,
            defaultStyles: defaultStyles
        })
        footer[0].headlineLevel = "footer"
        footer.push({
            text: "1",
            headlineLevel: "end",
            fontSize: 0.1
        })

        let retThin = function () { return 0.1 }
        let retZero = function () { return 0 }
        let ret3 = function () { return 3 }
        let retBalck = function () { return 'black' }

        pdfMake.tableLayouts = {
            padding: {
                hLineWidth: retThin,
                vLineWidth: retThin,
                hLineColor: retBalck,
                vLineColor: retBalck,
                paddingLeft: ret3,
                paddingRight: ret3,
                paddingTop: ret3,
                paddingBottom: ret3
            },
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
        prePdf1.getStream().end();

        //--2. footerInterPages (풋터가 2페이지 이상 걸쳐 있는지 여부) 구하기 (Page Break 기능을 이용함)
        let footerInterPages = false

        let extractFooterInterPages = function(currentNode) {
            if (currentNode.headlineLevel === 'footer' && currentNode.pageNumbers.length > 1) {
                footerInterPages = true
            }
        }

        content[content.length-1].headlineLevel = "footer"

        const prePdf2 = pdfMake.createPdf({
            content: content,
            pageBreakBefore: extractFooterInterPages,
            pageSize: "A4",
            pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
            styles: styles
        });
        prePdf2.getStream().end();

        //--3. PDF 생성
        let pageBreaker = function(currentNode) {
            //노드가 풋터이면서, 페이지에 걸쳐 있는 경우는 페이지 나눔
            if (currentNode.headlineLevel === 'footer' && footerInterPages === true) {
                return true
            }
        }

        let finalContent = htmlToPdfmake(allHtml, {
            tableAutoSize: true,
            defaultStyles: defaultStyles
        })
        finalContent[finalContent.length-1].headlineLevel = "footer"
        finalContent[finalContent.length-1].absolutePosition = { x: leftMargin, y: pageHeight - footerHeight - bottomMargin }

        let docDefinition = {
            content: finalContent,
            pageBreakBefore: pageBreaker,
            pageSize: "A4",
            pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ],
            styles: styles
        }
        // console.log("docDefinition", docDefinition)
        // if (flag == "download") {
        //     pdfMake.createPdf(docDefinition).download("optionalName.pdf")
        // } else {
            pdfMake.createPdf(docDefinition).getDataUrl(function(outDoc) {
                document.getElementById('pdfId').src = outDoc;
            })
        // }
        // pdfMake.createPdf(docDefinition).open({}, window);
    }

}