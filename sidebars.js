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
            label: 'Concepts',
            link: {
                type: 'generated-index',
                title: 'Concepts',
                slug: '/category/conceptual-guides',
                description: 'Learn the essential concepts for building with Conductor.',
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
                description: 'The Developer Guides focus on how to use Orkes Conductor UI and SDK to build orchestrated workflows and applications.',
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
                        description: 'In this section, learn the fundamentals of building Conductor workflows through various methods (via code, JSON, or UI). This includes how to pass parameters in workflows securely, configure failure-handling settings for tasks and workflows, set rate-limiting rules, and debug workflows in development.',
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
                                'developer-guides/convert-bpmn-to-workflows',
                            ],
                            collapsible: false,
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/tasks-in-workflows',
                            label: "Tasks",
                        },
                        {
                            type: 'category',
                            label: 'Inputs/Outputs',
                            link: {
                                type: 'generated-index',
                                title: 'Inputs/Outputs',
                                description: 'Learn how to configure input/output parameters to be used in workflows.',
                                slug: '/inputs-outputs'
                            },
                            items: [
                                'developer-guides/passing-inputs-to-task-in-conductor',
                                'developer-guides/masking-parameters',
                                'developer-guides/task-input-templates',
                                'developer-guides/schema-validation',
                                'developer-guides/secrets-in-conductor',
                                'developer-guides/using-environment-variables',
                                'developer-guides/caching-task-outputs',
                            ],
                            collapsible: false,
                        },
                        'developer-guides/rate-limits',
                        'developer-guides/error-handling',
                        'developer-guides/debugging-workflows',
                    ]
                },
                {
                    type: 'category',
                    label: 'Task Workers and Queues',
                    link: {
                        type: 'generated-index',
                        title: 'Task Workers and Queues',
                        description: 'Learn how to configure, manage, and optimize task workers and queues to execute tasks efficiently and improve workflow performance in Conductor.',
                        slug: '/workers'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/using-workers',
                        'developer-guides/monitoring-task-queues',
                        'developer-guides/scaling-workers',
                        'developer-guides/task-to-domain'
                    ]
                },
                {
                    type: 'category',
                    label: 'Advanced Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Advanced Workflows',
                        description: 'Learn how to build more advanced workflows with AI orchestration, human-in-the-loops,event-driven systems, and webhooks, human-in-the-loops.',
                        slug: 'developer-guides/advanced-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'category',
                            label: 'AI Orchestration and Agentic Workflows',
                            link: {
                                type: 'doc',
                                id: 'developer-guides/ai-orchestration',
                            },
                            items: [
                                'developer-guides/using-llms-in-your-orkes-conductor-workflows',
                                'developer-guides/using-vector-databases-in-your-orkes-conductor-workflows',
                                'developer-guides/using-ai-prompts',
                            ],
                            collapsible: false,
                        },
                        'developer-guides/orchestrating-human-tasks',
                        {
                            type: 'category',
                            label: 'Eventing',
                            link: {
                                type: 'generated-index',
                                title: 'Eventing',
                                description: 'Learn how to connect and use Conductor with external eventing systems.',
                                slug: '/eventing'
                            },
                            items: [
                                'developer-guides/event-handler',
                                {
                                    type: 'doc',
                                    id: 'developer-guides/enabling-cdc-on-conductor-workflows',
                                    label: "Enabling CDC"
                                },
                                'developer-guides/webhook-integration'
                            ],
                            collapsible: false,
                        },
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
                    label: 'Version Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Versioning Workflows',
                        description: 'Workflow versioning is the ability to manage different versions of a workflow. This feature allows you to edit a workflow safely without disrupting ongoing or scheduled workflow executions in production. Learn how to manage multiple workflow versions in Orkes Conductor and understand its behavior at runtime.',
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
                    label: 'Test and Monitor Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Testing and Monitoring Workflows',
                        description: 'Learn the best practices for testing and monitoring Conductor workflows, including unit tests, regression tests, logging, cluster metrics, and CI/CD.',
                        slug: '/developer-guides/deploying-workflows'
                    },
                    className: 'leftMenuHeader',
                    items: [
                        'developer-guides/unit-and-regression-tests',
                        'developer-guides/metrics-and-observability',
                        'developer-guides/integration-with-cicd'
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
                        slug: '/category/integrations',
                        description: 'Integrate your Orkes Conductor cluster with various AI, LLMs, vector databases, message brokers, emails, and RDBMS systems.',
                    },
                    className: 'leftMenuHeader',
                    items: [
                        {
                            type: 'category',
                            label: 'AI / LLM',
                            link: {
                                type: 'generated-index',
                                title: 'AI / LLM Integrations',
                                slug: '/category/integrations/ai-llm'
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
                                {
                                    type: 'doc',
                                    id: 'integrations/ai-llm/aws-bedrock-llama2',
                                    label: 'AWS Bedrock Llama3',
                                }, 
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Email',
                            link: {
                                type: 'generated-index',
                                title: 'Email Integrations',
                                slug: '/category/integrations/email'
                            },
                            items: [
                                {
                                    type: 'doc',
                                    id: 'integrations/email/sendgrid',
                                    label: 'SendGrid Email',
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Message Broker',
                            link: {
                                type: 'generated-index',
                                title: 'Message Broker Integrations',
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
                                title: 'RDBMS Integrations',
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
                        {
                            type: 'category',
                            label: 'Vector Databases',
                            link: {
                                type: 'generated-index',
                                title: 'Vector Databases Integrations',
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
                description: 'Reference documentation for tasks in Orkes Conductor',
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
                        description: 'Reference documentation for operators in Orkes Conductor. Operators are control flow primitives, similar to programming constructs like loops, if/else, or fork/joins.',
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
                        description: 'Reference documentation for system tasks in Orkes Conductor. Designed for common use cases like HTTP calls, system tasks are built-in tasks managed and run in Conductor, allowing you to get started quickly without needing custom workers.',
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
                        {
                            type: 'category',
                            label: 'Alerting Tasks',
                            link: {
                                type: 'generated-index',
                                title: 'Alerting Tasks',
                                description: 'Reference documentation for system alerting tasks in Orkes Conductor. These system tasks are meant for monitoring and triggering alerts based on specific conditions.',
                                slug: '/category/reference-docs/alerting-tasks',
                                keywords: ['reference',  'tasks', 'system', 'system-tasks','alerting-tasks']
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
                                description: 'Reference documentation for system AI tasks in Orkes Conductor. These system tasks are meant for building AI-powered or agentic components in workflows.',
                                slug: '/category/reference-docs/ai-tasks',
                                keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks','ai-tasks']
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
                description: 'API reference documentation for Orkes Conductor.',
                slug: '/category/ref-docs/api',
                keywords: ['reference', 'apis', 'api']
            },
            collapsed: false,
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
                        description: 'Manage task and workflow definitions in Orkes Conductor with this suite of APIs.'
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
                        description: `Manage task executions in Orkes Conductor with this suite of APIs.`
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
                        description: `Manage workflow executions in Orkes Conductor with this suite of APIs`
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
                    label: 'Schedule',
                    link: {
                        type: 'generated-index',
                        title: 'Schedule',
                        slug: '/reference-docs/api/schedule',
                        description: `Manage automated Schedules in Orkes Conductor with this suite of APIs`
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
                    label: 'Human Task',
                    link: {
                        type: 'generated-index',
                        title: 'Human Task',
                        slug: '/reference-docs/api/human-tasks',
                        description:'Manage Human tasks in Orkes Conductor with this suite of APIs'
                    },
                        items: [
                                {
                                    type: 'autogenerated',
                                    dirName: 'reference-docs/api/human-tasks'
                                }
                            ]
                 },
            ]
        },
        {
            type: 'category',
            label: 'Orkes Templates',
            link: {
                type: 'generated-index',
                title: 'Orkes Templates',
                slug: '/category/templates',
                description: 'Get started quickly in Orkes Conductor with these workflow templates — available only on Developer Edition (Launch Pad).',
            },
            className: 'leftMenuHeader',
            items: [
                'templates/claims-workflow',
                'templates/agentic-research',
                'templates/availability-monitoring-for-http-endpoints',
            ],
        },
        {
            type: 'category',
            label: 'Tutorials',
            link: {
                type: 'generated-index',
                title: 'Tutorials',
                slug: '/category/tutorials',
                description: 'Tutorials for workflows in Orkes Conductor.',
            },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'category',
                    label: 'General',
                    link: {
                        type: 'generated-index',
                        title: 'General',
                        description: 'Explore our basic tutorials to get started with using Orkes Conductor.',
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
                            id: 'tutorials/sequential-http-tasks',
                            label: 'Sequential HTTP Tasks',
                        },
                        {
                            type: 'doc',
                            id: 'tutorials/api-processing-usps-example',
                            label: 'API Processing',
                        },
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
                        description: 'Explore tutorials for AI orchestration and agentic workflows.',
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
                    ]
                },
                {
                    type: 'category',
                    label: 'MCP',
                    link: {
                        type: 'generated-index',
                        title: 'MCP',
                        description: 'Explore tutorials for connecting AI agents to Orkes Conductor using the MCP server.',
                        slug: '/tutorials/mcp'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/create-workflows-using-ai-agent-claude',
                            label: 'Using Claude',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Webhooks',
                    link: {
                        type: 'generated-index',
                        title: 'Webhooks',
                        description: 'Explore tutorials on using webhook integrations in Conductor workflows.',
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
                    ]
                },
                {
                    type: 'category',
                    label: 'Documents',
                    link: {
                        type: 'generated-index',
                        title: 'Documents',
                        description: 'Explore tutorials for document related uses cases.',
                        slug: '/document-templates'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/document-approvals',
                            label: 'Document Approval',
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Finance',
                    link: {
                        type: 'generated-index',
                        title: 'Finance',
                        description: 'Explore tutorials for finance use cases.',
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
                        description: 'Explore tutorials for alerting use cases with Conductor.',
                        slug: '/category/templates/alerting'
                    },
                    items: [
                        {
                            type: 'doc',
                            id: 'tutorials/querying-orkes-data-and-triggering-opsgenie-alert',
                            label: 'OpsGenie',
                        },
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
                description: 'Frequently-asked questions about Orkes Conductor.',
            },
            items: [
                'faqs/general-faqs',
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
