---
sidebar_position: 9
slug: "/reference-docs/api/metadata/get-all-workflow-definitions"
description: "Workflows are directed sequences of tasks and operators. This API is used to retrieve all workflow definitions in Orkes Conductor."
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get All Workflow Definitions

**Endpoint:** `GET /api/metadata/workflow`

Gets all the workflow definitions in the cluster.

## Query parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| access | The access level being requested. Supported values: _READ_, _CREATE_, _UPDATE_, _EXECUTE_, and _DELETE_. Default is _READ_. | string | Optional. | 
| metadata | Whether metadata (such as tags) should be included in the response. Default is _false_. | boolean | Optional. | 
| tagKey | Option to filter based on the tag key associated with the task definitions. | string | Optional. | 
| tagValue | Option to filter based on the tag value associated with the task definitions. | string | Optional. | 
| name | The name of a specific workflow definition to retrieve. | string | Optional. | 
| short | Whether to retrieve only essential parameters of the workflow definitions. Default is _false_. Set to _true_ to retrieve only the essential part of the definition. | boolean | Optional. | 

## Response

Returns an array containing all the workflow definitions in the cluster.

## Examples

<details><summary>Get all workflow definitions with a specific tag</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/metadata/workflow?access=READ&metadata=false&tagKey=api&tagValue=doc' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```
**Response**

```json
[
  {
    "createTime": 0,
    "updateTime": 1735802256013,
    "name": "api-test",
    "description": "Sample workflow created using API",
    "version": 1,
    "tasks": [
      {
        "name": "event",
        "taskReferenceName": "event_ref",
        "inputParameters": {},
        "type": "EVENT",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "sink": "sqs:internal_event_name",
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      }
    ],
    "inputParameters": [],
    "outputParameters": {},
    "failureWorkflow": "",
    "schemaVersion": 2,
    "restartable": false,
    "workflowStatusListenerEnabled": false,
    "ownerEmail": "john.doe@acme.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0,
    "variables": {},
    "inputTemplate": {},
    "enforceSchema": true,
    "overwriteTags": true,
    "tags": [
      {
        "key": "api",
        "value": "doc"
      }
    ]
  }
]
```
</details>