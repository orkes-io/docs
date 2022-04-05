---
displayed_sidebar:     orderfulfillment
---

# Creating a Workflow and task
# Order Fulfillment Codelab part 1

Bob's Widgets has just moved out of Bob's garage, and he's hired you to overhaul the shipping and fulfillment process.  Everything today is manual and you think that building an automated workflow to efficiently get the orders out to the growing customer base is the best way to scale the system (and save your team from going insane).

You've heard of Netflix Conductor, and have read about the flexibility of a microservice-based architecture. You are pretty sure that building small modular applications and wiring them into a Conductor workflow is the way to go. You know that the initial workflow will be really simple (these widgets don't ship themselves, you know!), but will quickly grow in complexity as the company grows.

In this codelab, we'll follow your work as you build out a Conductor workflow to automate fulfillment for Bob's Widgets.

## What you need to complete this codelab

You'll need an SDK to edit and run your local workers.  To run conductor, we'll use the [Orkes Playground](https://play.orkes.io), which requires a free account to be created.

## A simple order Fulfillment workflow

You're in a world of hurt. Bob's Widgets is taking off, and you are underwater to just get orders shipped.  You don't have a lot of time to build any automation... but at the same time you know that without it, things are only going to get worse.  

## Conductor basics

* **Workflow** A workflow defines the set of tasks - and the order that the tasks are run.
* **Tasks** Tasks are the job queues that are created by the workflow.  Each task has a queue of jobs that can be run - and they are assigned to the workers.
* **Workers**  Workers are your microservices.  They may be Java, Go, Python - it doesn't matter. Each worker will poll the task queue for jobs, complete the job and return the results to the task.

You have one application (worker) at your disposal.  Bob wrote a Java app that takes in an address, buys a shipping label, and sends the label to the printer in the shipping bay to be affixed to a widget box.  With just a  little bit of work, we can make this application a part of a Conductor workflow.

## Creating the workflow

In our initial workflow, we'll wire up Bob's Java app as a worker, and have a simple workflow with just one task and one worker.  As we find time, we can add additional workers to the workflow, and improve the automation of the order fulfillment process.

In the [Orkes Playground](https://play.orkes.io), we'll want to create a workflow that incorporates the one application that is already written.  Click "Workflow Definitions" on the left navigation. This page will list all of your workflows (and it may be empty right now).  Click the "Define Workflow" button to begin creating your first workflow.

Workflows (in the playground) are JSON based.  Here's an outline of the workflow you should create:

* Name: A name that describes your workflow
* Description: not required, but a nice way to help you recall what the workflow does.
* Tasks: This List isn array of all the tasks that will be inside your workflow.  In this case, there is just one - ```widget_shipping_<uniqueId>```. 

> Note: All tasks in the Playground must have a unique name, so pick an ID to replace ```<uniqueId>``` and reuse it across this codelab.

* outputParameters - These are the parameters that the workflow will return upon completion.

```json
{
  "name": "Bobs_widget_fulfillment",
  "description": "Shipping widgets right from Bob",
  "version": 1,
  "tasks": [
    {
      "name": "widget_shipping_<uniqueID>",
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
  ],
  "inputParameters": [],
  "outputParameters": {
    "address": "${widget_shipping.output.fullAddress}",
    "tracking": "${widget_shipping.output.trackingNumber}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "bob@bobswidgets.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```

Paste this JSON into the workflow editor, press "save" and "confirm save.'  You've created a workflow! IN the diagram box, you should see a simple diagram of your workflow:

<p align="center"><img src="/content/img/codelab/of1_diagram.png" alt="version 1 diagram" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## The task (in the workflow)

Inside the workflow, we've defined a task. Let's walk through the parameters of the task:
*  inputParameters.  These are the values that the task requires to complete the job. In this case, we are inputting the name, street, city, state and Zip - pretty standard shipping parameters (for the USA).
* These parameters are all variables: ```${workflow.input.zip} ``` means that the workflow input data will include an attribute with the key "zip" that corresponds to a zipcode.  
* ```type```: This Task is a ```SIMPLE``` type. This means that there is an external worker that will process this task for us.  It also means that we must create a task definition for the task.  

There are a bunch of additional attributes for the task, but we can just ignore them at this point.

##  Defining the task

To define the task, we need to create a definition. Click ```Task Definitions``` in the left navigation.  This page lists all of your tasks. Click the ```Define Task``` button to create the task.

The Task definition is JSON formatted as well, and paste this to create your task (don't forget to update the uniqueId in the name!):

```JSON
{
  "createdBy": "",
  "name": "widget_shipping_<uniqueId>",
  "retryCount": 3,
  "timeoutSeconds": 30,
  "inputKeys": [
    "name",
    "address",
    "city",
    "state",
    "zip"
  ],
  "outputKeys": [
    "fullAddress",
    "trackingNumber"
  ],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 30,
  "responseTimeoutSeconds": 30,
  "concurrentExecLimit": 100,
  "inputTemplate": {},
  "rateLimitPerFrequency": 50,
  "rateLimitFrequencyInSeconds": 30,
  "ownerEmail": "bob@bobswidgets.com",
  "pollTimeoutSeconds": 30,
  "backoffScaleFactor": 1
}
```

* Name: the unique name of your task
* inputKeys: Values that the task expects to have in order to run.
* outputKeys: Values that are returned to the workflow from the task

The remainder of the parameters define retries and delays.  The values are standard values, and can be left as is.

Press ```Save``` and ```confirm save``` to create this task. You've now created a task (and the requisite task queues) that your worker needs to run.

In the next step of the code lab, we'll create a worker, and connect it up to our workflow. Then, we'll begin working to better automate our order fulfillment system.


