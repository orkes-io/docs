// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from 'prism-react-renderer';

const baseUrlName = "/content";
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Orkes Conductor Documentation",
  tagline: "Platform for building scalable reliable distributed systems",
  url: "https://orkes.io",
  baseUrl: baseUrlName + "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "https://orkes.io/icons/icon-144x144.png",
  organizationName: "orkes-io", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  trailingSlash: false,
  scripts: [
    "https://www.googletagmanager.com/gtag/js?id=G-4400JPTLRF",
    {
      src: baseUrlName + "/js/ga.js",
      async: true,
    },
    {
      src: baseUrlName + "/js/cookie-consent.js",
    },
    {
      src: baseUrlName + "/js/apollo.js",
    },
    {
      src: baseUrlName + "/js/leadMagic.js",
    },
    {
      src: "https://player.vimeo.com/api/player.js",
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
            "microservices,orchestration,event-driven,workflow,automation,bpmn",
        },
      ],
      colorMode: {
        defaultMode: "light",
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
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
        title: "Conductor Docs",
        logo: {
          alt: "Orkes Conductor",
          src: "img/branding/orkes-logo-purple-4x.png",
          srcDark: "img/branding/orkes-logo-purple-inverted-4x.png",
        },
        items: [
          {
            type: "doc",
            docId: "getting-started/quickstart-index",
            position: "left",
            label: "Getting Started",
          },
          {
            href: "https://orkes.io",
            label: "orkes.io",
            target: "_orkes_io",
            position: "left",
          },
          {
            href: "https://github.com/conductor-oss/conductor",
            label: "GitHub",
            target: "_orkes_io",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "Orkes Logo",
          src: "img/branding/orkes-logo-purple-inverted-2x.png",
          href: "https://orkes.io",
          width: 160,
          height: 51,
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Core Concepts",
                to: "/content/core-concepts",
              },
              {
                label: "Getting Started",
                to: "/content/getting-started/first-workflow-application",
              },
              {
                label: "SDKs",
                to: "/content/category/sdks",
              },
              {
                label: "Access Control & Security",
                to: "/content/category/access-control-and-security",
              },
              {
                label: "Developer Guide",
                to: "/content/category/developer-guides",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/netflix-conductor",
              },
              {
                label: "Slack Community",
                href: "https://join.slack.com/t/orkes-conductor/shared_invite/zt-2vdbx239s-Eacdyqya9giNLHfrCavfaA",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/orkesio",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "https://orkes.io/blog/",
              },
              {
                label: "GitHub",
                href: "https://github.com/conductor-oss/conductor",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Orkes Inc`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
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
