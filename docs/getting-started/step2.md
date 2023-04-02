---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 2: Running Workflows from Code

Now that we know how to compose workflows. Let’s learn how to integrate these with our applications. We can trigger workflows from our code using Conductor SDKs.

<Tabs>
<TabItem value="Java" label="Java">

```java 
StartWorkflowRequest request = new StartWorkflowRequest();
request.setName("<name of your workflow>");
request.setInput(Map.of("amount", 100, "account", "account-id"));
    
String workflowId = workflowClient.startWorkflow(request);
log.info("Workflow id: {}", workflowId);
```

</TabItem>
<TabItem value="Python" label="Python">

```python
request = StartWorkflowRequest(
    name="<name of your workflow>", 
    input={
        "amount": 100, 
        "account": "<account-id>"
    },
)
workflow_id = workflow_client.start_workflow(
    body=start_workflow_request,
)
print(f'Workflow id: {workflow_id}')
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
request := model.NewStartWorkflowRequest(
    "<name of your workflow>",
    1,
    "",
    map[string]interface{}{
        "amount": 100, 
        "account": "<account-id>"
    }
)
workflowId, err := workflowExecutor.StartWorkflow(
    request,
)
log.info("Workflow id: ", workflowId)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
var request = new StartWorkflowRequest(
    name: "<name of your workflow>",
    version: 1
);
request.Input = new Dictionary<string, object>()
{
    {"amount", 100},
    {"account", "account-id"}
};
var workflowId = workflowClient.StartWorkflow(
    startWorkflowRequest
);
log.info($"Workflow id: {workflowId}");
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
const request: StartWorkflowRequest = {
    name: "<name of your workflow>",
    version: 1,
    input: {
        "amount": 100,
        "account": "account-id"
    }
}
const workflowId = client.workflowResource.startWorkflow(
    request
)
console.log("Workflow id: {}", workflowId)
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(def request {:name "<name of your workflow>"
              :input {:amount: 100
                      :account: "account-id"}})
(def workflow-id workflow-resource/start-workflow [options, request])
(log/info "Workflow id:" workflow-id)
```

</TabItem>
</Tabs>

View our documentation on [client SDK](/content/conductor-clients) list and how to import the required dependencies in our applications.

In addition to triggering from code, we can also run them from:

1. [UI - using the Run Workflow feature](/content/videos/run-workflow)
2. [Upon receiving an Event](/content/reference-docs/system-tasks/event)
3. [Upon receiving a Webhook](/content/reference-docs/system-tasks/webhook)
4. [At a Schedule - using the Scheduler](/content/guides/scheduling-workflows)

## Related Topics

* Passing the [output of one task to the input](/content/guides/passing-data-task-to-task#task-inputs-referred-from-other-task-outputs) of another
