import { Extension } from "@tiptap/core";

const TableIndent = Extension.create({
    defaultOptions: {
        types: ['table', 'paragraph']
    },
    addGlobalAttributes() {
        return [
            {
                types: [
                    'table', 'paragraph'
                ],
                attributes: {
                    mmrr: {
                        default: '0',
                        renderHTML: attributes => ({
                            style: `margin-left: ${attributes.mmrr}px;`,
                        })
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            indent: ( value ) => ({ commands }) => {
                console.log("node", Node)
                return this.options.types.every(type => commands.updateNodeAttributes(type, { mmrr: value }))
            }
        }
    }
})
export default TableIndent