---
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Human Task Template

Used to delete a human task template by id. Use this API to delete a task template specification stored in Conductor

:::danger Deleting Templates
If the template is used by a workflow, it would fail to render
:::

## Input Payload

| Attribute | Description                                                   |
|-----------|---------------------------------------------------------------| 
| id        | The *id* of the human task template which you want to delete. | 

## API Endpoint 

```
DELETE human/template/{id}
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
