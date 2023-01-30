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
            '@docusaurus/plugin-client-redirects',
            {
                redirects:
                    [
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
                    breadcrumbs: true,
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                },
                blog: {
                    path: './blog',
                    showReadingTime: true,
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                    blogSidebarCount: 'ALL',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themes: [
        'docusaurus-theme-search-typesense'
        // '@saucelabs/theme-github-codeblock'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'light',
            },
            docs: {
            sidebar: {
                autoCollapseCategories: true,
                },
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
                        docId: 'codelab/introduction',
                        position: 'left',
                        label: 'Getting Started',
                    },
                    {
                        type: 'doc',
                        docId: 'api/index',
                        position: 'left',
                        label: 'API & SDK Docs',
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
                                to: '/docs/codelab/introduction',
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
                additionalLanguages: ['java', 'json'],
            },
            typesense:{
                typesenseCollectionName: 'orkes-content',
                typesenseServerConfig: {
                    nodes: [
                      {
                        host: '7xanmp8g5uyd4rqop.a1.typesense.net',
                        port: 443,
                        protocol: 'https',
                      },
                    ],
                    apiKey: 'vrrNV2jm72Jym1qtGfzgcUpGI8gL7uR9',
                  },
                  typesenseSearchParameters: {},

                  // Optional
                  contextualSearch: true,
            }
            // algolia: {
            //     appId: "F6Z9JYN7SD",
            //
            //     // Public API key: it is safe to commit it
            //     apiKey: "4b16b443762534d364363a6dee383487",
            //
            //     indexName: "prod_docs",
            //
            //     // Optional: see doc section below
            //     contextualSearch: false,
            //
            //     // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
            //     // externalUrlRegex: "external\\.com|domain\\.com",
            //
            //     // Optional: Algolia search parameters
            //     // searchParameters: {},
            // },
        }),
};

module.exports = config;
