# Parallel Tasks and Subworkflows

# Order Fulfillment Codelab part 6

You're running order fulfillment at Bob's Widgets, and at the start of this tutorial, it was a totally manual process. We've got 2 versions of the process running in Conductor, with error handling and the ability to process multiple orders at once.

The sales team has learned that many of Bob's Widget's customers buy multiple widgets and then send them out to valued customers again. They know that offering 'drop-shipping' - or the ability for customers to upload a list of addresses and to have Bob's Widgets mail them directly - would be a feature that our customers would pay extra for.

Our workflow creates the labels for multiple shipments - but currently only handles one address as input. So, this will require a new version of our workflow (but it will lean heavily on the existing work already completed).

## Workflow V2

<p align="center"><img src="/content/img/codelab/OF5_5_loopworkflow.png" alt="adding the do-while loop" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

In order to support drop-shipping while still supporting multiple shipments to a single address, we need to run the `shipping_loop` (and the internal `widget_shipping`) tasks once per address. To do this, we'll utilize the [FORK](/content/docs/reference-docs/fork-task) System task. The Fork task creates a number of parallel task flows that can run simultaneously. We'll use a fork to create address labels for multiple addresses at once.

## Forks

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/01LG4qLeXw4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

A Fork (and a Join) are system tasks that run inside the Conductor server. Forks split your workflow into multiple paths that can be run asynchronously. The JOIN task tells Conductor when to reconnect the paths and continue through the workflow.

An example fork might look like this:

```
   {
      "name": "ship_multiple_fork",
      "taskReferenceName": "ship_fork_ref",
      "type": "FORK_JOIN",
      "forkTasks":[
        [
          <widget_shipping<uniqueId>_1>
        ],
        [
          <widget_shipping<uniqueId>_2>
        ]
      ]
    },
    {
      "name": "shipping_join",
      "taskReferenceName": "shipping_join_ref",
      "type": "JOIN",
      "joinOn": [
        "shipping_widget1",
        "shipping_widget2"
      ]
    }
```

For space, the 2 forkTasks are left out, but imagine reusing the `widget_shipping` tasks in version 1 and then appending a unique value (in this case, 1 & 2) to ensure each task has a unique reference. The workflow would look something like this:

<p align="center"><img src="/content/img/codelab/of4_forkexample.png" alt="version 2 regular fork" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now, this is great, but with a fork, the number of 'tines' in the fork is defined at workflow definition. Since the number of addresses will change on each order, we need something more flexible that can be defined at runtime. Luckily we have that - the [DYNAMIC_FORK](/content/docs/reference-docs/dynamic-fork-task). Dynamic forks determine the number of 'tines' at workflow runtime - which is exactly what we need to build our dropshipping application. This will provide the flexibility we need to support dropshipping of Bob's widgets.

But - before we build our dynamic fork, we have a lot of housekeeping to take care of.

- Reorganize our tasks into a subworkflow.
- Create the input JSON required for a Dynamic fork.

This is going to be a bit of work, so we'll start with creating a subworkflow.

## Subworkflow

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/TUm0C3x_vYg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

Each tine of our dynamic fork is to have a DO/WHILE loop with the `widget_shipping` task inside it. However, a dynamic fork can only reference one task. To make this work, we'll encase these two tasks inside a subworkflow.

Conductor has a system task called the [SUB_WORKFLOW](/content/docs/reference-docs/sub-workflow-task). It allows an entire workflow to be called in place of a task. There are a number of reasons SUBWORKFLOWS are useful.

- Placing a series of tasks in a Dynamic fork (our use case).
- Simplifying workflows when a series of tasks are reused multiple times.
- Simplifying complex workflow diagrams.

To encase our two tasks into the Dynamic Fork, we'll create the following subworkflow:

```JSON
{
  "name": "Shipping_loop_workflow",
  "description": "shipping loop workflow to be used as a subworkflow",
  "version": 1,
  "tasks": [
    {
      "name": "shipping_loop",
      "taskReferenceName": "shipping_loop_ref",
      "inputParameters": {
        "orderCount": "${workflow.input.numberOfWidgets}"
      },
      "type": "DO_WHILE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopCondition": "if($.shipping_loop_ref['iteration'] < $.orderCount) { true; } else { false; }",
      "loopOver": [
        {
          "name": "widget_shipping",
          "taskReferenceName": "widget_shipping",
          "inputParameters": {
            "name": "${workflow.input.name}",
            "street": "${workflow.input.street}",
            "city": "${workflow.input.city}",
            "state": "${workflow.input.state}",
            "zip": "${workflow.input.zip}"
          },
          "type": "SIMPLE",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ]
    }
  ],
  "inputParameters": [],
  "outputParameters": {
      "orderDetails": "${shipping_loop_ref.output}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```

> Note: We updated the workflow `outputParameters` to output the JSON from the loop. This will allow us to take the output from all the sub workflows and combine them into the output of the overall workflow.

> Also note: This new workflow must be added to the application logic under `Applications` in the playground - so that the application management knows that the workflow is authorized to run with the same Key/Secret. We did this on the 2nd page of this codelab; [here's a link for a refresher](/content/docs/codelab/orderfulfillment2#workflow-and-task-permissions).

<p align="center"><img src="/content/img/codelab/of6_subworkflow.png" alt="subworkflow for dynamic task" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Before implementing Dynamic Fork, we can update our existing workflow to call our new Subworkflow in place of the loop/shipping widget. This is done by replacing the Do/while loop (and the embedded task) in the workflow with a subworkflow task. This task defines the workflow (and the version of the workflow to be called.)

```JSON
{
      "name": "shipping_loop_subworkflow",
      "taskReferenceName": "shipping_loop_subworkflow_ref",
      "inputParameters": {},
      "type": "SUB_WORKFLOW",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "subWorkflowParam": {
        "name": "shipping_loop_subworkflow",
        "version": 1
      },
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
```

Outwardly, the workflow will behave exactly the same way - all the same tasks are called in exactly the same order. If we look under the hood, however, we see that the `Bobs_widget_fulfillment` workflow creates a `shipping_loop_workflow` for the looping portion. So there are now 2 workflow executions (the parent and the one subworkflow) whenever the workflow is run.

<p align="center"><img src="/content/img/codelab/of6_twoexecutions.png" alt="table showing 2 workflow executions" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The `shipping_loop_workflow` and `Bobs_widget_fulfillment` executions look like V2 of our workflow, but just in two pieces:

<p align="center"><img src="/content/img/codelab/of6_loop.png" alt="loop workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

<p align="center"><img src="/content/img/codelab/of6_workflow.png" alt="new workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Building this sub workflow is step one in getting our Dynamic task ready. In our next step, we must create the input data that the Dynamic task requires - and we'll use JQ Transform tasks to accomplish that.
