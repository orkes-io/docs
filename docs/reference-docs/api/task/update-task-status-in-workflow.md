---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Task Status in Workflow

Used to update the execution status of the task within a workflow instance.

## Input Payload

| Attribute | Description |
| -- | -- |
| workflowId | The execution ID of the workflow to which the task belongs. | 
| taskRefName | The reference name of the task whose status is being updated. |
| status | Provide the new status to be set for the task. It can take values: **IN_PROGRESS**, **FAILED_WITH_TERMINAL_ERROR**, **FAILED**, or **COMPLETED**. |

## API Endpoint
```
POST /tasks/{workflowId}/{taskRefName}/{status}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String OrkesTaskClient.updateTaskByRefName(Map<String, Object> output, String workflowId, String taskRefName, String status) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (*WorkflowExecutor) UpdateTaskByRefName(taskRefName string, workflowInstanceId string, status model.TaskResultStatus, output interface{}) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.update_task1(taskOutput, workflow_id, task_ref_name, status, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
string TaskResourceApi.UpdateTask(Dictionary<string, Object> taskOutput, string workflowId, string taskRefName, string status, string workerid = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
TaskResourceService.updateTask(
    workflowId: string,
    taskRefName: string,
    status: 'IN_PROGRESS' | 'FAILED' | 'FAILED_WITH_TERMINAL_ERROR' | 'COMPLETED',
    taskOutput: Record<string, any>,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
TaskResourceService.updateTask(
    workflowId: string,
    taskRefName: string,
    status: 'IN_PROGRESS' | 'FAILED' | 'FAILED_WITH_TERMINAL_ERROR' | 'COMPLETED',
    taskOutput: Record<string, any>,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/update-task-by-reference-name options workflow-id task-reference-name status update-req)
```

</TabItem>
</Tabs>
