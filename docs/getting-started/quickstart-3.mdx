---
slug: "../quickstarts/deploy-workflows"
description: "In this quickstart, learn how to deploy your workflows as applications."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart 3: Deploy Workflows

Your workflow is now ready to be deployed. This can be done in several different ways: via code, via API, or using the Conductor UI.

In this quickstart, you will learn how to deploy your workflow via code.

<Tabs groupId="language">
<TabItem value="python" label="Python">

``` python
// synchronous execution - applicable for quick-running workflows (0--30 seconds)


from conductor.client.http.models import StartWorkflowRequest

request = StartWorkflowRequest()
request.name = 'hello'
request.version = 1
request.input = {'name': 'Orkes'}

workflow_run = workflow_client.execute_workflow(
        start_workflow_request=request, 
        wait_for_seconds=12)
```

</TabItem>

<TabItem value="java" label="Java">

Use the WorkflowClient interface to start a workflow:

``` java
import com.netflix.conductor.client.http.ConductorClient;
import com.netflix.conductor.client.http.WorkflowClient;
import com.netflix.conductor.common.metadata.workflow.StartWorkflowRequest;

// … other code
var client = new ConductorClient("http://localhost:8080/api");
var workflowClient = new WorkflowClient(client);
var workflowId = workflowClient.startWorkflow(new StartWorkflowRequest()
        .withName("hello_workflow")
        .withVersion(1));

System.out.println("Started workflow " + workflowId);

```

</TabItem>

<TabItem value="javascript" label="JavaScript">

``` javascript
const executor = new WorkflowExecutor(client);
const executionId = await executor.startWorkflow({ name, version, input: {} });
```

</TabItem>

<TabItem value="csharp" label="C#">

``` csharp
using Conductor.Executor;

var workflowId = workflowExecutor.StartWorkflow(conductorWorkflow);
```

</TabItem>

<TabItem value="go" label="Go">

``` go
//Input can be either a map or a struct that is serializable to a JSON map
workflowInput := map[string]interface{}{}

workflowId, err := executor.StartWorkflow(&model.StartWorkflowRequest{
    Name:  conductorWorkflow.GetName(),
    Input: workflowInput,
})
```

</TabItem>

<TabItem value="clojure" label="Clojure">

``` clojure
(defn start-workflow
  "Takes an option map and a start-request map and starts a workflow.
  Returns the id of a workflow execution"
  ([options wf-request]
   (-> (workflow-client options)
       (start-workflow-with-client wf-request))))
```

</TabItem>
</Tabs>


Ready to dive deeper? Learn more about [running workflows](../developer-guides/running-workflows)