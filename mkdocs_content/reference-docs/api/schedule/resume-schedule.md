---
title: "Resume Schedule"
description: "Use the Orkes Conductor schedules API to resume Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Resume Schedule

## Quick reference

Use this schedules endpoint to resume Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/schedules/{name}/resume`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/schedules/{name}/resume`

Resumes a paused schedule.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule to resume. | string | Required. | 

## Response

- Returns 200 OK, indicating that the schedule has been resumed. 
- Returns 404 if the schedule is already running or does not exist.

## Examples

<details>
<summary>Resume a schedule</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPRSchedule/resume' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the schedule has been resumed.

</details>
