---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Resume Workflow
Resume the execution of a workflow that is paused. If the workflow is not paused, this method has no effect.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the paused workflow to be resumed. | 

## API Endpoint
```
PUT /workflow/{workflowId}/resume  
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse resumeWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Resume(workflowId string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.resume_workflow1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
void WorkflowResourceApi.ResumeWorkflow(string workflowId)
```

</TabItem>

<TabItem value="JavaScript" label="JavaScript">

```javascript
WorkflowExecutor.resume(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.resume(
    workflowId: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/resume-workflow [options workflow-id])
```

</TabItem>
</Tabs>