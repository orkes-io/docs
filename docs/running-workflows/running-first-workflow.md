---
sidebar_position: 1
---

# Running Hello World Workflow

In this article we will explore how you can run a really simple workflow that runs without any microservice. Yes!
Conductor has in-built tasks that you can use to run quite a bit of things. We will use one of these in-built tasks to
run your very first workflow.

Using system or in-built tasks is a great way to run a lot of your code in production.

After following the steps listed in this article, you would have:

1. Run your first workflow
2. Learn how system or in-built tasks work - specifically the HTTP

This post is specifically for running a sample workflow in your environment to ensure that everything is working as
expected. You can refer to one of the following posts to set up your environments before continuing with the post if you
don’t already have an environment.

1. [Running Locally - From Code](../getting-started-local/running-locally.md)
2. [Running Locally - Docker Compose](../getting-started-local/running-locally-docker.md)
3. [Running Locally - Kubernetes](../getting-started-local/running-locally-minikube.md)

---

## 1. Configuring your First Workflow

This is a sample workflow that you can leverage for your test.

```json
{
  "createTime": 1627629229443,
  "updateTime": 1630694890267,
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
      "type": "HTTP",
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
    "data": "${get_population_data.output.response.body.data}",
    "source": "${get_population_data.output.response.body.source}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "example@email.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {}
}
```

This is an example workflow that queries a publicly available JSON API to retrieve some data. This workflow doesn’t
require any worker implementation as the tasks in this workflow are managed by the system itself. This is an awesome
feature of Conductor. For a lot of typical work, you won’t have to write any code at all.

Let's talk about this workflow a little more so that you can gain some context.

```json
"name" : "first_sample_workflow"
```

This line here is how you name your workflow. In this case our workflow name is `first_sample_workflow`

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

1. `"name"` : Name of your worker
2. `"taskReferenceName"` : This is a reference to this worker in this specific workflow implementation. You can multiple
   workers of the same name in your workflow but you will need a unique task reference name for each of them. Task
   reference name should be unique across your entire workflow.
3. `"inputParameters"` : These are the inputs into your worker. You can hard code inputs as we have done here. You can
   also provide dynamic inputs such as from the workflow input or based on the output of another worker. You can find
   examples of this in our documentation.
4. `"type"` : This is what defines what the type of worker is. In our example - this is `HTTP`. There are more task
   types which you can find in the Conductor documentation.
5. `"http_request"` : This is an input that is required for tasks of type `HTTP`. In our example we have provided a well
   known internet JSON API url and the type of HTTP method to invoke - `GET`

We haven't talked about the other fields here such as `createTime` or `restartable` etc. as these are either just
metadata or more advanced concepts which we can learn more in the detailed documentation.

Ok, now that we have walked through our workflow details, let's run this and see how it works.

To configure the workflow, head over to the swagger API of conductor server and access the metadata workflow create API:

[http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

If the link doesn’t open the right Swagger section, you can navigate to Metadata-Resource
→ `POST /api/metadata/workflow`

![Swagger UI - Metadata - Workflow](/img/tutorial/metadataWorkflowPost.png)

Paste the workflow payload into the Swagger API and hit Execute.

Now if you head over to the UI, you can see this workflow definition created:

![Conductor UI - Workflow Definition](/img/tutorial/uiWorkflowDefinition.png)

If you click through you can see a visual representation of the workflow:

![Conductor UI - Workflow Definition - Visual Flow](/img/tutorial/uiWorkflowDefinitionVisual.png)

## 2. Running your First Workflow

Let’s run this workflow. To do that you can use the swagger API under the workflow-resources

[http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1)

![Swagger UI - Metadata - Workflow - Run](/img/tutorial/metadataWorkflowRun.png)

Hit **Execute**!

Conductor will return a workflow id. You will need to use this id to load this up on the UI. If your UI installation has
search enabled you wouldn't need to copy this. If you don't have search enabled (using Elasticsearch) copy it from the
Swagger UI.

![Swagger UI - Metadata - Workflow - Run](/img/tutorial/workflowRunIdCopy.png)

Ok, we should see this running and get completed soon. Let’s go to the UI to see what happened.

To load the workflow directly, use this URL format:

```
http://localhost:5000/execution/<WORKFLOW_ID>
```

Replace `<WORKFLOW_ID>` with your workflow id from the previous step. You should see a screen like below. Click on the
different tabs to see all inputs and outputs and task list etc. Explore away!

![Conductor UI - Workflow Run](/img/tutorial/workflowLoaded.png)

## Summary

In this blog post — we learned how to run a sample workflow in your Conductor installation. Concepts we touched on:

1. Workflow creation
2. System tasks such as HTTP
3. Running a workflow via API

Thank you for reading, and we hope you found this helpful. Please feel free to reach out to us for any questions and we
are happy to help in any way we can.

