// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // ==========================================================================
    // QUICKSTART — Getting Started + Conceptual Guides
    // ==========================================================================
    quickstartSidebar: [
        {
            type: 'doc',
            label: 'Run Your First Workflow',
            id: 'getting-started/quickstart-index',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            label: 'Install and Set Up Orkes Conductor',
            id: 'get-orkes-conductor',
        },
        {
            type: 'doc',
            label: 'Concepts',
            id: 'quickstart/concepts',
        },
        {
            type: 'doc',
            label: 'Architecture',
            id: 'conceptual-guides/architecture',
        },
        {
            type: 'doc',
            label: 'Durable Execution',
            id: 'quickstart/durable-execution',
        },
        {
            type: 'doc',
            label: 'JSON + Code Native',
            id: 'quickstart/json-code-native',
        },
        {
            type: 'doc',
            label: 'Workflows',
            id: 'quickstart/workflows',
        },
        {
            type: 'doc',
            label: 'Tasks',
            id: 'quickstart/tasks',
        },
        {
            type: 'doc',
            label: 'Task Lifecycle',
            id: 'quickstart/task-lifecycle',
        },
        {
            type: 'doc',
            label: 'Workers',
            id: 'quickstart/workers',
        },
    ],

    // ==========================================================================
    // GUIDES — Developer Guides
    // ==========================================================================
    guidesSidebar: [
                {
                    type: 'doc',
                    id: 'developer-guides/conductor-skills',
                    label: 'Build with AI Agents',
                },
                {
                    type: 'doc',
                    id: 'ai-cookbook/why-conductor',
                    label: 'Why Conductor',
                },
                {
                    type: 'category',
                    label: 'Workflows',
                    link: { type: 'doc', id: 'developer-guides/workflows' },
                    items: [
                        'developer-guides/write-workflows-using-code',
                        'developer-guides/convert-bpmn-to-workflows',
                        {
                            type: 'doc',
                            id: 'developer-guides/versioning-workflows',
                            label: 'Versioning Workflows',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/running-workflows',
                            label: 'Executing Workflows',
                        },
                        'developer-guides/scheduling-workflows',
                        'developer-guides/sending-signals-to-workflows',
                        {
                            type: 'doc',
                            id: 'developer-guides/enabling-cdc-on-conductor-workflows',
                            label: 'Change Data Capture',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/idempotency',
                            label: 'Idempotency',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/debugging-workflows',
                            label: 'Search / Query Executions',
                        },
                        'developer-guides/unit-and-regression-tests',
                        'developer-guides/metrics-and-observability',
                        'developer-guides/integration-with-cicd',
                        'developer-guides/secrets-in-conductor',
                        'developer-guides/using-environment-variables',
                        {
                            type: 'doc',
                            id: 'developer-guides/schema-validation',
                            label: 'Schema Validation',
                        },
                        'developer-guides/error-handling',
                    ],
                },
                {
                    type: 'category',
                    label: 'Tasks',
                    link: { type: 'doc', id: 'developer-guides/tasks-in-workflows' },
                    items: [
                        {
                            type: 'doc',
                            id: 'developer-guides/passing-inputs-to-task-in-conductor',
                            label: 'Parameter Mapping',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/masking-parameters',
                            label: 'Masking Parameters',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/task-input-templates',
                            label: 'Task Input Templates',
                        },
                        'developer-guides/caching-task-outputs',
                        'developer-guides/rate-limits',
                        'developer-guides/using-workers',
                        'developer-guides/scaling-workers',
                        'developer-guides/task-to-domain',
                    ],
                },
                {
                    type: 'category',
                    label: 'HITL & AI Orchestration',
                    items: [
                        {
                            type: 'doc',
                            id: 'developer-guides/orchestrating-human-tasks',
                            label: 'Human Task Orchestration',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/using-llms-in-your-orkes-conductor-workflows',
                            label: 'Using AI Models or LLMs',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/using-vector-databases-in-your-orkes-conductor-workflows',
                            label: 'Using Vector Databases',
                        },
                        {
                            type: 'doc',
                            id: 'developer-guides/using-ai-prompts',
                            label: 'Creating AI Prompts',
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'API Gateway & Service Orchestration',
                    link: { type: 'doc', id: 'developer-guides/gateway/overview' },
                    items: [
                        { type: 'doc', id: 'developer-guides/gateway/api-gateway', label: 'API Gateway' },
                        { type: 'doc', id: 'developer-guides/gateway/mcp-gateway', label: 'MCP Gateway' },
                        { type: 'doc', id: 'developer-guides/gateway/gateway-metrics', label: 'Gateway Metrics' },
                        {
                            type: 'doc',
                            id: 'developer-guides/remote-services',
                            label: 'Remote Services',
                        },
                    ],
                },
    ],

    // ==========================================================================
    // EVENTING — Event-driven orchestration, webhooks, event publishing, brokers
    // ==========================================================================
    eventingSidebar: [
        {
            type: 'category',
            label: 'Event-Driven Orchestration',
                link: {
                    type: 'generated-index',
                    title: 'Event-Driven Orchestration',
                    description: 'Build event-driven workflows with webhooks, event handlers, event publishing tasks, and message broker integrations.',
                    slug: '/category/event-driven-orchestration',
                },
            className: 'leftMenuHeader',
            items: [
                {
                    type: 'category',
                    label: 'Receive Events',
                    link: {
                        type: 'generated-index',
                        title: 'Receive Events',
                        description: 'Trigger workflows or resume waiting executions from webhooks, event handlers, and external event sources.',
                        slug: '/category/event-driven-orchestration/receive-events',
                    },
                    items: [
                        { type: 'doc', id: 'developer-guides/webhook-integration', label: 'Webhooks' },
                        { type: 'doc', id: 'reference-docs/system-tasks/wait-for-webhook', label: 'Wait for Webhook Task' },
                        { type: 'doc', id: 'developer-guides/event-handler', label: 'Event Handlers' },
                    ],
                },
                {
                    type: 'category',
                    label: 'Publish Events',
                    link: {
                        type: 'generated-index',
                        title: 'Publish Events',
                        description: 'Publish messages from workflows to external event systems such as Kafka, NATS, AMQP, SQS, and internal Conductor event sinks.',
                        slug: '/category/event-driven-orchestration/publish-events',
                    },
                    items: [
                        { type: 'doc', id: 'reference-docs/system-tasks/event', label: 'Event Task' },
                        { type: 'doc', id: 'cookbook/event-driven', label: 'Event Publishing Recipes' },
                    ],
                },
                {
                    type: 'category',
                    label: 'Message Broker Integrations',
                    link: {
                        type: 'generated-index',
                        title: 'Message Broker Integrations',
                        slug: '/category/integrations/message-broker',
                        description: 'Configure Kafka, AMQP, NATS, SQS, Azure Service Bus, GCP Pub/Sub, IBM MQ, and managed Kafka providers for event-driven workflows.',
                    },
                    items: [
                        { type: 'doc', id: 'integrations/message-broker/apache-kafka', label: 'Apache Kafka' },
                        { type: 'doc', id: 'integrations/message-broker/confluent-kafka', label: 'Confluent Kafka' },
                        { type: 'doc', id: 'integrations/message-broker/amazon-msk', label: 'Amazon MSK' },
                        { type: 'doc', id: 'integrations/message-broker/amqp', label: 'AMQP / RabbitMQ' },
                        { type: 'doc', id: 'integrations/message-broker/nats-messaging', label: 'NATS Messaging' },
                        { type: 'doc', id: 'integrations/message-broker/aws-sqs', label: 'AWS SQS' },
                        { type: 'doc', id: 'integrations/message-broker/azure-service-bus', label: 'Azure Service Bus' },
                        { type: 'doc', id: 'integrations/message-broker/gcp-pub-sub', label: 'GCP Pub/Sub' },
                        { type: 'doc', id: 'integrations/message-broker/ibm-mq', label: 'IBM MQ' },
                    ],
                },
                {
                    type: 'category',
                    label: 'Webhook Examples',
                    link: {
                        type: 'generated-index',
                        title: 'Webhook Examples',
                        description: 'Examples for triggering or resuming workflows from custom webhooks and provider webhooks.',
                        slug: '/category/event-driven-orchestration/webhook-examples',
                    },
                    items: [
                        { type: 'doc', id: 'tutorials/custom-conductor-webhook-using-curl', label: 'Custom Webhook with cURL' },
                        { type: 'doc', id: 'tutorials/incoming-webhook-using-postman', label: 'Incoming Webhook with Postman' },
                        { type: 'doc', id: 'tutorials/using-idempotency-keys-in-webhook-triggered-workflows', label: 'Webhook Idempotency Keys' },
                        { type: 'doc', id: 'tutorials/github-webhook', label: 'GitHub Webhook' },
                        { type: 'doc', id: 'tutorials/stripe-webhook', label: 'Stripe Webhook' },
                        { type: 'doc', id: 'tutorials/sendgrid-webhook', label: 'SendGrid Webhook' },
                        { type: 'doc', id: 'tutorials/microsoft-teams-webhook', label: 'Microsoft Teams Webhook' },
                        { type: 'doc', id: 'tutorials/daily-scrum-automation-using-standup-bot', label: 'Slack Webhook' },
                    ],
                },
                {
                    type: 'category',
                    label: 'API Reference',
                    link: {
                        type: 'generated-index',
                        title: 'Eventing API Reference',
                        description: 'API reference for managing event handlers and webhook definitions programmatically.',
                        slug: '/category/event-driven-orchestration/api-reference',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Webhook API',
                            link: {
                                type: 'generated-index',
                                title: 'Webhook API',
                                slug: '/reference-docs/api/webhooks',
                                description: 'Create, update, retrieve, delete, and tag webhook definitions.',
                            },
                            items: [{ type: 'autogenerated', dirName: 'reference-docs/api/webhooks' }],
                        },
                    ],
                },
            ],
        },
    ],

    // ==========================================================================
    // RBAC — Role Based Access Control
    // ==========================================================================
    rbacSidebar: [
        {
            type: 'doc',
            id: 'access-control-and-security/rbac-overview',
            label: 'Role Based Access Control',
            className: 'leftMenuHeader',
        },
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
    ],

    // ==========================================================================
    // COOKBOOK — OSS-backed recipe sections. Orkes-only template pages stay
    // published for indexed URLs but are intentionally kept out of this nav.
    // ==========================================================================
    cookbookSidebar: [
        { type: 'link', label: 'Cookbook', href: '/category/tutorials', className: 'leftMenuHeader' },
        { type: 'doc', id: 'cookbook/microservice-orchestration', label: 'Microservice orchestration' },
        { type: 'doc', id: 'cookbook/dynamic-parallelism', label: 'Dynamic parallelism' },
        { type: 'doc', id: 'cookbook/wait-and-timers', label: 'Wait and timer patterns' },
        { type: 'doc', id: 'cookbook/task-timeouts-and-retries', label: 'Task timeouts and retries' },
        { type: 'doc', id: 'cookbook/workflow-scheduling', label: 'Scheduled workflows' },
        { type: 'doc', id: 'cookbook/dynamic-workflows', label: 'Dynamic workflows as code' },
        { type: 'doc', id: 'tutorials/document-approvals', label: 'Document Approval' },
        { type: 'doc', id: 'tutorials/long-running-apis', label: 'Long-Running APIs' },
        { type: 'doc', id: 'tutorials/scanning-an-endpoint-and-triggering-pagerduty-alert', label: 'PagerDuty Alert Workflow' },
        {
            type: 'category',
            label: 'Gateway tutorials',
            link: {
                type: 'generated-index',
                title: 'Gateway Tutorials',
                description: 'Orkes Conductor tutorials for exposing workflows as HTTP APIs and MCP tools backed by durable workflow execution.',
                slug: '/tutorials/mcp',
            },
            items: [
                { type: 'doc', id: 'tutorials/feedback-tutorial', label: 'Build a Feedback API' },
                { type: 'doc', id: 'tutorials/ticket-service-tutorial', label: 'Build an MCP Ticket Service' },
            ],
        },
        {
            type: 'category',
            label: 'AI Tutorials',
            link: {
                type: 'generated-index',
                title: 'AI Tutorials',
                description: 'Explore tutorials for building AI-powered and agentic workflows with Conductor.',
                slug: '/tutorials/ai',
            },
            items: [
                { type: 'doc', id: 'tutorials/quickstart-ai-orchestration', label: 'AI-Powered Translator' },
                { type: 'doc', id: 'tutorials/agentic-interview-app', label: 'Agentic Interview App' },
                { type: 'doc', id: 'tutorials/document-classifier', label: 'Document Classification' },
                { type: 'doc', id: 'tutorials/question-answering-with-embeddings', label: 'Question Answering Workflow' },
                { type: 'doc', id: 'tutorials/document-retrieval', label: 'Document Retrieval Workflow' },
                { type: 'doc', id: 'tutorials/pull-request-summary-workflow', label: 'Pull Request Summary Workflow' },
                { type: 'doc', id: 'tutorials/text-indexing-workflow', label: 'Text Indexing and Search Workflow' },
                { type: 'doc', id: 'tutorials/finance', label: 'Loan Approval Workflow' },
                { type: 'doc', id: 'tutorials/fraud-dispute', label: 'Handling Fraud Disputes' },
            ],
        },
    ],

    // ==========================================================================
    // AGENTIC WORKFLOW ENGINE — production agent architecture + AI recipes
    // ==========================================================================
    aiSidebar: [
        {
            type: 'doc',
            id: 'agentic-workflow-engine',
            label: 'Agentic Workflow Engine',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Production Agents',
            link: { type: 'doc', id: 'ai-cookbook/production-agent-architecture' },
            className: 'leftMenuHeader',
            items: [
                { type: 'doc', id: 'ai-cookbook/first-ai-agent', label: 'Build Your First AI Agent' },
                { type: 'doc', id: 'ai-cookbook/failure-semantics', label: 'Failure Semantics' },
                { type: 'doc', id: 'ai-cookbook/durable-agents', label: 'Durable Agents' },
                { type: 'doc', id: 'ai-cookbook/human-in-the-loop', label: 'Human-in-the-Loop' },
                { type: 'doc', id: 'ai-cookbook/dynamic-workflows', label: 'Dynamic Workflows' },
                { type: 'doc', id: 'ai-cookbook/token-efficiency', label: 'Token Efficiency' },
            ],
        },
        {
            type: 'category',
            label: 'AI Cookbook',
            link: { type: 'doc', id: 'developer-guides/ai-orchestration' },
            items: [
                { type: 'doc', id: 'ai-cookbook/ai-llm-recipes', label: 'AI & LLM Recipes' },
                { type: 'doc', id: 'ai-cookbook/llm-orchestration', label: 'LLM Orchestration' },
            ],
        },
    ],

    // ==========================================================================
    // SDKs
    // ==========================================================================
    sdksSidebar: [
        { type: 'doc', id: 'sdks/sdk-index', label: 'SDKs', className: 'leftMenuHeader' },
        { type: 'doc', id: 'sdks/python', label: 'Python' },
        { type: 'doc', id: 'sdks/java', label: 'Java' },
        { type: 'doc', id: 'sdks/javascript', label: 'JavaScript' },
        { type: 'doc', id: 'sdks/csharp', label: 'C#' },
        { type: 'doc', id: 'sdks/golang', label: 'Go' },
        { type: 'doc', id: 'sdks/ruby', label: 'Ruby' },
        { type: 'doc', id: 'sdks/rust', label: 'Rust' },
    ],

    // ==========================================================================
    // REFERENCE — Task catalog + API reference + Glossary + FAQs
    // ==========================================================================
    referenceSidebar: [
        {
            type: 'category',
            label: 'Task Reference',
            link: {
                type: 'generated-index',
                title: 'Task Reference',
                description: 'Reference documentation for all tasks, including behavior, configuration options, and examples.',
                slug: '/category/reference-docs',
                keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks'],
            },
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
                        keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks'],
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/operators' }],
                },
                {
                    type: 'category',
                    label: 'System Tasks',
                    link: {
                        type: 'generated-index',
                        title: 'System Tasks',
                    description: 'Learn how system tasks execute common workflow logic directly on Conductor servers without requiring external workers.',
                        slug: '/category/reference-docs/system-tasks',
                        keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks'],
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
                                keywords: ['reference', 'tasks', 'system', 'system-tasks', 'alerting-tasks'],
                            },
                            items: [
                                'reference-docs/system-tasks/opsgenie',
                                'reference-docs/system-tasks/query-processor',
                            ],
                        },
                        {
                            type: 'category',
                            label: 'AI Tasks',
                            link: {
                                type: 'generated-index',
                                title: 'AI Tasks',
                                description: 'AI tasks are built-in system tasks used to integrate AI models and vector databases for AI-powered workflows.',
                                slug: '/category/reference-docs/ai-tasks',
                                keywords: ['reference', 'operators', 'tasks', 'system', 'system-tasks', 'ai-tasks'],
                            },
                            items: [{ type: 'autogenerated', dirName: 'reference-docs/ai-tasks' }],
                        },
                    ],
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
                keywords: ['reference', 'apis', 'api'],
            },
            className: 'leftMenuHeader',
            items: [
                { type: 'doc', id: 'sdks/authentication', label: 'Authentication' },
                {
                    type: 'category',
                    label: 'Metadata',
                    link: {
                        type: 'generated-index',
                        title: 'Metadata',
                        slug: '/reference-docs/api/metadata',
                        description: 'Use the Metadata APIs to create, update, delete, and retrieve workflow and task definitions programmatically.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/metadata' }],
                },
                {
                    type: 'category',
                    label: 'Tasks',
                    link: {
                        type: 'generated-index',
                        title: 'Tasks',
                        slug: '/reference-docs/api/task',
                        description: 'Use the Task APIs to manage task executions, retrieve task details, update task status, and log task messages programmatically.',
                    },
                    items: [
                        'reference-docs/api/task/get-task',
                        'reference-docs/api/task/add-task-log',
                        'reference-docs/api/task/update-task-status-in-workflow',
                        'reference-docs/api/task/signal-running-task-asynchronously',
                        'reference-docs/api/task/signal-running-task-synchronously',
                        {
                            type: 'category',
                            label: 'Task Queue',
                            link: { type: 'doc', id: 'reference-docs/api/task/task-queue' },
                            items: [
                                'reference-docs/api/task/task-queue/get-poll-data-for-all-task',
                                'reference-docs/api/task/task-queue/get-task-queue-size-for-all-tasks',
                                'reference-docs/api/task/task-queue/get-task-queue-size-for-individual-tasks',
                            ],
                        },
                    ],
                },
                {
                    type: 'category',
                    label: 'Workflows',
                    link: {
                        type: 'generated-index',
                        title: 'Workflows',
                        slug: '/reference-docs/api/workflow',
                        description: 'Manage workflow executions using APIs, including starting workflows, retrieving execution details, updating variables, and controlling running workflows.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/workflow' }],
                },
                {
                    type: 'category',
                    label: 'Users',
                    link: {
                        type: 'generated-index',
                        title: 'Users',
                        slug: '/reference-docs/api/users',
                        description: 'Learn how to create and manage users, retrieve user details, and check user permissions using the Users APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/users' }],
                },
                {
                    type: 'category',
                    label: 'Groups',
                    link: {
                        type: 'generated-index',
                        title: 'Groups',
                        slug: '/reference-docs/api/groups',
                        description: 'Learn how to manage groups, users, and permissions using the Groups APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/groups' }],
                },
                {
                    type: 'category',
                    label: 'Applications',
                    link: {
                        type: 'generated-index',
                        title: 'Applications',
                        slug: '/reference-docs/api/applications',
                        description: 'Learn how to manage applications, access keys, and roles using the Applications APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/applications' }],
                },
                {
                    type: 'category',
                    label: 'Tags',
                    link: {
                        type: 'generated-index',
                        title: 'Tags',
                        slug: '/reference-docs/api/tags',
                        description: 'Learn how to manage tags for task and workflow definitions, including listing, grouping, adding, replacing, and deleting tags using the Tags APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/tags' }],
                },
                {
                    type: 'category',
                    label: 'Secrets',
                    link: {
                        type: 'generated-index',
                        title: 'Secrets',
                        slug: '/reference-docs/api/secrets',
                        description: 'Learn how to create and manage secrets, retrieve secret values, check secret availability, and manage secret tags using the Secrets APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/secrets' }],
                },
                {
                    type: 'category',
                    label: 'Tokens',
                    link: {
                        type: 'generated-index',
                        title: 'Tokens',
                        slug: '/reference-docs/api/tokens',
                        description: 'Learn how to generate and manage tokens using the Tokens APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/tokens' }],
                },
                {
                    type: 'category',
                    label: 'Authorization',
                    link: {
                        type: 'generated-index',
                        title: 'Authorization',
                        slug: '/reference-docs/api/authorization',
                        description: 'Use these endpoints to manage access control for resources in Orkes Conductor. You can grant or revoke access to specific resource instances for users, groups, or roles.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/authorization' }],
                },
                {
                    type: 'category',
                    label: 'Schema',
                    link: {
                        type: 'generated-index',
                        title: 'Input/Output Schema Validation',
                        slug: '/reference-docs/api/schema',
                        description: 'Learn how to create and manage schema definitions, retrieve schema versions, and delete schemas using the Schema APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/schema' }],
                },
                {
                    type: 'category',
                    label: 'Environment Variables',
                    link: {
                        type: 'generated-index',
                        title: 'Environment Variables',
                        slug: '/reference-docs/api/environment-variables',
                        description: 'Learn how to create and manage environment variables, retrieve their values, and manage environment variable tags using the Environment Variables APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/environment-variables' }],
                },
                {
                    type: 'category',
                    label: 'Schedule',
                    link: {
                        type: 'generated-index',
                        title: 'Schedule',
                        slug: '/reference-docs/api/schedule',
                        description: 'Learn how to create and manage workflow schedules, control schedule execution, search schedules, and manage schedule tags using the Schedule APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/schedule' }],
                },
                {
                    type: 'category',
                    label: 'Webhook',
                    link: {
                        type: 'generated-index',
                        title: 'Webhook',
                        slug: '/reference-docs/api/webhooks',
                        description: 'Learn how to create and manage webhook definitions, retrieve webhook configurations, and manage webhook tags using the Webhook APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/webhooks' }],
                },
                {
                    type: 'category',
                    label: 'Human Task',
                    link: {
                        type: 'generated-index',
                        title: 'Human Task',
                        slug: '/reference-docs/api/human-tasks',
                        description: 'Learn how to manage human task executions, assign and update tasks, search tasks, and create or manage user forms using the Human Task APIs.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/human-tasks' }],
                },
                {
                    type: 'category',
                    label: 'Remote Services',
                    link: {
                        type: 'generated-index',
                        title: 'Remote Services',
                        slug: '/reference-docs/api/remote-services',
                        description: 'Learn how to register and manage HTTP and gRPC service endpoints so they can be reused across workflows.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/remote-services' }],
                },
                {
                    type: 'category',
                    label: 'Integrations',
                    link: {
                        type: 'generated-index',
                        title: 'Integrations',
                        slug: '/reference-docs/api/integrations',
                        description: 'Learn how to create or update an integration provider.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/integrations' }],
                },
                {
                    type: 'category',
                    label: 'Prompts',
                    link: {
                        type: 'generated-index',
                        title: 'Prompts',
                        slug: '/reference-docs/api/prompts',
                        description: 'Learn how to add prompts in Orkes Conductor.',
                    },
                    items: [{ type: 'autogenerated', dirName: 'reference-docs/api/prompts' }],
                },
            ],
        },
        {
            type: 'doc',
            id: 'faqs/general-faqs',
            label: 'FAQs',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            label: 'Glossary',
            id: 'glossary',
            className: 'leftMenuHeader',
        },
    ],

    // ==========================================================================
    // INTEGRATIONS
    // ==========================================================================
    integrationsSidebar: [
        {
            type: 'category',
            label: 'Integrations',
            link: {
                type: 'generated-index',
                title: 'Integrations',
                slug: '/category/integrations',
                description: 'Learn how to connect Conductor with AI providers, vector databases, message brokers, cloud platforms, databases, and external services.',
            },
            className: 'leftMenuHeader',
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
                        { type: 'doc', id: 'integrations/ai-llm/ollama', label: 'Ollama' },
                        { type: 'doc', id: 'integrations/ai-llm/azure-open-ai', label: 'Azure Open AI' },
                        { type: 'doc', id: 'integrations/ai-llm/open-ai', label: 'Open AI' },
                        { type: 'doc', id: 'integrations/ai-llm/perplexity', label: 'Perplexity' },
                        { type: 'doc', id: 'integrations/ai-llm/grok', label: 'Grok' },
                        { type: 'doc', id: 'integrations/ai-llm/cohere', label: 'Cohere' },
                        { type: 'doc', id: 'integrations/ai-llm/mistral', label: 'Mistral' },
                        { type: 'doc', id: 'integrations/ai-llm/anthropic-claude', label: 'Anthropic Claude' },
                        { type: 'doc', id: 'integrations/ai-llm/vertex-ai', label: 'Google Vertex AI' },
                        { type: 'doc', id: 'integrations/ai-llm/google-gemini-ai', label: 'Google Gemini AI' },
                        { type: 'doc', id: 'integrations/ai-llm/hugging-face', label: 'Hugging Face' },
                        { type: 'doc', id: 'integrations/ai-llm/aws-bedrock-anthropic', label: 'AWS Bedrock Anthropic' },
                        { type: 'doc', id: 'integrations/ai-llm/aws-bedrock-cohere', label: 'AWS Bedrock Cohere' },
                        { type: 'doc', id: 'integrations/ai-llm/aws-bedrock-titan', label: 'AWS Bedrock Titan' },
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
                        { type: 'doc', id: 'integrations/vector-databases/pinecone', label: 'Pinecone' },
                        { type: 'doc', id: 'integrations/vector-databases/weaviate', label: 'Weaviate' },
                        { type: 'doc', id: 'integrations/vector-databases/postgres-vector-database', label: 'Postgres Vector Database' },
                        { type: 'doc', id: 'integrations/vector-databases/mongo-vector-database', label: 'Mongo Vector Database' },
                    ],
                },
                {
                    type: 'category',
                    label: 'Message Broker',
                    link: {
                        type: 'generated-index',
                        title: 'Message Broker Integrations',
                        slug: '/category/integrations/message-broker',
                        description: 'Configure Kafka, AMQP, NATS, SQS, Azure Service Bus, GCP Pub/Sub, IBM MQ, and managed Kafka providers for event-driven workflows.',
                    },
                    items: [
                        { type: 'doc', id: 'integrations/message-broker/apache-kafka', label: 'Apache Kafka' },
                        { type: 'doc', id: 'integrations/message-broker/confluent-kafka', label: 'Confluent Kafka' },
                        { type: 'doc', id: 'integrations/message-broker/amazon-msk', label: 'Amazon MSK' },
                        { type: 'doc', id: 'integrations/message-broker/amqp', label: 'AMQP / RabbitMQ' },
                        { type: 'doc', id: 'integrations/message-broker/nats-messaging', label: 'NATS Messaging' },
                        { type: 'doc', id: 'integrations/message-broker/aws-sqs', label: 'AWS SQS' },
                        { type: 'doc', id: 'integrations/message-broker/azure-service-bus', label: 'Azure Service Bus' },
                        { type: 'doc', id: 'integrations/message-broker/gcp-pub-sub', label: 'GCP Pub/Sub' },
                        { type: 'doc', id: 'integrations/message-broker/ibm-mq', label: 'IBM MQ' },
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
                        { type: 'doc', id: 'integrations/cloud-provider/aws', label: 'AWS' },
                        { type: 'doc', id: 'integrations/cloud-provider/gcp', label: 'GCP' },
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
                        { type: 'doc', id: 'integrations/rdbms/relational-database', label: 'Relational Database' },
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
                        { type: 'doc', id: 'integrations/sendgrid', label: 'SendGrid Email' },
                        { type: 'doc', id: 'integrations/git', label: 'Git Repository' },
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
                                    label: 'Slack',
                                    link: { type: 'doc', id: 'integrations/connected-apps/productivity/slack' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/productivity/slack-operations',
                                            label: 'Slack Operations Reference',
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
                                {
                                    type: 'category',
                                    label: 'Jira',
                                    link: { type: 'doc', id: 'integrations/connected-apps/project-management/jira' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/project-management/jira-operations',
                                            label: 'Jira Operations Reference',
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
                                    label: 'Azure Storage',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/azure-storage' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/azure-storage-operations',
                                            label: 'Azure Storage Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Azure Functions',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/azure-functions' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/azure-functions-operations',
                                            label: 'Azure Functions Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Cloud Storage',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/google-cloud-storage' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/google-cloud-storage-operations',
                                            label: 'Google Cloud Storage Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Google Cloud Functions',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/google-cloud-functions' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/google-cloud-functions-operations',
                                            label: 'Google Cloud Functions Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'AWS Lambda',
                                    link: { type: 'doc', id: 'integrations/connected-apps/cloud/aws-lambda' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/cloud/aws-lambda-operations',
                                            label: 'AWS Lambda Operations Reference',
                                        },
                                    ],
                                },
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
                        {
                            type: 'category',
                            label: 'Source Control',
                            link: {
                                type: 'generated-index',
                                title: 'Source Control',
                                slug: '/category/integrations/source-control',
                                description: 'Learn how to connect source control platforms and repositories to Conductor workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'GitHub',
                                    link: { type: 'doc', id: 'integrations/connected-apps/source-control/github' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/source-control/github-operations',
                                            label: 'GitHub Operations Reference',
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
                            label: 'Database',
                            link: {
                                type: 'generated-index',
                                title: 'Database',
                                slug: '/category/integrations/database',
                                description: 'Learn how to connect Database platforms to manage and automate databases through workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'MySQL',
                                    link: { type: 'doc', id: 'integrations/connected-apps/database/mysql' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/database/mysql-operations',
                                            label: 'MySQL Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'PostgreSQL',
                                    link: { type: 'doc', id: 'integrations/connected-apps/database/postgresql' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/database/postgresql-operations',
                                            label: 'PostgreSQL Operations Reference',
                                        },
                                    ],
                                },
                                {
                                    type: 'category',
                                    label: 'Redis',
                                    link: { type: 'doc', id: 'integrations/connected-apps/database/redis' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/database/redis-operations',
                                            label: 'Redis Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Payment',
                            link: {
                                type: 'generated-index',
                                title: 'Payment',
                                slug: '/category/integrations/payment',
                                description: 'Learn how to connect payment platforms to automate payment related workflows.',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Stripe',
                                    link: { type: 'doc', id: 'integrations/connected-apps/payment/stripe' },
                                    items: [
                                        {
                                            type: 'doc',
                                            id: 'integrations/connected-apps/payment/stripe-operations',
                                            label: 'Stripe Operations Reference',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

module.exports = sidebars;
