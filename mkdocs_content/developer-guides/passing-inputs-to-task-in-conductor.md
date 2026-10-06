---
title: "Wiring Parameters"
description: "Learn how to wire parameters in Orkes Conductor using dynamic expressions to pass data between workflows, tasks, variables, secrets, and sub-workflows, plus."
canonical_route: "developer-guides/passing-inputs-to-task-in-conductor"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Wiring Parameters, workflow tasks, task queues"
---

# Wiring Parameters

In Conductor, various workflow and task parameters can be hard-coded or dynamically referenced from elsewhere (including its workflow parameters, prior task parameters, workflow variables, environment variables, secrets, and more). As long as it can be passed as a string, any workflow or task parameter can make use of a dynamic reference instead of a hard-coded value.

These dynamic references are formatted as dot-notation expressions, taking after [JSONPath syntax](https://goessner.net/articles/JsonPath/).

!!! tip "5-minute path"
    Start with `${workflow.input.<field>}` for request data, `${task_ref.output.<field>}` for prior task output, `${workflow.variables.<field>}` for shared workflow state, and `${workflow.secrets.<name>}` for credentials. 

## Basic expression

All dynamic references are formatted as the following expression:

```json
"key" : "${type.jsonpath}"
```

| Expression Component | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key                   | A string representing the parameter name for a workflow or task parameter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `${...}`              | The root notation indicating that the variable will be dynamically replaced at runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| type                  | The type of reference. Supported values:<ul><li>**workflow**: Refers to the current workflow instance.</li> <li>**workflow.input**: Refers to the workflow’s input parameters.</li> <li>**workflow.output**: Refers to the workflow’s output parameters.</li> <li>**workflow.secrets**: Refers to the [secrets](/content/developer-guides/secrets-in-conductor) available in your Conductor cluster.</li> <li>**workflow.variables**: Refers to the workflow variables set in the workflow using the [Set Variable](/content/reference-docs/operators/set-variable) task.</li> <li>**workflow.env**: Refers to the environment variables available in your Conductor cluster.</li> <li>**_taskReferenceName_**: Refers to a task in the current workflow instance by its reference name. (For example, “http_ref”).</li> <li>**taskReferenceName.input**: Refers to the task’s input parameters.</li> <li>**taskReferenceName.output**: Refers to the task’s output parameters.</li></ul> |
| jsonpath              | [JSONPath](https://goessner.net/articles/JsonPath/) expression in dot-notation. The path is based on the reference type’s JSON object.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Sample expressions

Depending on where the data is being referenced from, here is a non-exhaustive list of possible dynamic references:

| Dynamic References                          | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${_taskReferenceName_.input}`               | References a prior task’s input object. Returns null if the task has not started when this reference was looked up.                                                                                                                                                                                                                                                                               |
| `${_taskReferenceName_.output}`              | References a prior task’s output object. Returns null if the task has not started when this reference was looked up.                                                                                                                                                                                                                                                                              |
| `${_taskReferenceName_.input._someKey_}`     | References a prior task’s input parameter `someKey`. Returns null if the task has not started when this reference was looked up.                                                                                                                                                                                                                                                                  |
| `${_taskReferenceName_.output._someKey_}`    | References a prior task’s output parameter `someKey`. Returns null if the task has not started when this reference was looked up.                                                                                                                                                                                                                                                                 |
| `${workflow.input}`                          | References the workflow’s input object.                                                                                                                                                                                                                                                                                                                                                           |
| `${workflow.output}`                         | References the workflow’s output object.                                                                                                                                                                                                                                                                                                                                                          |
| `${workflow.input._someKey_}`                | References the current workflow’s input parameter `someKey`.                                                                                                                                                                                                                                                                                                                                      |
| `${workflow.output._someKey_}`               | References the current workflow’s output parameter `someKey`.                                                                                                                                                                                                                                                                                                                                     |
| `${workflow.status}`                         | References the current workflow’s status. Possible values: RUNNING, PAUSED, TIMED_OUT, TERMINATED, FAILED, or COMPLETED.                                                                                                                                                                                                               |
| `${workflow.workflowId}`                     | References the current workflow (execution) ID.                                                                                                                                                                                                                                                                                                                                                   |
| `${workflow.parentWorkflowId}`               | (Used in sub-workflows) References the parent workflow (execution) ID.                                                                                                                                                                                                                                                                                                                            |
| `${workflow.parentWorkflowTaskId}`           | (Used in sub-workflows) References the task execution ID for the [Sub Workflow](/content/reference-docs/operators/sub-workflow) task in the parent workflow.                                                                                                                                                                                                                                              |
| `${workflow.workflowType}`                   | References the current workflow name.                                                                                                                                                                                                                                                                                                                                                             |
| `${workflow.version}`                        | References the current workflow version.                                                                                                                                                                                                                                                                                                                                                          |
| `${workflow.createTime}`                     | References the start time of the workflow execution.                                                                                                                                                                                                                                                                                                                                              |
| `${workflow.correlationId}`                  | References the current workflow’s correlation ID.                                                                                                                                                                                                                                                                                                                                                 |
| `${workflow.idempotencyKey}`                 | References the idempotency key used when starting the workflow.                                                                                                                                                                                                                                                                                                                                   |
| `${workflow.taskToDomain.taskReferenceName}` | References the domain mapped to a specific task in this workflow execution. Replace `taskReferenceName` with the actual task reference name.                                                                                                                                                                                                                                                     |
| `${workflow.variables._someKey_}`            | References the workflow variable `someKey`, which has been set earlier in a [Set Variable](/content/reference-docs/operators/set-variable) task.                                                                                                                                                                                                                                                          |
| `${workflow.env._someKey_}`                  | References the [environment variable](/content/developer-guides/using-environment-variables) `someKey`, which has been defined previously in the Conductor cluster.                                                                                                                                                                                                                                       |
| `${workflow.secrets._someKey_}`              | References the [secret](/content/developer-guides/secrets-in-conductor) `someKey`, which has been defined previously in the Conductor cluster. <br/><br/>When inspected, the secret value will not be exposed and will be masked (***) in the workflow execution.<br/><br/> During execution, if the workflow doesn't have permission to read the secret, it will fail with an error saying so. |

## Examples

Here are some examples for using dynamic references in workflows.

<details>
<summary>Referencing workflow inputs​​</summary>

For the given workflow input:

```json
{
  "userID": 1,
  "userName": "SAMPLE",
  "userDetails": {
    "country": "nestedValue",
    "age": 50
  }
}
```

You can reference these workflow inputs elsewhere using the following expressions:

```json
{
  "user": "${workflow.input.userName}",
  "userAge": "${workflow.input.userDetails.age}"
}
```

At runtime, the parameters will be:

```json
{
  "user": "SAMPLE",
  "userAge": 50
}
```

</details>

<details>
<summary>Referencing other task outputs​​</summary>

If a task `previousTaskReference` produced the following output:

```json
{
  "taxZone": "A",
  "productDetails": {
    "nestedKey1": "outputValue-1"
    "nestedKey2": "outputValue-2"
  }
}
```

You can reference these task outputs elsewhere using the following expressions:

```json
{
  "nextTaskInput1": "${previousTaskReference.output.taxZone}",
  "nextTaskInput2": "${previousTaskReference.output.productDetails.nestedKey1}"
}
```

At runtime, the parameters will be:

```json
{
  "nextTaskInput1": "A",
  "nextTaskInput2": "outputValue-1"
}
```

</details>

<details>
<summary>Referencing secrets​​</summary>

If a secret named `api_key` with the value `Xxhhjiu0nbfdinvdHyj` is stored in your Conductor cluster, you can reference it in a workflow using the following expression:

```json
{
  "auth": "${workflow.secrets.api_key}"
}
```

At runtime, the dynamic parameter `auth` resolves to the value of the secret `api_key`. When inspected, the secret value will not be exposed and will be masked (***) in the workflow execution.

```json
{
  "auth": "***"
}
```

</details>

<details>
<summary>Referencing workflow variables</summary>

If a workflow variable is set using the [Set Variable](/content/reference-docs/operators/set-variable) task:

```json
{
  "name": "Orkes"
}
```

The variable can be referenced in the same workflow using the following expression:

```json
{
  "user": "${workflow.variables.name}"
}
```

For example, the following workflow sets a variable in the first task and reads it in the second task.

```json
{
  "name": "set_and_read_variable_example",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "set_user",
      "taskReferenceName": "set_user_ref",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "name": "Orkes"
      }
    },
    {
      "name": "read_user",
      "taskReferenceName": "read_user_ref",
      "type": "INLINE",
      "inputParameters": {
        "evaluatorType": "graaljs",
        "expression": "(function(){ return { greeting: 'Hello, ' + $.name }; })()",
        "name": "${workflow.variables.name}"
      }
    }
  ]
}
```

At runtime, `${workflow.variables.name}` in `read_user_ref` resolves to "Orkes", and the task outputs `{ "greeting": "Hello, Orkes" }`.

!!! note
    Workflow variables cannot be re-referenced across workflows, even between a parent workflow and a sub-workflow.

</details>

<details>
<summary>Referencing environment variables​</summary>

If an environment variable named `location` with the value `US` is stored in your Conductor cluster, you can reference it in a workflow using the following expression:

```json
{
  "place": "${workflow.env.location}"
}
```

At runtime, the parameters will be:

```json
{
  "place": "US"
}
```

</details>

<details>
<summary>Referencing the workflow ID</summary>

To reference the current workflow's execution ID, use the following expression:

```json
{
  "currentWorkflow": "${workflow.workflowId}"
}
```

At runtime, it will be replaced with the workflow’s execution ID:

```json
{
  "currentWorkflow": "9a679cb1-6bea-11f1-a803-9e478e6b7089"
}
```

</details>

<details>
<summary>Referencing the workflow status</summary>

To reference the current workflow's status, use the following expression:

```json
{
  "currentStatus": "${workflow.status}"
}
```

At runtime, it will be replaced with the workflow’s current status:

```json
{
  "currentStatus": "RUNNING"
}
```

</details>

<details>
<summary>Referencing the workflow name and version</summary>

To reference the current workflow's name and version, use the following expressions:

```json
{
  "workflowName": "${workflow.workflowType}",
  "workflowVersion": "${workflow.version}"
}
```

At runtime, it will be replaced with the workflow’s name and version:

```json
{
  "workflowName": "order-processing-workflow",
  "workflowVersion": 1
}
```

</details>

<details>
<summary>Referencing the correlation ID</summary>

To reference the current workflow's correlation ID, use the following expression:

```json
{
  "correlationId": "${workflow.correlationId}"
}
```

At runtime, it will be replaced with the workflow’s correlation ID:

```json
{
  "correlationId": "order-123"
}
```

</details>

<details>
<summary>Referencing the idempotency key</summary>

To reference the idempotency key used when starting the workflow, use the following expression:

```json
{
  "idempotencyKey": "${workflow.idempotencyKey}"
}
```

At runtime, it will be replaced with the the idempotency key used when starting the workflow:

```json
{
  "idempotencyKey": "test-key-456"
}
```

</details>

<details>
<summary>Referencing the task domain</summary>

To reference the domain mapped to a specific task in the workflow execution, use the following expression. This is useful when you need to pass the task's routing domain as an input to a downstream task.

```json
{
  "domain": "${workflow.taskToDomain.http_ref}"
}
```

At runtime, it will be replaced with the domain name that ran the task execution:

```json
{
  "domain": "my-domain"
}
```

</details>

<details>
<summary>Referencing the workflow start time</summary>

To reference the start time of the workflow execution, use the following expression. The value is a Unix timestamp in milliseconds.

```json
{
  "startedAt": "${workflow.createTime}"
}
```

At runtime, it will be replaced with the workflow execution start time:

```json
{
  "startedAt": 1781879078219
}
```

</details>

<details>
<summary>Referencing the parent workflow (in sub-workflows)</summary>

To reference the parent workflow and its task execution ID from within a sub-workflow, use the following expressions:

```json
{
  "parentId": "${workflow.parentWorkflowId}",
  "parentTaskId": "${workflow.parentWorkflowTaskId}"
}
```

At runtime, these will be replaced with the actual IDs:

```json
{
  "parentId": "d7061d93-6bea-11f1-b106-2a7869257662",
  "parentTaskId": "d70903cf-6bea-11f1-b106-2a7869257662"
}
```

These return null if the workflow is not running as a sub-workflow.

</details>

<details>
<summary>Referencing data between parent workflow and sub-workflow​</summary>

=== "From parent workflow"

    To pass parameters from a parent workflow into its sub-workflow, you must declare them as input parameters for the Sub Workflow task.

    **Example**

    ```json
    // parent workflow definition with task configuration

    {
     "createTime": 1733980872607,
     "updateTime": 0,
     "name": "testParent",
     "description": "workflow with subworkflow",
     "version": 1,
     "tasks": [
       {
         "name": "get_item",
         "taskReferenceName": "get_item_ref",
         "inputParameters": {
           "uri": "https://example.com/api",
           "method": "GET",
           "accept": "application/json",
           "contentType": "application/json",
           "encode": true
         },
         "type": "HTTP",
       },
       {
         "name": "sub_workflow",
         "taskReferenceName": "sub_workflow_ref",
         "inputParameters": {
           "user": "${workflow.variables.name}",
           "item": "${previous_task_ref.output.item[0]}"
         },
         "type": "SUB_WORKFLOW",
         "subWorkflowParam": {
           "name": "testSub",
           "version": 1
         }
       }
     ],
     "inputParameters": [],
     "outputParameters": {}
    }
    ```

    If needed, these inputs can then be set as workflow variables within the sub-workflow definition itself using a Set Variable task.

=== "From sub-workflow"

    To pass parameters from a sub-workflow back to its parent workflow, you must pass them as the sub-workflow’s output parameters in the sub-workflow definition.

    ```json
    // sub-workflow definition
    {
     "createTime": 1726651838873,
     "updateTime": 1733983507294,
     "name": "testSub",
     "description": "subworkflow for parent workflow",
     "version": 1,
     "tasks": [
       {
         "name": "get-user",
         "taskReferenceName": "get-user_ref",
         "inputParameters": {
           "uri": "https://example.com/api",
           "method": "GET",
           "accept": "application/json",
           "contentType": "application/json",
           "encode": true
         },
         "type": "HTTP",
       },
       {
         "name": "send-notification",
         "taskReferenceName": "send-notification_ref",
         "inputParameters": {
           "uri": "https://example.com/api",
           "method": "GET",
           "accept": "application/json",
           "contentType": "application/json",
           "encode": true
         },
         "type": "HTTP",
       }
     ],
     "inputParameters": [],
     "outputParameters": {
       "location": "${get-user_ref.output.response.body.results[0].location.country}",
       "isNotif": "${send-notification_ref.output}"
     }
    }
    ```

    In the parent workflow, these sub-workflow outputs can be referenced using the expression format `${sub_workflow_ref.output.someKey}`.

</details>

## Troubleshooting

You can verify if the data was passed correctly by checking the input/output values of the task execution in **Executions** > **Workflow**. Common errors:

- If the reference expression is incorrectly formatted, the referencing parameter value may end up with the wrong data or a null value.
- If the reference parameter (such as a task output) has not been resolved at the point when it is referenced, the dynamic parameter will be null.

## Related pages

- [Tasks in Workflows](/content/developer-guides/tasks)
- [Masking Parameters](/content/developer-guides/masking-parameters)
- [Using Task Input Templates](/content/developer-guides/task-input-templates)
- [Caching Task Outputs](/content/faqs/task-cache-output)
- [Rate Limits](/content/rate-limits)
- [Writing Workers for Conductor Workflows](/content/developer-guides/using-workers)
