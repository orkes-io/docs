---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Workflow Task

Update the execution status and output of the task.

## API
POST /tasks/{workflowId}/{taskRefName}/{status}

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String updateTask1(Map<String, Object> body, String workflowId, String taskRefName, String status) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) UpdateTaskByRefName(taskRefName string, workflowInstanceId string, status model.TaskResultStatus, output interface{}) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TaskResourceApi.update_task1(self, body, workflow_id, task_ref_name, status, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
string TaskResourceApi.UpdateTask(Dictionary<string, Object> body, string workflowId, string taskRefName, string status, string workerid = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowResourceService.updateTask(
    workflowId: string,
    taskRefName: string,
    status: 'IN_PROGRESS' | 'FAILED' | 'FAILED_WITH_TERMINAL_ERROR' | 'COMPLETED',
    requestBody: Record<string, any>,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(task-resource/update-task-by-reference-name [options workflow-id task-reference-name status update-req])
```

</TabItem>
</Tabs>
