import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "@/apis/pdfmake/pdfmake";

export const pdfmakeUtil = {

    docPdfGen: function (targetElement, footerElementId = 'footerSection') {

        let allHtml = targetElement.innerHTML

        let footerElement = targetElement.querySelector("#" + footerElementId)

        if (!footerElement) {
            alert("올바른 Footer Element ID를 입력하십시오.")
            return
        }

        let footerHtml = footerElement.innerHTML

        /*
         * <html-to-pdfmake 스타일 적용 순서> => 모두 잘 작동하고 있음
         * 1. data-pdfmake="&quot;lineHeight&quot;:1.3"
         * 2. defaultStyles = { lineHeight: 1.5 }
         * 3. html내에 class="some" 설정 후, 아래 styles = { 'some': { lineHeight: 1 } }
         *
         */

        //html-to-pdfmake의 defaultStyles를 재정의(여기선 reset만 하기로)
        let defaultStyles = {
            'p': {
                margin: [0, 0, 0, 0] // reset
            },
            'table': {
                marginBottom: '' // reset
            }
        }

        //html 내 class에 대응하는 style
        let styles = {
            'table-in-editor': {
                margin: [2, 2, 2, 2]
            },
            'p-in-editor': {
                fontSize: 11.75,
                lineHeight: 1.3
            },
            'p-in-table-in-editor': {
                fontSize: 11.75,
                lineHeight: 1
            }
        }

        // allHtml = allHtml.replace(/<div data-v-[a-z0-9]*=""\svalue="((.|\n)*)>">/g, "")
        allHtml = allHtml.replace(/&amp;/g, "&")
        allHtml = allHtml.replace(/&nbsp;/g, " ")
        allHtml = allHtml.replace(/text-indent:\s*-?[0-9]+.?[0-9]+(pt|px|em|rem|mm|cm)?\s*;?/g, "") //이 부분을 삭제하지 않으면 paragraph(p tag) 안에 볼드 처리된(strong tag) 부분이 있을 경우 Outdent가 적용되지 않음

        //td 안에 colwidth는 인식 불가 width로 변경하면서 pdfmake에 맞게 width 크기 조절(자체 패딩 감안)
        allHtml = allHtml.replace(/colwidth="([0-9]+)"/g, (all, letter) => {
            return "style=\"width:" + ( letter * 1 - 8 ) +"px\""
        })

        //document > table 에게 class(table-in-editor) 부여, data-pdfmake로 layout(padding) 부여
        allHtml = allHtml.replace(/<table\s+style="([^"]*)"/g, "<table style=\"$1\" class='table-in-editor' data-pdfmake=\"{&quot;layout&quot;:&quot;padding&quot;}\"")

        //document > table > td > p는 기본 class(p-in-editor)를 대신하여 p-in-table-in-editor로 대체
        allHtml = allHtml.replace(/<td([^>]*)><p class="p-in-editor"/g, "<td$1><p class=\"p-in-table-in-editor\"")

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