<template>
    <div>
        <v-btn
                :loading="nowIng"
                :disabled="nowIng"
                color="red darken-2"
                class="ma-2 white--text"
                @click="makePDF"
                small
        >
            <v-icon left dark>mdi-adobe-acrobat</v-icon>
            PDF
        </v-btn>
        <div style="width: 170mm" id="top">
            <div>printBody 높이: {{printBodyHeight}}</div>
            <div id="printBody" ref="printBody" style="width:100%;" @click="$vuetify.goTo('#top')">
                <div v-for="n in 20" :key="n" style="text-indent: -1.6rem; margin-left: 2rem;">
                    {{n}}. 출력하지 않고 싶은
                    <v-icon>mdi-home</v-icon> 영역은
                    태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.
                    영역은 태그에 'data-html2canvas-ignore' attribute를 넣어주면된다.
                    <v-icon @click="$vuetify.goTo('#printFooter')">mdi-sort-calendar-ascending</v-icon>
                </div>
                <!--
                <div data-html2canvas-ignore style="width: 30mm; height: 3mm" class="blue lighten-3"></div>
                -->
            </div>
            <div id="printFooter" style="width:100%;" class="indigo lighten-3">
                <div v-for="k in 5" :key="k">{{k}}. 풋터입니다.</div>
            </div>
        </div>
    </div>
</template>
<script>
    import jsPDF from 'jspdf'
    import html2canvas from "html2canvas";

    export default {
        name: 'pdf',
        data () {
            return {
                fileName: 'mypdf',
                printBodyHeight: 0,
                nowIng: false
            }
        },
        mounted(){
            this.printBodyHeight = this.$refs.printBody.offsetHeight
        },
        methods: {
            makePDF () {
                let that = this
                that.nowIng = true
                window.html2canvas = html2canvas //Vue.js 특성상 window 객체에 직접 할당해야한다.
                let pdf = new jsPDF('p', 'mm', 'A4')
                let canvas = pdf.canvas
                let scale = 3 //이미지 렌더링 스케일(높을 수로 해상도 증가)

                //PAGE 설정
                const PAGE_W_MM = 210 //캔버스 너비 mm
                const PAGE_H_MM = 297 //캔버스 높이 mm
                const TOP_M_MM = 20
                const BOTTOM_M_MM = 20
                const LEFT_M_MM = 20
                const RIGHT_M_MM = 20
                const CONTENT_W_MM = PAGE_W_MM - LEFT_M_MM - RIGHT_M_MM
                const CONTENT_H_MM = PAGE_H_MM - TOP_M_MM - BOTTOM_M_MM

                //뭔 역할?
                canvas.width = PAGE_W_MM
                canvas.height = PAGE_H_MM

                //PRINT AREA 영역
                //(전체페이지)
                let area = document.querySelector("#printBody")
                let areaWpx = area.offsetWidth
                let areaHpx = area.offsetHeight
                let areaHmm = CONTENT_W_MM * areaHpx / areaWpx
                //(한페이지)
                let areaTileWpx = areaWpx
                let areaTileHpx = Math.round( areaWpx * CONTENT_H_MM / CONTENT_W_MM )

                //PRINT FOOTER 영역
                //(전체페이지=한페이지)
                let footer = document.querySelector("#printFooter")
                let footerWpx = footer.offsetWidth
                let footerHpx = footer.offsetHeight
                let footerHmm = CONTENT_W_MM * footerHpx / footerWpx

                if(!area){
                    console.warn('selector is not exist.')
                    return false
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
                console.log("FOOTER 너비(px)", footerHpx)
                console.log("FOOTER 높이(px)", footerWpx)
                console.log("FOOTER 높이(mm)", footerHmm)
                console.log("FOOTER 한페이지 너비(mm)", footerHpx)
                console.log("FOOTER 한페이지 높이(mm)", footerWpx)
                console.log("=============기타 정보=============")
                console.log("총 페이지 수", totalPage)
                console.log("마지막 페이지 콘텐츠 높이(mm)", lastAreaHmm)
                console.log("마지막 페이지 여유 공간 높이(mm)", whiteSpaceHmm)
                console.log("FOOTER 높이(mm)", footerHmm)

                //AREA
                for (let i = 1; i <= totalPage; i++ ) {
                    html2canvas(area, {
                        scale: scale,
                        width: areaTileWpx,                 //이미지 크기(px) x
                        height: areaTileHpx,                //이미지 크기(px) y
                        scrollX: 0,                         //크롭 위치(px) x
                        scrollY: areaTileHpx * (i-1) * -1   //크롭 위치(px) y
                    }).then(function (canvas) {

                        console.log("페이지===============>", i)
                        if (i > 1) pdf.addPage()
                        pdf.addImage(canvas.toDataURL('image/jpeg', 0.5), 'jpeg', LEFT_M_MM, TOP_M_MM, CONTENT_W_MM, CONTENT_H_MM, undefined, 'slow')

                    })
                }

                //FOOTER
                html2canvas(footer, {
                    scale: scale,
                    width: footerWpx,
                    height: footerHpx,
                    scrollX: 0,
                    scrollY: 0
                }).then ( function(canvas) {

                    if (footerHmm > whiteSpaceHmm) pdf.addPage()
                    pdf.addImage(canvas.toDataURL('image/jpeg', 0.5), 'jpeg', LEFT_M_MM, TOP_M_MM + CONTENT_H_MM - footerHmm, CONTENT_W_MM, footerHmm)
                    pdf.save(that.fileName.toLowerCase() +'.pdf')

                }).then (() => {

                    setTimeout(() => ( that.nowIng = false ), 1000)
                    //that.nowIng = false
                })
            },
        }
    }
</script>
