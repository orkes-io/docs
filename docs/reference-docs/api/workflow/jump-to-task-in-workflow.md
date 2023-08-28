---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Jump to Task in a Workflow

Workflow execution will go to the task given.

## Input Payload

| Attribute         | Description                            | 
|-------------------|----------------------------------------| 
| workflowId        | The unique identifier of the workflow. |
| input             | The input for the task to be passed.   |
| taskReferenceName | Reference name of the task.            |

## API Endpoint
```
POST /{workflowId}/jump/{taskReferenceName}
```
It takes input to the task as a request body. The task will be scheduled with given input. The input is mandatory field.

Notes:-
1. Jumping forward and backward is supported.
2. When jumping forward the tasks will be skipped until the jump to task is found.
3. If taskReferenceName is given null, workflow exeuction will start from beginning.
4. Jumping is supported only at the top level tasks. To understand  lets take below example,

Consider a workflow has tasks,
[simple_task_1, fork_task[[simple_task_2,simple_task_3],[simple_task_4,simple_task_5]], join_task[simple_task_3, simple_task_5], simple_task_6]

1. Jumping from simple_task_1 to either fork_task or simple_task_6 is suported.
2. Jumping back from simple_task_6 to simple_task_1 or fork_task is supported.
3. Jumping from simple_task_1 to any task under fork_task is not supported.
4. Jumping back from any task under fork_task to simple_task_1, simple_task_6 or fork_task is supported.

This holds true for switch, decision, do_while, dynamic_fork also.


## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
void jumpToTask(String workflowId, String taskReferenceName, Map<String, Object> input);
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
```

</TabItem>
<TabItem value="Python" label="Python">

```python
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
void JumpToTask(string workflowId, Dictionary<string, Object> input, string taskReferenceName = null);
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
```

</TabItem>
</Tabs>