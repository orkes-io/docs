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
    "https://www.googletagmanager.com/gtag/js?id=G-4400JPTLRF",
    {
      src: baseUrlName + "/js/ga.js",
      async: true,
    },
    {
      src: baseUrlName + "/js/leadMagic.js",
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
        logo: {
          alt: "Orkes Conductor",
          src: "img/branding/orkes-logo-purple-4x.png",
          srcDark: "img/branding/orkes-logo-purple-inverted-4x.png",
          href: "https://orkes.io",
        },
        items: [
          {
            to: "/content/",
            position: "left",
            label: "Home",
          },
          {
            to: "/content/quickstarts",
            position: "left",
            label: "Getting Started",
          },
          {
            to: "/content/category/sdks",
            position: "left",
            label: "SDKs",
          },
          {
            to: "/content/category/reference-docs",
            position: "left",
            label: "Task Reference",
          },
          {
            to: "/content/category/ref-docs/api",
            position: "left",
            label: "API Reference",
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
            title: "Company",
            items: [
              {
                label: "Platform",
                href: "https://www.orkes.io/platform",
              },
              {
                label: "Careers",
                href: "https://www.orkes.io/careers",
              },
              {
                label: "Partners",
                href: "https://orkesio.partnerportal.io/sign-in",
              },
              {
                label: "About Us",
                href: "https://www.orkes.io/about-us",
              },
              {
                label: "Legal Hub",
                href: "https://orkes.io/legal",
              },
              {
                label: "Security",
                href: "https://orkes.io/security",
              },
            ],
          },
          {
            title: "Product",
            items: [
              {
                label: "Cloud",
                href: "https://cloud.orkes.io/",
              },
              {
                label: "Platform",
                href: "https://orkes.io/platform",
              },
              {
                label: "Support",
                href: "https://orkeshelp.zendesk.com/auth/v2/login/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Blogs",
                href: "https://www.orkes.io/blog/",
              },
              {
                label: "Events",
                href: "https://www.orkes.io/events/",
              },
              {
                label: "Case Studies",
                href: "https://www.orkes.io/customers",
              },
            ],
          },
          {
            title: "Use Cases",
            items: [
              {
                label: "Microservices Workflow Orchestration",
                href: "https://www.orkes.io/use-cases/microservices-orchestration",
              },
              {
                label: "Realtime API Orchestration",
                href: "https://www.orkes.io/use-cases/api-orchestration",
              },
              {
                label: "Event Driven Architecture",
                href: "https://www.orkes.io/use-cases/event-driven-architecture",
              },
              {
                label: "Agentic Workflows",
                href: "https://www.orkes.io/use-cases/agentic-workflows",
              },
              {
                label: "Human Workflow Orchestration",
                href: "https://www.orkes.io/use-cases/human-workflow-orchestration",
              },
              {
                label: "Process Orchestration",
                href: "https://www.orkes.io/use-cases/process-orchestration",
              },
            ],
          },
          {
            title: "Compare",
            items: [
              {
                label: "Orkes vs Camunda",
                href: "https://www.orkes.io/compare/orkes-conductor-vs-camunda-bpmn",
              },
              {
                label: "Orkes vs BPMN",
                href: "https://www.orkes.io/bpmn-switch",
              },
              {
                label: "Orkes vs LangChain",
                href: "https://www.orkes.io/compare/orkes-conductor-vs-langchain",
              },
              {
                label: "Orkes vs Temporal",
                href: "https://www.orkes.io/compare/orkes-conductor-vs-temporal",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Orkes Inc`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.github,
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
