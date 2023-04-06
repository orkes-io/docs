// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const baseUrlName = '/content';
/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Orkes Conductor Documentation',
    tagline: 'Platform for building scalable reliable distributed systems',
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
                redirects: [],
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
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    breadcrumbs: true,
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                    remarkPlugins: [
                        [require('./plugin/'), {sync: true}],
                    ],
                },
                blog: {
                    // path: './blog',
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
        'docusaurus-theme-search-typesense',
        // '@saucelabs/theme-github-codeblock'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [
                {
                    name: 'keywords',
                    content: 'microservices,orchestration,event-driven,workflow,automation,bpmn',
                },
            ],
            colorMode: {
                defaultMode: 'light',
            },
            docs: {
                sidebar: {
                    autoCollapseCategories: false,
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
                        type: 'doc',
                        docId: 'getting-started/step1',
                        position: 'left',
                        label: 'Getting Started',
                    },
                    {
                        href: 'https://orkes.io',
                        label: 'orkes.io',
                        target: '_orkes_io',
                        position: 'left',
                    },
                    {
                        href: 'https://github.com/Netflix/conductor',
                        label: 'GitHub',
                        target: '_orkes_io',
                        position: 'right',
                    },
                    {
                        type: 'search',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                logo: {
                    alt: 'Orkes Logo',
                    src: 'img/branding/orkes-logo-purple-inverted-2x.png',
                    href: 'https://orkes.io',
                    width: 160,
                    height: 51,
                },
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
            typesense: {
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
            },
        }),
};

module.exports = config;
