---
title: "Delete Schedule"
description: "Use the Orkes Conductor schedules API to delete Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Delete Schedule

## Quick reference

Use this schedules endpoint to delete Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/scheduler/schedules/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/scheduler/schedules/{name}`

Deletes a schedule.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule to delete. | string | Required. | 

## Response

Returns 200 OK, indicating that the schedule has been deleted.

## Examples

<details>
<summary>Delete a schedule</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPR' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the schedule has been deleted.

</details>
