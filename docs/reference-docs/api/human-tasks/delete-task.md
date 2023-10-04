---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Human Task

This API is only to be used to delete a task that is disconnected from a workflow due to error conditions. Under 
normal conditions, this API wouldn't have to be used.

:::note
The invoking user should be a task owner or an ADMIN to the task. When using application credentials, 
the application should be the owner of the task in the workflow definition.
:::

:::warning Note
If this API is invoked while the task is still associated with a workflow, the workflow task will be in an
error state and the workflow would have to be retried or restarted to create a new task.
:::

## Input Payload

| Attribute  | Description                                              |
|------------|----------------------------------------------------------| 
| taskId     | The *taskId* of the human task which you want to delete. | 

## API Endpoint 

```
DELETE human/tasks/{taskId}
```

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Python" label="Python">

```python
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

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
