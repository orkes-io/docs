---
title: "Get Next Few Schedules"
description: "Use the Orkes Conductor schedules API to get Next Few Schedules. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schedule/get-next-few-schedules"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Next Few Schedules, Get Next Few Schedules API, API orchestration, API gateway"
---

# Get Next Few Schedules

## Quick reference

Use this schedules endpoint to get Next Few Schedules. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/nextFewSchedules`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/nextFewSchedules`

Calculates and returns the next few execution times based on a cron expression. This endpoint does not query existing schedules; it computes future execution times for any given cron expression.

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| cronExpression | The cron expression of the schedule to calculate execution times of upcoming schedules. | string | Required. | 
| scheduleStartTime | The start time for the schedule in Unix timestamp format (in milliseconds), based on the local timezone. | integer (int64) | Optional. | 
|scheduleEndTime | The end time for the schedule in Unix timestamp format (in milliseconds), based on the local timezone. | integer (int64) | Optional.| 
| limit | The maximum number of upcoming executions to return. Default is 3, maximum is 5. | integer (int32) | Optional. | 

## Response

Returns an array of Unix timestamps (in milliseconds) representing the next scheduled execution times of the queried schedule.

## Examples

<details>
<summary>Get the next 3 execution times for a schedule</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/nextFewSchedules?cronExpression=0%200%2012%2031%20JAN%20%3F&limit=3' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  1801396800000,
  1832932800000,
  1864555200000
]
```

</details>
