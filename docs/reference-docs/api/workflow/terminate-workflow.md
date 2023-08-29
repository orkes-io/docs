---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow

Terminates a running workflow. A reason must be provided that is captured as the termination reason for the workflow.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the workflow to be terminated. | 

## API Endpoint
```
DELETE /workflow/{workflowId}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void terminateWorkflow(String workflowId, String reason)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) Terminate(workflowId string, reason string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.terminate1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void WorkflowResourceApi.Terminate(string workflowId, string reason = null, bool? triggerFailureWorkflow = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.terminate(
    workflowId: string,
    reason: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.terminate(
    workflowId: string,
    reason: string,
): CancelablePromise<any>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/terminate-workflow [options workflow-id & args])
```

</TabItem>
</Tabs>