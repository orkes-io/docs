---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow by ID
Get workflow execution by workflow ID. If **includeTasks** is set, it also fetches all the task details.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| name | The name of the workflow whose details are to be fetched. |

## API Endpoint
```
GET /workflow/{name}
```

Returns nil if no workflow is found by the id.

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
WorkflowStatus getWorkflowStatusSummary(String workflowId, Boolean includeOutput, Boolean includeVariables)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) GetWorkflow(workflowId string, includeTasks bool) (*model.Workflow, error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.get_execution_status(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
WorkflowStatus WorkflowResourceApi.GetWorkflowStatusSummary(string workflowId, bool? includeOutput = null, bool? includeVariables = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.getWorkflowStatusSummary(
    workflowId: string,
    includeOutput: boolean
    includeVariables: boolean,
): CancelablePromise<WorkflowStatus>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```javascript
WorkflowExecutor.getWorkflowStatusSummary(
    workflowId: string,
    includeOutput: boolean
    includeVariables: boolean,
): CancelablePromise<WorkflowStatus>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/get-workflow [options workflow-id & {:keys [includeTasks], :or {includeTasks true}}])
```

</TabItem>
</Tabs>