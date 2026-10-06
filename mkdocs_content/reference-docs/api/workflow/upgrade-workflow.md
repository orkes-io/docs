---
title: "Upgrade Workflow"
description: "Use the Orkes Conductor workflows API to upgrade Workflow. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/workflow/upgrade-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Upgrade Workflow, Upgrade Workflow API, API orchestration, API gateway"
---

# Upgrade Workflow

**Endpoint:** `POST /api/workflow/{workflowId}/upgrade`

Upgrades a running workflow to a different version. The workflow execution will continue from its last running task, even after an upgrade. In other words, all the tasks in the upgraded definition before the currently running task will be marked as skipped.

## Path parameters

| Parameter  | Description                                      | Type   | Required/ Optional |
| ---------- | ------------------------------------------------ | ------ | ------------------ |
| workflowId | The execution ID of the workflow to upgrade. | string | Required.          |

## Request body

Format the request as an object containing the following parameters.

| Parameter     | Description                                                                                                                    | Type    | Required/ Optional |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------------------ |
| name          | The name of the workflow definition.                                                                                           | string  | Required.          |
| version       | The version to which the workflow is to be updated.                                                                            | integer | Required.          |
| taskOutput    | A map of task outputs for any skipped tasks, with the key as the task reference name, and the value as the task output object. | map     | Optional.          |
| workflowInput | A map of inputs for the upgraded workflow execution, with the parameter name as the key and its input value as the value.      | map     | Optional.          |

**Example**

```json
{
  "name": "myWorkflow",
  "taskOutput": {
    "newTaskRefName": {
      "someKey: "someValue
    }
  },
  "version": 3,
  "workflowInput": {
    "someKey": "someValue"
  }
}
```

## Response

Returns 200 OK, indicating that the workflow execution has been upgraded successfully. All new tasks before the currently running task are skipped in the execution.

Returns 400 if an invalid task execution ID is provided.

## Examples

<details>
<summary>Upgrade a running workflow to the next version</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/56acdfb6-05ae-11f1-8b8d-6219b54da7fe/upgrade' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "DemoWorkflow",
  "taskOutput": {},
  "version": 2
}'
```

**Response**

Returns 200 OK, indicating that the workflow execution has been upgraded successfully. All new tasks before the currently running task are skipped in the execution.

</details>

<details>
<summary>Upgrade to the next version with updated workflow input</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/ce5ce5d6-6ed1-11f0-880f-0246e7260963/upgrade' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "someWorkflow",
  "version": 2,
  "workflowInput": {
    "name": "updatedValue"
  }
'
```

**Response**

Returns 200 OK, indicating that the workflow execution has been upgraded successfully, and the `workflowInput` is updated in the running execution.

</details>

<details>
<summary>Upgrade to the next version with updated task output for a skipped task</summary>

**Request**

```bash
 curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/b24acffe-6ed2-11f0-880f-0246e7260963/upgrade' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "someWorkflow",
  "taskOutput": {
    "event_ref": {
      "output": "This task execution is skipped via API call"
    }
  },
  "version": 2
}
'
```

**Response**

Returns 200 OK, indicating that the workflow execution has been upgraded successfully.  The output for the skipped task (event_ref) is added to the execution.

</details>

## Related pages

- [Workflows API Reference](/content/reference-docs/api/workflow)
- [Execute Workflow Asynchronously](/content/reference-docs/api/workflow/start-workflow-execution)
- [Execute Workflow Synchronously](/content/reference-docs/api/workflow/synchronous-workflow-execution)
- [Get Workflow by ID](/content/reference-docs/api/workflow/get-workflow-by-id)
- [Get Workflows by Correlation ID](/content/reference-docs/api/workflow/get-workflows-by-correlation-id)
- [Get Workflow Size](/content/reference-docs/api/workflow/get-workflow-size)
