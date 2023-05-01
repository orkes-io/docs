const importNodes = [
    {
        type: "import",
        value: "import CodeBlock from '@theme/CodeBlock';",
    }
];

const visit = require("unist-util-visit");
const is = require("unist-util-is");

function plugin(options = {}) {
    return function transformer(tree) {
        let includesImportCodeBlock = false;
        let hasCodeBlock = false;
        let totalCount = 1;
        visit(tree, ["code", "import"], (node, index, parent) => {
            totalCount++;
            if (totalCount > 10000) {
                return;
            }
            if (is(node, "import") && node.value.includes("@theme/CodeBlock")) {
                includesImportCodeBlock = true;
                return;
            }

            if (is(node, "code") && typeof node.meta === "string" && node.meta.startsWith('dynamic')) {
                let metaSplit = node.meta.split(' ');
                let url = metaSplit[1];
                const codeblocks = require('../codeblocks/codeblocks.json');
                let section = metaSplit[2].split('=')[1];
                let key = `${url}---${section}`
                let linesKey = `${url}---${section}-lines`
                let urlLabel = metaSplit[3];
                let language = 'java'; // TODO Fix
                tree.children.splice(index, 1, {
                        type: "jsx",
                        value: `<CodeBlock language="${language}" title="${url}${codeblocks[linesKey]}" titleType="url" titleLabel="${urlLabel}">${codeblocks[key]}`,
                    },
                    {
                        type: "jsx",
                        value: `</CodeBlock>`,
                    });
            }
        });

        if (hasCodeBlock && !includesImportCodeBlock) {
            tree.children.unshift(...importNodes);
        }
    }
}

module.exports = {plugin};