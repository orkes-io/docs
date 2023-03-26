---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Synchronous execution

Starts a workflow and wait until the workflow completes or the waitUntilTask completes

## Properties

Returns the output of the workflow

## API
POST /api/workflow/execute/{name}/{version}

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
CompletableFuture<WorkflowRun> executeWorkflow(StartWorkflowRequest request, String waitUntilTask)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) ExecuteWorkflow(startWorkflowRequest *model.StartWorkflowRequest, waitUntilTask string) (run *model.WorkflowRun, err error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.execute_workflow(self, body, request_id, name, version, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
WorkflowRun WorkflowResourceApi.ExecuteWorkflow(StartWorkflowRequest body, string requestId, string name, int? version, string waitUntilTaskRef = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
N/A
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
N/A
```

</TabItem>
</Tabs>
