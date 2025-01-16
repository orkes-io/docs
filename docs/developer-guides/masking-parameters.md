---
slug: "/developer-guides/masking-parameters"
description: "Learn to securely pass sensitive data in Conductor by masking parameters, ensuring privacy and preventing unauthorized access to confidential data."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Masking Parameters 

Masking parameters allows users to protect sensitive data by preventing it from being exposed in workflows. It ensures that sensitive values are hidden and not displayed in the workflow execution.

## Masking sensitive data

Sensitive data can be masked using either *_secrets* or *_masked* objects in workflow definitions. Any values stored in objects with keys *_secrets* or *_masked* will be replaced with __***__ in the workflow executions. Users with execute permission for the task can read the inputs and outputs.

<Tabs>
<TabItem value="Using _secrets parameter" label="Using _secrets parameter">

For example:

```json
{
"_secrets" : {
  "my-secret-key" : "my-secret-value"
}
}
```

This will be displayed in the workflow execution as follows:

```json
{
 "_secrets": "***"
}
```

</TabItem>
<TabItem value="Using _masked parameter" label="Using _masked parameter">

For example:

```json
{
"_masked":{"some":"data"}
}
```

This will be displayed in the workflow execution as follows:

```json
{
"_masked":"***"
}
```

</TabItem>
</Tabs>

### Passing sensitive data between tasks

To pass sensitive data from one task's output to a subsequent task, you can configure the input parameters of the next task as follows:

```json
{
"_secrets":
 { "parameter":"${previousTaskRef.output.someOutputParameter}"
}
}
```

Example workflow definition:

```json
{
 "name": "sample-workflow",
 "description": "Workflow where masked params are passed between tasks",
 "version": 2,
 "tasks": [
   {
     "name": "simple-demo",
     "taskReferenceName": "simple-demo_ref",
     "type": "SIMPLE"
   },
   {
     "name": "simple",
     "taskReferenceName": "simple_ref",
     "inputParameters": {
       "_secrets": {
         "parameter": "${simple-demo_ref.output.result}"
       }
     },
     "type": "SIMPLE"
   }
 ],
 "outputParameters": {
   "Output": "${simple_ref.output}"
 },
 "schemaVersion": 2,
 "ownerEmail": "john.doe@acme.com"
}
```

This ensures that any input parameter to be hidden must be nested within the *_secrets* object, ensuring that it is masked adequately during the workflow execution without exposing it.

## Workflow behavior with masked parameters

**Behavior on restarting workflows with masked values**: When a workflow with masked values reaches a terminal state and is removed from the primary execution store:
* Values with the *_masked* parameter are retained during archiving. If the workflow is restarted, the original data will remain accessible. 
* Values with the *_secrets* parameter are permanently replaced with *** during archiving. As a result, restarting the workflow might cause failures if any tasks rely on the masked data.

## Examples

<details><summary>Using _secrets parameter </summary>

Consider a workflow with a task having an input masked using *_secrets*:

```json
     "inputParameters": {
       "_secrets": "${workflow.input.somedata}"
     }
```

Here’s the complete workflow definition:

```json
{
 "name": "workflow-with-secrets-param",
 "description": "Sample workflow containing _secrets params",
 "version": 1,
 "tasks": [
   {
     "name": "simple",
     "taskReferenceName": "simple_ref",
     "inputParameters": {
       "_secrets": "${workflow.input.somedata}"
     },
     "type": "SIMPLE"
   }
 ],
 "inputParameters": [
   "somedata"
 ],
 "schemaVersion": 2,
 "ownerEmail": "john.doe@acme.com"
}
```

When this workflow runs, the parameters will be masked in the execution results.

<p align="center"><img src="/content/img/example-workflow-secrets-params.png" alt="Sample workflow execution with secrets parameter" width="100%" height="auto"></img></p>

</details>

<details><summary>Using _masked parameter </summary>

Consider a workflow with a task having an input masked using *_masked*:

```json
     "inputParameters": {
       "_masked": "${workflow.input.somedata}"
     }
```

Here’s the complete workflow definition:

```json
{
 "name": "workflow-with-masked-param",
 "description": "Sample workflow containing _masked params",
 "version": 1,
 "tasks": [
   {
     "name": "simple",
     "taskReferenceName": "simple_ref",
     "inputParameters": {
       "_masked": "${workflow.input.somedata}"
     },
     "type": "SIMPLE"
   }
 ],
 "inputParameters": [
   "somedata"
 ],
 "schemaVersion": 2,
 "ownerEmail": "john.doe@acme.com"
}
```

When this workflow runs, the parameters will be masked in the execution results.

<p align="center"><img src="/content/img/example-workflow-masked-params.png" alt="Sample workflow execution with masked parameter" width="100%" height="auto"></img></p>

</details>