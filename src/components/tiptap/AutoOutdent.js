import {Extension} from "@tiptap/core";
import {position} from "caret-pos";

const AutoOutdent = Extension.create({
    defaultOptions: {
        types: ['paragraph'],
        positionX: String,
        defaultPositionX: 0,
    },
    addGlobalAttributes() {
        return [
            {
                types: [
                    'paragraph',
                ],
                attributes: {
                    positionX: {
                        default: '0',
                        renderHTML: attributes => ({
                            style: `margin-left: ${attributes.positionX}px; text-indent: -${attributes.positionX}px`,
                            "data-pdfmake": `{&quot;leadingIndent&quot;:-${attributes.positionX*0.75*1.01},
                                                 &quot;margin&quot;:[${attributes.positionX*0.75*1.01}, 0, 0, 0],
                                                 &quot;preserveLeadingSpaces&quot;:true}` //*1.01은 실측 결과 가중치
                        }),
                        parseHTML: element => ({
                            marginLeft: element.style.marginLeft || '0',
                            textIndent: element.style.textIndent || '0',
                        }),
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setPositionX: ( value ) => ({ commands }) => {
                // console.log("this.editor.state", this.editor.state)
                return this.options.types.every(type => commands.updateNodeAttributes(type, { positionX: value }))
            },
            /*
            unsetPositionX: () => ({ commands }) => {
                return this.options.types.every(type => commands.resetNodeAttributes(type, 'positionX'))
            },*/
        }
    },
    addKeyboardShortcuts() {
        return {
            'Alt-q': () => {
                console.log("단축키 작동")
                let posX = position(window.getSelection().anchorNode.parentElement).left //document.querySelector('.ProseMirror')
                this.editor.commands.updateNodeAttributes('paragraph', {positionX: posX})
            }
        }
    },
})