# Workflow Versioning and adding a loop

# Order Fulfillment Codelab part 5.5

Now that we have some notifications of workflow failures, we can continue with the automation of our shipping workflow. At this point, we're going to make a bigger change to the workflow - adding additional inputs that might break the current workflow. So we'll create a new version of the workflow.

## Versioning

Until now, all of the changes have been made on the same workflow - as the changes have been improvements but have not materially changed the way the workflow works in any way.

When a large change is made, a new version of the same workflow can be created. Versions are integer based, so we've been working on V1, meaning that this next version will be V2.

What is great about versioning is that _both_ workflows can be live and in production at once. If some of your users are not ready to upgrade to the latest version of your workflow - they can remain on the older version indefinitely - while others are on the newer version(s). Additionally, during a migration - any workflows running on V1 will remain on V1 - and only new workflows will move to the V2 version - ensuring that the user experience of your workflows never breaks.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/WiJQua49R8k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Big changes

The biggest issue with your widget order fulfillment is that customers can only order one widget at a time. The suggestion from Bob was "just run the app a bunch of times" - and today - if there are multiple orders, the workflow is just called multiple times.

We can do better, and in V2, we'll accept the address parameters AND the number of widgets parameter.

```
{
  "numberOfWidgets": "12",
  "name": "Bob McBobFace",
  "street": "21 Bob Lane",
  "city": "Bobville",
  "state": "OR",
  "zip": "53111"
}
```

There are 2 places we will use the `numberOfWidgets` param.

1. We'll create a loop that calls the `widget_shipping` task to create `numberOfWidgets` labels for shipping.
2. We'll update the HTTP Task that reorders widgets to not order one (currently hardcoded into the API call) but to reorder as many as are being shipped out.

## Do/While Loop

For developers, a [Do/While](/content/docs/reference-docs/do-while-task) loop is probably a familiar construct. It will DO something over and over WHILE a certain criterion is valid.

Here's what our Do/While task (called `shipping_loop`) looks like:

```json
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
    },
```

The `loopCondition` says that as long as the iterator of the loop (indexed at zero) is less than the number of widgets ordered - run the loop.

This will create the shipping label, and tracking number for each widget ordered.

> Before saving this change - be sure to update the workflow version to 2

Our new workflow now appears as follows:

<p align="center"><img src="/content/img/codelab/OF5_5_loopworkflow.png" alt="adding the do-while loop" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Updating the reorder

Since our workflow can now process more than one widget at a time, we must update our replenishment order with the number of widgets ordered. In version 1, we had hardcoded the re-order value to one. Now, we can use the workflow input variable `numberOfWidgets` to correctly update the `count` parameter of the reorder:

```json
{
    "name": "reorder_widgets",
    "taskReferenceName": "reorder_widgets_ref",
    "inputParameters": {
    "http_request": {
        "uri": "http://restfuldemo.herokuapp.com/appendorder",
        "method": "POST",
        "body": {
        "item": "widget",
        "count": "${workflow.input.numberOfWidgets}"
        },
        "connectionTimeOut": 5000,
        "readTimeOut": 5000
    }
},
```

Finally, in the workflow output, version one reported the address and tracking number for the one order. We really need a JSON report of _all the orders_. Luckily, the Do-While task creates a summary output for each task that runs inside the loop, so we can just reference the output from the loop.

```json
  "workflowOutput": {
    "orderDetails": "${shipping_loop_ref.output}",
    "reorder": "${reorder_widgets_ref.output.response.body}"
  },
```

> NOTE: The workflow only terminates through the 2 terminate tasks, `terminate_success`, and `terminate_failure`, so the `workflowOutput` must be updated for both tasks. The workflow will never actually call the `outputParameters`, but it does not hurt to update that parameter as well.

Now, our order fulfillment operation is up and running - handling errors moderately well, updating the inventory order, and handling multiple orders per transaction.

In the last section of this tutorial, we will add one more feature - using Dynamic forks to support shipping to multiple addresses.
