---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Jump Task in a  Workflow 

Workflow execution will go to the task given.


## Definitions

```json
    {
      "name": "jump_workflow_task",
      "taskReferenceName": "jump_workflow_task",
      "inputParameters": {
        "task_ref_name": "my_simple_task"
      },
      "type": "JUMP"
    }
```

### Input Parameters

| Attribute         | Description                 |
| ----------------- |-----------------------------|
| task_ref_name     | Reference name of the task. |

Workflow execution will be jumped to the given task. Input of jump_workflow_task will be given to my_simple_task
For more information please check jump_task[/content/reference-docs/workflow/jump-to-task-in-workflow]