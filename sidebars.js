/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
        {
            type: 'doc',
            label: 'Conductor Documentation',
            id: 'what-is-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'get-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'core-concepts',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Getting Started',
            link: {
                type: 'generated-index',
                title: 'Getting Started',
                description: 'Learn about the most important Orkes Conductor concepts!',
                slug: '/category/getting-started',
                keywords: ['getting-started', 'installation']
            },
            items: ['getting-started/first-workflow-application', 'getting-started/running-workflows-from-code', 'getting-started/adding-custom-code-worker', 'getting-started/running-an-inline-function', 'getting-started/adding-wait-conditions', 'getting-started/executing-tasks-in-parallel'],
            collapsible: true,
            collapsed: false,
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'error-handling',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Developer Guides',
            link: {
                type: 'generated-index',
                title: 'Developer Guides',
                description: 'Guides for important Orkes Conductor features!',
                slug: '/category/developer-guides',
                keywords: ['guides', 'features', 'developer-guides']
            },
            items: [
                'developer-guides/passing-inputs-to-task-in-conductor',
                'developer-guides/unit-and-regression-tests',
                'developer-guides/integration-with-cicd',
                'developer-guides/scheduling-workflows',
                {
                    type: 'doc',
                    id: 'developer-guides/webhook-integration',
                    label: "Webhook Integration"
                },
                'developer-guides/write-workflows-using-code',
                {
                    type: 'doc',
                    id: 'developer-guides/orchestrating-human-tasks',
                    label: "Human Task"
                },
                'developer-guides/debugging-workflows',
                'developer-guides/task-to-domain',
                'developer-guides/secrets-in-conductor',
                'developer-guides/scaling-workers',
                'developer-guides/metrics-and-observability',
                'developer-guides/monitoring-task-queues',
                'developer-guides/workflow-version-behavior-on-execution',
                'developer-guides/task-and-workflow-status-in-conductor',
                'developer-guides/pausing-for-external-signals',
                {
                    type: 'doc',
                    id: 'developer-guides/task-and-workflow-event-streaming-with-orkes-conductor-and-azure-event-hub',
                    label: "Event Streaming with Azure Event Hub"
                },
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Conductor Clients & SDKs',
            link: {
                type: 'generated-index',
                title: 'Conductor Clients & SDKs',
                slug: '/category/sdks',
                keywords: ['SDK', 'client', 'java', 'python', 'clojure', 'golang', 'csharp']
            },
            items: [
                {
                    type: 'doc',
                    id: 'sdks/java',
                    label: 'Java',
                },
                {
                    type: 'doc',
                    id: 'sdks/python',
                    label: 'Python',
                },
                {
                    type: 'doc',
                    id: 'sdks/golang',
                    label: 'Golang',
                },
                {
                    type: 'doc',
                    id: 'sdks/javascript',
                    label: 'Javascript',
                },
                {
                    type: 'doc',
                    id: 'sdks/clojure',
                    label: 'Clojure',
                },
                {
                    type: 'doc',
                    id: 'sdks/csharp',
                    label: 'CSharp',
                }
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Access Control and Security',
            link: {
                type: 'generated-index',
                title: 'Access Control and Security',
                slug: '/category/access-control-and-security',
                keywords: ['access control', 'security']
            },
            items: [
                'access-control-and-security/applications',
                'access-control-and-security/users-and-groups',
                'access-control-and-security/tags',
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Reference Docs',
            link: {
                type: 'generated-index',
                title: 'Reference Docs',
                description: 'Reference documentation for Orkes Conductor',
                slug: '/category/reference-docs',
                keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
            },
            items: [
                {
                    type: 'category',
                    label: 'Operators',
                    link: {
                        type: 'generated-index',
                        title: 'Operators',
                        description: 'Reference documentation for Orkes Conductor - Operators',
                        slug: '/category/reference-docs/operators',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/operators',
                        }]
                },
                {
                    type: 'category',
                    label: 'System Tasks',
                    link: {
                        type: 'generated-index',
                        title: 'System Tasks',
                        description: 'Reference documentation for Orkes Conductor - System Tasks',
                        slug: '/category/reference-docs/system-tasks',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/system-tasks',
                        }]
                },
                {
                    type: 'doc',
                    id: 'reference-docs/worker-task',
                    className: 'leftMenuHeader',
                },
                {
                    type: 'category',
                    label: 'API Reference',
                    link: {
                        type: 'generated-index',
                        title: 'API Reference',
                        description: 'Reference documentation for Orkes Conductor - APIs',
                        slug: '/category/ref-docs/api',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api',
                        }]
                },
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'How To Videos',
            link: {
                type: 'generated-index',
                title: 'How To Videos',
                slug: '/category/how-to-videos'
            },
            items: [
                'how-to-videos/login-to-playground',
                'how-to-videos/run-workflow',
                {
                    type: 'doc',
                    id: 'how-to-videos/access-key-and-secret',
                    label: 'Access Key & Secret',
                },
                'how-to-videos/user-management',
                'how-to-videos/group-management',
                'how-to-videos/app-management',
                'how-to-videos/tags',
                'how-to-videos/secrets',
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Templates',
            link: {
                type: 'generated-index',
                title: 'Templates',
                slug: '/category/templates'
            },
            items: [
                'templates/availability-monitoring-for-http-endpoints',
                'templates/video-processing-workflows',
                {
                    type: 'category',
                    label: 'Application Level Alerting',
                    link: {
                        type: 'generated-index',
                        title: 'Application Level Alerting',
                        slug: '/category/templates/alerting'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/alerting/scanning-an-endpoint-and-triggering-pagerduty-alert',
                            label: 'PagerDuty',
                        },
                        {
                            type: 'doc',
                            id: 'templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert',
                            label: 'OpsGenie',
                        }
                    ],
                    collapsible: true,
                    collapsed: true,
                    className: 'leftMenuHeader',
                },
                {
                    type: 'category',
                    label: 'Other Examples',
                    link: {
                        type: 'generated-index',
                        title: 'Other Examples',
                        slug: '/category/templates/examples'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/examples/custom-conductor-webhook-using-curl',
                            label: 'Conductor Webhook using cURL',
                        },
                        'templates/examples/incoming-webhook-using-postman',
                        'templates/examples/keep-worker-running-until-condition-true',
                        'templates/examples/rotating-secrets-that-expire',
                        {
                            type: 'doc',
                            id: 'templates/examples/api-processing-usps-example',
                            label: 'API Processing',
                        },
                        'templates/examples/document-approvals',
                        {
                            type: 'doc',
                            id: 'templates/examples/finance',
                            label: 'Loan Origination',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/fraud-dispute',
                            label: 'Handling Fraud Disputes',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/image-processing',
                            label: 'Image Processing Workflows',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/video-processing',
                            label: 'Video Processing Workflows',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/sequential-http-tasks',
                            label: 'Sequential HTTP Tasks',
                        },
                    ],
                    collapsible: true,
                    collapsed: true,
                    className: 'leftMenuHeader',
                },
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'system-integrations',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'FAQs',
            link: {
                type: 'generated-index',
                title: 'FAQs',
                slug: '/category/faqs'
            },
            items: [
                'faqs/general-faqs',
                'faqs/conductor-log-level',
                'faqs/reuse-tasks',
                'faqs/directed-acyclic-graph',
                'faqs/workflow-versioning',
                'faqs/task-lifecycle',
                'faqs/connecting-to-azure-service-bus',
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
    ]
};

module.exports = sidebars;
