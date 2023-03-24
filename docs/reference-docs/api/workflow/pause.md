---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Pause workflow
Pause the execution of a running workflow

## Properties
Any tasks that are currently running will finish but no new tasks are scheduled until the workflow is resumed

## API
PUT /workflow/{workflowId}/pause

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
BulkResponse pauseWorkflow(List<String> workflowIds) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) Pause(workflowId string) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python
WorkflowResourceApi.pause_workflow1(self, workflow_id, **kwargs)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

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