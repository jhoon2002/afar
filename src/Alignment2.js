import {
    Node
} from 'tiptap'
import {
    setBlockType, textblockTypeInputRule, toggleBlockType
} from 'tiptap-commands';

export default class Alignment extends Node {

    get name() {
        return 'alignment';
    }

    get defaultOptions() {
        return {
            levels: [1, 2, 3, 4, 5, 6],
        }
    }

    get schema() {
        return {
            attrs: {
                level: {
                    default: 1,
                },
                align: {
                    default: "left"
                },
                aaa: {
                    default: "sss"
                }
            },
            content: 'inline*',
            group: 'block',
            defining: true,
            draggable: false,
            parseDOM: [
                {
                    tag: 'p',
                    getAttrs: dom => {
                        console.log(dom)
                       return {   aaa: "zzz" }

                    }
                }
             ],
            /*
            parseDOM: [
                this.options.levels
                .map(level => ({
                    tag: `p`,
                    attrs: {level},
                }))],
             */
            toDOM: node => {
                console.log(node.attrs)
                     return [`p`, {
                    class: `d-block text-${node.attrs.align}`
                }, 0]
            },
        }
    }

    commands({type, schema}) {
        return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
    }

    keys({type}) {
        return this.options.levels.reduce((items, level) => ({
            ...items,
            ...{
                [`Shift-Ctrl-${level}`]: setBlockType(type, {level}),
            },
        }), {})
    }

    inputRules({type}) {
        return this.options.levels.map(level => textblockTypeInputRule(
            new RegExp(`^(#{1,${level}})\\s$`),
            type,
            () => ({level}),
        ))
    }
}