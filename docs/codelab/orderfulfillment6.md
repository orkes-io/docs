
# Dynamic tasks, Subworkflows and JQ Transform
# Order Fulfillment Codelab part 6

You're running order fulfillment at Bob's Widgets, and at the start of this tutorial, it was a totally manual process.  We've got 2 versions of the process running in Conductor, with error handling, and the ability to process multiple orders at once.

The sales team has learned that many of Bob's Widget's customers are buying multiple widgets and then sending then out again to valued customers.  They know that offering 'drop-shipping' - or the ability for customers to upload a list of addresses, and to have Bob's Widgets mail them directly - would be a feature that our customers would pay extra for.

Our workflow creates the labels for multiple shipments - but currently only handles one address as input.  So, this will require a new version of our workflow (but it will lean heavily on the existing work already completed).


##  Workflow V2

<p align="center"><img src="/content/img/codelab/of5_5_loopworkflow.png" alt="adding the do-while loop" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

In order to support drop-sipping while still supporting multiple shipments to a single address, we need to run the ```shipping_loop``` (and the internal ```widget_shipping```) tasks once per address.  Conductor has a FORK attribute thatcan allow us to run multiple addresses at once:

## Forks

A Fork (and a Join) are system tasks that run inside the Conductor server. Forks split your workflow into multiple paths that can be run asynchronously.  The JOIN task tells Conductor when to reconnect the paths and continue through the workflow.

An example fork might look like:
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
For space, the 2 forkTasks are left out, but imagine reusing the ```widget_shipping``` tasks in version 1, and then appending a unique value (in this case 1 &2) to ensure each task has a unique reference.  The workflow would look something like:

<p align="center"><img src="/content/img/codelab/of4_forkexample.png" alt="version 2 regular fork" width="600" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now, this is really great...but the number of 'tines' in the fork are defined at workflow definition.  Since the number of addresses is dynamic and can change on each order, we need something more flexible - a DYNAMIC_FORK.  Dynamic forks determine the number of 'times' at workflow runtime - providing the flexibility we need to support dropshipping of Bob's widgets.


## Dynamic task inputs

Before we create a Dynamic fork we need to format the data to match the required input for a Dynamic fork.  Dynamic forks take 2 inputs. One input is a JSON array of tasks to run, and the other is a JSON array of values.  

If we had 2 widgets to ship to Bob, the JSON ```dynamicForkTasksParam``` or list of task/task references to be run might look like:

```json
{"dynamicTasks": [
  0 : {
    "name": :"shipping_widget",
    "taskReferenceName": "shipping_widget_1"
  },
  1: {
    "name": :"shipping_widget",
    "taskReferenceName": "shipping_widget_2",
  }
]
}
```

This tells Conductor: "inside that dynamic fork, create 2 tasks using the ```shipping_widget``` task, and increment them as 1 &2 so they have unique names."  We could increment these tasks any way you'd like.

Now, we must also create the ```dynamicForkTasksInputParamName``` JSON for each task reference - with the input values we want to give the task:

```json

"dynamicForkTasksInputParamName":[
0:{
      "name":"shipping_widget"
      "taskReferenceName":"shipping_widget_1"
      "type":"SIMPLE"
      "retryCount":3
      "timeoutSeconds":1200
      "inputParameters": {
        "name": "${workflow.input.name}",
        "street": "${workflow.input.street}",
        "city": "${workflow.input.city}",
        "state": "${workflow.input.state}",
        "zip": "${workflow.input.zip}"
      }
  },
1: {
      "name":"shipping_widget"
      "taskReferenceName":"shipping_widget_2"
      "type":"SIMPLE"
      "retryCount":3
      "timeoutSeconds":1200
      "inputParameters": {
        "name": "${workflow.input.name}",
        "street": "${workflow.input.street}",
        "city": "${workflow.input.city}",
        "state": "${workflow.input.state}",
        "zip": "${workflow.input.zip}"
      }
  }
]
}
```

Now, we have all the inputs required to generate these JSON files, but we don't have these exact JSON files.  To build these, we'll use the ```JQ JSON task```