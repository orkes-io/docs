---
sidebar_position: 7
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Worker Task (Simple)

A Worker task (also known as a Simple task) is used to run custom logic implemented in any language. The custom logic can be deployed anywhere and the Worker task requires an external worker for polling.

For a full guide on how to use workers, refer to [Using Workers](docs/developer-guides/using-workers.md).

## Task configuration

To configure the Worker task, set its `inputParameters` as needed for your worker code. The inputs can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).


## Task definition

This is the JSON schema for a Worker task.

``` json
{
  "name": "task_name",
  "taskReferenceName": "task_name_ref",
  "inputParameters": {},
  "type": "SIMPLE"
}
```


## Task output

The Worker task will return the output defined in your worker code.


## Adding a Worker task in UI

Before adding a Worker task to a workflow, you should complete the following:
* Create a worker to run a custom task.
* Define the task in Conductor using Orkes Platform or [API](https://orkes.io/content/reference-docs/api/metadata/creating-task-definitions).

For a full guide on how to use workers, refer to Using Workers.

**To add a Worker task:**
1. In your workflow, select the **(+)** icon to add a new task. There are two ways to add a worker task:
    * Search for your task using its task name and select to add it to the workflow.
    * Add a **Worker Task (Simple)** and enter the task name in Task Definition.
2. Configure the task, such as its inputs, caching, and optionality.


## Examples

Find an [example of how to add and run a Worker task](https://orkes.io/content/getting-started/adding-custom-code-worker) in our Getting Started guide.