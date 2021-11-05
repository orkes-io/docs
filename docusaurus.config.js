// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Orkes Conductor Documentation',
    tagline: 'Making Stateful Serverless Easy',
    url: 'https://orkes-io.github.io',
    baseUrl: '/docs/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'orkes-io', // Usually your GitHub org/user name.
    projectName: 'docs', // Usually your repo name.
    trailingSlash: false,
    scripts: [
	'https://www.googletagmanager.com/gtag/js?id=G-4400JPTLRF',
	{
		src: '/docs/js/ga.js',
		async: true,
        },
    ],
    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/edit/main/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themes: [
        '@saucelabs/theme-github-codeblock'
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Orkes Conductor',
                logo: {
                    alt: 'Orkes Conductor Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Tutorials',
                    },
                    {
                        type: 'doc',
                        docId: 'docsIntro',
                        position: 'left',
                        label: 'Docs',
                    },
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Showcase',
                    },
                    {
                        to: '/blog',
                        label: 'Blog',
                        position: 'left'
                    },
                    {
                        href: 'https://github.com/Netflix/conductor',
                        label: 'GitHub',
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
                                label: 'Tutorial',
                                to: '/docs/intro',
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
                                label: 'Slack (Pending)',
                                href: 'https://discordapp.com/invite/docusaurus',
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
                                label: 'Conductor Roadmap',
                                to: '/roadmap',
                            }, {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/Netflix/conductor',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Orkes Conductor.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
