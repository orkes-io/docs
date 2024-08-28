---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restart Workflow 

Restart a workflow execution from the beginning with the same input. This operation has no effect when called on a workflow that is not in a terminal status. If **useLatestDefinition** is set, the restarted workflow fetches the latest definition from the metadata store.

## Input Payload

| Attribute | Description | 
| --------- | ----------- | 
| workflowId | The unique identifier of the workflow to be restarted. | 

## API Endpoint
```
POST /workflow/{workflowId}/restart
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse restartWorkflow(List<String> workflowIds, Boolean useLatestDefinitions) throws ApiException
```

</TabItem>
<TabItem value="Go" label="Go">

```go
func (e *WorkflowExecutor) Restart(workflowId string, useLatestDefinition bool) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.restart1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void WorkflowResourceApi.Restart(string workflowId, bool? useLatestDefinitions = null)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
WorkflowExecutor.restart(
    workflowId: string,
    useLatestDefinitions: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
WorkflowExecutor.restart(
    workflowId: string,
    useLatestDefinitions: boolean,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
(workflow-resource/restart-workflow [options workflow-id])
```

</TabItem>
</Tabs>
