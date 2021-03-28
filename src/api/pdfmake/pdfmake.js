import * as pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from '@/api/pdfmake/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
    Roboto: {
        normal: 'SpoqaHanSansNeo-Regular-3.3.ttf',
        bold: 'SpoqaHanSansNeo-Bold-3.3.ttf',
        italics: 'SpoqaHanSansNeo-Regular-3.3.ttf',
        bolditalics: 'SpoqaHanSansNeo-Bold-3.3.ttf',
    }
}

export default pdfMake
