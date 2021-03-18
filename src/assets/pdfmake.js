import * as pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from '@/assets/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
    Roboto: {
        normal: 'SpoqaHanSansNeo-Regular.ttf',
        bold: 'SpoqaHanSansNeo-Bold.ttf',
        italics: 'SpoqaHanSansNeo-Regular.ttf',
        bolditalics: 'SpoqaHanSansNeo-Bold.ttf',
    }
}

export default pdfMake
