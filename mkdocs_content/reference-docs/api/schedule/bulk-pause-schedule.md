---
title: "Pause Schedules in Bulk"
description: "Use the Orkes Conductor schedules API to pause Schedules in Bulk. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schedule/bulk-pause-schedule"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Pause Schedules in Bulk, Pause Schedules in Bulk API, API orchestration, API gateway"
---

# Pause Schedules in Bulk

## Quick reference

Use this schedules endpoint to pause Schedules in Bulk. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/scheduler/bulk/pause`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/scheduler/bulk/pause`

Pauses one or more running schedules in bulk.

## Request body

Format the request body as an array of strings containing the schedule names. For example, `["schedule-name-1", "schedule-name-2"]`.

## Response

| Parameter | Description | 
| --------- | ----------- | 
| bulkSuccessfulResults | Names of schedules that were successfully paused. | 
| bulkErrorResults | Names of schedules that failed to pause, with corresponding error messages. | 

## Examples

<details>
<summary>Pause schedules in bulk</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/scheduler/bulk/pause' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "assignPRSchedule",
  "AutomateEndpointMonitoring",
"emailNurturingAutomation",
"userCreated"
]'
```

**Response**

```json
{
  "bulkErrorResults": {},
  "bulkSuccessfulResults": [
    "assignPRSchedule",
    "AutomateEndpointMonitoring",
    "emailNurturingAutomation",
    "userCreated"
  ]
}
```

</details>

<details>
<summary>Pause schedules in bulk: partial failure</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/scheduler/bulk/pause' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "assignPRSchedule",
  "AutomateEndpointMonitoring",
"emailNurturingAutomation",
"userCreateds"
]'
```

**Response**

```json
{
  "bulkErrorResults": {
    "userCreateds": "Schedule 'userCreateds' not found"
  },
  "bulkSuccessfulResults": [
    "assignPRSchedule",
    "AutomateEndpointMonitoring",
    "emailNurturingAutomation"
  ]
}
```

</details>
