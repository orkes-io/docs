---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow by ID
Get workflow execution by workflow ID. 

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The ID of the workflow whose details are to be fetched. |
| includeTasks | If set to true, it fetches all the task details. |

## API Endpoint
```
GET /workflow/{workflowId}
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
## Get workflow including tasks

workflow = workflow_client.getWorkflow(workflow_id, True)

## Get workflow excluding tasks

workflow = workflow_client.getWorkflow(workflow_id, False)
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