/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {
    tutorialsSideBar: [
        'intro',
        {
            type: 'category',
            label: 'Getting Started - Local',
            collapsed: false,
            items: [
                'getting-started-local/running-locally',
                'getting-started-local/running-locally-docker',
                'getting-started-local/running-locally-minikube'
            ],
        },
        {
            type: 'category',
            label: 'Running Workflows',
            collapsed: false,
            items: [
                'running-workflows/running-first-workflow',
                'running-workflows/running-first-worker',
                'running-workflows/running-workers-microservices'
            ],
        }
        ,
        {
            type: 'category',
            label: 'Running in Production',
            collapsed: false,
            items: [
                'running-in-production/running-in-aws',
                'running-in-production/running-in-gcp',
                'running-in-production/running-in-azure'
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
                'system-tasks/do-while-task',
                'system-tasks/dynamic-fork-task',
                'system-tasks/dynamic-task',
                'system-tasks/event-task',
                'system-tasks/exclusive-join-task',
                'system-tasks/fork-task',
                'system-tasks/http-task',
                'system-tasks/inline-task',
                'system-tasks/join-task',
                'system-tasks/json-jq-transform-task',
                'system-tasks/kafka-publish-task',
                'system-tasks/set-variable-task',
                'system-tasks/sub-workflow-task',
                'system-tasks/switch-task',
                'system-tasks/terminate-task',
                'system-tasks/wait-task',
            ],
        }
    ]
};
