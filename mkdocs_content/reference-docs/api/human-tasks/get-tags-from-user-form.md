---
title: "Get Tags from a User Form"
description: "Use the Orkes Conductor human tasks API to get Tags from a User Form. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/get-tags-from-user-form"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from a User Form, Get Tags from a User Form API, API orchestration, API gateway"
---

# Get Tags from a User Form

## Quick reference

Use this human tasks endpoint to get Tags from a User Form. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/human/template/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/human/template/{name}/tags`

Retrieves the tags associated with a user form.

## Path parameters

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
| name      | The name of the user form from which the tags are to be retrieved. | string | Required.          |

## Response

Returns an array of tag objects, each containing a key-value pair.

## Examples

<details>
<summary>Get tags from a user form</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/human/template/EmployeeOnboarding/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "backend",
    "value": "PR"
  },
  {
    "key": "dev",
    "value": "automation"
  }
]
```

</details>

## Related pages

- [Human Task](/content/reference-docs/api/human-tasks)
- [Get Human Task](/content/reference-docs/api/human-tasks/get-task)
- [Get Conductor Task by Human Task ID](/content/reference-docs/api/human-tasks/get-conductor-task-by-human-task-id)
- [Claim Task (Conductor User)](/content/reference-docs/api/human-tasks/claim-task-conductor-user)
- [Claim Task (External/All Users)](/content/reference-docs/api/human-tasks/claim-task-external-user)
- [Reassign Human Task](/content/reference-docs/api/human-tasks/reassign-human-task)
