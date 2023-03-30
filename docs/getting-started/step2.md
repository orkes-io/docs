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

```javascript
    // @TODO:Gustavo
    StartWorkflowRequest request = new StartWorkflowRequest();
    request.setName("<name of your workflow>");
    request.setInput(Map.of("amount", 100, "account", "account-id"));

    String workflowId = workflowClient.StartWorkflow(request);
    log.info("Workflow id: {}", workflowId);

```

</TabItem>
<TabItem value="Golang" label="Golang">

```golang
    // @TODO:Gustavo
    StartWorkflowRequest request = new StartWorkflowRequest();
    request.setName("<name of your workflow>");
    request.setInput(Map.of("amount", 100, "account", "account-id"));

    String workflowId = workflowClient.StartWorkflow(request);
    log.info("Workflow id: {}", workflowId);

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
    // @TODO:Gustavo
    StartWorkflowRequest request = new StartWorkflowRequest();
    request.setName("<name of your workflow>");
    request.setInput(Map.of("amount", 100, "account", "account-id"));

    String workflowId = workflowClient.StartWorkflow(request);
    log.info("Workflow id: {}", workflowId);

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```java
    // @TODO:Gustavo
    StartWorkflowRequest request = new StartWorkflowRequest();
    request.setName("<name of your workflow>");
    request.setInput(Map.of("amount", 100, "account", "account-id"));

    String workflowId = workflowClient.StartWorkflow(request);
    log.info("Workflow id: {}", workflowId);

```


</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
    // @TODO:Gustavo
    StartWorkflowRequest request = new StartWorkflowRequest();
    request.setName("<name of your workflow>");
    request.setInput(Map.of("amount", 100, "account", "account-id"));

    String workflowId = workflowClient.StartWorkflow(request);
    log.info("Workflow id: {}", workflowId);

```


</TabItem>
</Tabs>

Click [here](./conductor-clients) to browse the client SDK list and how to import the required dependencies in our applications.

In addition to triggering from code, we can also run them from:

1. [UI - using the Run Workflow feature](/content/videos/run-workflow)
2. [Upon receiving an Event](/content/reference-docs/system-tasks/event)
3. [Upon receiving a Webhook](/content/reference-docs/system-tasks/webhook)
4. [At a Schedule - using the Scheduler](/content/guides/scheduling-workflows)

## Looking Ahead

* - Passing the [output of one task to the input](/content/guides/passing-data-task-to-task) of another
* 
