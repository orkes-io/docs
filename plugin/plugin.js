// import React, { useReducer } from 'react'
// import CodeBlock from '@theme-init/CodeBlock'

function resolveConfig(options) {
    return {
        sync: options.sync ?? true,
    };
}

function parseReference(ref) {
    const fullUrl = ref.slice(ref.indexOf('https'), -1)
    /**
     * webpack causes failures when it tries to render this page
     */
    const global = globalThis || {}
    if (!global.URL) {
        global.URL = URL
    }

    const [org, repo, blob, branch, ...pathSeg] = new global.URL(fullUrl).pathname.split('/').slice(1)

    return {
        url: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`,
        title: pathSeg.join('/')
    }
}

const importNodes = [
    {
        type: "import",
        value: "import CodeBlock from '@theme/CodeBlock';",
    },
];

const visit = require("unist-util-visit");
const is = require("unist-util-is");

function plugin(options = {}) {
    const config = resolveConfig(options);

    return function transformer(tree) {
        let includesImportCodeBlock = false;
        let hasCodeBlock = false;

        visit(tree, ["code", "import"], (node, index, parent) => {
            if (is(node, "import") && node.value.includes("@theme/CodeBlock")) {
                includesImportCodeBlock = true;
                return;
            }
            if (is(node, "code") && typeof node.meta === "string" && node.meta.startsWith('dynamic')) {
                console.log("Parse url ", index, node);
                let metaSplit = node.meta.split(' ');
                let url = metaSplit[1];
                let section = metaSplit[2].split('=')[1];
                let language = 'java';
                let content = node.value;
                tree.children.splice(7, 1, {
                        type: "jsx",
                        value: `<div>Replaced ${url} ${section} ${includesImportCodeBlock}</div>`,
                    }, {
                        type: "jsx",
                        value: `<CodeBlock language="${language}" title="<a href='${url}' target='_blank'>${url}</a>">`,
                    },
                    {
                        type: "jsx",
                        value: `${node.value}`,
                    },
                    {
                        type: "jsx",
                        value: `</CodeBlock>`,
                    });
                console.log(tree);
            }
        });

        if (hasCodeBlock && !includesImportCodeBlock) {
            tree.children.unshift(...importNodes);
        }
    }
}

module.exports = {plugin};