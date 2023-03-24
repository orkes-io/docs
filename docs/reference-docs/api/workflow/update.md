---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update workflow task
Update the execution status and output of the task.

## Properties
Reason must be provided that is captured as the termination reason for the workflow

## API
POST /tasks/{workflowId}/{taskRefName}/{status}

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
String updateTask1(Map<String, Object> body, String workflowId, String taskRefName, String status) throws ApiException
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) UpdateTaskByRefName(taskRefName string, workflowInstanceId string, status model.TaskResultStatus, output interface{}) error
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
