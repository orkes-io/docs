---
displayed_sidebar:     orderfulfillment
---
# Running the Workflow
# Order Fulfillment Codelab part 3

You're running order fulfillment at Bob's Widgets, and it's totally manual.  You're working with Conductor to create workflows and work to better automate the system.

In part 1 of this codelab, we created our first workflow and task - all built to run the ```widget_shipping``` worker that Bob gave you on your first day.

In part 2, we got the worker (the microservice) up and running and connected the application with our remote Conductor server.  

In part 3, we'll actually run the worker and see Conductor in action! 

Let's get started by running the workflow!

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/5K-jlxfPBy8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


## Running the workflow

To run our workflow, click the ```Run Workflow``` box in the left nav. This will open a panel looking for parameters.  Choose the workflow named ```Bobs_widget_fulfillment``` and as input, add an address. Here's an example address:

```json
{
"name": "Bob McBobface",
"street":"123 Main St.",
"city": "Anytown",
"state":"ME",
"zip":"00234"
}
```

<p align="center"><img src="/content/img/codelab/of3_runworkflow.png" alt="version 1 run workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Press ```Run Workflow``` to get started!

## Seeing the workflow in action

Once you press Run workflow, a workflowId will appear below the form. Click the workflowId, and by the time the new page has loaded, your workflow will likely be completed:

<p align="center"><img src="/content/img/codelab/of3_workflowresults.png" alt="version 1 results" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

There is a lot of information about your workflow on this page, and in this short video, we walk through the various screens:

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/agL-WHXbfX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


## Initial Workflow complete

Congratulations - your automation has begun.  BBut you still have a lot of things you'd like to automate, so we'll build on this initial workflow in [part 4 by adding an HTTP Task](/content/docs/codelab/orderfulfillment4).

