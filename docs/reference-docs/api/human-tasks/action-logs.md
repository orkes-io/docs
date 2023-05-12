---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Human Task Action Log

Used to retrieve a human task action logs

:::note
The invoking user should be a task owner or an ADMIN or an assignee to the task. 
When using application credentials, the application should be an owner of the task in the workflow definition.
:::

## Input Payload

| Attribute  | Description                                                |
|------------|------------------------------------------------------------| 
| taskId     | The *taskId* of the human task which you want to retrieve. | 

## API Endpoint 

```
GET human/tasks/{taskId}/actionLogs
```

## Return payload 

List of objects with the following fields

| Attribute      | Description                        |
|----------------|------------------------------------| 
| id             | The *id* of the human task         | 
| taskId         | The *taskId* of the human task     | 
| workflowId     | The *workflowId* of the human task | 
| cause          | What caused this action log        | 
| action         | Action for this log                | 
| actionTime     | Epoch time for this action         | 
| workflowName   | Workflow name                      | 
| taskRefName    | Task reference name                | 

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
