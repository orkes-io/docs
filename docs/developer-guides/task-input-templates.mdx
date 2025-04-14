---
slug: "/developer-guides/task-input-templates"
description: "Learn how to configure task input templates and use them in workflow definitions."
---

# Using Task Input Templates​

Task input templates are default parameters included in a task definition that will be applied to all instances of the task. Whenever the task is used in a workflow, the template values are automatically supplied to the task configuration. However, these values can be overridden in the workflow using task input parameters.

## Configuring task input template

You can create a task input template while [creating a task definition](https://orkes.io/content/reference-docs/api/metadata/creating-task-definitions).

**To add a task input template:**

1. Go to **Definitions > Task** from the left menu on your Conductor cluster.
2. Select an existing task definition or create a new task using **(+) Define task**.
3. Configure the required [task parameters](https://orkes.io/content/reference-docs/api/metadata/creating-task-definitions#input-payload).
4. In **Task input template**, enter the template parameters. Supports string, number, boolean, null, and object/array.
5. Select **Save** > **Confirm Save**.

<p align="center"><img src="/content/img/task-input-template-in-task-definition.png" alt="Task input template in task definition" width="100%"
                       height="auto"/></p>

```json
// Example of a task input template in a task definition JSON
 "inputTemplate": {
   "key": "value"
 },
```

## Using task input templates in workflow definitions

After creating a task definition, follow these steps to include it in a workflow definition:

1. Go to **Definitions** > **Workflow** from the left menu on your Conductor cluster.
2. Select an existing task definition or create a new task using **(+) Define workflow**.
3. Configure the required [workflow parameters](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition#input-payload).
4. In your workflow, select the (+) icon to add a new task. There are two ways to add a simple task.
    - Search for your task using its task name (created previously) and select to add it to the workflow.
    - Add a **Simple** task and search your task name (created previously) in the **Task Definition** field. This adds your task definition to the workflow.

When a task definition is added to the workflow, the parameters supplied via the task input template are automatically included.

<p align="center"><img src="/content/img/workflow-definition-with-task-input-template.png" alt="Workflow definition with task input template supplied already" width="90%"
                       height="auto"/></p>

If you provide the same value as an input parameter to the task, the template values get overridden. 
For example, a parameter `key` with the value `value` has been supplied through a task input template. If the same `key` is defined as input parameters to the task, those values override the ones from the template.

<p align="center"><img src="/content/img/overriding-values.png" alt="Overriding task input template parameters from Workflow definition" width="90%"
                       height="auto"/></p>

You can also use the **Override All** button to replace the task input parameters with the template's parameters.

:::note
Task input templates are only part of the task definition and will not appear in the workflow definition JSON. However, the values are passed into the workflow during execution. 
:::