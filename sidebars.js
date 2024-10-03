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
            id: 'core-concepts',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'getting-started-orkes-cloud',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'get-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'category', // to move to tutorials
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
            type: 'category',
            label: 'Developer Guides',
            link: {
                type: 'generated-index',
                title: 'Developer Guides',
                slug: '/category/developer-guides',
                keywords: ['guides', 'features', 'developer-guides']
            },
            items: [
                {
                    type: 'category',
                    label: 'Build Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Building Workflows',
                        description: 'Learn the basics of building workflows in Orkes Conductor, including configuring task inputs and outputs, using workers, managing AI and human tasks, failure handling, and more.',
                        slug: '/developer-guides/building-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'category',
                            label: 'Inputs/Outputs',
                            items: [
                                'developer-guides/passing-inputs-to-task-in-conductor',
                                'developer-guides/secrets-in-conductor',
                                'developer-guides/using-environment-variables',
                                {
                                    type: 'doc',
                                    id: 'faqs/task-cache-output',
                                    label: "Caching Task Outputs"
                                },
                            ],
                            collapsible: false,
                        },
                        {
                            type: 'category',
                            label: 'Workers',
                            items: [
                                'developer-guides/using-workers',
                                'developer-guides/task-to-domain',
                                'developer-guides/monitoring-task-queues',
                                'developer-guides/scaling-workers',
                            ],
                            collapsible: false,
                        },
                        {
                            type: 'category',
                            label: 'AI Orchestration',
                            items: [
                                {
                                    type: 'doc',
                                    id: 'developer-guides/quickstart-ai-orchestration',
                                    label: "Quickstart"
                                },
                                'developer-guides/using-llms-in-your-orkes-conductor-workflows',
                                'developer-guides/using-vector-databases-in-your-orkes-conductor-workflows',
                                'developer-guides/creating-and-managing-gen-ai-prompt-templates',
                            ],
                            collapsible: false,
                        },
                        'developer-guides/orchestrating-human-tasks',
                        'developer-guides/webhook-integration',
                        'developer-guides/write-workflows-using-code',
                        {
                            type: 'doc',
                            id: 'faqs/reuse-tasks',
                            label: "Task Reuse"
                        },
                        'error-handling'
                    ]
                },
                {
                    type: 'category',
                    label: 'Run Workflows',
                    link: {
                        type: 'doc',
                        id: 'developer-guides/running-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/task-and-workflow-status-in-conductor',
                        'developer-guides/scheduling-workflows',
                        'developer-guides/sending-signals-to-workflows',
                    ]
                },
                {
                    type: 'category',
                    label: 'Version Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Versioning Workflows',
                        description: 'Learn how to manage multiple workflow versions in Orkes Conductor and its behaviour at runtime.',
                        slug: '/developer-guides/versioning-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'doc',
                            id: 'faqs/workflow-versioning',
                            label: "Overview"
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/workflow-version-behavior-on-execution',
                            label: "Runtime Behaviour"
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Deploy and Monitor Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Deploying and Monitoring Workflows',
                        description: 'Learn the best practices for deploying and monitoring Conductor workflows, including unit tests, regression tests, logging, cluster metrics, and CI/CD.',
                        slug: '/developer-guides/deploying-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/unit-and-regression-tests',
                        'developer-guides/debugging-workflows',
                        {
                            type: 'doc',
                            id: 'faqs/conductor-log-level',
                            label: "Log Levels"
                        },
                        'developer-guides/metrics-and-observability',
                        'developer-guides/integration-with-cicd'
                    ]
                },
                {
                    type: 'category',
                    label: 'Eventing',
                    link: {
                        type: 'generated-index',
                        title: 'Eventing',
                        description: 'Learn how to connect and use Conductor with external eventing systems.',
                        slug: '/eventing'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/event-handler',
                        {
                            type: 'doc',
                            id: 'developer-guides/enabling-cdc-on-conductor-workflows',
                            label: "Enabling CDC"
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Access Control and Security',
                    link: {
                        type: 'doc',
                        id: 'access-control-and-security/rbac-overview',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'access-control-and-security/users-and-groups',
                        {
                            type: 'doc',
                            id: 'access-control-and-security/applications',
                            label: 'Application-Level Access',
                        },
                        {
                            type: 'doc',
                            id: 'access-control-and-security/tags',
                            label: 'Tag-Based Access',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Conductor Clients & SDKs',
                    link: {
                        type: 'doc',
                        id: 'sdks/sdk-index',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'doc',
                            id: 'sdks/authentication',
                            label: 'Authentication',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/python',
                            label: 'Python',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/java',
                            label: 'Java',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/javascript',
                            label: 'Javascript',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/csharp',
                            label: 'CSharp',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/golang',
                            label: 'Go',
                        },
                        {
                            type: 'doc',
                            id: 'sdks/clojure',
                            label: 'Clojure',
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Integrations',
                    link: {
                        type: 'generated-index',
                        title: 'Integrations',
                        slug: '/category/integrations'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'category',
                            label: 'AI / LLM',
                            link: {
                                type: 'generated-index',
                                title: 'AI / LLM',
                                slug: '/category/integrations/ai-llm'
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/azure-open-ai',
                                    label: 'Azure Open AI',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/open-ai',
                                    label: 'Open AI',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/cohere',
                                    label: 'Cohere',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/vertex-ai',
                                    label: 'Google Vertex AI',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/google-gemini-ai',
                                    label: 'Google Gemini AI',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/anthropic-claude',
                                    label: 'Anthropic Claude',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/hugging-face',
                                    label: 'Hugging Face',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/aws-bedrock-anthropic',
                                    label: 'AWS Bedrock Anthropic',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/aws-bedrock-cohere',
                                    label: 'AWS Bedrock Cohere',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/aws-bedrock-llama2',
                                    label: 'AWS Bedrock Llama 2',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/aws-bedrock-titan',
                                    label: 'AWS Bedrock Titan',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/mistral',
                                    label: 'Mistral',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Vector Databases',
                            link: {
                                type: 'generated-index',
                                title: 'Vector Databases',
                                slug: '/category/integrations/vector-databases'
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/vector-databases/pinecone',
                                    label: 'Pinecone',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/vector-databases/weaviate',
                                    label: 'Weaviate',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/vector-databases/postgres-vector-database',
                                    label: 'Postgres Vector Database',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/vector-databases/mongo-vector-database',
                                    label: 'Mongo Vector Database',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Message Broker',
                            link: {
                                type: 'generated-index',
                                title: 'Message Broker',
                                slug: '/category/integrations/message-broker'
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/amqp',
                                    label: 'AMQP',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/amazon-msk',
                                    label: 'Amazon MSK',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/aws-sqs',
                                    label: 'AWS SQS',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/azure-service-bus',
                                    label: 'Azure Service Bus',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/confluent-kafka',
                                    label: 'Confluent Kafka',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/apache-kafka',
                                    label: 'Apache Kafka',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/nats-messaging',
                                    label: 'NATS Messaging',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/gcp-pub-sub',
                                    label: 'GCP Pub Sub',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/message-broker/ibm-mq',
                                    label: 'IBM MQ',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'RDBMS',
                            link: {
                                type: 'generated-index',
                                title: 'RDBMS',
                                slug: '/category/integrations/rdbms'
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/rdbms/relational-database',
                                    label: 'Relational Database',
                                },
                            ],
                        },
                    ],
                },
            ],
            collapsible: true,
            collapsed: false,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Task Reference',
            link: {
                type: 'generated-index',
                title: 'Task Reference',
                description: 'Reference documentation for tasks in Orkes Conductor',
                slug: '/category/reference-docs',
                keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
            },
            collapsed: false,
            className: 'leftMenuHeader',
            items: [
                'reference-docs/worker-task',
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
                            'reference-docs/system-tasks/event',
                            'reference-docs/system-tasks/http',
                            'reference-docs/system-tasks/http-poll',
                            'reference-docs/system-tasks/inline',
                            'reference-docs/system-tasks/jq-transform',
                            'reference-docs/system-tasks/business-rule',
                            'reference-docs/system-tasks/wait-for-webhook',
                            'reference-docs/system-tasks/jdbc',
                            'reference-docs/system-tasks/update-secret',
                            'reference-docs/system-tasks/get-signed-jwt',
                            'reference-docs/system-tasks/update-task',
                        {
                            type: 'category',
                            label: 'Alerting Tasks',
                            link: {
                                type: 'generated-index',
                                title: 'Alerting Tasks',
                                description: 'Reference documentation for Orkes Conductor - Alerting Tasks',
                                slug: '/category/reference-docs/alerting-tasks',
                                keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks','ai-tasks']
                            },
                            items: [
                                    'reference-docs/system-tasks/opsgenie',
                                    'reference-docs/system-tasks/query-processor',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'AI Tasks',
                            link: {
                                type: 'generated-index',
                                title: 'AI Tasks',
                                description: 'Reference documentation for Orkes Conductor - AI Tasks',
                                slug: '/category/reference-docs/ai-tasks',
                                keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks','ai-tasks']
                            },
                            items: [
                                {
                                    type: 'autogenerated',
                                    dirName: 'reference-docs/ai-tasks',
                                }
                            ]
                        },
                    ]
                },
            ],
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
            collapsed: false,
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'reference-docs/api',
                }]
        },
        {
            type: 'category',
            label: 'Templates and Examples',
            link: {
                type: 'generated-index',
                title: 'Templates',
                slug: '/category/templates'
            },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'doc',
                    id: 'developer-guides/getting-started-with-orkes-template-explorer',
                    label: "Overview"
                },
                {
                    type: 'category',
                    label: 'General',
                    link: {
                        type: 'generated-index',
                        title: 'General Templates',
                        description: 'Explore our basic templates to get started with using Orkes Conductor.',
                        slug: '/general-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/examples/sequential-http-tasks',
                            label: 'Sequential HTTP Tasks',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/api-processing-usps-example',
                            label: 'API Processing',
                        },
                        'templates/availability-monitoring-for-http-endpoints',
                        'templates/examples/keep-worker-running-until-condition-true',
                        'templates/examples/rotating-secrets-that-expire',
                    ]
                },
                {
                    type: 'category',
                    label: 'Application Alerts',
                    link: {
                        type: 'generated-index',
                        title: 'Templates for Application Alerts',
                        slug: '/category/templates/alerting'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert',
                            label: 'OpsGenie',
                        },
                        {
                            type: 'doc',
                            id: 'templates/alerting/scanning-an-endpoint-and-triggering-pagerduty-alert',
                            label: 'PagerDuty',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Webhooks',
                    link: {
                        type: 'generated-index',
                        title: 'Webhook Templates',
                        description: 'Explore templates that use webhook integrations in Conductor workflows.',
                        slug: '/webhook-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/examples/custom-conductor-webhook-using-curl',
                            label: 'cURL',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/incoming-webhook-using-postman',
                            label: 'Postman',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Documents',
                    link: {
                        type: 'generated-index',
                        title: 'Templates for Documents',
                        description: 'Explore templates meant for document processing and approval.',
                        slug: '/document-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'templates/document-classifier',
                            label: 'Document Classification',
                        },
                        {
                            type: 'doc',
                            id: 'templates/examples/document-approvals',
                            label: 'Document Approval',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Finance',
                    link: {
                        type: 'generated-index',
                        title: 'Templates for Finance',
                        description: 'Explore templates meant for finance use cases.',
                        slug: '/finance-templates'
                    },
                    items: [
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
                    ]
                },
                {
                    type: 'category',
                    label: 'Media',
                    link: {
                        type: 'generated-index',
                        title: 'Templates for Media',
                        description: 'Explore templates meant for media and entertainment use cases.',
                        slug: '/media-templates'
                    },
                    items: [
                        'templates/visual-image-search',
                        'templates/image-effects',
                        'templates/video-processing-workflows',
                        'templates/automatic-subtitle-generator',
                    ]
                },
            ],
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
                'faqs/directed-acyclic-graph',
                'faqs/task-lifecycle',
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
    ]
};

module.exports = sidebars;
