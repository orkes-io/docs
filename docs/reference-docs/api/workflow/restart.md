---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restart workflow execution
Restart a workflow execution from the beginning with the same input.
When called on a workflow that is not in a terminal status, this operation has no effect.
If useLatestDefinition is set, the restarted workflow fetches the latest definition from the metadata store

## Properties

## API
POST /workflow/{workflowId}/restart

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse restartWorkflow(List<String> workflowIds, Boolean useLatestDefinitions) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

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
WorkflowResourceService.restart1(
    workflowId: string,
    useLatestDefinitions: boolean = false,
): CancelablePromise<void>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>
