---
title: "Get All Schedules"
description: "Use the Orkes Conductor schedules API to get All Schedules. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/schedule/get-all-schedules"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get All Schedules

## Quick reference

Use this schedules endpoint to get All Schedules. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/scheduler/schedules`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/scheduler/schedules`

Retrieves all schedules from your Conductor cluster. Use this endpoint to list schedules and optionally filter results by workflow name. 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| workflowName | Filters schedules by workflow name. When specified, returns only schedules associated with the specified workflow. | string | Required. | 

## Response

Returns an array of schedule objects, where each object represents a configured workflow schedule with its cron expression, workflow configuration, timezone, execution window, and metadata.

## Examples

<details>
<summary>Get all schedules</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "tags": [],
    "name": "AutomateEndpointMonitoring",
    "cronExpression": "0 */2 * ? * *",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "Monitor-HTTP-Endpoint-Availability-john",
      "version": 2,
      "correlationId": "",
      "input": {
        "notification_type": "SMS",
        "endpoint_url": "https://www.orkes.io/",
        "notification_from": "14XXXXXXXXX",
        "notification_to": "12XXXXXXXX"
      },
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "US/Central",
    "createTime": 1739347903909,
    "updatedTime": 1770199928068,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "description": "Scheduler that runs Monitor-HTTP-Endpoint-Availability workflow every 2 mins.",
    "orgId": "0000",
    "queueMsgId": "AutomateEndpointMonitoring"
  },
  {
    "tags": [],
    "name": "emailNurturingAutomation_1",
    "cronExpression": "0 0 12 L * ?",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "emailNurturing",
      "correlationId": "",
      "input": {
        "input": "click"
      },
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "US/Pacific",
    "scheduleStartTime": 1741896000000,
    "scheduleEndTime": 1743537600000,
    "createTime": 1741854966363,
    "updatedTime": 1770199928092,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "description": "Email nurturing workflow for \"click\" event",
    "orgId": "0000",
    "queueMsgId": "emailNurturingAutomation_1"
  },
  {
    "tags": [],
    "name": "annual_upgrade",
    "cronExpression": "0 0 12 31 JAN ?",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "update_eks_workflow_development",
      "version": 1,
      "correlationId": "",
      "input": {
        "organizationId": "",
        "clusterName": "",
        "cloudEnvTag": "",
        "version": "",
        "force": ""
      },
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "UTC",
    "createTime": 1712207849301,
    "updatedTime": 1770199928042,
    "createdBy": "liv.wong@orkes.io",
    "updatedBy": "john.doe@acme.com",
    "orgId": "0000",
    "queueMsgId": "annual_upgrade"
  }
  ]
```

</details>

<details>
<summary>Get schedules filtered using workflow names</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/schedules?workflowName=emailNurturing' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns all schedules that use the `emailNurturing` workflow.

```json
[
  {
    "tags": [],
    "name": "emailNurturingAutomation_1",
    "cronExpression": "0 0 12 L * ?",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "emailNurturing",
      "correlationId": "",
      "input": {
        "input": "click"
      },
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "US/Pacific",
    "scheduleStartTime": 1741896000000,
    "scheduleEndTime": 1743537600000,
    "createTime": 1741854966363,
    "updatedTime": 1770199928092,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "description": "Email nurturing workflow for \"click\" event",
    "orgId": "0000",
    "queueMsgId": "emailNurturingAutomation_1"
  },
  {
    "tags": [],
    "name": "emailNurturingAutomation",
    "cronExpression": "0 0 12 L * ?",
    "runCatchupScheduleInstances": false,
    "paused": true,
    "startWorkflowRequest": {
      "name": "emailNurturing",
      "correlationId": "",
      "input": {
        "input": "open"
      },
      "taskToDomain": {},
      "priority": 0
    },
    "zoneId": "US/Pacific",
    "scheduleStartTime": 1741896000000,
    "scheduleEndTime": 1743537600000,
    "createTime": 1741854890817,
    "updatedTime": 1770199928080,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "description": "Email nurturing workflow for \"open\" event",
    "orgId": "0000",
    "queueMsgId": "emailNurturingAutomation"
  }
]
```

</details>
