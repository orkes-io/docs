---
sidebar_position: 7
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Re-assign Human Task

Admin API used for re-assigning a task to a different assignment policy. Use this when the original assignment is no
longer valid and the task needs to be reassigned so that it can proceed further.

:::note 
The invoking user should be a task owner or an ADMIN to the task. When using application credentials, the
application should be the owner of the task in the workflow definition.
:::

## Input Payload

| Attribute    | Description                                                                                                                  |
|--------------|------------------------------------------------------------------------------------------------------------------------------| 
| taskId       | The *taskId* of the human task which you want to retrieve.                                                                   | 
| Request Body | New assignment policy with corresponding values. Supported policies are `free_for_all`, `least_busy_group_member`, and `fixed`   | 

## API Endpoint

```
POST human/tasks/{taskId}/reassign
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
TODO: Coming
soon
to
the
SDKs
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
TODO: Coming soon to the SDKs
```

</TabItem>
</Tabs>
