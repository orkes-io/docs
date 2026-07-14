---
title: "Pause Schedule"
description: "Use the Orkes Conductor schedules API to pause Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/schedule/pause-schedule"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Pause Schedule, Pause Schedule API, API orchestration, API gateway"
---

# Pause Schedule

## Quick reference

Use this schedules endpoint to pause Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/schedules/{name}/pause`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/schedules/{name}/pause`

Pauses a currently running schedule.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule to pause. | string | Required. | 

## Response

- Returns 200 OK, indicating that the schedule is paused. If the schedule is already paused, it returns 200 OK with no change to the schedule state.
- Returns 404 if the schedule does not exist.

## Examples

<details>
<summary>Pause a schedule</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPRSchedule/pause' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the schedule is paused.

</details>

## Related pages

- [Schedule](/content/reference-docs/api/schedule)
- [Create Schedule](/content/reference-docs/api/schedule/create-schedule)
- [Get Schedule](/content/reference-docs/api/schedule/get-schedule)
- [Resume Schedule](/content/reference-docs/api/schedule/resume-schedule)
- [Pause Schedules in Bulk](/content/reference-docs/api/schedule/bulk-pause-schedule)
- [Resume Schedules in Bulk](/content/reference-docs/api/schedule/bulk-resume-schedule)
