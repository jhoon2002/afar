<template>
    <div>
        <button @click="makePDF">PDF</button>
        <div id="printArea" style="width:210mm;" class="red lighten-3">
            1. 출력하지 않고 싶은 영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.
            <v-icon>mdi-home</v-icon>
            <div data-html2canvas-ignore style="width: 30mm; height: 3mm" class="blue lighten-3">

            </div>
            <p class="text-h2">출력되냐구?</p>
        </div>
        <div id="printFooter" style="width: 210mm; height: 20mm;" class="indigo lighten-3">
            풋터입니다.
        </div>
    </div>
</template>
<script>
    //import html2canvas from 'html2canvas'
    import jsPDF from 'jspdf'
    import html2canvas from "html2canvas";

    export default {
        name: 'pdf',
        data () {
            return {
                propTitle: 'mypdf'
            }
        },
        methods: {
            makePDF (selector = 'body') {
                window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
                let that = this
                that.making = true
                let pdf = new jsPDF('p', 'mm', 'a4')
                let canvas = pdf.canvas
                const pageWidth = 210 //캔버스 너비 mm
                const pageHeight = 297 //캔버스 높이 mm
                //canvas.width = pageWidth

                let scale = 2.5 //이미지 렌더링 스케일(높을 수로 해상도 증가)
                let topMargin = 20
                let bottomMargin = 20
                let leftMargin = 20
                let rightMargin = 20

                let contentWidth = pageWidth - leftMargin - rightMargin
                let contentHeight = pageHeight - topMargin - bottomMargin

                canvas.width = contentWidth
                canvas.height = contentHeight
                let whiteSpaceImageData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAACAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKAAD//Z"

                console.log(whiteSpaceImageData)

                let ele = document.querySelector("#printArea")
                let width = ele.offsetWidth // 셀렉트한 요소의 px 너비
                let height = ele.offsetHeight // 셀렉트한 요소의 px 높이
                let imgHeight = pageWidth * height/width // 이미지 높이값 px to mm 변환

                console.log("ele.offsetWidth: " + ele.offsetWidth, "ele.offsetHeight: " + ele.offsetHeight, "imgHeight: " + imgHeight)


                //console.log("elef.offsetWidth: " + elef.offsetWidth, "elef.offsetHeight: " + elef.offsetHeight, "imgHeightf: " + imgHeightf)

                if(!ele){
                    console.warn(selector + ' is not exist.')
                    return false
                }

                //마지막 페이지의 빈공간 높이 계산(이 보다 footer 높이가 높으면 다음 페이지 추가)
                let whiteSpaceHeight = contentHeight - (imgHeight % contentHeight)
                console.log(whiteSpaceHeight)

                console.log("area 높이", imgHeight )
                //console.log("footer 높이", imgHeightf)
                console.log("content 높이", contentHeight)
                //console.log("시작높이", topMargin + (contentHeight-imgHeightf) )
                console.log("canvas width", canvas.width )
                console.log("canvas height", canvas.height )


                html2canvas(ele, {
                    scale: scale,
                    width: 100,
                    height: 100,
                    scrollX: -40,
                    scrollY: -40
                }).then ( function(canvas) {

                        let position = 0
                        const imgData = canvas.toDataURL('image/jpeg', 0.5)
                        pdf.addImage(imgData, 'png', 20, 20, 30, 30, undefined, 'slow')

                        //Paging 처리
                        let heightLeft = imgHeight //페이징 처리를 위해 남은 페이지 높이 세팅.
                        heightLeft -= pageHeight
                        while (heightLeft >= 0) { //페이지 높이보다 이미지 높이가 큰 경우, 즉은 남은 페이지가 있는 경우
                            position = heightLeft - imgHeight
                            pdf.addPage();
                            pdf.addImage(imgData, 'jpeg', 0, position, pageWidth, imgHeight)
                            heightLeft -= pageHeight
                        }
                    }
                )

                //footer 설정
                let elef = document.querySelector("#printFooter")
                let widthf = elef.offsetWidth // 셀렉트한 요소의 px 너비
                let heightf = elef.offsetHeight // 셀렉트한 요소의 px 높이
                let imgHeightf = pageWidth * heightf/widthf // 이미지 높이값 px to mm 변환

                html2canvas(elef, {
                    scale: scale
                }).then ( function(canvas) {
                        //pdf.addPage();
                        pdf.addImage(canvas.toDataURL('image/jpeg', 0.5), 'jpeg', 0, pageHeight-imgHeightf, pageWidth, imgHeightf)
                        pdf.save(that.propTitle.toLowerCase() +'.pdf')
                    }
                )
            },
        }
    }
</script>