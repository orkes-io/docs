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
            label: 'Orkes Conductor Documentation',
            id: 'what-is-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Getting Started',
            link: {
                type: 'doc',
                id: 'getting-started/introduction',
            },
            items: [
                {
                    type: 'doc',
                    id: 'core-concepts',
                    className: 'leftMenuHeader',
                },
                {
                    type: 'doc',
                    id: 'get-orkes-conductor',
                    className: 'leftMenuHeader',
                },
                {
                    type: 'category',
                    label: 'Quickstarts',
                    link: {
                        type: 'doc',
                        id: 'getting-started/quickstart-index',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'getting-started/quickstart-1',
                        'getting-started/quickstart-2',
                        'getting-started/quickstart-3',
                    ],
                    collapsible: true,
                    collapsed: false,
                }
            ],
            collapsible: true,
            collapsed: false,
            className: 'leftMenuHeader'
        },
        {
            type: 'category',
            label: 'Conceptual Guides',
            link: {
                type: 'generated-index',
                title: 'Conceptual Guides',
                slug: '/category/conceptual-guides',
                description: 'Learn the core concepts behind Orkes Conductor, including workflow architecture, worker polling, task states, and DAG-based workflow orchestration.',
            },
            className: 'leftMenuHeader',
            items: [
                'conceptual-guides/architecture',
                'conceptual-guides/workflow-and-task-status',
                'conceptual-guides/directed-acyclic-graph',
            ]
        },
        {
            type: 'category',
            label: 'Developer Guides',
            link: {
                type: 'generated-index',
                title: 'Developer Guides',
                slug: '/category/developer-guides',
                description: 'Explore developer guides for building, running, and managing workflows in Orkes Conductor, covering workers, workflow execution, monitoring, eventing, and orchestration patterns.',
            },
            className: 'leftMenuHeader',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'category',
                    label: 'Build Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Building Workflows',
                        slug: '/developer-guides/building-workflows',
                        description: 'Learn the fundamentals of building workflows in Orkes Conductor, including workflow structure, task configuration, parameter wiring, validation, secrets, error handling, and rate limits.',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'category',
                            label: 'Workflows',
                            link: {
                                type: 'doc',
                                id: 'developer-guides/workflows',
                            },
                            items: [
                                'developer-guides/write-workflows-using-code',
                                {
                                    type: 'doc',
                                    id: 'developer-guides/build-workflows-using-conductor-ui',
                                    label: "Build Workflows Using UI"
                                },
                                'developer-guides/convert-bpmn-to-workflows',
                            ],
                            collapsible: false,
                        },
                        {
                            type: 'category',
                            label: 'Tasks',
                            link: {
                                type: 'doc',
                                id: 'developer-guides/tasks-in-workflows',
                            },
                            className: 'leftMenuHeader',
                            items: [
                                'developer-guides/passing-inputs-to-task-in-conductor',
                                'developer-guides/masking-parameters',
                                'developer-guides/task-input-templates',
                                'developer-guides/caching-task-outputs',
                            ]
                        },
                        'developer-guides/schema-validation',
                        'developer-guides/secrets-in-conductor',
                        'developer-guides/using-environment-variables',
                        {
                            type: 'doc',
                            id: 'developer-guides/idempotency',
                            label: "Idempotency"
                        },
                        'developer-guides/rate-limits',
                        'developer-guides/error-handling',
                    ]
                },
                {
                    type: 'category',
                    label: 'Task Workers and Queues',
                    link: {
                        type: 'generated-index',
                        title: 'Task Workers and Queues',
                        description: 'Learn how to configure and manage task workers and queues, including writing workers, scaling them, and routing tasks to the appropriate workers.',
                        slug: '/workers'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/using-workers',
                        'developer-guides/scaling-workers',
                        'developer-guides/task-to-domain'
                    ]
                },
                {
                    type: 'category',
                    label: 'Version Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Versioning Workflows',
                        description: 'Learn how to manage multiple workflow versions and understand how different versions behave during workflow execution.',
                        slug: '/developer-guides/versioning-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'doc',
                            id: 'developer-guides/workflow-versioning',
                            label: "Managing Workflow Versions"
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
                    label: 'Run Workflows',
                    link: {
                        type: 'doc',
                        id: 'developer-guides/running-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/running-workflows-in-ui',
                        'developer-guides/scheduling-workflows',
                        'developer-guides/sending-signals-to-workflows',
                    ]
                },
                {
                    type: 'category',
                    label: 'Test,Monitor, and Debug Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Testing, Monitoring, and Debugging Workflows',
                        description: 'Learn best practices for testing, monitoring, and debugging workflows, including unit and regression testing, observability metrics, debugging executions, and CI/CD integration.',
                        slug: '/developer-guides/deploying-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/unit-and-regression-tests',
                        'developer-guides/debugging-workflows',
                        'developer-guides/metrics-and-observability',
                        'developer-guides/integration-with-cicd'
                    ]
                },
                {
                    type: 'category',
                    label: 'AI Orchestration and Agentic Workflows',
                    className: 'leftMenuHeader',
                    link: {
                        type: 'doc',
                        id: 'developer-guides/ai-orchestration'
                    },
                    items: [
                        'developer-guides/using-llms-in-your-orkes-conductor-workflows',
                        'developer-guides/using-vector-databases-in-your-orkes-conductor-workflows',
                        'developer-guides/using-ai-prompts'
                    ],
                },
                {
                    type: 'doc',
                    id: 'developer-guides/orchestrating-human-tasks',
                    label: "Human in the Loop",
                    className: 'leftMenuHeader',
                },
                {
                    type: 'category',
                    label: 'Eventing',
                    className: 'leftMenuHeader',
                    link: {
                        type: 'generated-index',
                        title: 'Eventing',
                        description: 'Learn how workflows interact with external systems using event handlers, webhooks, and CDC for event-driven automation.',
                        slug: '/eventing'
                    },
                    items: [
                        'developer-guides/event-handler',
                        {
                            type: 'doc',
                            id: 'developer-guides/enabling-cdc-on-conductor-workflows',
                            label: 'Enabling CDC'
                        },
                        'developer-guides/webhook-integration',
                    ],
                },
                {
                    type: 'doc',
                    id: 'developer-guides/remote-services',
                    label: "Remote Services",
                    className: 'leftMenuHeader',
                },
                {
                    type: 'category',
                    label: 'Gateway',
                    link: {
                        type: 'doc',
                        id: 'developer-guides/gateway/overview',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'doc',
                            id: 'developer-guides/gateway/api-gateway',
                            label: 'API Gateway',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/gateway/mcp-gateway',
                            label: 'MCP Gateway',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/gateway/gateway-metrics',
                            label: 'Gateway Metrics',
                        },
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
            ],
        },
        {
            type: 'category',
            label: 'Integrations',
            link: {
                type: 'generated-index',
                title: 'Integrations',
                slug: '/category/integrations',
                description: 'Learn how to set up connections and resources for AI providers, vector databases, message brokers, cloud platforms, and databases, and connect third-party apps to extend your Conductor workflows.',
            },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'category',
                    label: 'Connections and Resources',
                    link: {
                        type: 'generated-index',
                        title: 'Connections and Resources',
                        slug: '/category/integrations/connections-and-resources',
                        description: 'Learn how to set up connections and configure resources for AI providers, vector databases, message brokers, cloud platforms, databases, and external services.',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'AI / LLM',
                            link: {
                                type: 'generated-index',
                                title: 'AI / LLM Integrations',
                                slug: '/category/integrations/ai-llm',
                                description: 'Learn how to connect your Conductor cluster to AI and LLM providers and configure models for use in AI-powered workflows.',
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/ollama',
                                    label: 'Ollama',
                                },
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
                                    id: 'integrations/ai-llm/perplexity',
                                    label: 'Perplexity',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/grok',
                                    label: 'Grok',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/cohere',
                                    label: 'Cohere',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/mistral',
                                    label: 'Mistral',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/anthropic-claude',
                                    label: 'Anthropic Claude',
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
                                    id: 'integrations/ai-llm/aws-bedrock-titan',
                                    label: 'AWS Bedrock Titan',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Vector Databases',
                            link: {
                                type: 'generated-index',
                                title: 'Vector Databases Integrations',
                                slug: '/category/integrations/vector-databases',
                                description: 'Learn how to connect vector databases to use embeddings and retrieval features in AI workflows.',
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
                                title: 'Message Broker Integrations',
                                slug: '/category/integrations/message-broker',
                                description: 'Learn how to connect message brokers to publish events and trigger workflows from external systems.',
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
                            label: 'Cloud Providers',
                            link: {
                                type: 'generated-index',
                                title: 'Cloud Providers',
                                slug: '/category/integrations/cloud-provider',
                                description: 'Learn how to connect cloud providers to allow workflows to access cloud resources such as storage buckets and files.',
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/cloud-provider/aws',
                                    label: 'AWS',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/cloud-provider/gcp',
                                    label: 'GCP',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'RDBMS',
                            link: {
                                type: 'generated-index',
                                title: 'RDBMS Integrations',
                                slug: '/category/integrations/rdbms',
                                description: 'Learn how to connect relational databases so workflows can query and manage data using database integrations.',
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/rdbms/relational-database',
                                    label: 'Relational Database',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Email/Git',
                            link: {
                                type: 'generated-index',
                                title: 'Email/Git',
                                slug: '/category/integrations/email',
                                description: 'Learn how to integrate email providers and Git repositories so workflows can send emails and access files stored in source control.',
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/sendgrid',
                                    label: 'SendGrid Email',
                                },
                                {
                                    type: 'doc',
                                    id: 'integrations/git',
                                    label: 'Git Repository',
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Connected Apps',
                    link: {
                        type: 'generated-index',
                        title: 'Connected Apps',
                        slug: '/category/integrations/connected-apps',
                        description: 'Learn how to connect third-party applications to extend Conductor workflows.',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Productivity',
                            link: {
                                type: 'generated-index',
                                title: 'Productivity',
                                slug: '/category/integrations/productivity',
                                description: 'Learn how to connect productivity tools to automate tasks across your workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Google Drive',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/google-drive' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/google-drive-operations',
                                            label: 'Google Drive Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Slides',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/google-slides' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/google-slides-operations',
                                            label: 'Google Slides Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Notion',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/notion' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/notion-operations',
                                            label: 'Notion Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Calendar',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/google-calendar' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/google-calendar-operations',
                                            label: 'Google Calendar Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Docs',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/google-docs' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/google-docs-operations',
                                            label: 'Google Docs Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Sheets',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/google-sheets' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/google-sheets-operations',
                                            label: 'Google Sheets Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Project Management',
                            link: {
                                type: 'generated-index',
                                title: 'Project Management',
                                slug: '/category/integrations/project-management',
                                description: 'Learn how to connect project management tools to coordinate tasks and automate team workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Discourse',
                                    link: { type: 'doc', id: 'integrations/connected-apps/project-management/discourse' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/project-management/discourse-operations',
                                            label: 'Discourse Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Community',
                            link: {
                                type: 'generated-index',
                                title: 'Community',
                                slug: '/category/integrations/community',
                                description: 'Learn how to connect community platforms to automate engagement and outreach workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Common Room',
                                    link: { type: 'doc', id: 'integrations/connected-apps/community/common-room' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/community/common-room-operations',
                                            label: 'Common Room Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'CRM',
                            link: {
                                type: 'generated-index',
                                title: 'CRM',
                                slug: '/category/integrations/crm',
                                description: 'Learn how to connect CRM platforms to manage and automate customer relationships through workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'HubSpot',
                                    link: { type: 'doc', id: 'integrations/connected-apps/crm/hubspot' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/crm/hubspot-operations',
                                            label: 'HubSpot Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'CMS',
                            link: {
                                type: 'generated-index',
                                title: 'CMS',
                                slug: '/category/integrations/cms',
                                description: 'Learn how to connect CMS platforms to manage and publish content through workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'WordPress',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cms/wordpress' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cms/wordpress-operations',
                                            label: 'WordPress Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Cloud',
                            link: {
                                type: 'generated-index',
                                title: 'Cloud',
                                slug: '/category/integrations/cloud',
                                description: 'Learn how to connect cloud platforms to manage and publish content through workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'AWS S3',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/aws-s3' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/aws-s3-operations',
                                            label: 'AWS S3 Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'Task Reference',
            link: {
                type: 'generated-index',
                title: 'Task Reference',
                description: 'Reference documentation for all tasks, including behavior, configuration options, and examples.',
                slug: '/category/reference-docs',
                keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks']
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
                        description: 'Learn how operators control workflow execution using built-in constructs such as branching, conditions, and loops.',
                        slug: '/category/reference-docs/operators',
                        keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks']
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
                        description: 'Learn how system tasks execute common workflow logic directly on Conductor servers without requiring external workers.',
                        slug: '/category/reference-docs/system-tasks',
                        keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        'reference-docs/system-tasks/event',
                        'reference-docs/system-tasks/http',
                        'reference-docs/system-tasks/http-poll',
                        'reference-docs/system-tasks/inline',
                        'reference-docs/system-tasks/jq-transform',
                        'reference-docs/system-tasks/business-rule',
                        'reference-docs/system-tasks/sendgrid',
                        'reference-docs/system-tasks/wait-for-webhook',
                        'reference-docs/system-tasks/jdbc',
                        'reference-docs/system-tasks/update-secret',
                        'reference-docs/system-tasks/get-signed-jwt',
                        'reference-docs/system-tasks/update-task',
                        'reference-docs/system-tasks/grpc',
                        {
                            type: 'category',
                            label: 'Alerting Tasks',
                            link: {
                                type: 'generated-index',
                                title: 'Alerting Tasks',
                                description: 'Alerting tasks send notifications from workflows through external services such as messaging or incident management platforms.',
                                slug: '/category/reference-docs/alerting-tasks',
                                keywords: ['reference', 'tasks', 'system', 'system-tasks', 'alerting-tasks']
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
                                description: 'AI tasks are built-in system tasks used to integrate AI models and vector databases for AI-powered workflows.',
                                slug: '/category/reference-docs/ai-tasks',
                                keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks', 'ai-tasks']
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
                description: 'Explore the REST APIs used to programmatically manage workflows, tasks, metadata, and other resources in Conductor.',
                slug: '/category/ref-docs/api',
                keywords: ['reference', 'apis', 'api']
            },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'doc',
                    id: 'sdks/authentication',
                    label: 'Authentication',
                },
                {
                    type: 'category',
                    label: 'Metadata',
                    link: {
                        type: 'generated-index',
                        title: 'Metadata',
                        slug: '/reference-docs/api/metadata',
                        description: 'Use the Metadata APIs to create, update, delete, and retrieve workflow and task definitions programmatically.'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/metadata'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Tasks',
                    link: {
                        type: 'generated-index',
                        title: 'Tasks',
                        slug: '/reference-docs/api/task',
                        description: `Use the Task APIs to manage task executions, retrieve task details, update task status, and log task messages programmatically.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/task'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Workflows',
                        slug: '/reference-docs/api/workflow',
                        description: `Manage workflow executions using APIs, including starting workflows, retrieving execution details, updating variables, and controlling running workflows.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/workflow'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Users',
                    link: {
                        type: 'generated-index',
                        title: 'Users',
                        slug: '/reference-docs/api/users',
                        description: `Learn how to create and manage users, retrieve user details, and check user permissions using the Users APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/users'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Groups',
                    link: {
                        type: 'generated-index',
                        title: 'Groups',
                        slug: '/reference-docs/api/groups',
                        description: `Learn how to manage groups, users, and permissions using the Groups APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/groups'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Applications',
                    link: {
                        type: 'generated-index',
                        title: 'Applications',
                        slug: '/reference-docs/api/applications',
                        description: `Learn how to manage applications, access keys, and roles using the Applications APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/applications'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Tags',
                    link: {
                        type: 'generated-index',
                        title: 'Tags',
                        slug: '/reference-docs/api/tags',
                        description: `Learn how to manage tags for task and workflow definitions, including listing, grouping, adding, replacing, and deleting tags using the Tags APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/tags'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Secrets',
                    link: {
                        type: 'generated-index',
                        title: 'Secrets',
                        slug: '/reference-docs/api/secrets',
                        description: `Learn how to create and manage secrets, retrieve secret values, check secret availability, and manage secret tags using the Secrets APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/secrets'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Schema',
                    link: {
                        type: 'generated-index',
                        title: 'Input/Output Schema Validation',
                        slug: '/reference-docs/api/schema',
                        description: `Learn how to create and manage schema definitions, retrieve schema versions, and delete schemas using the Schema APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/schema'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Environment Variables',
                    link: {
                        type: 'generated-index',
                        title: 'Environment Variables',
                        slug: '/reference-docs/api/environment-variables',
                        description: `Learn how to create and manage environment variables, retrieve their values, and manage environment variable tags using the Environment Variables APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/environment-variables'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Schedule',
                    link: {
                        type: 'generated-index',
                        title: 'Schedule',
                        slug: '/reference-docs/api/schedule',
                        description: `Learn how to create and manage workflow schedules, control schedule execution, search schedules, and manage schedule tags using the Schedule APIs.`
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/schedule'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Webhook',
                    link: {
                        type: 'generated-index',
                        title: 'Webhook',
                        slug: '/reference-docs/api/webhooks',
                        description: 'Learn how to create and manage webhook definitions, retrieve webhook configurations, and manage webhook tags using the Webhook APIs.'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/webhooks'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Human Task',
                    link: {
                        type: 'generated-index',
                        title: 'Human Task',
                        slug: '/reference-docs/api/human-tasks',
                        description: 'Learn how to manage human task executions, assign and update tasks, search tasks, and create or manage user forms using the Human Task APIs.'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/human-tasks'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Remote Services',
                    link: {
                        type: 'generated-index',
                        title: 'Remote Services',
                        slug: '/reference-docs/api/remote-services',
                        description: 'Learn how to register and manage HTTP and gRPC service endpoints so they can be reused across workflows.'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/remote-services'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Integrations',
                    link: {
                        type: 'generated-index',
                        title: 'Integrations',
                        slug: '/reference-docs/api/integrations',
                        description: 'Learn how to create or update an integration provider.'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api/integrations'
                        }
                    ]
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
                    label: 'JavaScript',
                },
                {
                    type: 'doc',
                    id: 'sdks/csharp',
                    label: 'C#',
                },
                {
                    type: 'doc',
                    id: 'sdks/golang',
                    label: 'Go',
                },
            ],
        },
        {
            type: 'category',
            label: 'Tutorials',
            link: {
                type: 'generated-index',
                title: 'Tutorials',
                slug: '/category/tutorials',
                description: 'Learn how to build and run workflows using step-by-step tutorials for common orchestration use cases.',
            },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'category',
                    label: 'General',
                    link: {
                        type: 'generated-index',
                        title: 'General',
                        description: 'Explore beginner-friendly tutorials that walk you through building workflows and applications with Orkes Conductor',
                        slug: '/general-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/long-running-apis',
                            label: 'Long-Running APIs',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/create-workflows-using-ai-agent-claude',
                            label: 'Using Claude',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/sequential-http-tasks',
                            label: 'Sequential HTTP Tasks',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/api-processing-usps-example',
                            label: 'API Orchestration',
                        },
                        'tutorials/availability-monitoring-for-http-endpoints',
                        'tutorials/keep-worker-running-until-condition-true',
                        'tutorials/rotating-secrets-that-expire',
                    ]
                },
                {
                    type: 'category',
                    label: 'AI Tutorials',
                    link: {
                        type: 'generated-index',
                        title: 'AI Tutorials',
                        description: 'Explore tutorials for building AI-powered and agentic workflows with Conductor.',
                        slug: '/tutorials/ai'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/quickstart-ai-orchestration',
                            label: 'AI-Powered Translator',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/agentic-interview-app',
                            label: 'Agentic Interview App',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/document-classifier',
                            label: 'Document Classification',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/question-answering-with-embeddings',
                            label: 'Question Answering Workflow',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/document-retrieval',
                            label: 'Document Retrieval Workflow',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/pull-request-summary-workflow',
                            label: 'Pull Request Summary Workflow',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/text-indexing-workflow',
                            label: 'Text Indexing and Search Workflow',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Gateway',
                    link: {
                        type: 'generated-index',
                        title: 'Gateway',
                        description: 'Explore tutorials for exposing workflows as APIs and MCP tools using the Conductor Gateway.',
                        slug: '/tutorials/mcp'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/feedback-tutorial',
                            label: 'Build a Feedback API using API Gateway',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/ticket-service-tutorial',
                            label: 'Build a Ticket Service using MCP Gateway',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Webhooks',
                    link: {
                        type: 'generated-index',
                        title: 'Webhooks',
                        description: 'Explore tutorials that demonstrate how to trigger and process workflows using webhook integrations in Conductor.',
                        slug: '/webhook-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/custom-conductor-webhook-using-curl',
                            label: 'cURL',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/incoming-webhook-using-postman',
                            label: 'Postman',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/using-idempotency-keys-in-webhook-triggered-workflows',
                            label: 'Using Variable Idempotency Keys',
                        },
                        {
                            type: 'doc',
                            id: `tutorials/daily-scrum-automation-using-standup-bot`,
                            label: 'Slack Webhook',
                        },
                        {
                            type: 'doc',
                            id: `tutorials/sendgrid-webhook`,
                            label: 'SendGrid Webhook',
                        },
                        {
                            type: 'doc',
                            id: `tutorials/github-webhook`,
                            label: 'GitHub Webhook',
                        },
                        {
                            type: 'doc',
                            id: `tutorials/stripe-webhook`,
                            label: 'Stripe Webhook',
                        },
                        {
                            type: 'doc',
                            id: `tutorials/microsoft-teams-webhook`,
                            label: 'Microsoft Teams Webhook',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Documents',
                    link: {
                        type: 'generated-index',
                        title: 'Documents',
                        description: 'Explore tutorials for building document processing and approval workflows using Conductor.',
                        slug: '/document-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/document-approvals',
                            label: 'Document Approval',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/document-classifier',
                            label: 'Document Classification',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/document-retrieval',
                            label: 'Document Retrieval Workflow',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Finance',
                    link: {
                        type: 'generated-index',
                        title: 'Finance',
                        description: 'Explore tutorials for building finance workflows such as payments, approvals, and financial processing using Conductor.',
                        slug: '/finance-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/finance',
                            label: 'Loan Approval Workflow',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/fraud-dispute',
                            label: 'Handling Fraud Disputes',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Application Alerts',
                    link: {
                        type: 'generated-index',
                        title: 'Application Alerts',
                        description: 'Explore tutorials for building alerting workflows that monitor events and trigger notifications.',
                        slug: '/category/templates/alerting'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/scanning-an-endpoint-and-triggering-pagerduty-alert',
                            label: 'PagerDuty',
                        },
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'FAQs',
            link: {
                type: 'generated-index',
                title: 'FAQs',
                slug: '/category/faqs',
                description: 'Explore frequently asked questions about Conductor, including common concepts, usage guidance, and troubleshooting.',
            },
            items: [
                {
                    type: 'doc',
                    id: 'faqs/general-faqs',
                    label: 'General FAQs',
                },
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            label: 'Glossary',
            id: 'glossary',
            className: 'leftMenuHeader',
        },
    ]
};

module.exports = sidebars;
