---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pause Workflow

This API pauses the execution of a running workflow. Any currently running tasks will finish, but no new tasks are scheduled until the workflow is resumed.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the workflow to be paused. | 

## API Endpoint
```
PUT /workflow/{workflowId}/pause
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse pauseWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) Pause(workflowId string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.pause_workflow1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void WorkflowResourceApi.PauseWorkflow(string workflowId)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
pauseWorkflow(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/pause-workflow [options workflow-id])
```

</TabItem>
</Tabs>