---
sidebar_position: 13
slug: "/reference-docs/api/human-tasks/delete-task-ui-template"
description: "This API is used to delete a Human task user form based on its name."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Human Task User Form/Template

Used to delete a human task template by its name. Use this API to delete a task template specification stored in Conductor.

:::danger Deleting Templates
If the template is used by a workflow, it will fail to render.
:::

## Input Payload

| Attribute | Description                                                   |
|-----------|---------------------------------------------------------------| 
| name        | The *name* of the human task user-form/template to be deleted. | 

## API Endpoint 

```
DELETE human/template/{name}
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
