---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Skip task from workflow execution
Skips a given task execution from a current running workflow.

## Properties
When skipped the task's input and outputs are updated  from skipTaskRequest parameter.

## API
PUT /workflow/{workflowId}/skiptask/{taskReferenceName}

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) SkipTasksFromWorkflow(workflowId string, taskReferenceName string, skipTaskRequest model.SkipTaskRequest) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python

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
