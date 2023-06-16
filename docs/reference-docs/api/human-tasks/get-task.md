---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Human Task

Used to retrieve a human task by id. Use this API to retrieve a task and its details.

:::note
The invoking user should be a task owner, an ADMIN, or an assignee to the task. If the task is assigned using the __Free for all__ policy, any user will be able to retrieve the task. When using application credentials, the application should be the owner of the task in the workflow definition.
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
