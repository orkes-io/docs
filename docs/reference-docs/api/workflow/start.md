---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start workflow execution

Starts a workflow and returns the ID of the workflow. The API returns immediately without waiting for the workflow to be completed.

## Input Request

| Parameter     | Description                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| name          | Name of the workflow.                                                                                                             |
| version       | Choose the Workflow version.                                                                                                 |
| input         | Map of Key and Value given as the input to the workflow.                                                                          |
| correlationId | User-supplied correlation id, which can be used to query the workflow execution later.                                             |
| priority      | Priority of the workflow. 0 is the default priority, which executes workflows in FIFO. Valid values are from 0-99.|
| taskToDomain  | Task to Domain limits the workflow execution to the specified domain only.                                                                 |
| workflowDef   | Provide the entire workflow definition. Used for executing ephemeral workflow definitions.                                |

## Response
A string representing the id of the workflow execution.

## SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String startWorkflow(StartWorkflowRequest startWorkflowRequest)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) StartWorkflow(startWorkflowRequest *model.StartWorkflowRequest) (workflowId string, err error)
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.start_workflow(self, body, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
string WorkflowResourceApi.StartWorkflow(StartWorkflowRequest body)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowResourceService.startWorkflow1(
    name: string,
    requestBody: Record<string, any>,
    version?: number,
    correlationId?: string,
    priority?: number,
): CancelablePromise<string>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/start-workflow [options start-workflow-request])
```

</TabItem>
</Tabs>
