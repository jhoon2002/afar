import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import Paragraph from '@/components/icons/Paragraph.vue'
import AlignLeft from '@/components/icons/AlignLeft.vue'
import AlignCenter from '@/components/icons/AlignCenter.vue'
import AlignRight from '@/components/icons/AlignRight.vue'
import AlignJustify from '@/components/icons/AlignJustify.vue'
import Bold from '@/components/icons/Bold.vue'
import AutoOutdent from '@/components/icons/AutoOutdent.vue'
import Table from '@/components/icons/Table.vue'
import TableIndent from '@/components/icons/TableIndent.vue'
import TableOutdent from '@/components/icons/TableOutdent.vue'


Vue.use(Vuetify)

import ko from 'vuetify/es5/locale/ko'

export default new Vuetify({
    lang: {
        locales: { ko },
        current: "ko"
    },
    icons: {
        iconfont: 'fa',
        values: {
            "j-icon-paragraph": {
                component: Paragraph
            },
            "j-icon-align-left":{
                component: AlignLeft
            },
            "j-icon-align-center":{
                component: AlignCenter
            },
            "j-icon-align-right":{
                component: AlignRight
            },
            "j-icon-align-justify":{
                component: AlignJustify
            },
            "j-icon-bold":{
                component: Bold
            },
            "j-icon-auto-outdent":{
                component: AutoOutdent
            },
            "j-icon-table":{
                component: Table
            },
            "j-icon-table-indent":{
                component: TableIndent
            },
            "j-icon-table-outdent":{
                component: TableOutdent
            }
        },
    },
})
