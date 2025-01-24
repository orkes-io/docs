---
sidebar_position: 4
slug: "/reference-docs/api/metadata/get-all-task-definitions"
description: "Tasks are the building blocks of workflow in Orkes Conductor. This API is used to retrieve all task definitions in Orkes Conductor."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get All Task Definitions

**Endpoint:** `GET /api/metadata/taskdefs`

Gets all the task definitions in the cluster.

## Query parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| access | The access level being requested. Supported values: _READ_, _CREATE_, _UPDATE_, _EXECUTE_, and _DELETE_. Default is _READ_. | string | Optional. | 
| metadata | Whether metadata (such as tags) should be included in the response. Default is _false_. | boolean | Optional. | 
| tagKey | Option to filter based on the tag key associated with the task definitions. | string | Optional. | 
| tagValue | Option to filter based on the tag value associated with the task definitions. | string | Optional. | 

## Response

Returns an array containing all the task definitions in the cluster.

## Examples

<details><summary>Get all task definitions with a specific tag</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/metadata/taskdefs?access=READ&metadata=false&tagKey=team&tagValue=engineering' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```
**Response**

```json
[
  {
    "ownerApp": "string",
    "createTime": 0,
    "updateTime": 1735634595302,
    "createdBy": "string",
    "updatedBy": "john.doe@acme.com",
    "name": "string",
    "description": "string",
    "retryCount": 0,
    "timeoutSeconds": 0,
    "inputKeys": [
      "string"
    ],
    "outputKeys": [
      "string"
    ],
    "timeoutPolicy": "RETRY",
    "retryLogic": "FIXED",
    "retryDelaySeconds": 0,
    "responseTimeoutSeconds": 1,
    "concurrentExecLimit": 0,
    "inputTemplate": {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    },
    "rateLimitPerFrequency": 0,
    "rateLimitFrequencyInSeconds": 0,
    "isolationGroupId": "string",
    "executionNameSpace": "string",
    "ownerEmail": "john.doe@acme.com",
    "pollTimeoutSeconds": 0,
    "backoffScaleFactor": 1,
    "totalTimeoutSeconds": 0,
    "inputSchema": {
      "ownerApp": "string",
      "createTime": 0,
      "updateTime": 0,
      "createdBy": "string",
      "updatedBy": "string",
      "name": "string-11",
      "version": 0,
      "type": "JSON",
      "data": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "externalRef": "string"
    },
    "outputSchema": {
      "ownerApp": "string",
      "createTime": 0,
      "updateTime": 0,
      "createdBy": "string",
      "updatedBy": "string",
      "name": "string",
      "version": 0,
      "type": "JSON",
      "data": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "externalRef": "string"
    },
    "enforceSchema": true,
    "overwriteTags": true,
    "tags": [
      {
        "key": "team",
        "value": "engineering"
      }
    ]
  }
]
```
</details>