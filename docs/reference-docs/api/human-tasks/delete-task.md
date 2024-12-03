---
sidebar_position: 2
slug: "/reference-docs/api/human-tasks/delete-task"
description: "This API is used to delete a Human task that is disconnected from a workflow due to error conditions."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Human Task

This API is only to be used to delete a task that is disconnected from a workflow due to error conditions. Under normal conditions, this API wouldn't have to be used.

:::note
The invoking user should be a task owner or an ADMIN to the task. 
:::

:::warning Note
If this API is invoked while the task is still associated with a workflow, the workflow task will be in an
error state and the workflow would have to be retried or restarted to create a new task.
:::

## Input Payload

| Attribute  | Description                                              |
|------------|----------------------------------------------------------| 
| taskId     | The *taskId* of the human task to be deleted. | 

## API Endpoint 

```
DELETE human/tasks/delete/{taskId}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Go" label="Go">

```go
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="CSharp" label="C#">

```csharp
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="JavaScript" label="JavaScript">

```javascript
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
TODO: Coming soon to the SDKs
```

</TabItem>
</Tabs>
