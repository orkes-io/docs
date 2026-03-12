---
sidebar_position: 13
slug: "/reference-docs/api/schedule/search-schedule-executions"
description: "Learn how to search schedule executions."
---

# Search Schedule Executions

**Endpoint**: `GET /api/scheduler/search/executions`

Searches for workflow executions based on payload and other parameters.

## Query parameters

| Parameter | Description | Type | Required/Optional | 
| --------- | ----------- | ---- | ----------------- | 
| start | The index of the first record to retrieve. Used for pagination. Default is 0.<br/>For example, `start=0` returns results from the first record, and `start=2` skips the first two records and returns results starting from the third. | integer | Optional. | 
| size | The maximum number of records to return per page. For example,` size=5` returns up to five records starting from the offset defined by `start`. Default is 100. | integer | Optional. | 
| sort | The field to sort results by, with optional sort order. Use `sort=ASC\|DESC` format (e.g., `sort=name&sort=workflowId:DESC`). If order is not specified, it defaults to `ASC`. Supported sort formats:<ul><li>`sort=field`: Sorts by field in ascending order</li><li>`sort=field:ASC`: Sorts by field in ascending order</li><li>`sort=field:DESC`: Sorts by field in descending order</li></ul>Supported fields:<ul><li>`scheduledTime`: The scheduler's scheduled time</li><li>`executionTime`: The scheduler's execution time.</li><li>`executionId`: The scheduler's execution ID</li><li>`scheduleName`: The name of the schedule</li><li>`workflowType`: The name/type of the workflow</li><li>`status`: The execution status (`POLLED`, `FAILED`, `EXECUTED`)</li></ul> | string | Optional. | 
| freeText | Free text search across schedule names. Default is `*`. | string | Optional. | 
| query | Query string for filtering results. Use `*` to match all executions. | string | Required. | 

## Response

Returns an object with `totalHits` (total number of matching executions) and `results` (array of execution details).

## Examples

<details>
<summary>Search for schedule executions</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/scheduler/search/executions?start=0&size=2&sort=name%3ADESC&query=%2A' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Since the request used `start`=0 and `size=2`, sorted by `name` in descending order, the result returned the first two definitions sorted alphabetically by schedule name.

```json
{
  "totalHits": 205,
  "results": [
    {
      "executionId": "6c2f27b3-0e09-46d6-84c0-6a02c58b4dcb",
      "scheduleName": "metaMAN",
      "scheduledTime": 1724304540000,
      "executionTime": 1724304539945,
      "workflowName": "NewWorkflow_gp65l",
      "workflowId": "6f641845-6047-11ef-b28e-de111cd83893",
      "startWorkflowRequest": {
        "name": "NewWorkflow_gp65l",
        "correlationId": "",
        "input": {
          "": ""
        },
        "taskToDomain": {},
        "priority": 0
      },
      "state": "EXECUTED",
      "zoneId": "UTC",
      "orgId": "0000",
      "queueMsgId": "6c2f27b3-0e09-46d6-84c0-6a02c58b4dcb"
    },
    {
      "executionId": "8efaf267-810a-46c5-a297-386adc917198",
      "scheduleName": "metaMAN",
      "scheduledTime": 1724304660000,
      "executionTime": 1724304660394,
      "workflowName": "NewWorkflow_gp65l",
      "workflowId": "b72f2757-6047-11ef-b28e-de111cd83893",
      "startWorkflowRequest": {
        "name": "NewWorkflow_gp65l",
        "correlationId": "",
        "input": {
          "": ""
        },
        "taskToDomain": {},
        "priority": 0
      },
      "state": "EXECUTED",
      "zoneId": "UTC",
      "orgId": "0000",
      "queueMsgId": "8efaf267-810a-46c5-a297-386adc917198"
    }
  ]
}
```

</details>