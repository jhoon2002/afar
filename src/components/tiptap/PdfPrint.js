import { Extension } from "@tiptap/core";
import { pdfmakeUtil } from "@/api/pdfmake/pdfmakeUtil.js"

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