import * as pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from '@/assets/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
    Roboto: {
        normal: 'NotoSansKR-Regular.otf',
        bold: 'NotoSansKR-Regular.otf',
        italics: 'NotoSansKR-Regular.otf',
        bolditalics: 'NotoSansKR-Regular.otf',
    }
}

export default pdfMake
