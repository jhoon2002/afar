<template>
    <v-btn
            :loading="nowIng"
            :disabled="nowIng"
            @click="makePDF"
            large
    >
        <v-icon left dark>mdi-adobe-acrobat</v-icon>
        PDF
    </v-btn>
</template>
<script>
    import jsPDF from 'jspdf'
    import html2canvas from "html2canvas";

    export default {
        name: "PdfButton",
        props: {
            filename: {
                type: String,
                default: "myPdf"
            },
            scale: {
                type: String,
                default: "2"
            },
            quality: { //0.00~1.00
                type: String,
                default: "0.92"
            },
            compression: {
                type: String,
                default: "slow"
            },
            top: {
                type: Number,
                default: 20
            },
            bottom: {
                type: Number,
                default: 15
            },
            left: {
                type: Number,
                default: 20
            },
            right: {
                type: Number,
                default: 20
            },
            area: {
                type: String,
                default: ""
            },
            footer: {
                type: String,
                default: ""
            }
        },
        data () {
            return {
                printBodyHeight: 0,
                nowIng: false
            }
        },
        mounted(){
            //this.printBodyHeight = this.$refs.printBody.offsetHeight
        },
        methods: {
            makePDF () {
                let that = this
                that.nowIng = true
                window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
                let pdf = new jsPDF('p', 'mm', 'A4')
                let canvas = pdf.canvas
                let scale = parseInt(that.scale) //이미지 렌더링 스케일(높을 수로 해상도 증가)
                let quality = parseInt(that.quality*100)/100 //인코딩 옵션 (0.00~1.00)

                //PAGE 설정
                const PAGE_W_MM = 210 //캔버스 너비 mm
                const PAGE_H_MM = 297 //캔버스 높이 mm
                const TOP_M_MM = that.top
                const BOTTOM_M_MM = that.bottom
                const LEFT_M_MM = that.left
                const RIGHT_M_MM = that.right
                const CONTENT_W_MM = PAGE_W_MM - LEFT_M_MM - RIGHT_M_MM
                const CONTENT_H_MM = PAGE_H_MM - TOP_M_MM - BOTTOM_M_MM

                //뭔 역할?
                canvas.width = PAGE_W_MM
                canvas.height = PAGE_H_MM

                //PRINT AREA 영역
                //(전체페이지)
                let area = document.querySelector("#" + that.area)
                let areaWpx = area.offsetWidth
                let areaHpx = area.offsetHeight
                let areaHmm = CONTENT_W_MM * areaHpx / areaWpx
                //(한페이지)
                let areaTileWpx = areaWpx
                let areaTileHpx = Math.round( areaWpx * CONTENT_H_MM / CONTENT_W_MM )

                //PRINT FOOTER 영역
                //(전체페이지=한페이지)
                let footer = null
                let footerWpx = 0
                let footerHpx = 0
                let footerHmm = 0
                if (that.footer !== "") {
                    footer = document.querySelector("#" + that.footer)
                    footerWpx = footer.offsetWidth
                    footerHpx = footer.offsetHeight
                    footerHmm = CONTENT_W_MM * footerHpx / footerWpx
                }

                //총 페이지
                let totalPage = Math.ceil(areaHmm / CONTENT_H_MM)
                //마지막 페이지 콘텐츠 높이
                let lastAreaHmm = areaHmm % CONTENT_H_MM
                //마지막 페이지의 여유 공간 높이(이 보다 footer 높이가 높으면 다음 페이지 추가)
                let whiteSpaceHmm = CONTENT_H_MM - lastAreaHmm

                console.log("=============PAGE SETTING=============")
                console.log("페이지 너비(mm)", PAGE_W_MM)
                console.log("페이지 높이(mm)", PAGE_H_MM)
                console.log("윗여백(mm)", TOP_M_MM)
                console.log("아래여백(mm)", BOTTOM_M_MM)
                console.log("왼쪽여백(mm)", LEFT_M_MM)
                console.log("오른쪽여백(mm)", RIGHT_M_MM)
                console.log("콘텐츠영역 너비(mm)", CONTENT_W_MM)
                console.log("콘텐츠영역 높이(mm)", CONTENT_H_MM)
                console.log("=============PRINT TARGET=============")
                console.log("AREA 너비(px)", areaWpx)
                console.log("AREA 높이(px)", areaHpx)
                console.log("AREA 높이(mm)", areaHmm)
                console.log("AREA 한페이지 너비(px)", areaTileWpx)
                console.log("AREA 한페이지 높이(px)", areaTileHpx)
                if (that.footer !== "") {
                    console.log("FOOTER 너비(px)", footerHpx)
                    console.log("FOOTER 높이(px)", footerWpx)
                    console.log("FOOTER 높이(mm)", footerHmm)
                    console.log("FOOTER 한페이지 너비(mm)", footerHpx)
                    console.log("FOOTER 한페이지 높이(mm)", footerWpx)
                }
                console.log("=============기타 정보=============")
                console.log("총 페이지 수", totalPage)
                console.log("마지막 페이지 콘텐츠 높이(mm)", lastAreaHmm)
                console.log("마지막 페이지 여유 공간 높이(mm)", whiteSpaceHmm)
                if (that.footer !== "") {
                    console.log("FOOTER 높이(mm)", footerHmm)
                }

                //AREA
                for (let i = 1; i <= totalPage; i++ ) {
                    html2canvas(area, {
                        scale: scale,
                        width: areaTileWpx,                 //이미지 크기(px) x
                        height: areaTileHpx,                //이미지 크기(px) y
                        scrollX: 0,                         //크롭 위치(px) x
                        scrollY: areaTileHpx * (i-1) * -1   //크롭 위치(px) y
                    }).then((canvas) => {

                        if (i > 1) pdf.addPage()
                        console.log("---------------")
                        pdf.addImage(canvas.toDataURL('image/jpeg', quality), 'jpeg', LEFT_M_MM, TOP_M_MM, CONTENT_W_MM, CONTENT_H_MM, undefined, that.compression)

                    }).then(() => {

                        if (that.footer === "" && i == totalPage) {
                            pdf.save(that.filename.toLowerCase() + '.pdf')
                            setTimeout(() => (that.nowIng = false), 1000)
                        }

                    })
                }

                //FOOTER
                if (that.footer !== "") {
                    html2canvas(footer, {
                        scale: scale,
                        width: footerWpx,
                        height: footerHpx,
                        scrollX: 0,
                        scrollY: 0
                    }).then((canvas) => {

                        if (footerHmm > whiteSpaceHmm) pdf.addPage()
                        pdf.addImage(canvas.toDataURL('image/jpeg', quality), 'jpeg', LEFT_M_MM, TOP_M_MM + CONTENT_H_MM - footerHmm, CONTENT_W_MM, footerHmm, undefined, that.compression)

                    }).then(() => {

                        pdf.save(that.filename.toLowerCase() + '.pdf')
                        setTimeout(() => (that.nowIng = false), 1000)

                    })
                }
            },
        }
    }
</script>
