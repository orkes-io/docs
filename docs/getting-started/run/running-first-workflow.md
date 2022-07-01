---
sidebar_position: 1
---

# Running First Workflow

In this article we will explore how we can run a really simple workflow that runs without deploying a microservice. 


Conductor can orchestrate HTTP services out of the box without implementing any code.  We will use that to create and run our first workflow.

> Note: There are a number of [System Task](../concepts/system-tasks) that are built in to Conductor. Using system tasks is a great way to run a lot of our code in production.

## Start Conductor

The quickest way to get started with Conductor is to use the free [Orkes Playground](https://play.orkes.io).  Just enter your email address, and you're ready to get started.

However, if you'd like to create a local instance of Conductor follow one of the recommended steps:
1. [Running Locally - From Code](../install/running-locally.md)
2. [Running Locally - Docker Compose](../install/running-locally-docker.md)

---

## Configuring our First Workflow

This is a sample workflow that we can leverage for our test.

```json
{
  "name": "first_sample_workflow",
  "description": "First Sample Workflow",
  "version": 1,
  "tasks": [
    {
      "name": "get_population_data",
      "taskReferenceName": "get_population_data",
      "inputParameters": {
        "http_request": {
          "uri": "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
          "method": "GET"
        }
      },
      "type": "HTTP"
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "data": "${get_population_data.output.response.body.data}",
    "source": "${get_population_data.output.response.body.source}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "example@email.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0
}
```

This is an example workflow that queries a publicly available JSON API to retrieve some data. This workflow doesn’t
require any worker implementation as the tasks in this workflow are managed by the system itself. This is an awesome
feature of Conductor. For a lot of typical work, we won’t have to write any code at all.

Let's talk about this workflow a little more so that we can gain some context.

```json
"name" : "first_sample_workflow"
```

This line here is how we name our workflow. In this case our workflow name is `first_sample_workflow`

This workflow contains just one worker. The workers are defined under the key `tasks`. Here is the worker definition
with the most important values:

```json
{
  "name": "get_population_data",
  "taskReferenceName": "get_population_data",
  "inputParameters": {
    "http_request": {
      "uri": "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
      "method": "GET"
    }
  },
  "type": "HTTP"
}
```

Here is a list of fields and what it does:

1. `"name"` : Name of our worker
2. `"taskReferenceName"` : This is a reference to this worker in this specific workflow implementation. We can have multiple
   workers of the same name in our workflow, but we will need a unique task reference name for each of them. Task
   reference name should be unique across our entire workflow.
3. `"inputParameters"` : These are the inputs into our worker. We can hard code inputs as we have done here. We can
   also provide dynamic inputs such as from the workflow input or based on the output of another worker. (Our [Beginner Codelab](/content/docs/codelab/beginner#creating-workflow-definition) has an example of this.)
4. `"type"` : This is what defines what the type of worker is. In our example - this is `HTTP`. There are more task
   types which we can find in the Conductor documentation.
5. `"http_request"` : This is an input that is required for tasks of type `HTTP`. In our example we have provided a well
   known internet JSON API url and the type of HTTP method to invoke - `GET`

We haven't talked about the other fields that we can use in our definitions as these are either just
metadata or more advanced concepts which we can learn more in the detailed documentation.

Ok, now that we have walked through our workflow details, let's run this and see how it works.

## Adding the workflow to Conductor

We have two options to add the Workflow into Conductor, using the UI, or via API.

### Creating a workflow via dashboard

Both Orkes Playground and Open Source Conductor have a Dashboard that allows for the visual creation of Workflows.

* Open Source: Click `Definitions` in the top menu. Click the `New Workflow Definition` button.
* Orkes Playground: Click `Workflow definitions` in the left navigation. Click the `Define Workflow` button.

This will open workflow editor page where there is a default workflow.  Copy the workflow above, and paste it into the editor, click Save (and then Confirm save), and your workflow diagram will appear next to the definition.

### Creating a workflow via API

To configure the workflow, head over to the Swagger API of conductor server and access the metadata workflow create API:

* [Orkes Playground](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

* [Local Conductor](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

> NOTE: With the Playground, you will need an authentication token.  In the dashboard, click your user icon in the top right, and choose the `copy token` option.  Back on the Swagger page, click the lock to the right of the endpoint, and past the token here.

If the link doesn’t open to the correct Swagger section, we can navigate to `Metadata-Resource`
→ `POST /api/metadata/workflow`

![Swagger UI - Metadata - Workflow](/img/tutorial/metadataWorkflowPost.png)

Paste the workflow payload into the Swagger API and hit Execute. You should see a 200 response that the API call was successful.

Now if we head over to the UI, we can see this workflow definition created:

![Conductor UI - Workflow Definition](/img/tutorial/uiWorkflowDefinition.png)

If we click through we can see a visual representation of the workflow:

![Conductor UI - Workflow Definition - Visual Flow](/img/tutorial/uiWorkflowDefinitionVisual.png)

## Running our First Workflow

Let’s run our workflow. To do that we can use the Swagger API under the workflow-resources.  The endpoint to use is `POST /api/workflow/{name}`:

* Orkes Playground: [https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1)
>Note: The playground also has a UI to `Run Workflow` via a button on the left navigation.
* Local: [http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1)

![Swagger UI - Metadata - Workflow - Run](/img/tutorial/metadataWorkflowRun.png)

Hit **Execute**!

Conductor will return a workflow id. We will need to use this id to load this up on the UI. If our UI installation has
search enabled we wouldn't need to copy this. If we don't have search enabled (using Elasticsearch) copy it from the
Swagger UI.

![Swagger UI - Metadata - Workflow - Run](/img/tutorial/workflowRunIdCopy.png)


To load the workflow directly, use this URL format:

```
http://localhost:5000/execution/<WORKFLOW_ID>
or:
http://play.orkes.io/execution/<WORKFLOW_ID>
```

Replace `<WORKFLOW_ID>` with our workflow id from the previous step. We should see a screen like below. Click on the
different tabs to see all inputs and outputs and task list etc. Explore away!

![Conductor UI - Workflow Run](/img/tutorial/workflowLoaded.png)

## Summary

In this blog post — we learned how to run a sample workflow in our Conductor installation. Concepts we touched on:

1. Workflow creation
2. System tasks such as HTTP
3. Running a workflow via API

Thank you for reading, and we hope you found this helpful. Please feel free to reach out to us for any questions and we
are happy to help in any way we can.

