---
sidebar_position: 2
slug: "/reference-docs/api/workflow/synchronous-execution"
description: "This API is used to start a workflow execution. The API response returns only after the workflow or a specified task is completed. "
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Synchronous Execution

Starts a workflow and waits until the workflow completes or the **waitUntilTask** completes. 


## Input Payload

| Attribute | Description | 
| ------------ | ------------- |
| name | Name of the workflow to be executed. |
| version  | Choose the required version of the workflow. |

## API Endpoint
```
POST /api/workflow/execute/{name}/{version}
```

Returns the output of the workflow.

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
CompletableFuture<WorkflowRun> executeWorkflow(StartWorkflowRequest request, String waitUntilTask)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) ExecuteWorkflow(startWorkflowRequest *model.StartWorkflowRequest, waitUntilTask string) (run *model.WorkflowRun, err error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.execute_workflow(self, body, request_id, name, version, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
WorkflowRun WorkflowResourceApi.ExecuteWorkflow(StartWorkflowRequest body, string requestId, string name, int? version, string waitUntilTaskRef = null)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.executeWorkflow(
    workflowRequest: StartWorkflowRequest,
    name: string,
    version: number,
    requestId: string,
    waitUntilTaskRef: string = '',
  ): Promise<WorkflowRun>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.executeWorkflow(
    workflowRequest: StartWorkflowRequest,
    name: string,
    version: number,
    requestId: string,
    waitUntilTaskRef: string = '',
  ): Promise<WorkflowRun>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(run-workflow-sync [options name version requestId {}])
```

</TabItem>
</Tabs>
