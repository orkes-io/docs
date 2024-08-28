---
sidebar_position: 6
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Claim Task (External/All Users)

Used to claim a human task by any user. Use this API to claim a task on behalf of a user, which can be external or
internal.

This is the API for applications that are built on top of Conductor to retrieve and act on tasks for users. For example,
if user "A" is logged on to the system in application "APP", then "APP" can retrieve the tasks eligible for user "A" to
act and can claim a task if user "A" is ready to act on it. "APP" needs to use a credential that is an owner of the
tasks that user "A" is expected to work on.

Claiming a task will allocate the task to the selected user and will not allow others to claim until the task is released
by the original claimant. If the claimant completes the task, it will complete the corresponding workflow task and will
proceed to the next step.

:::note 
The invoking user should be a task owner or an ADMIN. The provided userId will be matched if the assignee on the
task is of type EXTERNAL_USER, CONDUCTOR_USER or CONDUCTOR_GROUP. If the assignee type is EXTERNAL_GROUP, the system
will assume the external system has validated the claim criteria. If the task is not assigned to any one, any user will be able to retrieve the task. 
:::

## Input Payload

| Attribute  | Description                                                |
|------------|------------------------------------------------------------| 
| taskId     | The *taskId* of the human task to be claimed. | 
| userId     | The *userId* of the user claiming this task.               | 

## API Endpoint

```
POST human/tasks/{taskId}/externalUser/{userId}
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
<TabItem value="CSharp" label="CSharp">

```csharp
TODO: Coming soon to the SDKs
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
HumanExecutor.claimTaskAsExternalUser(taskId: string, assignee: string)
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
HumanExecutor.claimTaskAsExternalUser(taskId: string, assignee: string)
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure
TODO: Coming soon to the SDKs
```

</TabItem>
</Tabs>
