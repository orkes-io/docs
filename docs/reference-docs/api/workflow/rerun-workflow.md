---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rerun Workflow

Reruns a workflow from a specific task (ReRunFromTaskId) and optionally change the input. If required, it also updates the completed tasks with new input (ReRunFromTaskId).

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the workflow to be rerun. | 

## API Endpoint
```json
POST /workflow/{workflowId}/rerun
{
    "reRunFromTaskId": "TASK_ID_TO_REREUN_FROM",
    "taskInput": {
        //Extra inputs to the task 
    },
    "workflowInput": {
        //Changes to workflow inputs as part of re-run 
    }
}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String rerunWorkflow(String workflowId, RerunWorkflowRequest rerunWorkflowRequest)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) ReRun(workflowId string, reRunRequest model.RerunWorkflowRequest) (id string, error error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.rerun(self, body, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
string WorkflowResourceApi.Rerun(RerunWorkflowRequest body, string workflowId)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.rerun(
    workflowId: string,
    requestBody: RerunWorkflowRequest,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowResourceService.rerun(
    workflowId: string,
    requestBody: RerunWorkflowRequest,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/rerun-workflow [options workflow-id rerun-wf-request])
```

</TabItem>
</Tabs>