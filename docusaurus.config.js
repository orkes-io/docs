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
            '@docusaurus/plugin-ideal-image',
            {
              quality: 70,
              max: 1030, // max resized image's size.
              min: 640, // min resized image's size. if original is lower, use that size.
              steps: 2, // the max number of images generated between min and max (inclusive)
              disableInDev: false,
            },
        ],
    [
      '@docusaurus/plugin-sitemap',
      {
	id: 'plugin-sitemap',
        changefreq: 'hourly',
        priority: 0.9,
      },
    ],/*
    [   
        "docusaurus-plugin-remote-content",
        {
            // options here
            name: "content", // used by CLI, must be path safe
            sourceBaseUrl: "https://raw.githubusercontent.com/netflix/conductor/main/docs/docs/", // the base url for the markdown (gets prepended to all of the documents when fetching)
            outDir: "docs/versioned_docs/", // the base directory to output to.
            documents: [
                
                "apispec.md", 
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
                        "configuration/sysoperator",
                        "configuration/workerdef",
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
                        "reference-docs/Wait-task",
                       "reference-docs/do-while-task",
                        "reference-docs/dynamic-fork-task",
                        "reference-docs/dynamic-task",
                        "reference-docs/event-task",
                        "reference-docs/fork-task",
                        "reference-docs/http-task",
                       "reference-docs/inline-task",
                        "reference-docs/join-task",
                        "reference-docs/json-jq-transform-task",
                        "reference-docs/kafka-publish-task",
                        "reference-docs/set-variable-task",
                        "reference-docs/sub-workflow-task",
                       "reference-docs/switch-task",
                        "reference-docs/terminate-task"



                        ], // the file names to download
        },
    ], */
   ],
    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/orkes-io/docs/edit/main/',
                    //lastVersion: 'current',
                    //no versioning for now
                    /*versions: {
                        'opensource': {
                            label: "Conductor Open Source Docs",
                            banner: 'none'
    
                        },
                        current:{
                            label: "Orkes Cloud Docs",
                            banner: 'none',
                            path: 'enterprise'
    
                        },
                    },*/
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
                    src: 'img/Logo-Small-new.png'
                },
                items: [
                  
                    {
                        to: 'docs/index',
                        position: 'left',
                        label: 'Reference Docs',
                    },/* hiding from the navigation since there is no content hyeyt
                    {
                        to: '/docs/enterprise/introduction',
                        position: 'left',
                        label: 'Orkes Cloud Docs',
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
                                label: 'Documentation',
                                to: '/docs/introduction',
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
