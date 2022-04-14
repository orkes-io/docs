---
displayed_sidebar:     orderfulfillment
---

# Creating a Workflow and task

This codelab will touch on many of the powerful features of Netflix Conductor.  We'll follow the building of a shipping & order fulfillment workflow for Bob's Widgets.

You'll learn how to:

* Create Conductor Workflows & tasks
* [Build and deploy a worker (including Application Authentication)](/content/docs/codelab/orderfulfillment2)
* [Run your Workflow](/content/docs/codelab/orderfulfillment3)
* [Add a REST API using the  HTTP Task](/content/docs/codelab/orderfulfillment4)
* [Handle failures in your Workflow](/content/docs/codelab/orderfulfillment5)
* [Add workflow versioning & add Do/While Task)](/content/docs/codelab/orderfulfillment5_5)
* [Add Forks, Dynamic Forks, Sub-workflows](/content/docs/codelab/orderfulfillment6)
* [Adding JQ Transform tasks to format your data](/content/docs/codelab/orderfulfillment7)
* [Implement a Dynamic Fork](/content/docs/codelab/orderfulfillment8)


# Order Fulfillment Codelab part 1

Bob's Widgets has just moved out of Bob's garage, and he's hired you to overhaul the shipping and fulfillment process.  Everything today is manual and, well, you're barely treading water. Many of the tasks are extremely repetitive. It seems that building an automated workflow to efficiently get the orders out to the growing customer base is the best way to scale the system (and save yourself from going insane).

You've heard of Netflix Conductor, and have read about the flexibility of a microservice-based architecture. You are pretty sure that building small modular applications and wiring them into a Conductor workflow is the way to go. You know that the initial workflow will be really simple (these widgets don't ship themselves, you know!), but will quickly grow in complexity as the requirements around order fulfillment grow and change.

In this codelab, we'll follow your work as you build out a Conductor workflow to automate fulfillment for Bob's Widgets.

## What you need to complete this codelab

You'll need a development environment to edit and run your local workers.  To run conductor, we'll use the [Orkes Playground](https://play.orkes.io), which requires an account for use (but it is free!).  You can also use any installation of [Conductor](/content/docs/getting-started/install/running-locally) to build your workflow.

## A simple order Fulfillment workflow

You're in a world of hurt. Bob's Widgets is taking off, and you are barely keeping up with the volume of orders shipping today.  You don't have a lot of time to build any automation... but at the same time you know that without it, things are only going to get worse.  

## Conductor basics

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/cxMrS8LBPEc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

Before we start building, let's review a few terms that are frequently used in Conductor.

* **Workflow:** Workflows are the heart of Conductor. A workflow defines the set of tasks - and the order that the tasks are run.
* **Tasks:** Tasks are the job queues that are created by the workflow, and they live inside Conductor.  Each task has a queue of jobs that can be run - and they are assigned to the workers.
* **Workers:**  Workers are your microservices, and generally, they live *outside* of your Conductor implementation.  They may be written in Java, Go, Python - it doesn't matter. Workers poll the Conductor task queue for jobs, complete the job and return the results to the task.

### The current state of Order Fulfillment

You currently have one application (worker) at your disposal. (We will look at this worker in the [Building and deploying a worker](/content/docs/codelab/orderfulfillment2) section of the codelab).  

Basically, Bob wrote a Java app that takes in an address, buys a shipping label from your shipper, and sends the label to the printer in the shipping bay to be affixed to a widget box (we will just assume that this is a magical printer that always works).  With just a little bit of work, we can make this application a part of a Conductor workflow.

## Creating the workflow

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/zZRlxjcbzyA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


In our initial workflow, we'll wire up Bob's Java app as a worker, and have a simple workflow with just one task and one worker.  As we build more requirements around our shipping workflow, we can add additional workers and improve the automation of the order fulfillment process.

In the [Orkes Playground](https://play.orkes.io), we'll want to create a workflow that incorporates the one application that is already written.  Click "Workflow Definitions" on the left navigation. This page will list all of your workflows (and it may be empty right now).  Click the "Define Workflow" button to begin creating your first workflow.

Workflows are JSON based.  Here's an outline of the workflow you should create:

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

Inside the workflow, we've defined a task called ```widget_shipping_<uniqueID>```. Let's walk through the parameters of the task:

* ```name``` the unique name of your task
* ```taskReferenceName``` a unique reference for the task.  Since you can use the same task multiple times in a workflow, giving a unique ```taskReferenceName``` allows Conductor to understand the exact position of the referenced task in the workflow.
*  ```inputParameters```.  These are the values that the task requires to complete the job. In this case, we are inputting the name, street, city, state and Zip - pretty standard shipping parameters (for the USA).
    * These parameters are all variables: ```${workflow.input.zip}``` means that the workflow's JSON input data will include an attribute with the key "zip" that corresponds to a zipcode.  
* ```type```: This Task is a ```SIMPLE``` type. This means that there is an external worker that will process this task for us.  It also means that we must create a task definition for the task.  We'll see a number of other task types through the codelab.

There are a bunch of additional attributes for the task, but we can just ignore them at this point.

##  Defining the task

To define the task, we need to create a task definition. Click ```Task Definitions``` in the left navigation.  This page lists all of your tasks. Click the ```Define Task``` button to create the task.

The Task definition is JSON formatted as well, and paste this to create your task (don't forget to update the uniqueId in the name!):

```JSON
{
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

* ```name```: the unique name of your task
* ```inputKeys```: Values that the task expects to have in order to run. In this case, we expect 5 values - all part of a typical US address.
* ```outputKeys```: Values that are returned to the workflow from the task. In this case, we'll get a tracking number, and a reformatted version of the address.

The remainder of the parameters define retries and delays.  The values are standard values, and can be left as is.

Press ```Save``` and ```Confirm Save``` to create this task. You've now created a task (and the requisite task queues) that your worker needs to run.

In the next step of the code lab, we'll create a worker (using the code from Bob), and connect it up to our workflow. Then, we'll begin working to better automate our order fulfillment system.


