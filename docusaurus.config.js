// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const baseUrlName = '/content';
/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Orkes Conductor Documentation',
    tagline: 'Making Stateful Serverless Easy',
    url: 'https://orkes.io',
    baseUrl: baseUrlName + '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'https://orkes.io/icons/icon-144x144.png',
    organizationName: 'orkes-io', // Usually your GitHub org/user name.
    projectName: 'docs', // Usually your repo name.
    trailingSlash: false,
    scripts: [
        'https://www.googletagmanager.com/gtag/js?id=G-4400JPTLRF',
        {
            src: baseUrlName + '/js/ga.js',
            async: true,
        },
        {
            src: baseUrlName + '/js/cookie-consent.js',
        },
    ],
    plugins: [
        [
            "docusaurus-plugin-remote-content",
            {
                // options here
               // noRuntimeDownloads: true,
                id: "OS_sdks",
                name: "content", // used by CLI, must be path safe
                sourceBaseUrl: "https://raw.githubusercontent.com/conductor-sdk", // the base url for the markdown (gets prepended to all of the documents when fetching)
                outDir: "docs/how-tos/sdks", // the base directory to output to.
                documents: ["/conductor-python/main/README.md",
                            "/conductor-go/main/README.md",
                            "/conductor-csharp/main/README.md",
                            "conductor-clojure/main/README.md"], // the file names to download
            },
        
        ],
        [
            "docusaurus-plugin-remote-content",
            {
                // options here
                id: "javasdk",
                name: "content", // used by CLI, must be path safe
                sourceBaseUrl: "https://raw.githubusercontent.com/Netflix/conductor/main/", // the base url for the markdown (gets prepended to all of the documents when fetching)
                outDir: "docs/how-tos/sdks", // the base directory to output to.
                documents: ["/java-sdk/workflow_sdk.md",
                            "/java-sdk/worker_sdk.md",
                            "/java-sdk/testing_framework.md",
                            "/java-sdk/src/main/java/com/netflix/conductor/sdk/workflow/def/ConductorWorkflow.java",
                            "/java-sdk/src/main/java/com/netflix/conductor/sdk/workflow/def/tasks/SimpleTask.java",
                            "/java-sdk/src/main/java/com/netflix/conductor/sdk/workflow/def/tasks/ForkJoin.java",
                            
                             ]               // the file names to download
            },
            
        ],
        [
            "docusaurus-plugin-remote-content",
            {
                // options here
                id: "usecases",
                name: "content", // used by CLI, must be path safe
                sourceBaseUrl: "https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/", // the base url for the markdown (gets prepended to all of the documents when fetching)
                outDir: "docs/usecases", // the base directory to output to.
                documents: ["/image_processing/README.md",
                            "/video_processing/README.md",
                            "/US_post_office/README.md",
                            "/workflow_AB_testing/README.md",
                            "/finance/README.md",
                            "/document_approvals/README.md",
                            "/Simple_ETL/README.md"
                             ]               // the file names to download
            },
           
        ],
        [
            '@docusaurus/plugin-client-redirects',
            {
              redirects: 
              [
                // /docs/oldDoc -> /docs/newDoc
                {
                  to: '/docs/how-tos/Workflows/starting-workflows',
                  from: '/docs/how-tos/starting-workflows',
                },
                {
                    to: '/docs/how-tos/Tasks/task-configurations',
                    from: '/docs/how-tos/task-configurations',
                },
              ],
            },
        ],
        
        [
        '@docusaurus/plugin-sitemap',
        {
        id: 'plugin-sitemap',
            changefreq: 'hourly',
            priority: 0.9,
        },
        ],
   ],
    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                },
                blog: {
                    path: './blog',
                    showReadingTime: true,
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                    blogSidebarCount: 10,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themes: [
       // '@saucelabs/theme-github-codeblock'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark',
            },
            navbar: {
                title: 'Conductor Docs',
                logo: {
                    alt: 'Orkes Conductor',
                    src: 'img/branding/orkes-logo-purple-4x.png',
                    srcDark: 'img/branding/orkes-logo-purple-inverted-4x.png',
                },
                items: [
                     {
                        type: "search",
                        position: "right",
                    },
                    {
                        type: 'doc',
                        docId: 'introduction',
                        position: 'left',
                        label: 'Getting Started',
                    },
                    {
                        type: 'doc',
                        docId: 'how-tos',
                        position: 'left',
                        label: 'How-Tos',
                    },
                    {
                        type: 'doc',
                        docId: 'reference-docs',
                        position: 'left',
                        label: 'Reference Docs',
                    },
                    {
                        to: '/blog',
                        label: 'Blog',
                        position: 'left'
                    },
                    {
                        href: 'https://orkes.io',
                        label: 'orkes.io',
                        target: '_orkes_io',
                        position: 'left'
                    },
                    {
                        href: 'https://github.com/Netflix/conductor',
                        label: 'GitHub',
                        target: '_orkes_io',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Getting Started',
                                to: '/docs/introduction',
                            },
                            {
                                label: 'SDKs',
                                to: '/docs/how-tos/SDKs',
                            },
                            {
                                label: 'Code Labs',
                                to: '/docs/codelab/helloworld',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/netflix-conductor',
                            },
                            {
                                label: 'Slack Community',
                                href: 'https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/orkesio',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/content/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/Netflix/conductor',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Orkes Inc`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['java'],
            },
            algolia: {
                appId: "F6Z9JYN7SD",

                // Public API key: it is safe to commit it
                apiKey: "4b16b443762534d364363a6dee383487",

                indexName: "prod_docs",

                // Optional: see doc section below
                contextualSearch: false,

                // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
                // externalUrlRegex: "external\\.com|domain\\.com",

                // Optional: Algolia search parameters
                // searchParameters: {},
            },
        }),
};

module.exports = config;
