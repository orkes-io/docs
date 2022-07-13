/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
 module.exports = {
   
    mainSidebar: [
        {   type: 'doc', 
            id: 'introduction',
            label:"What is Conductor?"
        },
        'example_usecases',
        {
            type: 'category',
            label: 'Quick Start',
            collapsed: true,
            items: [
                {
                    type: 'category',
                    label: 'Core Concepts',
                    collapsed: false,
                    items: [
                       'getting-started/concepts/workflows',
                       'getting-started/concepts/tasks-and-workers',
                       'getting-started/concepts/operators',
                       
                    ],
                },
                'getting-started/run/running-first-workflow'
            ],
        },
        {
            type: 'category',
            label: 'Installing Conductor',
            collapsed: true,
            items: [
               'getting-started/playground/using-conductor-playground',
               'getting-started/install/running-locally-docker'
            ],
        },
        {
            type: 'category',
            label: 'Creating Workflows',
            collapsed: true,
            items: [
                {   type: 'doc', 
                id: 'codelab/sequentialHTTPtasks',
                label:"Simple Two task workflow"
                },
                {
                    type: 'category',
                    label: 'Pre-built System Tasks',
                    collapsed: false,
                    items: [
                        'getting-started/concepts/system-tasks',
                        {   type: 'doc', 
                            id: 'reference-docs/system-tasks/json-jq-transform-task',
                            label:"Process JSON with JQ"
                         },
                         {   type: 'doc', 
                            id: 'reference-docs/system-tasks/http-task',
                            label:"Make REST calls with HTTP"
                         },
                         {   type: 'doc', 
                         id: 'reference-docs/system-tasks/kafka-publish-task',
                         label:"Publish Events to Kafka"
                        },
                        {   type: 'doc', 
                         id: 'reference-docs/system-tasks/event-task',
                         label:"Publish Events to SQS"
                        },
                        {   type: 'doc', 
                         id: 'reference-docs/system-tasks/inline-task',
                         label:"Execute Lightweight Javascript code"
                        },
                        {   type: 'doc', 
                        id: 'reference-docs/wait-task',
                        label:"Wait for a time duration"
                       },
                   
                    ]
                }
            ]
        },
        'how-tos/Workers/why-create-workers',
        
        'reference-docs/scheduler',
        {   type: 'doc', 
        id: 'getting-started/concepts/access-control',
       label:"Secure with Access Control"
        },
        {   type: 'doc', 
             id: 'how-tos/Workflows/debugging-workflows',
            label:"Troubleshooting Workflows"
        },
        'how-tos/Workflows/workflow-retries-failures-rate_limits',
        'how-tos/continuous_integration',
        {
                        
            type: 'category',
            label: 'SDK list',
            collapsed: true,
            items: [
                {
                    type:'doc',
                    id:  'how-tos/SDKs',
                    label:'SDKs'
                },
                {   type: 'doc', 
                    id: 'how-tos/sdks/java-sdk/workflow_sdk',
                    label:"Java Workflow SDK"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/java-sdk/worker_sdk',
                    label:"Java Worker SDK"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/java-sdk/testing_framework',
                    label:"Java Unit Testing"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/conductor-python/main/README',
                    label:"Python"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/conductor-go/main/README',
                    label:"Go"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/conductor-csharp/main/README',
                    label:"CSharp"},
                {   type: 'doc', 
                    id: 'how-tos/sdks/conductor-clojure/main/README',
                    label:"Clojure"}
             ],
        },
        {
            type: 'category',
            label: 'Code Labs',
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'getting-started/run', // generate sidebar from the docs folder (or versioned_docs/<version>)
                  },
                'codelab/helloworld',
                'codelab/beginner',
                {   type: 'doc', 
                            id: 'codelab/orderfulfillment',
                            label:"Order Fulfillment Codelab"},
                'codelab/sequentialHTTPtasks',
                'codelab/taskToDomain'
                
            ],
        },
        {
            type: 'category',
            label: 'Use Cases',
            collapsed: true,
            items: [
                'usecases/image_processing/README',
                'usecases/video_processing/README',
                'usecases/US_post_office/README',
                'usecases/workflow_AB_testing/README',
                'usecases/finance/README',
                'usecases/document_approvals/README',
                'usecases/Simple_ETL/README'
                ]
        },

    ],
    orderfulfillment: [
        {items : [
            'codelab/orderfulfillment',
            'codelab/orderfulfillment2',
            'codelab/orderfulfillment3',
            'codelab/orderfulfillment4',
            'codelab/orderfulfillment5',
            'codelab/orderfulfillment5_5',
            'codelab/orderfulfillment6',
            'codelab/orderfulfillment7',
            'codelab/orderfulfillment8'
        ]}
    ],

    reference: [
        'introduction',
        {
            type: 'category',
            label: 'Installation Guide',
            collapsed: true,
            items: [
                 {
                    type: 'category',
                    label: 'Conductor Playground',
                    collapsed: false,
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'getting-started/playground', // generate sidebar from the docs folder (or versioned_docs/<version>)
                          },
                       
                    ],
                },
                {
                    type: 'autogenerated',
                    dirName: 'getting-started/install', // generate sidebar from the docs folder (or versioned_docs/<version>)
                  },
               
            ],
        },
        
        
        {
            type: 'category',
            label: 'Code Labs',
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'getting-started/run', // generate sidebar from the docs folder (or versioned_docs/<version>)
                  },
                'codelab/helloworld',
                'codelab/beginner',
                {   type: 'doc', 
                            id: 'codelab/orderfulfillment',
                            label:"Order Fulfillment Codelab"},
                'codelab/sequentialHTTPtasks',
                'codelab/taskToDomain'
                
            ],
        },
 
       
        {
            type: 'category',
            label: 'Use Cases',
            collapsed: true,
            items: [
                'usecases/image_processing/README',
                'usecases/video_processing/README',
                'usecases/US_post_office/README',
                'usecases/workflow_AB_testing/README',
                'usecases/finance/README',
                'usecases/document_approvals/README',
                'usecases/Simple_ETL/README'
                ]
        },
        {
            type:'category',
            label:'Reference Documentation',
            collapsed:false,
            items:[
                
                   'getting-started/concepts/concepts-overview',
                   
                   {
                    type: 'category',
                    label: 'Workflows',
                    collapsed: true,
                    items: [
                        {
                            type:'doc',
                            id:'getting-started/concepts/workflows',
                            label:'Workflow Introduction'
                        },
                        'how-tos/Workflows/create-workflow',
                        'how-tos/Workflows/updating-workflows',
                        'how-tos/Workflows/versioning-workflows',
                        'how-tos/Workflows/starting-workflows',
                        'how-tos/Workflows/schedule-workflow',
                        'how-tos/Workflows/view-workflow-executions',
                        'how-tos/Workflows/searching-workflows',
                        'how-tos/Workflows/debugging-workflows',
                        'how-tos/Workflows/handling-errors',

                    ],
                    },
                   
                    {
                        type: 'category',
                        label: 'Task and Workers',
                        collapsed: true,
                        items: [
                            {
                                type:'doc',
                                id:'getting-started/concepts/tasks-and-workers',
                                label:'Task and Worker Introduction'
                            },
                           
                            {
                                type:'category',
                                label:'System Task Reference',
                                collapsed:true,
                                items:[
                                    {
                                        type:'doc',
                                        id:   'getting-started/concepts/system-tasks',
                                        label:'System Task Introduction'
                                    },
                                    {
                                        type: 'autogenerated',
                                        dirName: 'reference-docs/system-tasks', // generate sidebar from the docs folder (or versioned_docs/<version>)
                                      },
                                ],
                            },
                            'how-tos/Tasks/extending-system-tasks',
                            
                            {
                                type:'category',
                                label:'Operator Reference',
                                collapsed:true,
                                items:[
                                    {
                                        type:'doc',
                                        id:  'getting-started/concepts/operators',
                                        label:'Operator Introduction'
                                    },
                                    'reference-docs/switch-task',
                                    'reference-docs/do-while-task',
                                    'reference-docs/fork-task',
                                    'reference-docs/dynamic-fork-task',
                                    'reference-docs/join-task',
                                    'reference-docs/wait-task',
                                    'reference-docs/human-task',
                                    'reference-docs/dynamic-task',
                                    'reference-docs/terminate-task',
                                    'reference-docs/set-variable-task',
                                    'reference-docs/sub-workflow-task',
                                ],
                            },
                            'how-tos/Tasks/creating-tasks',
                            'how-tos/Tasks/updating-tasks',
                            'how-tos/Tasks/reusing-tasks',
                            'how-tos/Tasks/task-configurations',
                            'how-tos/Tasks/task-inputs',
                            'how-tos/Tasks/monitoring-task-queues',
                            'how-tos/Tasks/task-domains',
                            'how-tos/Tasks/task-lifecycle',
                            'how-tos/Tasks/dynamic-vs-switch-tasks',
                            'how-tos/Tasks/SQS-event-task'
                        ],
                    },
                  
                    {
                        
                        type: 'category',
                        label: 'SDK list',
                        collapsed: true,
                        items: [
                            {
                                type:'doc',
                                id:  'how-tos/SDKs',
                                label:'SDKs'
                            },
                            {   type: 'doc', 
                                id: 'how-tos/sdks/java-sdk/workflow_sdk',
                                label:"Java Workflow SDK"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/java-sdk/worker_sdk',
                                label:"Java Worker SDK"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/java-sdk/testing_framework',
                                label:"Java Unit Testing"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/conductor-python/main/README',
                                label:"Python"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/conductor-go/main/README',
                                label:"Go"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/conductor-csharp/main/README',
                                label:"CSharp"},
                            {   type: 'doc', 
                                id: 'how-tos/sdks/conductor-clojure/main/README',
                                label:"Clojure"}
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
                    'reference-docs/scheduler',
                    {
                        type: 'category',
                        label: 'Access Control',
                        collapsed: true,
                        items: [
                            'getting-started/concepts/access-control',
                            'getting-started/concepts/access-control-users',
                            'getting-started/concepts/access-control-applications'
                        ],
                    },
                    {
                        type: 'category',
                        label: 'Extending Conductor',
                        collapsed: true,
                        items: [
                            'Conductor/adding-datadog'
                        ],
                    },
                    {   type: 'doc', 
                        id: 'how-tos/continuous_integration',
                        label:'CI/CD'},
                    
                    'reference-docs/directed-acyclic-graph'
  
            ],

        },

       
        ]
};
