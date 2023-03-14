/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {

    referenceDocSidebar: [
        'reference-docs',
        {
            type: 'category',
            label: 'Conductor Tasks',
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/json-jq-transform-task',
                    label: "JSON JQ Transform Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/http-task',
                    label: "HTTP Task"
                },
{
                    type: 'doc',
                    id: 'reference-docs/system-tasks/http-poll-task',
                    label: "HTTP Poll Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/kafka-publish-task',
                    label: "Kafka Publish Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/event-task',
                    label: "Event Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/inline-task',
                    label: "Inline Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/webhook-task',
                    label: "Webhook Task"
                },
                {
                    type: 'doc',
                    id: 'reference-docs/system-tasks/business-rule',
                    label: "Business Rule Task"
                }
            ]
        },
        {
            type: 'category',
            label: 'Operator Tasks',
            collapsed: false,
            items: [
                'reference-docs/switch-task',
                'reference-docs/do-while-task',
                'reference-docs/fork-task',
                'reference-docs/dynamic-fork-task',
                'reference-docs/dynamic-fork-from-array-task',
                'reference-docs/join-task',
                'reference-docs/wait-task',
                'reference-docs/human-task',
                'reference-docs/dynamic-task',
                'reference-docs/set-variable-task',
                'reference-docs/sub-workflow-task',
                'reference-docs/start-workflow',
                'reference-docs/terminate-task',
    'reference-docs/system-tasks/terminate-workflow'
            ]
        }
    ],
    mainSidebar: [
        {
            type: 'doc',
            id: 'introduction',
            label: "Introduction to Conductor"
        }, 
        {
            type: 'doc',
            id: 'what-use-cases-can-conductor-solve',
            label: "What use cases can Conductor solve?​"
        },
        {
            type: 'category',
            label: 'Core Concepts',
            collapsed: false,
            items: [
                'getting-started/concepts/workflows',
                'getting-started/concepts/tasks-and-workers',
                'getting-started/concepts/operators',
                {
                    type: 'doc',
                    id: 'getting-started/concepts/system-tasks',
                    label: 'System Task'
                },
            ],
        },
        {
            type: 'category',
            label: 'Quickstart',
            collapsed: true,
            items: [
                'getting-started/playground/using-conductor-playground',
                {
                    type: 'doc',
                    id: 'getting-started/install/orkes-conductor-community',
                    label: 'Orkes Community Container'
                },
                {
                    type: 'doc',
                    id: 'getting-started/install/running-locally-docker',
                    label: 'Orkes Enterprise Container'
                }
            ],
        },
        {
            type: 'category',
            label: 'Task How-Tos',
            collapsed: true,
            items: [
                'how-tos/Tasks/creating-tasks',
                'how-tos/Tasks/task-inputs',
                'how-tos/Tasks/task-configurations',
                'how-tos/Tasks/task-timeouts',
                'how-tos/Tasks/updating-tasks',
                'how-tos/Tasks/reusing-tasks',
                'how-tos/Tasks/task-domains',
                'how-tos/Tasks/monitoring-task-queues',
                'how-tos/Tasks/task-lifecycle',
                'how-tos/Tasks/SQS-event-task',
            ]
        },
        {
            type: 'category',
            label: 'Workflow How-Tos',
            collapsed: true,
            items: [
                'how-tos/Workflows/create-workflow',
                'getting-started/run/running-first-workflow',
                'how-tos/Workers/write-workers',
                'getting-started/run/running-first-worker',
                'how-tos/Workflows/starting-workflows',
                'how-tos/Workflows/view-workflow-executions',
                'how-tos/Workflows/searching-workflows',
                'reference-docs/scheduler',
                'how-tos/Workflows/versioning-workflows',
                'how-tos/Workflows/create-secrets',
                'how-tos/Workflows/updating-workflows',
                'how-tos/Workflows/handling-errors',
                'how-tos/retries-failures-rate_limits',
                'how-tos/continuous_integration',
                {
                    type: 'doc',
                    id: 'how-tos/Workflows/debugging-workflows',
                    label: "Troubleshooting Workflows"
                },
                {
                    type: 'doc',
                    id: 'how-tos/Workflows/migrate-workflows',
                    label: "Migrate Workflows"
                },
            ]
        },
        {

            type: 'category',
            label: 'SDK list',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'how-tos/SDKs',
                    label: 'SDKs'
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/java-sdk/workflow_sdk',
                    label: "Java Workflow SDK"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/java-sdk/worker_sdk',
                    label: "Java Worker SDK"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/java-sdk/testing_framework',
                    label: "Java Unit Testing"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/conductor-python/main/README',
                    label: "Python"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/conductor-go/main/README',
                    label: "Go"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/conductor-csharp/main/README',
                    label: "CSharp"
                },
                {
                    type: 'doc',
                    id: 'how-tos/sdks/conductor-clojure/main/README',
                    label: "Clojure"
                }
            ],
        },
        {
            type: 'category',
            label: 'Events',
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'how-tos/Events', // generate sidebar from the docs folder (or versioned_docs/<version>)
                },
            ],
        },
        {
            type: 'category',
            label: 'Monitoring',
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'how-tos/Monitoring', // generate sidebar from the docs folder (or versioned_docs/<version>)
                },
            ],
        },
        {
            type: 'category',
            label: 'Access Control',
            collapsed: true,
            items: [
                'getting-started/concepts/access-control',
                'getting-started/concepts/access-control-users',
                'getting-started/concepts/access-control-applications',
                'getting-started/concepts/access-control-tags'
            ],
        },
        {
            type: 'category',
            label: 'Use Cases',
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    id: 'usecases/image_processing/README',
                    label: 'Image Processing Workflows'
                },
                {
                    type: 'doc',
                    id: 'usecases/video_processing/README',
                    label: 'Video Processing Workflows'
                },
                {
                    type: 'doc',
                    id: 'usecases/US_post_office/README',
                    label: 'API Processing Workflows'
                },
                {
                    type: 'doc',
                    id: 'usecases/finance/README',
                    label: 'Loan Origination'
                },
                {
                    type: 'doc',
                    id: 'usecases/fraud_dispute/README',
                    label: 'Fraud Dispute Transaction'
                },
                'usecases/document_approvals/README',
                'usecases/video-processing-workflows'
            ]
        },
        {
            type: 'category',
            label: 'Code Labs',
            collapsed: true,
            items: [
                'codelab/helloworld',
                'codelab/helloworld2',
                'codelab/helloworld3',
                'codelab/helloworld4',
                'codelab/helloworld5',
                'codelab/beginner',
                {
                    type: 'doc',
                    id: 'codelab/orderfulfillment',
                    label: "Order Fulfillment Codelab"
                },
                'codelab/sequentialHTTPtasks',
                'codelab/taskToDomain',
            ],
        },
        {
            type: 'category',
            label: 'FAQs',
            collapsed: true,
            items: [
                'faq',
                'reference-docs/directed-acyclic-graph'
            ],
        },
        {
            type: 'category',
            label: 'Troubleshooting',
            collapsed: true,
            items: [
                'troubleshooting'
            ],
        },
    ],
    orderfulfillment: [
        {
            type: 'category',
            label: 'Code Lab: Order Fulfillment',
            collapsed: true,
            items: [
                'codelab/orderfulfillment',
                'codelab/orderfulfillment2',
                'codelab/orderfulfillment3',
                'codelab/orderfulfillment4',
                'codelab/orderfulfillment5',
                'codelab/orderfulfillment5_5',
                'codelab/orderfulfillment6',
                'codelab/orderfulfillment7',
                'codelab/orderfulfillment8'
            ],
        },
    ],
};
