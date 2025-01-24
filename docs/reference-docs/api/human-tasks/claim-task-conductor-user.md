---
sidebar_position: 3
slug: "/reference-docs/api/human-tasks/claim-task-conductor-user"
description: "This API is used by an authenticated Orkes Conductor user to claim a Human task. "
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



# Claim Task (Conductor User)

**Endpoint:** `POST /api/human/tasks/{taskId}/claim`

Claims an unclaimed Human task by the current Conductor user. 

The invoking user should be an authenticated Conductor user who is a:
* Cluster admin
* Task owner of the Human task
* CONDUCTOR_USER or CONDUCTOR_GROUP task assignee
* User with UPDATE permission for the Human task definition

If the Human task is not assigned to any user or group, any authorized Conductor user can claim it. If the task is already assigned to a user or group, Conductor users can claim it by overriding the assignment. Claimed tasks cannot be claimed again unless it is released.


## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskId | The unique identifier for the Human task execution to be claimed. | string | Required. |



## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| overrideAssignment | Whether to override the existing assignment. Default is false. | boolean | Optional. |
| withTemplate | Whether to include the task’s user form details in the response. Default is false. | boolean | Optional.|


## Response

Returns the Human task object.


## Examples


<details><summary>Claim a Human task by overriding the existing assignment</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/tasks/5569e4e8-ce6b-11ef-a89d-86a819bd92bf/claim?overrideAssignment=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

``` json
{
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "taskId": "5569e4e8-ce6b-11ef-a89d-86a819bd92bf",
  "state": "IN_PROGRESS",
  "displayName": "Pick your assets",
  "definitionName": "selectAssets",
  "workflowId": "55657812-ce6b-11ef-a89d-86a819bd92bf",
  "workflowName": "assetPageFlow",
  "taskRefName": "selectAssets_ref",
  "assignee": {
    "userType": "CONDUCTOR_USER",
    "user": "user@example.com"
  },
  "claimant": {
    "userType": "CONDUCTOR_USER",
    "user": "user@example.com"
  },
  "humanTaskDef": {
    "assignments": [
      {
        "assignee": {
          "userType": "CONDUCTOR_GROUP",
          "user": "Software-Architects"
        }
      }
    ],
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
      "assignments": [
        {
          "assignee": {
            "user": "Software-Architects",
            "userType": "CONDUCTOR_GROUP"
          }
        }
      ],
      "displayName": "Pick your assets",
      "userFormTemplate": {
        "name": "assetWatchlist",
        "version": 1
      },
      "assignmentCompletionStrategy": "LEAVE_OPEN"
    },
    "__humanTaskProcessContext": {
      "state": "IN_PROGRESS",
      "lastUpdated": 1736414618562,
      "humanTaskTriggerLog": [],
      "humanTaskActionLogs": [
        {
          "id": "79a4b772-22c9-4875-81e3-6b74c1ff0dda",
          "state": "ASSIGNED",
          "stateStart": 1736414586182,
          "assignee": {
            "userType": "CONDUCTOR_GROUP",
            "user": "Software-Architects"
          },
          "action": "ASSIGNMENT",
          "actedBy": "system"
        },
        {
          "id": "2f09371a-658b-44f0-b4bf-f66fee96b066",
          "state": "IN_PROGRESS",
          "stateStart": 1736414618562,
          "assignee": {
            "userType": "CONDUCTOR_USER",
            "user": "user@example.com"
          },
          "claimant": {
            "userType": "CONDUCTOR_USER",
            "user": "user@example.com"
          },
          "action": "CLAIM",
          "actedBy": "CONDUCTOR_USER:user@example.com"
        }
      ],
      "assigneeIndex": 0,
      "skippedAssigneeIndexes": [],
      "assignmentsCompleted": false
    }
  },
  "output": {},
  "createdOn": 1736414586163,
  "updatedOn": 1736414586182
}
```

</details>


<details><summary>Claim a Human task without returning the user form details</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/tasks/bf46eb18-ce6c-11ef-a89d-86a819bd92bf/claim?withTemplate=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

``` json
{
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "taskId": "bf46eb18-ce6c-11ef-a89d-86a819bd92bf",
  "state": "IN_PROGRESS",
  "displayName": "Pick your assets",
  "definitionName": "selectAssets",
  "workflowId": "bf4193e1-ce6c-11ef-a89d-86a819bd92bf",
  "workflowName": "assetPageFlow",
  "taskRefName": "selectAssets_ref",
  "claimant": {
    "userType": "CONDUCTOR_USER",
    "user": "user@example.com"
  },
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
      "state": "IN_PROGRESS",
      "lastUpdated": 1736415263378,
      "humanTaskTriggerLog": [],
      "humanTaskActionLogs": [
        {
          "id": "1d894fbe-3655-42cc-be1d-72b6f042ae8a",
          "state": "ASSIGNED",
          "stateStart": 1736415193282,
          "action": "ASSIGNMENTS_COMPLETED",
          "actedBy": "system"
        },
        {
          "id": "049894e6-9c21-40c9-96a9-a1277549db5d",
          "state": "IN_PROGRESS",
          "stateStart": 1736415263378,
          "claimant": {
            "userType": "CONDUCTOR_USER",
            "user": "user@example.com"
          },
          "action": "CLAIM",
          "actedBy": "CONDUCTOR_USER:user@example.com"
        }
      ],
      "skippedAssigneeIndexes": [],
      "assignmentsCompleted": true
    }
  },
  "output": {},
  "createdOn": 1736415193270,
  "updatedOn": 1736415193282
}
```

</details>


<details><summary>Claim a Human task and return the user form details</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/human/tasks/74443b41-ce6d-11ef-a89d-86a819bd92bf/claim?withTemplate=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

``` json
{
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "taskId": "74443b41-ce6d-11ef-a89d-86a819bd92bf",
  "state": "IN_PROGRESS",
  "displayName": "Pick your assets",
  "definitionName": "selectAssets",
  "workflowId": "743e6ed9-ce6d-11ef-a89d-86a819bd92bf",
  "workflowName": "assetPageFlow",
  "taskRefName": "selectAssets_ref",
  "claimant": {
    "userType": "CONDUCTOR_USER",
    "user": "user@example.com"
  },
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
      "state": "IN_PROGRESS",
      "lastUpdated": 1736415517213,
      "humanTaskTriggerLog": [],
      "humanTaskActionLogs": [
        {
          "id": "460662f4-ed2c-4f80-9fcf-b5f8961244f0",
          "state": "ASSIGNED",
          "stateStart": 1736415496933,
          "action": "ASSIGNMENTS_COMPLETED",
          "actedBy": "system"
        },
        {
          "id": "ba6631a0-e7c7-4fa4-bffe-549c6db93fbc",
          "state": "IN_PROGRESS",
          "stateStart": 1736415517213,
          "claimant": {
            "userType": "CONDUCTOR_USER",
            "user": "user@example.com"
          },
          "action": "CLAIM",
          "actedBy": "CONDUCTOR_USER:user@example.com"
        }
      ],
      "skippedAssigneeIndexes": [],
      "assignmentsCompleted": true
    }
  },
  "output": {},
  "createdOn": 1736415496921,
  "updatedOn": 1736415496933
}
```
</details>