import {
    Mark
} from 'tiptap'
import {
    updateMark,
    markInputRule
} from 'tiptap-commands';

export default class Indent extends Mark {

    get name() {
        return 'indent';
    }
/*
    get defaultOptions() {
        return {
            levels: ["0", "5", "10"]
        };
    }
*/
    get schema() {
        return {
            attrs: {
                size: {
                    default: 0,
                },
                newSize: 7
            },
            parseDOM: [{
                style: 'margin-left',
                getAttrs: value => ({
                    size: value
                }),
            }, ],
            toDOM: mark => {
                return ["span", {
                    class: `d-block ml-${mark.attrs.size}`
                }, 0];
            }
        };
    }

    commands({
                 type
             }) {
        return attrs => updateMark(type, attrs);
    }

    inputRules({
                   type
               }) {
        return [
            markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type),
        ];
    }
}
