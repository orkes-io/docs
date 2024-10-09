---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Human Task

Used to retrieve a human task by using the task ID. Use this API to retrieve a task and its details.

:::note
The invoking user should be the task admin, a cluster Admin, or an assignee to the task. If the task is not assigned to anyone, any user can retrieve the task.
:::

## Input Payload

| Attribute  | Description                                                |
|------------|------------------------------------------------------------| 
| taskId     | The *taskId* of the human task which you want to retrieve. | 

## API Endpoint 

```
GET human/tasks/{taskId}
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
HumanExecutor.getTaskById(taskId: string): Promise<HumanTaskEntry>
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
HumanExecutor.getTaskById(taskId: string): Promise<HumanTaskEntry>
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
TODO: Coming soon to the SDKs
```

</TabItem>
</Tabs>
