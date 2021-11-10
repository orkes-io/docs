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
                'how-tos/starting-workflows',
                'how-tos/searching-workflows',
                'how-tos/view-workflow-executions',
                'how-tos/debugging-workflows',
                'how-tos/updating-workflows',
            ],
        },
        {
            type: 'category',
            label: 'Tasks',
            collapsed: false,
            items: [
                'how-tos/creating-tasks',
                'how-tos/updating-tasks',
                'how-tos/task-configurations',
                'how-tos/task-inputs',
                'how-tos/task-timeouts',
                'how-tos/monitoring-task-queues',
                'how-tos/reusing-tasks',
                'how-tos/using-dynamic-tasks',
                'how-tos/using-dynamic-forks',
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
        'introduction',
        {
            type:'category',
            label:'Concepts',
            collapsed:false,
            items:[
                'getting-started/concepts/concepts-overview',
                'getting-started/concepts/workflows',
                'getting-started/concepts/tasks-and-workers',
                'getting-started/concepts/operators',
                'getting-started/concepts/system-tasks',
            ],
        },
        {
            type: 'category',
            label: 'Installation Guide',
            collapsed: false,
            items: [
                'getting-started/install/running-locally',
                'getting-started/install/running-locally-docker',
            ],
        },
        {
            type: 'category',
            label: 'Running Workflows',
            collapsed: false,
            items: [
                'getting-started/run/running-first-workflow',
                'getting-started/run/running-first-worker',
            ],
        },
    ],

    referenceDocsSideBar: [
        'reference-docs',
        {
            type:'category',
            label:'System Tasks',
            collapsed:false,
            items:[
                'reference-docs/system-tasks/http-task',
                'reference-docs/system-tasks/inline-task',
                'reference-docs/system-tasks/json-jq-transform-task',
                'reference-docs/system-tasks/kafka-publish-task',
                'reference-docs/system-tasks/event-task',
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
                'reference-docs/system-tasks/event-task',
            ],
        }
    ]
};
