---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Re-Run a completed workflow
Starts a workflow and returns the **id** if the started workflow.  The API returns immediately without the waiting for workflow to be completed.

<Tabs>
<TabItem value="Java" label="Java">

```java
    public abstract CompletableFuture<WorkflowRun>
        executeWorkflow(StartWorkflowRequest request, String waitUntilTask);
```
</TabItem>

  <TabItem value="Golang" label="Golang">
    This is a banana 🍌
  </TabItem>
  <TabItem value="Python" label="Python">
      This is a banana 🍌
  </TabItem>
  <TabItem value="CSharp" label="CSharp">
      This is a banana 🍌
  </TabItem>
  <TabItem value="Javascript" label="Javascript">
        This is a banana 🍌
    </TabItem>
    <TabItem value="Clojure" label="Clojure">
        This is a banana 🍌
    </TabItem>
</Tabs>

## Request
Input to the start workflow API is the payload is a JSON map of the input to the workflow.
```json
{

}
```

## Response