---
sidebar_position: 3
---

# Running Workers Across Services

So far we have learned some basic aspects of Conductor such as

1. How to run Conductor locally?
2. Using system or built-in tasks such as `HTTP`
3. Creating and running our first worker task implementation

In this article we will show how to connect multiple different services using a Conductor workflow. This is one of the
key features of Conductor. Being able to wire up really complex flows using Conductor will make our life as a developer
simple and will help us focus on what matters to our business.

> Conductor helps to wire up complex flows across different services

### Prerequisites

1. Have a Conductor Server running, with search support using Elasticsearch

We can refer to the guides in this site to get this up and running.

## Step 1: Creating and Configuring a Workflow

So far in our guides, we have created workflows with just one worker. Let's take that up a notch. We will create a
workflow that has three steps.

1. Pull some arbitrary sample data from a REST API using an `HTTP` task
2. Write a worker task that consumes this data and augments in with an arbitrary data from local storage
3. Write a second worker task that consumes this updated data from the first worker and creates an output after
   additional processing

Here is an example workflow - that contains the tasks as described above.

```json
 {
  "name": "sample_workflow_with_multiple_workers",
  "description": "Sample Workflow With Multiple Workers",
  "version": 1,
  "tasks": [
    {
      "name": "get_population_data",
      "taskReferenceName": "get_population_data",
      "inputParameters": {
        "http_request": {
          "uri": "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest",
          "method": "GET"
        }
      },
      "type": "HTTP"
    },
    {
      "name": "map_state_codes",
      "taskReferenceName": "map_state_codes",
      "inputParameters": {
        "statePopulations": "${get_population_data.output.response.body.data}"
      },
      "type": "SIMPLE"
    },
    {
      "name": "compute_median_top_states",
      "taskReferenceName": "compute_median_top_states",
      "inputParameters": {
        "topStateCount": 10,
        "statePopulations": "${map_state_codes.output.statePopulations}"
      },
      "type": "SIMPLE"
    }
  ],
  "outputParameters": {
    "medianPopulation": "${compute_median_top_states.output.medianPopulation}",
    "stateCount": "${compute_median_top_states.input.topStateCount}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "ownerEmail": "example@email.com"
}
```

First, let's set up the new tasks we are introducing to this workflow. We can use curl to post this. Look at the payload
to see what we are posting. Basically it is the definition for the two new tasks with mostly default values for every
field.

```shell
curl 'http://localhost:8080/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'Referer: ' \
  -H 'Content-Type: application/json' \
  --data-raw '[{"name":"map_state_codes","retryCount":3,"retryLogic":"FIXED","retryDelaySeconds":10,"timeoutSeconds":300,"timeoutPolicy":"TIME_OUT_WF","responseTimeoutSeconds":180,"ownerEmail":"example@gmail.com"},{"name":"compute_median_top_states","retryCount":3,"retryLogic":"FIXED","retryDelaySeconds":10,"timeoutSeconds":300,"timeoutPolicy":"TIME_OUT_WF","responseTimeoutSeconds":180,"ownerEmail":"example@gmail.com"}]'
```

Now let's use curl to upload the workflow definition to our conductor server:

```shell
curl 'http://localhost:8080/api/metadata/workflow' \
  -H 'accept: */*' \
  -H 'Referer: ' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"sample_workflow_with_multiple_workers","description":"Sample Workflow With Multiple Workers","version":1,"tasks":[{"name":"get_population_data","taskReferenceName":"get_population_data","inputParameters":{"http_request":{"uri":"https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest","method":"GET"}},"type":"HTTP"},{"name":"map_state_codes","taskReferenceName":"map_state_codes","inputParameters":{"statePopulations":"${get_population_data.output.response.body.data}"},"type":"SIMPLE"},{"name":"compute_median_top_states","taskReferenceName":"compute_median_top_states","inputParameters":{"topStateCount":10,"statePopulations":"${map_state_codes.output.statePopulations}"},"type":"SIMPLE"}],"outputParameters":{"medianPopulation":"${compute_median_top_states.output.medianPopulation}","stateCount":"${compute_median_top_states.input.topStateCount}"},"schemaVersion":2,"restartable":true,"ownerEmail":"example@email.com"}'
```

**Some things to note:**

1. We don't have to define our workers in different services, we can have them in the same service
    1. This is helpful when we want to create modular simple workers that we can use to assemble complex flows
2. We can define our workers in any language - in our article we have chosen `Java` to demonstrate the functionality
    1. This **language agnostic workers** for our workflow is another important feature of Conductor. We no longer have
       to work within the constraints of a single language.
3. Conductor provides system tasks that can do quite a bit of the common transformations which means we don't have to
   manually implement the workers for some tasks used in this example. For the purpose of demo, we are implementing
4. In this demo, we are also learning how to read data from one worker and use it in another worker. This is what makes
   it all possible. There are advanced options on how to use this, and we can find that in our guides <!-- TODO LINK -->

## Step 2: Running the Workflow

It's time to kick off a workflow. We can use the following curl command to run this. There are no input params required,
so its left as empty.

```shell
curl 'http://conductorapp.trescommas.dev/api/workflow/sample_workflow_with_multiple_workers' \
  -H 'accept: text/plain' \
  -H 'Referer: ' \
  -H 'Content-Type: application/json' \
  --data-raw '{}' 
```

Once we run this and check the status on the UI, we will notice that the first worker has completed its part and now the
workflow is waiting for a worker to pick up the next task. We haven't added our workers yet. And that doesn't impact the
workflow run. It will wait until its timeout settings before error-ing out.

## Step 3: Adding new Workers

Now let's go ahead and add the workers across two different services. We will implement the `map_state_codes` worker in
our previously created `Java` application. Here is the code for this.

```javascript reference
https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/MapStateCodeWorker.java#L1-L39
```

As this is part of the sample application that we wrote before, the worker will be auto added to the list of workers the
application manages based on the Spring Boot settings shown here.

Notice how all the workers are auto injected via `List<Worker> workersList`. Spring Boot will discover all the implementations of the `Worker` interface and will inject an instance of that into
this method.

```js reference
https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/OrkesWorkersApplication.java#L31-L43
```

## Step 4: Check the results

## Summary

In this post — we learned how to run a sample workflow in our Conductor installation with a custom worker. Concepts we
touched on:

1. Adding Workflow definition with multiple `SIMPLE` tasks
2. Passing inputs to tasks
3. Using outputs of previous tasks for next tasks
4. Running your workers across multiple services

Thank you for reading, and we hope you found this helpful. Please feel free to reach out to us for any questions and we
are happy to help in any way we can.

