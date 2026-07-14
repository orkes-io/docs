---
title: "Get Schedule"
description: "Use the Orkes Conductor schedules API to get Schedule. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/schedule/get-schedule"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Schedule, Get Schedule API, API orchestration, API gateway"
---

# Get Schedule

## Quick reference

Use this schedules endpoint to get Schedule. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/schedules/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/schedules/{name}`

Retrieves the details of a specified schedule.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schedule to retrieve. | string | Required. | 

## Response

- Returns 200 OK with the schedule details, including the cron expression, workflow configuration, timezone, start/end times, and metadata such as creation and update information.
- Returns 404 if the schedule does not exist.

## Examples

<details>
<summary>Get a schedule</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/assignPRSchedule' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "name": "assignPRSchedule",
  "cronExpression": "0 0 * ? * *",
  "runCatchupScheduleInstances": false,
  "paused": true,
  "startWorkflowRequest": {
    "name": "github_pr_reviewer_assignment",
    "correlationId": "",
    "input": {},
    "taskToDomain": {},
    "priority": 0,
    "idempotencyKey": "123",
    "idempotencyStrategy": "RETURN_EXISTING"
  },
  "zoneId": "Asia/Dubai",
  "scheduleStartTime": 1770354000000,
  "scheduleEndTime": 1774933200000,
  "createTime": 1770118062620,
  "updatedTime": 1770118646394,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "description": "Schedule for automating PR assignment workflow.",
  "orgId": "0000",
  "queueMsgId": "assignPRSchedule"
}
```

</details>
