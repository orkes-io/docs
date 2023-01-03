---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running First Workflow

In this article, we will explore how we can run a simple workflow (without deploying a microservice.)


## Start Conductor

The quickest way to get started with Conductor is to use the free [Orkes Playground](https://play.orkes.io). 

We have also included instructions on how to use an instance of Conductor.

---

## Configuring our First Workflow

This is a sample workflow that we can leverage for our test.

### Workflow JSON
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

### JSON explainer
Feel free to skip to [Creating the Workflow](#creating-the-workflow) if you're in a hurry.

The JSON has a name, description and version of the workflow:

```json
  "name": "first_sample_workflow",
  "description": "First Sample Workflow",
  "version": 1,
```

This workflow contains just one worker, listed under the key `tasks`:
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
2. `"taskReferenceName"` : This is a reference to this worker in this specific workflow implementation. 
3. `"inputParameters"` : These are the inputs into our worker. We've hardcoded the inputs here, but dynamic inputs are also possible. (Our [Beginner Codelab](/content/docs/codelab/beginner#creating-workflow-definition) has an example of this.)
4. `"type"` : The task type (In our example - this an `HTTP` task to make a REST API call).
5. `"http_request"` : The required inputs for an `HTTP` task are a URL and the type or request.


## Creating the Workflow

We have two options to add the Workflow into Conductor: using the Conductor UI or via API.


<Tabs values={[
        {label: 'Conductor UI', value: 'Conductor', },
        {label: 'API', value: 'API', }
    ]}>
  
  <TabItem value="Conductor">

Both Orkes Playground and Conductor have a Dashboard that allows for the visual creation of Workflows.

1. Open Workflow Creation page:
* Open Source: Click `Definitions` in the top menu. Click the `New Workflow Definition` button.
* Orkes Playground: Click `Workflow definitions` in the left navigation. Click the `Define Workflow` button.

2.  Copy the workflow JSON from above, and paste it into the editor. 

3. Click Save (and then Confirm save), and your workflow diagram will appear next to the definition.

</TabItem>
<TabItem value="API">
To configure the workflow via API, we will use the Swagger definition page:

* [Orkes Playground](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

* [Local Conductor](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

>NOTE: If you are using Orkes Playground, you will need an authentication token.  In the dashboard, click your user icon in the top right, and choose the `copy token` option.  Back on the Swagger page, click the lock to the right of the endpoint, and paste the token here. ([Here are more details on authentication](/content/docs/getting-started/concepts/access-control-applications#prototyping).)

If the link doesn’t open to the correct Swagger section, we can navigate to `Metadata-Resource` -> `POST /api/metadata/workflow`

![Swagger UI - Metadata - Workflow](/img/tutorial/metadataWorkflowPost.png)


1. Click the `Try it out` button.
2. Paste the workflow JSON from above into the Request Body.
3. Press the Execute button. 

You should see a 200 response that the API call was successful.

</TabItem>
</Tabs>

We are now ready to run the workflow!


## Running the Workflow

To run the workflow we have the option of running the workflow via the UI or the API. 

<Tabs values={[
        {label: 'Conductor UI', value: 'Conductor', },
        {label: 'API', value: 'API', }
    ]}>
  
<TabItem value="Conductor">

1. To run your workflow via the UI, click the following link:

* Conductor: `http://localhost:5000/workbench`
* Playground: `https://play.orkes.io/runWorkflow`

![UI of the Workbench page in OS Conductor](/img/workbench.jpg)

2. Choose your workflow name. The other fields can be left blank.  

3. Start the workflow. 
* Conductor: Press the "play" arrow to the right of "Workflow Workbench."
* Playground: Press the "Run Workflow" button.

The workflow ID will appear. Click this to open the execution diagram of your workflow.

</TabItem>
<TabItem value="API">

The endpoint to run a workflow is: 

```bash
POST /api/workflow/<WorkflowName>

```

* [Orkes Playground](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1)

* [Local](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/workflow-resource/startWorkflow_1)

![Swagger UI - Metadata - Workflow - Run](/img/tutorial/metadataWorkflowRun.png)

Hit **Execute**!

Conductor will return a workflow id. We will need to use this id to load this up on the UI.

</TabItem>
</Tabs>


## Workflow Results


We can visualize the workflow results in the Conductor UI:
```
http://localhost:5000/execution/<WORKFLOW_ID>
or:
http://play.orkes.io/execution/<WORKFLOW_ID>
```

Replace `<WORKFLOW_ID>` with our workflow id from the previous step. We should see a screen like the one below. Click on the different tabs to see all inputs and outputs, task lists, etc. Explore away!

![Conductor UI - Workflow Run](/img/tutorial/workflowLoaded.png)



This concludes the tutorial. Feel free to explore the codelabs and other tutorials to try additional features of Conductor.
