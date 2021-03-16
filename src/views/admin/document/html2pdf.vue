<template>
    <div>
        <v-row no-gutters>
            <v-col cols="6">
                <v-card >
                    <v-btn @click="pdfgen()">인쇄</v-btn>
                    <v-btn @click="pdfgen('download')">다운로드</v-btn>
                    <div style="width: 210mm">
                        <div style="padding: 20mm 20mm 15mm 20mm; border: 1px solid #dddddd" ref="printArea">
                            <div style="text-align: center">창작의 산실</div>
                            <h2 style="text-align: center">한국예술종합학교</h2>
                            <div style="margin-top: 5cm;">제목: 업무추진비지급요청</div>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>
                            <table width="100%">
                                <thead>
                                <th>이름</th>
                                <th>내용</th>
                                <th>비고</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>여종훈</td>
                                    <td>한국예술종합학교 산학협력단 부단장</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                </tbody>
                            </table>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>

                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>
                            <div style="margin-top: 3cm;">
                                대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
                                정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다.
                                모든 국민은 학문과 예술의 자유를 가진다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.
                                모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.
                                헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며,
                                재판관은 대통령이 임명한다. 모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.
                                이 헌법에 의한 최초의 대통령의 임기는 이 헌법시행일로부터 개시한다. 대통령은 전시·사변 또는 이에 준하는
                                국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는
                                법률이 정하는 바에 의하여 계엄을 선포할 수 있다.

                                각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
                                국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.
                                법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를
                                제한하거나 인정하지 아니할 수 있다. 대통령은 법률에서 구체적으로 범위를 정하여 위임받은
                                사항과 법률을 집행하기 위하여 필요한 사항에 관하여 대통령령을 발할 수 있다. 헌법재판소
                                재판관은 정당에 가입하거나 정치에 관여할 수 없다. 사면·감형 및 복권에 관한 사항은 법률로 정한다.
                                훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.
                            </div>

                            <table>
                                <thead>
                                <th>이름</th>
                                <th>내용</th>
                                <th>비고</th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>여종훈</td>
                                    <td>한국예술종합학교 산학협력단 부단장</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                <tr>
                                    <td>김현철</td>
                                    <td>한국예술종합학교 학생과</td>
                                    <td>2019.3.5.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="6" class="pl-5">
                <v-card class="pa-3">
                    <iframe id="pdfId" style="height:1000px; width: 100%; background: white; border: 0;"></iframe>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import pdfMake from '@/assets/pdfmake.js'
    // import htmlToPdfmake from "html-to-pdfmake"

    export default {
        data() {
            return {
                message: "내용입니당!!"
            }
        },
        methods: {
            pdfgen(flag) {

                let str1 = "대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다. "
                let str2 = "FOOTER FOOTER FOOTER FOOTER FOOTER FOOTER FOOTER "

                let content = ""
                let footer = ""
                for (let i=0; i < 211; i++) {
                    content = content + str1
                }
                for (let i=0; i < 16; i++) {
                    footer = footer + str2
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

                        //풋터가 한페이지에 꽉차거나 넘쳐서 마지막 노드가 다음 페이지에 나타나는 경우
                        if (followingNodesOnPage.length <= 0) {
                            footerHeight = 0
                        } else { //한페이지 이내
                            footerHeight = followingNodesOnPage[0].startPosition.top - footerTop + 5 //+5는 여분
                        }
                    }
                }

                const prePdf1 = pdfMake.createPdf({
                    content: [
                        {text: footer, headlineLevel: "footer"},
                        {text: "1", headlineLevel: "end", fontSize: 1}
                    ],
                    pageBreakBefore: extractFooterHeight,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ]
                })
                prePdf1.getStream();

                //--2. footerInterPages (풋터가 2페이지 이상 걸쳐 있는지 여부) 구하기 (Page Break 기능을 이용함)
                let footerInterPages = false

                let extractFooterInterPages = function(currentNode) {
                    if (currentNode.headlineLevel === 'footer' && currentNode.pageNumbers.length > 1) {
                        footerInterPages = true
                    } else {
                        footerInterPages = false
                    }
                }

                const prePdf2 = pdfMake.createPdf({
                    content: [
                        {text: content},
                        {text: footer, headlineLevel: "footer"}
                    ],
                    pageBreakBefore: extractFooterInterPages,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ]
                });
                prePdf2.getStream();

                //--3. PDF 생성
                let pageBreaker = function(currentNode) {

                    //노드가 풋터이면서, 페이지에 걸쳐 있는 경우는 페이지 나눔
                    if (currentNode.headlineLevel === 'footer' && footerInterPages === true) {
                        return true
                    }
                }
                let docDefinition = {
                    content: [
                        {
                            text: content
                        },
                        {
                            text: footer,
                            headlineLevel: "footer",
                            absolutePosition: { x: leftMargin, y: pageHeight - footerHeight - bottomMargin}
                        }
                    ],
                    pageBreakBefore: pageBreaker,
                    pageSize: "A4",
                    pageMargins: [ leftMargin, topMargin, rightMargin, bottomMargin ]
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
    };
</script>

/*
console.log("페이지 걸침")
console.log("총걸침페이지: " + footerinterPage)
console.log("footerTop: " + footerTop)
console.log("endTop: " + endTop)
footerInterPages = true
footerHeight = ((pageInnerHeight + topMargin) - footerTop - bottomMargin) + (endTop - topMargin) + ((footerinterPage - 2) * pageInnerHeight)
console.log("최종 높이 ((pageInnerHeight + topMargin) - footerTop - bottomMargin) + (endTop - topMargin) + ((footerinterPage - 2) * pageInnerHeight): " + footerHeight)



let pageBreaker = function(currentNode, followingNodesOnPage, nodesOnNextPage) {

// console.log("=========pageBreaker===========")
// console.log("currentNode", currentNode)

if (currentNode.headlineLevel === 'footer') {
console.log("currentNode:footer", currentNode)
console.log("followingNodesOnPage:end", followingNodesOnPage)
console.log("nodesOnNextPage:end", nodesOnNextPage)
let footerTop = currentNode.startPosition.top
let footerinterPage = currentNode.pageNumbers.length //풋터가 몇페이지에 걸쳐있는지..
let endTop = 0
let pageInnerHeight = currentNode.startPosition.pageInnerHeight
if (footerinterPage > 1) {
endTop = nodesOnNextPage[0].startPosition.top
console.log("페이지 걸침")
console.log("총걸침페이지: " + footerinterPage)
console.log("footerTop: " + footerTop)
console.log("endTop: " + endTop)
footerInterPages = true
footerHeight = ((pageInnerHeight + topMargin) - footerTop - bottomMargin) + (endTop - topMargin) + ((footerinterPage - 2) * pageInnerHeight)
console.log("최종 높이 ((pageInnerHeight + topMargin) - footerTop - bottomMargin) + (endTop - topMargin) + ((footerinterPage - 2) * pageInnerHeight): " + footerHeight)
} else {
endTop = followingNodesOnPage[0].startPosition.top
console.log("페이지 안걸침")
console.log("footerTop: " + footerTop)
console.log("endTop: " + endTop)
footerHeight = endTop - footerTop
console.log("최종 높이(endTop - footerTop): " + footerHeight)
}
}
}
*/