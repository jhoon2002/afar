import { Extension } from "@tiptap/core";

const TableInOutdent = Extension.create({

    defaultOptions: {
        types: ['table'],
        defaultMarginLeft: '0',
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    marginLeft: {
                        default: this.options.defaultMarginLeft,
                        renderHTML: attributes => ({
                            style: `margin-left: ${attributes.marginLeft}`,
                        }),
                        parseHTML: element => ({
                            marginLeft: element.style.marginLeft || this.options.defaultMarginLeft,
                        }),
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            doIndent: ( value ) => ({ commands }) => {

                let ele = window.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement

                if (!ele) return

                if (ele.tagName === "TBODY") {
                    ele = ele.parentElement
                }

                if (ele.tagName !== "TABLE") return

                let str = ele.style.marginLeft.trim()
                if (str) {
                    let numArray = /[0-9]+/g.exec(str)
                    let unit = str.replace(/[0-9]+/g, "")
                    ele.style.marginLeft = numArray[0] * 1 + value + unit
                } else {
                    ele.style.marginLeft = value + "pt"
                }

                return commands.updateAttributes('table', { marginLeft: ele.style.marginLeft })
            },
            doOutdent: ( value ) => ({ chain }) => {

                let ele = window.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement

                if (!ele) return

                if (ele.tagName === "TBODY") {
                    ele = ele.parentElement
                }

                if (ele.tagName !== "TABLE") return

                let str = ele.style.marginLeft.trim()
                if (str) {
                    let numArray = /[0-9]+/g.exec(str)
                    let unit = str.replace(/[0-9]+/g, "")

                    let rst = numArray[0] * 1 - value

                    if (rst < 0) {
                        rst = 0
                    }
                    ele.style.marginLeft = rst + unit
                } else {
                    ele.style.marginLeft = value + "pt"
                }
                return chain().focus().updateAttributes('table', { marginLeft: ele.style.marginLeft}).run()
            }
        }
    }

})
export default TableInOutdent