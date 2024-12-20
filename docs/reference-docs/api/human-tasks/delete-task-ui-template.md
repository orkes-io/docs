---
sidebar_position: 13
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

