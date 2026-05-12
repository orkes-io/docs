// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";

const baseUrlName = "/content";
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Orkes Conductor Documentation",
  tagline: "The Agentic Workflow Orchestration Platform",
  url: "https://orkes.io",
  baseUrl: baseUrlName + "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "https://orkes.io/icons/icon-144x144.png",
  organizationName: "orkes-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  trailingSlash: false,
  scripts: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-4400JPTLRF",
      async: true,
    },
    {
      src: baseUrlName + "/js/ga.js",
      async: true,
    },
    {
      src: baseUrlName + "/js/leadMagic.js",
      async: true,
    },
  ],
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
        as: "style",
        onload: "this.onload=null;this.rel='stylesheet'",
      },
    },
    {
      tagName: "noscript",
      attributes: {},
      innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">',
    },
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [],
      },
    ],
    [
      "@docusaurus/plugin-sitemap",
      {
        id: "plugin-sitemap",
        changefreq: "hourly",
        priority: 0.9,
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          breadcrumbs: true,
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          editUrl: "https://github.com/orkes-io/docs/edit/main/",
          remarkPlugins: [[require("./plugin/"), { sync: true }]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themes: [
    "docusaurus-theme-search-typesense",
    // '@saucelabs/theme-github-codeblock'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content:
            "microservices,orchestration,event-driven,workflow,automation,bpmn,agenticai,aiorchestration",
        },
      ],
      colorMode: {
        defaultMode: "light",
        respectPrefersColorScheme: true,
        disableSwitch: false,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: false,
        },
      },
      zoom: {
        selector: ".markdown :not(em) > img",
        background: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(50, 50, 50)",
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        },
      },
      navbar: {
        title: "Orkes Conductor",
        logo: {
          alt: "Orkes Conductor",
          src: "img/branding/orkes-logo-purple-4x.png",
          srcDark: "img/branding/orkes-logo-purple-inverted-4x.png",
          href: "/",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "quickstartSidebar",
            position: "left",
            label: "Quickstart",
          },
          {
            type: "docSidebar",
            sidebarId: "guidesSidebar",
            position: "left",
            label: "Guides",
          },
          {
            type: "docSidebar",
            sidebarId: "cookbookSidebar",
            position: "left",
            label: "Cookbook",
          },
          {
            type: "docSidebar",
            sidebarId: "aiSidebar",
            position: "left",
            label: "AI Cookbook",
          },
          {
            type: "docSidebar",
            sidebarId: "sdksSidebar",
            position: "left",
            label: "SDKs",
          },
          {
            type: "docSidebar",
            sidebarId: "referenceSidebar",
            position: "left",
            label: "Reference",
          },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/conductor-oss/conductor",
            position: "right",
            className: "navbar-icon navbar-icon--github",
            "aria-label": "GitHub",
          },
          {
            href: "https://join.slack.com/t/orkes-conductor/shared_invite/zt-3dpcskdyd-W895bJDm8psAV7viYG3jFA",
            position: "right",
            className: "navbar-icon navbar-icon--slack",
            "aria-label": "Slack",
          },
          {
            href: "https://www.youtube.com/@orkesio",
            position: "right",
            className: "navbar-icon navbar-icon--youtube",
            "aria-label": "YouTube",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/conductor-oss/conductor",
              },
              {
                label: "Slack",
                href: "https://join.slack.com/t/orkes-conductor/shared_invite/zt-3dpcskdyd-W895bJDm8psAV7viYG3jFA",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@orkesio",
              },
            ],
          },
          {
            title: "Project",
            items: [
              {
                label: "Contributing guide",
                href: "https://github.com/conductor-oss/conductor/blob/main/CONTRIBUTING.md",
              },
              {
                label: "Orkes",
                href: "https://orkes.io",
              },
            ],
          },
        ],
        copyright: "Conductor authors",
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: [
          "java",
          "json",
          "python",
          "clojure",
          "go",
          "csharp",
        ],
      },
      typesense: {
        typesenseCollectionName: "orkes-content",
        typesenseServerConfig: {
          nodes: [
            {
              host: "uo5hblry7wamtzg0p-1.a1.typesense.net",
              port: 443,
              protocol: "https",
            },
          ],
          apiKey: "cEkYaeSxkAG9QLqD1CtmRiTuUvMZ59Uz",
        },
        typesenseSearchParameters: {},

        // Optional
        contextualSearch: true,
      },
    }),
};

module.exports = config;
