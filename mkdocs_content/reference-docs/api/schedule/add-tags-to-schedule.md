---
title: "Add Tags to a Schedule"
description: "Use the Orkes Conductor schedules API to add Tags to a Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Add Tags to a Schedule

## Quick reference

Use this schedules endpoint to add Tags to a Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/scheduler/schedules/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/scheduler/schedules/{name}/tags`

Adds tags to a schedule. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule to which the tags are to be added. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key       | The tag key.                                     | string | Required.         |
| value     | The tag value.                                   | string | Required.         |

**Example for adding multiple tags in a single request:**

```json
[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
```

## Response

Returns 200 OK, indicating that tags have been added to the schedule.

## Examples

<details>
<summary>Add a single tag to a schedule</summary>

**Request**

```bash
curl -X 'PUT' \
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

Returns 200 OK, indicating that the tag has been added to the schedule.

</details>

<details>
<summary>Add multiple tags to a schedule</summary>

**Request**

```bash
curl -X 'PUT' \
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

Returns 200 OK, indicating that tags have been added to the schedule. 

</details>
