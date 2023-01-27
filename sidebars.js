/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {
    gettingStartedSideBar: [
        {
            type: 'category',
            label: 'Getting Started',
            collapsed: false,
            items: [
                'introduction',
                'getting-started/concepts/concepts-overview',
                'getting-started/concepts/distributed-apps',
                'getting-started/concepts/workflows',
                'getting-started/concepts/resiliency',
            ],
        },
        {
            type: 'category',
            label: 'Building with Conductor',
            collapsed: false,
            items: [
                'conductor/workflow',
                {
                    type: 'category',
                    label: 'Operators',
                    collapsed: true,
                    items: [
                        'conductor/operators/decision',
                        'conductor/operators/while',
                        'conductor/operators/forkjoin'
                    ]
                },
                {
                    type: 'category',
                    label: 'Built-in Tasks',
                    collapsed: true,
                    items: [
                        'conductor/system-tasks/http',
                        'conductor/system-tasks/jq_transform',
                        'conductor/system-tasks/business_rule'
                    ]
                },
                'conductor/kitchensink'
            ],
        },
    ],
    apiSidebar: [
        {
            type: 'category',
            label: 'API Documentation',
            collapsed: false,
            link: {
                type: 'doc',
                id: 'api/index',
            },
            items: [
                {
                    type: 'category',
                    label: 'Workflow Management',
                    collapsed: true,
                    items: [
                        'api/workflow/start',
                        'api/workflow/execute'
                    ]
                },
            ],
        },
    ],
};
