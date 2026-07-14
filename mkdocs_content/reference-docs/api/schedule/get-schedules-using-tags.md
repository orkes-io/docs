---
title: "Get Schedules by Tag"
description: "Use the Orkes Conductor schedules API to get Schedules by Tag. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schedule/get-schedules-using-tags"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Schedules by Tag, Get Schedules by Tag API, API orchestration, API gateway"
---

# Get Schedules by Tag

## Quick reference

Use this schedules endpoint to get Schedules by Tag. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/schedules/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/schedules/tags`

Retrieves schedules using a specific tag.

## Query parameters

| Parameter | Description | Type | Required/Optional | 
| --------- | ----------- | ---- | ----------------- | 
| tag | The tag key-value pair in the format `key:value`. | string | Required. | 

## Response

Returns an array of schedule details, including the tags.

## Examples

<details>
<summary>Get a list of schedules with a specific tag</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules/tags?tag=team%3Adocs' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "tags": [
      {
        "key": "team",
        "value": "docs"
      }
    ],
    "name": "assignPR",
    "cronExpression": "0 * * ? * *",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "github_pr_reviewer_assignment",
      "version": 2,
      "correlationId": "",
      "input": {},
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "UTC",
    "createTime": 1748866217788,
    "updatedTime": 1765195763230,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "description": "Sample scheduler for running workflow every 2 mins",
    "orgId": "0000",
    "queueMsgId": "assignPR"
  }
]
```

</details>
