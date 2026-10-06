---
title: "Resume Schedules in Bulk"
description: "Use the Orkes Conductor schedules API to resume Schedules in Bulk. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schedule/bulk-resume-schedule"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Resume Schedules in Bulk, Resume Schedules in Bulk API, API orchestration, API gateway"
---

# Resume Schedules in Bulk

## Quick reference

Use this schedules endpoint to resume Schedules in Bulk. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/scheduler/bulk/resume`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/scheduler/bulk/resume`

Resumes one or more paused schedules in bulk.

## Request body

Format the request body as an array of strings containing the schedule names. For example, `["schedule-name-1", "schedule-name-2"]`.

## Response

| Parameter | Description | 
| --------- | ----------- | 
| bulkSuccessfulResults | Names of schedules that were successfully resumed. | 
| bulkErrorResults | Names of schedules that failed to resume, with corresponding error messages. | 

## Examples

<details>
<summary>Resume schedules in bulk</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/scheduler/bulk/resume' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "assignPRSchedule",
  "AutomateEndpointMonitoring",
"emailNurturingAutomation",
"userCreated"
]
'
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
<summary>Resume schedules in bulk: partial failure</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/scheduler/bulk/resume' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "assignPRSchedule",
  "AutomateEndpointMonitorings",
"emailNurturingAutomations",
"userCreated"
]
'
```

**Response**

```json
{
  "bulkErrorResults": {
    "AutomateEndpointMonitorings": "Schedule 'AutomateEndpointMonitorings' not found",
    "emailNurturingAutomations": "Schedule 'emailNurturingAutomations' not found"
  },
  "bulkSuccessfulResults": [
    "assignPRSchedule",
    "userCreated"
  ]
}
```

</details>

## Related pages

- [Schedule](/content/reference-docs/api/schedule)
- [Create Schedule](/content/reference-docs/api/schedule/create-schedule)
- [Get Schedule](/content/reference-docs/api/schedule/get-schedule)
- [Pause Schedule](/content/reference-docs/api/schedule/pause-schedule)
- [Resume Schedule](/content/reference-docs/api/schedule/resume-schedule)
- [Pause Schedules in Bulk](/content/reference-docs/api/schedule/bulk-pause-schedule)
