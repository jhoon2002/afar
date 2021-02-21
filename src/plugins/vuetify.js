import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import ko from 'vuetify/es5/locale/ko'

export default new Vuetify({
    lang: {
        locales: { ko },
        current: "ko"
    }
});
