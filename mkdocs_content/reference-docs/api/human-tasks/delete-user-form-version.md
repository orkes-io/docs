---
title: "Delete User Form Version"
description: "Use the Orkes Conductor human tasks API to delete User Form Version. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/delete-user-form-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete User Form Version, Delete User Form Version API, API orchestration, API gateway"
---

# Delete User Form Version

## Quick reference

Use this human tasks endpoint to delete User Form Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/human/template/{name}/{version}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/human/template/{name}/{version}`

Deletes a specific version of the user form from the Conductor server by its name.

!!! warning
    After deletion, all Human tasks that make use of the deleted user form version will fail to render.

## Path parameters

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
| name      | The name of the user form to be deleted. | string | Required.          |
| version   | The version of the user form to be deleted. | integer | Required. | 

## Response

Returns 200 OK, indicating that the specific version of the user form has been deleted successfully. Returns 500 if a user form does not exist.

## Examples

<details>
<summary>Delete a version of the user form</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/human/template/EmployeeOnboarding/2' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the specified version of the user form has been deleted successfully.

</details>

## Related pages

- [Human Task](/content/reference-docs/api/human-tasks)
- [Get Human Task](/content/reference-docs/api/human-tasks/get-task)
- [Get Conductor Task by Human Task ID](/content/reference-docs/api/human-tasks/get-conductor-task-by-human-task-id)
- [Claim Task (Conductor User)](/content/reference-docs/api/human-tasks/claim-task-conductor-user)
- [Claim Task (External/All Users)](/content/reference-docs/api/human-tasks/claim-task-external-user)
- [Reassign Human Task](/content/reference-docs/api/human-tasks/reassign-human-task)
