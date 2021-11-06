/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {
    howtoSideBar: [
        'how-tos',
        {
            type: 'category',
            label: 'Workflows',
            collapsed: false,
            items: [
                'how-tos/view-workflow-executions',
                'how-tos/searching-workflows',
                'how-tos/debugging-workflows',
                'how-tos/updating-workflows',
                'how-tos/using-domains',
            ],
        },
        {
            type: 'category',
            label: 'Tasks',
            collapsed: false,
            items: [
                'how-tos/task-configurations',
                'how-tos/updating-tasks',
                'how-tos/reusing-tasks',
                'how-tos/monitoring-task-queues',
                'how-tos/using-dynamic-tasks',
                'how-tos/using-dynamic-forks',
                'how-tos/using-switch',
                'how-tos/using-sub-workflows',
            ],
        },
        {
            type: 'category',
            label: 'Workers',
            collapsed: false,
            items: [
                'how-tos/build-a-java-task-worker',
                'how-tos/build-a-python-task-worker',
                'how-tos/build-a-golang-task-worker',
                'how-tos/build-a-nodejs-task-worker',
            ],
        },
        {
            type: 'category',
            label: 'Client SDKs',
            collapsed: false,
            items: [
                'how-tos/java-sdk',
                'how-tos/python-sdk',
                'how-tos/golang-sdk',
                'how-tos/nodejs-sdk',
            ],
        },
        {
            type: 'category',
            label: 'Best Practices',
            collapsed: false,
            items: [
                'how-tos/maintaining-workflows',
                'how-tos/idempotency',
                'how-tos/retry-configurations',
                'how-tos/timeouts',
            ],
        },
        {
            type: 'category',
            label: 'Running in Production',
            collapsed: false,
            items: [
                'how-tos/conductor-configurations',
                'how-tos/scaling-the-system',
                'how-tos/archival-of-workflows',
                'how-tos/configuring-metrics',
            ],
        },

    ],
    tutorialsSideBarV2: [
        'tutorials',
        {
            type: 'category',
            label: 'Installation Guide',
            collapsed: false,
            items: [
                'installing-conductor/running-locally',
                'installing-conductor/running-locally-docker',
                'installing-conductor/running-locally-minikube'
            ],
        },
        {
            type: 'category',
            label: 'Running Workflows',
            collapsed: false,
            items: [
                'running-workflows/create-workflow',
                'running-workflows/execute-workflow',
                'running-workflows/create-task',
                'running-workflows/adding-tasks',
                'running-workflows/adding-system-tasks',
                'running-workflows/running-task-workers',
                'running-workflows/using-java-client-sdk',
                'running-workflows/tasks-across-microservices',
                'running-workflows/handling-errors',
                'running-workflows/restarting-workflows',
                'running-workflows/pause-resume-workflows',
                'running-workflows/viewing-definitions',
            ],
        },
    ],

    referenceDocsSideBar: [
        'reference-docs',
        {
            type:'category',
            label:'Concepts',
            collapsed:false,
            items:[
                'reference-docs/concepts-overview',
                'reference-docs/workflows',
                'reference-docs/tasks-and-workers',
                'reference-docs/operators',
                'reference-docs/system-tasks',
            ],
        },
        {
            type:'category',
            label:'System Tasks',
            collapsed:false,
            items:[
                'reference-docs/http-task',
                'reference-docs/kafka-publish-task',
                'reference-docs/json-jq-transform-task',
                'reference-docs/set-variable-task',
            ],
        },
        {
            type:'category',
            label:'Operators',
            collapsed:false,
            items:[
                'reference-docs/switch-task',
                'reference-docs/do-while-task',
                'reference-docs/fork-task',
                'reference-docs/dynamic-fork-task',
                'reference-docs/join-task',
                'reference-docs/exclusive-join-task',
                'reference-docs/wait-task',
                'reference-docs/dynamic-task',
                'reference-docs/inline-task',
                'reference-docs/terminate-task',
                'reference-docs/set-variable-task',
                'reference-docs/sub-workflow-task',
            ],
        },
        {
            type:'category',
            label:'Event Task',
            collapsed:false,
            items:[

            ],
        },
    ],
    tutorialsSideBar: [
        'intro',
        {
            type: 'category',
            label: 'Installation Guide',
            collapsed: false,
            items: [
                'installing-conductor/running-locally',
                'installing-conductor/running-locally-docker',
                'installing-conductor/running-locally-minikube',
            ],
        },
        {
            type: 'category',
            label: 'Running Workflows',
            collapsed: false,
            items: [
                'running-workflows/running-first-workflow',
                'running-workflows/running-first-worker',
                'running-workflows/running-workers-microservices',
            ],
        },
        {
            type: 'category',
            label: 'Running in Production',
            collapsed: false,
            items: [
                'running-in-production/running-in-aws',
                'running-in-production/running-in-gcp',
                'running-in-production/running-in-azure',
            ],
        }
    ],
    docsSideBar: [
        'docsIntro',
        {
            type: 'category',
            label: 'System Tasks',
            collapsed: false,
            items: [
                'reference-docs/system-tasks/http-task',
                'reference-docs/system-tasks/inline-task',
                'reference-docs/system-tasks/json-jq-transform-task',
                'reference-docs/system-tasks/kafka-publish-task',
            ],
        }
    ]
};
