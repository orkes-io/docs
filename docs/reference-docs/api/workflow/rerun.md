---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Re-Run a completed workflow
ReRun a completed workflow from a specific task (ReRunFromTaskId) and optionally change the input
Also update the completed tasks with new input (ReRunFromTaskId) if required

## Properties

## API
POST /workflow/{workflowId}/rerun

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