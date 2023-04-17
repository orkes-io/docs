---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import Install from '@site/src/components/install.mdx';
import {
    SDKList,
} from "../../src/components/_Sections";


# Step 2: Running Workflows from Code

So far, we have seen how to compose and run basic workflows from the UI. However, more commonly, we will be running the workflows from an application or service. Let’s learn how to do this from our applications. Orkes Conductor platform offers various SDKs in different languages
for integration with applications or services. 

View our documentation on [Conductor Clients & SDKs](/content/category/sdks) to learn how to import the required dependencies in our applications.

Let's look at some __code examples__ of how to trigger a workflow by its name. We have also linked the repository where this code sample is hosted. To test these ourselves, we can also clone them locally and try them out.

<Tabs>
<TabItem value="Java" label="Java">

```java dynamic https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/service/WorkflowService.java section=1 .../service/WorkflowService.java
```

</TabItem>
<TabItem value="Python" label="Python">

<CodeBlock language="python" title="/src/components/HelloCodeTitle.js"
showLineNumbers>
{`request = StartWorkflowRequest(
name="<name of your workflow>",
input={
"amount": 100,
"account": "<account-id>"
},
)
workflow_id = workflow_client.start_workflow(
body=start_workflow_request,
)
print(f'Workflow id: {workflow_id}')`}
</CodeBlock>

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

```java
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

```java
(def request {:name "<name of your workflow>"
              :input {:amount: 100
                      :account: "account-id"}})
(def workflow-id workflow-resource/start-workflow [options, request])
(log/info "Workflow id:" workflow-id)
```

</TabItem>
</Tabs>


As an example, we might invoke this method when an endpoint is called, such as this API call in Java.

```java dynamic https://github.com/conductor-sdk/orkes-java-springboot2-example/blob/main/src/main/java/io/orkes/example/banking/controller/BankingApiController.java section=1 .../controller/BankingApiController.java
```


In addition to triggering from code, we can also run them from:

1. [UI - using the Run Workflow feature](/content/how-to-videos/run-workflow)
2. [Upon receiving an Event](/content/reference-docs/system-tasks/event)
3. [Upon receiving a Webhook](/content/reference-docs/system-tasks/wait-for-webhook)
4. [At a Schedule - using the Scheduler](/content/developer-guides/scheduling-workflows)

## Related Topics

* Passing the [output of one task to the input](/content/developer-guides/passing-data-in-conductor) of another
