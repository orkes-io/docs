---
sidebar_position: 1
slug: "/reference-docs/api/human-tasks/get-task"
description: "This API is used to retrieve a Human task and its details based on its task ID."
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
</Tabs>
