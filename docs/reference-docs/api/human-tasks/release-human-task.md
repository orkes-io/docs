---
sidebar_position: 8
slug: "/reference-docs/api/human-tasks/release-human-task"
description: "This API is used to release a previously-claimed Human task so that someone else can claim it."
---
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Release Human Task

Used for releasing a previously claimed task. If the user is unable to complete this task, this API can be used to
release the task so that a new claimant can claim this task.

:::note 
The invoking user should be a task owner, an ADMIN, or a claimant to the task.
:::

## Input Payload

| Attribute    | Description                                               |
|--------------|-----------------------------------------------------------| 
| taskId       | The *taskId* of the human task to be released. | 

## API Endpoint

```
POST human/tasks/{taskId}/release
```

## Client SDK Methods

<Tabs>
<TabItem value="JavaScript" label="JavaScript">

```javascript
HumanExecutor.releaseTask(taskId:string)
```

</TabItem>
<TabItem value="Typescript" label="Typescript">

```typescript
HumanExecutor.releaseTask(taskId:string)
```

</TabItem>
</Tabs>
