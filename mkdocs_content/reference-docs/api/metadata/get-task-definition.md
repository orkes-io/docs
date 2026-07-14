---
title: "Get Task Definition"
description: "Use the Orkes Conductor metadata API to get Task Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/metadata/get-task-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Get Task Definition

**Endpoint:** `GET /api/metadata/taskdefs/{taskType}`

Gets a single task definition from the cluster.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| taskType  | The name of the task definition to be retrieved. | string | Required.          |

## Query parameters

| Parameter | Description                                                                             | Type    | Required/ Optional |
| --------- | --------------------------------------------------------------------------------------- | ------- | ------------------ |
| metadata  | Whether metadata (such as tags) should be included in the response. Default is _false_. | boolean | Optional.          |

## Response

Returns the task definition and includes the metadata if queried.

## Examples

<details>
<summary>Get an individual task definition without metadata</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/taskdefs/hello_task?metadata=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns the task definition, without any tags metadata. For example:

```json
{
  "createTime": 1746599870085,
  "updateTime": 1746599870085,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "hello_task",
  "description": "",
  "retryCount": 3,
  "timeoutSeconds": 3600,
  "inputKeys": [],
  "outputKeys": [],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 60,
  "responseTimeoutSeconds": 600,
  "concurrentExecLimit": 0,
  "inputTemplate": {},
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1,
  "ownerEmail": "john.doe@acme.com",
  "pollTimeoutSeconds": 3600,
  "backoffScaleFactor": 1,
  "totalTimeoutSeconds": 0,
  "enforceSchema": false
}
```

</details>

<details>
<summary>Get an individual task definition with metadata</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<CLUSTER>/api/metadata/taskdefs/hello_task?metadata=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns the task definition, including its tags metadata. For example:

```json
{
  "createTime": 1746599870085,
  "updateTime": 1746599870085,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "hello_task",
  "description": "",
  "retryCount": 3,
  "timeoutSeconds": 3600,
  "inputKeys": [],
  "outputKeys": [],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 60,
  "responseTimeoutSeconds": 600,
  "concurrentExecLimit": 0,
  "inputTemplate": {},
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1,
  "ownerEmail": "john.doe@acme.com",
  "pollTimeoutSeconds": 3600,
  "backoffScaleFactor": 1,
  "totalTimeoutSeconds": 0,
  "enforceSchema": false,
  "overwriteTags": true,
  "tags": [
    {
      "key": "tag",
      "value": "new"
    }
  ]
}
```

</details>
