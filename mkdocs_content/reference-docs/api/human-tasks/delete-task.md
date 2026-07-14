---
title: "Delete Human Task"
description: "Use the Orkes Conductor human tasks API to delete Human Task. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/delete-task"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Human Task, Delete Human Task API, API orchestration, API gateway, workflow tasks, task queues"
---

# Delete Human Task

**Endpoint:** `DELETE /api/human/tasks/delete/{taskId}`

Deletes a Human task execution. Use this endpoint only to delete a task that has been disconnected from a workflow execution due to error conditions. Under normal conditions, there is no need to use this endpoint.

The invoking user should be one of the following:

- Cluster admin
- Task owner of the Human task
- User with DELETE permission for the Human task definition

!!! warning
    If this API is used for a Human task that is still associated with a workflow execution, the workflow will not be able to proceed normally and must be retried or restarted to generate a new Human task.

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| taskId    | The task ID of the Human task execution to be deleted. | string | Required.          |

## Response

Returns 200 OK, indicating that the Human task execution has been deleted. Returns 400 if an invalid task execution ID is provided.

## Examples

<details>
<summary>Delete a Human task execution</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/delete/64d2b342-0268-11f1-8b8d-6219b54da7fe' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the Human task execution has been deleted.

</details>

## Related pages

- [Human Task](/content/reference-docs/api/human-tasks)
- [Get Human Task](/content/reference-docs/api/human-tasks/get-task)
- [Get Conductor Task by Human Task ID](/content/reference-docs/api/human-tasks/get-conductor-task-by-human-task-id)
- [Claim Task (Conductor User)](/content/reference-docs/api/human-tasks/claim-task-conductor-user)
- [Claim Task (External/All Users)](/content/reference-docs/api/human-tasks/claim-task-external-user)
- [Reassign Human Task](/content/reference-docs/api/human-tasks/reassign-human-task)
