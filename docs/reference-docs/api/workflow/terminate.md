---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate workflow
Terminate a running workflow.

## Properties
Reason must be provided that is captured as the termination resaon for the workflow

## API
DELETE /workflow/{workflowId}

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

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>