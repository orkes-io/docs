---
sidebar_position: 1
slug: "/reference-docs/api/human-tasks/get-task"
description: "This API is used to retrieve a Human task and its details based on its task ID."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Human Task

**Endpoint:** `GET /api/human/tasks/{taskId}`

Retrieves a Human task’s details using the task ID.

The invoking user should be one of the following:
* Cluster admin
* Task owner of the Human task
* Task assignee
* Task claimant
* User with READ or UPDATE permission for the Human task definition

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskId | The unique identifier for the Human task execution. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| withTemplate | Whether to include the task’s user form details in the response. Default is false. | boolean | Optional. |

## Response

Returns the Human task object.

## Examples

<details><summary>Get a Human task with its user form details</summary>

**Request**

``` shell
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/human/tasks/9bc8d796-ce5f-11ef-88e4-ce0afa758ea1?withTemplate=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>''
```

**Response**

``` json
{
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "taskId": "9bc8d796-ce5f-11ef-88e4-ce0afa758ea1",
  "state": "COMPLETED",
  "displayName": "Pick your assets",
  "definitionName": "selectAssets",
  "workflowId": "9bc52e0e-ce5f-11ef-88e4-ce0afa758ea1",
  "workflowName": "assetPageFlow",
  "taskRefName": "selectAssets_ref",
  "humanTaskDef": {
    "assignments": [],
    "userFormTemplate": {
      "name": "assetWatchlist",
      "version": 1
    },
    "assignmentCompletionStrategy": "LEAVE_OPEN",
    "displayName": "Pick your assets",
    "fullTemplate": {
      "createTime": 1736409506524,
      "updateTime": 1736409506524,
      "createdBy": "USER:user@example.com",
      "updatedBy": "USER:user@example.com",
      "name": "assetWatchlist",
      "version": 1,
      "jsonSchema": {
        "$schema": "http://json-schema.org/draft-07/schema",
        "properties": {
          "enterAssets": {
            "type": "string"
          },
          "Confirm": {
            "type": "boolean"
          }
        }
      },
      "templateUI": {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "scope": "#/properties/enterAssets",
            "label": "Enter Assets"
          },
          {
            "type": "Control",
            "scope": "#/properties/Confirm",
            "options": {}
          }
        ]
      }
    }
  },
  "input": {
    "Confirm": false,
    "_createdBy": "user@example.com",
    "enterAssets": "",
    "__humanTaskDefinition": {
      "assignments": [],
      "displayName": "Pick your assets",
      "userFormTemplate": {
        "name": "assetWatchlist",
        "version": 1
      },
      "assignmentCompletionStrategy": "LEAVE_OPEN"
    },
    "__humanTaskProcessContext": {
      "state": "COMPLETED",
      "lastUpdated": 1736409556520,
      "humanTaskActionLogs": [
        {
          "id": "fd81562d-ef75-478e-9f4e-00423401585d",
          "state": "ASSIGNED",
          "action": "ASSIGNMENTS_COMPLETED",
          "actedBy": "system",
          "stateStart": 1736409550282
        }
      ],
      "humanTaskTriggerLog": [],
      "assignmentsCompleted": true,
      "skippedAssigneeIndexes": []
    }
  },
  "output": {},
  "createdOn": 1736409550264,
  "updatedOn": 1736409556520
}
```
</details>


<details><summary>Get a Human task without its user form details</summary>

**Request**

``` shell
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/human/tasks/9bc8d796-ce5f-11ef-88e4-ce0afa758ea1' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

``` json
{
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "taskId": "9bc8d796-ce5f-11ef-88e4-ce0afa758ea1",
  "state": "COMPLETED",
  "displayName": "Pick your assets",
  "definitionName": "selectAssets",
  "workflowId": "9bc52e0e-ce5f-11ef-88e4-ce0afa758ea1",
  "workflowName": "assetPageFlow",
  "taskRefName": "selectAssets_ref",
  "humanTaskDef": {
    "assignments": [],
    "userFormTemplate": {
      "name": "assetWatchlist",
      "version": 1
    },
    "assignmentCompletionStrategy": "LEAVE_OPEN",
    "displayName": "Pick your assets"
  },
  "input": {
    "Confirm": false,
    "_createdBy": "user@example.com",
    "enterAssets": "",
    "__humanTaskDefinition": {
      "assignments": [],
      "displayName": "Pick your assets",
      "userFormTemplate": {
        "name": "assetWatchlist",
        "version": 1
      },
      "assignmentCompletionStrategy": "LEAVE_OPEN"
    },
    "__humanTaskProcessContext": {
      "state": "COMPLETED",
      "lastUpdated": 1736409556520,
      "humanTaskActionLogs": [
        {
          "id": "fd81562d-ef75-478e-9f4e-00423401585d",
          "state": "ASSIGNED",
          "action": "ASSIGNMENTS_COMPLETED",
          "actedBy": "system",
          "stateStart": 1736409550282
        }
      ],
      "humanTaskTriggerLog": [],
      "assignmentsCompleted": true,
      "skippedAssigneeIndexes": []
    }
  },
  "output": {},
  "createdOn": 1736409550264,
  "updatedOn": 1736409556520
}
```
</details>