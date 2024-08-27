---
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Skip Task from Workflow Execution

Skips a given task execution from a currently running workflow.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the running workflow that contains the task to be skipped. | 
| taskReferenceName | The reference name of the task to be skipped. |

## API Endpoint
```
PUT /workflow/{workflowId}/skiptask/{taskReferenceName}
```

When skipped, the task's input and outputs are updated from **skipTaskRequest** parameter.

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void skipTaskFromWorkflow(String workflowId, String taskReferenceName)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) SkipTasksFromWorkflow(workflowId string, taskReferenceName string, skipTaskRequest model.SkipTaskRequest) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.skip_task_from_workflow(self, workflow_id, task_reference_name, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void WorkflowResourceApi.SkipTaskFromWorkflow(string workflowId, string taskReferenceName, SkipTaskRequest skipTaskRequest)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.skipTaskFromWorkflow(
    workflowId: string,
    taskReferenceName: string,
    requestBody: Partial<SkipTaskRequest>,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.skipTaskFromWorkflow(
    workflowId: string,
    taskReferenceName: string,
    requestBody: Partial<SkipTaskRequest>,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/skip-task-from-workflow [options workflow-id task-reference-name])
```

</TabItem>
</Tabs>
