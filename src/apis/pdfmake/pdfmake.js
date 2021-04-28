import * as pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from '@/apis/pdfmake/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
    Roboto: {
        normal: 'SpoqaHanSansNeoCoding-Regular-3.5.ttf',
        bold: 'SpoqaHanSansNeoCoding-Bold-3.5.ttf',
        italics: 'SpoqaHanSansNeoCoding-Regular-3.5.ttf',
        bolditalics: 'SpoqaHanSansNeoCoding-Bold-3.5.ttf',
    }
}

export default pdfMake
