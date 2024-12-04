---
sidebar_position: 7
slug: "/reference-docs/api/human-tasks/reassign-human-task"
description: "This API is used by an admin to re-assign the Human task to a different assignmen policy."
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Re-assign Human Task

Admin API used for re-assigning a task to a different assignment policy. Use this when the original assignment is no
longer valid and the task needs to be reassigned so that it can proceed further.

:::note 
The invoking user should be a task owner or an ADMIN to the task. 
:::

## Input Payload

| Attribute    | Description                                                                                                                  |
|--------------|------------------------------------------------------------------------------------------------------------------------------| 
| taskId       | The *taskId* of the human task to be reassigned.                                                                  | 
| Request Body | New assignment policy with corresponding values. Supported policies are `EXTERNAL_USER`, `EXTERNAL_GROUP`, `CONDUCTOR_USER` and `CONDUCTOR_GROUP`.  | 

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
