import { Extension } from "@tiptap/core";
import { pdfmakeUtil } from "@/apis/pdfmake/pdfmakeUtil.js"

const PdfPrint = Extension.create({
    addCommands() {
        return {
            printPdf: () => () => {
                pdfmakeUtil.docPdfGen(document.querySelector("#printArea"))
            }
        }
    }

})
export default PdfPrint