---
title: "Delete Tags from a Schedule"
description: "Use the Orkes Conductor schedules API to delete Tags from a Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior."
---

# Delete Tags from a Schedule

## Quick reference

Use this schedules endpoint to delete Tags from a Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/scheduler/schedules/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/scheduler/schedules/{name}/tags`

Deletes tags from a schedule.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule from which the tags are to be deleted. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key       | The tag key to be removed.                                    | string | Required.         |
| value     | The tag value to be removed.                                   | string | Required.         |

## Response

Returns 200 OK, indicating that tags have been deleted from the schedule.

## Examples

<details>
<summary>Delete a single tag from a schedule</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPRSchedule/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the schedule.

</details>

<details>
<summary>Delete multiple tags from a schedule</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPRSchedule/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  },
{
    "key": "backend",
    "value": "PR"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the schedule.

</details>
