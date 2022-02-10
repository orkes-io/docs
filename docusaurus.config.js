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
    favicon: 'img/favicon.ico',
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
      '@docusaurus/plugin-sitemap',
      {
	id: 'plugin-sitemap',
        changefreq: 'hourly',
        priority: 0.9,
      },
    ],
    [
        "docusaurus-plugin-remote-content",
        {
            // options here
            name: "content", // used by CLI, must be path safe
            sourceBaseUrl: "https://raw.githubusercontent.com/Netflix/conductor/main/docs/docs/", // the base url for the markdown (gets prepended to all of the documents when fetching)
            outDir: "docs/versioned_docs/version-opensource/", // the base directory to output to.
            documents: ["apispec.md", 
                        "architecture.md", 
                        "bestpractices.md",
                        "extend.md",
                        "externalpayloadstorage.md", 
                        "faq.md", 
                        "index.md",
                        "license.md",
                        "server.md",
                        "tasklifecycle.md",
                        "technicaldetails.md",
                        "configuration/eventhandlers.md",
                        "configuration/isolationgroups.md",
                        "configuration/systask.md",
                        "configuration/taskdef.md",
                        "configuration/taskdomains.md",
                        "configuration/workflowdef.md",
                        "gettingstarted/basicconcepts.md",
                        "gettingstarted/client.md",
                        "gettingstarted/startworkflow.md",
                        "img/ResponseTimeoutSeconds.png",
                        "img/TaskFailure.png",
                        "img/TimeoutSeconds.png",
                        "img/conductor-architecture.png",
                        "img/conductor-vector-x.png",
                        "img/conductor-vector.pdf",
                        "img/corner-logo-oss.png",
                        "img/corner-logo.png",
                        "img/corner-logo2-oss.png",
                        "img/corner-logo2.png",
                        "img/kitchensink.png",
                        "img/overview.png",
                        "img/task_states.png",
                        "img/task_states.svg",
                        "labs/beginner.md",
                        "labs/eventhandlers.md",
                        "labs/kitchensink.md",
                        "labs/img/EventHandlerCycle.png",
                        "labs/img/bgnr_complete_workflow.png",
                        "labs/img/bgnr_state_scheduled.png",
                        "labs/img/bgnr_systask_state.png",
                        "metrics/client.md",
                        "metrics/server.md",



                        ], // the file names to download
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
                    lastVersion: 'current',
                    versions: {
                        'opensource': {
                            label: "Netflix Conductor Open Source Docs",
                            banner: 'none'
    
                        },
                        current:{
                            label: "Orkes Enterprise Conductor Docs",
                            banner: 'none',
                            path: 'enterprise'
    
                        },
                    },
                },
                blog: {
                    path: './blog',
                    showReadingTime: true,
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                    blogSidebarTitle: 'All posts',
                    blogSidebarCount: 'ALL'
            
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
                    src: 'img/Logo-Small.png'
                },
                items: [
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
                        
                        type: 'docsVersionDropdown',
                        position: 'left',
                    },
                    //generic docs link replaced with the versioning dropdown
                    /*{
                        type: 'doc',
                        docId: 'reference-docs',
                        position: 'left',
                        label: 'Reference Docs',
                    },*/
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
                                label: 'Orkes Conductor',
                                to: '/docs/enterprise/how-tos',
                            },
                            {
                                label: 'Netflix Conductor - open source',
                                to: '/docs/opensource/index',
                            },
                            {
                                label: 'Tutorials',
                                to: '/blog/tags/tutorial',
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
            },
        }),
};

module.exports = config;
