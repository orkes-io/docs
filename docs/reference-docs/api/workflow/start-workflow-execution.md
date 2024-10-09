---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Workflow Execution

Starts a workflow and returns the ID of the workflow. The API returns immediately without waiting for the workflow to be completed.

## Input Payload

| Parameter     | Description                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| name          | Name of the workflow.                                                                                                             |
| version       | Choose the workflow version.                                                                                                 |
| input         | Map of Key and Value given as the input to the workflow.                                                                          |
| correlationId | User-supplied correlation id, which can be used to query the workflow execution later.                                             |
| priority      | Priority of the workflow. 0 is the default priority, which executes workflows in FIFO. Valid values are from 0-99.|
| taskToDomain  | [Task to Domain](/content/developer-guides/task-to-domain) limits the workflow execution to the specified domain only.                                                                 |
| workflowDef   | Provide the entire workflow definition. Used for executing ephemeral workflow definitions.                                |

## Response
A string representing the id of the workflow execution.

## API Endpoint
```
POST /api/workflow/{name}
```

## SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String startWorkflow(StartWorkflowRequest startWorkflowRequest)
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) StartWorkflow(startWorkflowRequest *model.StartWorkflowRequest) (workflowId string, err error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.start_workflow(self, body, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
string WorkflowResourceApi.StartWorkflow(StartWorkflowRequest body)
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.startWorkflow(workflowRequest: StartWorkflowRequest): Promise<string>

```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.startWorkflow(workflowRequest: StartWorkflowRequest): Promise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/start-workflow [options start-workflow-request])
```

</TabItem>
</Tabs>
