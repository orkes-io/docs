---
sidebar_position: 4
slug: "/reference-docs/api/workflow/get-workflows-by-correlation-id"
description: "This API is used to retrieve a list of workflow executions based on its correlation IDs."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflows by Correlation ID

**Endpoint:** `POST /api/workflow/{name}/correlated`

Gets a list of execution details for a specific workflow definition based on a list of correlation IDs. By default, only running executions are returned.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| name | The name of the workflow to be fetched. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| includeTasks | If set to true, all task execution details will be fetched in a `tasks` array. Default is false. | boolean | Optional. |
| includeClosed | If set to true, the response will also include terminal workflows. Default is false. | boolean | Optional. |

## Request body

Format the request as an array of correlation IDs. For example, `[“1”, “2”, “3”]`.

## Response

Returns a map where each key is the correlation ID, and its corresponding value is a list of workflow executions of the indicated workflow.

## Examples

<details><summary>Get only running workflows based on correlation IDs</summary>

**Request**

```
curl -X 'POST' \
  'https://&lt;YOUR_CLUSTER>/api/workflow/someWorkflow/correlated?includeClosed=false&includeTasks=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "1", "2"
]'
```

**Response**

```
{
  "1": [
    {
      "ownerApp": "",
      "createTime": 1737091797157,
      "updateTime": 1737091797157,
      "createdBy": "user@example.com",
      "status": "RUNNING",
      "endTime": 0,
      "workflowId": "169f6da1-d494-11ef-a114-0af1b159704e",
      "tasks": [],
      "input": {},
      "output": {},
      "correlationId": "1",
      "taskToDomain": {},
      "failedReferenceTaskNames": [],
      "workflowDefinition": {
        "createTime": 1737019785656,
        "updateTime": 1737022056827,
        "name": "someWorkflow",
        "description": "test flow",
        "version": 1,
        "tasks": [
          {
            "name": "http",
            "taskReferenceName": "http_ref",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "encode": true
            },
            "type": "HTTP",
            "permissive": false
          },
          {
            "name": "wait",
            "taskReferenceName": "wait_ref",
            "inputParameters": {
              "duration": "7 seconds"
            },
            "type": "WAIT",
            "permissive": false
          }
        ],
        "inputParameters": [],
        "outputParameters": {
          "output": "${http_ref.output}"
        },
        "failureWorkflow": "",
        "schemaVersion": 2,
        "restartable": true,
        "workflowStatusListenerEnabled": false,
        "ownerEmail": "user@example.com",
        "timeoutPolicy": "ALERT_ONLY",
        "timeoutSeconds": 0,
        "variables": {},
        "inputTemplate": {},
        "enforceSchema": true
      },
      "priority": 0,
      "variables": {},
      "lastRetriedTime": 0,
      "failedTaskNames": [],
      "history": [],
      "rateLimited": false,
      "workflowVersion": 1,
      "startTime": 1737091797157,
      "workflowName": "someWorkflow"
    }
  ]
}
```

</details>


<details><summary>Get all workflows based on correlation IDs</summary>

**Request**

```
curl -X 'POST' \
  'https://&lt;YOUR_CLUSTER>/api/workflow/someWorkflow/correlated?includeClosed=true&includeTasks=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "1", "2"
]'
```

**Response**

```
{
  "1": [
   {
      "ownerApp": "",
      "createTime": 1737091797157,
      "updateTime": 1737091797157,
      "createdBy": "user@example.com",
      "status": "RUNNING",
      "endTime": 0,
      "workflowId": "169f6da1-d494-11ef-a114-0af1b159704e",
      "tasks": [],
      "input": {},
      "output": {},
      "correlationId": "1",
      "taskToDomain": {},
      "failedReferenceTaskNames": [],
      "workflowDefinition": {
        "createTime": 1737019785656,
        "updateTime": 1737022056827,
        "name": "someWorkflow",
        "description": "test flow",
        "version": 1,
        "tasks": [
          {
            "name": "http",
            "taskReferenceName": "http_ref",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "encode": true
            },
            "type": "HTTP",
            "permissive": false
          },
          {
            "name": "wait",
            "taskReferenceName": "wait_ref",
            "inputParameters": {
              "duration": "7 seconds"
            },
            "type": "WAIT",
            "permissive": false
          }
        ],
        "inputParameters": [],
        "outputParameters": {
          "output": "${http_ref.output}"
        },
        "failureWorkflow": "",
        "schemaVersion": 2,
        "restartable": true,
        "workflowStatusListenerEnabled": false,
        "ownerEmail": "user@example.com",
        "timeoutPolicy": "ALERT_ONLY",
        "timeoutSeconds": 0,
        "variables": {},
        "inputTemplate": {},
        "enforceSchema": true
      },
      "priority": 0,
      "variables": {},
      "lastRetriedTime": 0,
      "failedTaskNames": [],
      "history": [],
      "rateLimited": false,
      "workflowVersion": 1,
      "startTime": 1737091797157,
      "workflowName": "someWorkflow"
    },
    {
      "ownerApp": "",
      "createTime": 1737091663648,
      "updateTime": 1737091670856,
      "createdBy": "user@example.com",
      "status": "COMPLETED",
      "endTime": 1737091670855,
      "workflowId": "c70b924d-d493-11ef-a114-0af1b159704e",
      "tasks": [],
      "input": {},
      "output": {
        "output": {
          "response": {
            "headers": {
              "Date": [
                "Fri, 17 Jan 2025 05:27:43 GMT"
              ],
              "Content-Type": [
                "application/json"
              ],
              "Content-Length": [
                "182"
              ],
              "Connection": [
                "keep-alive"
              ],
              "Strict-Transport-Security": [
                "max-age=15724800; includeSubDomains"
              ]
            },
            "reasonPhrase": "200 OK",
            "body": {
              "randomString": "sjmdxggwvkvcdgkcftih",
              "randomInt": 7870,
              "hostName": "orkes-api-sampler-67dfc8cf58-7ckpj",
              "apiRandomDelay": "0 ms",
              "sleepFor": "0 ms",
              "statusCode": "200",
              "queryParams": {}
            },
            "statusCode": 200
          }
        }
      },
      "correlationId": "1",
      "taskToDomain": {},
      "failedReferenceTaskNames": [],
      "workflowDefinition": {
        "createTime": 1737019785656,
        "updateTime": 1737022056827,
        "name": "someWorkflow",
        "description": "test flow",
        "version": 1,
        "tasks": [
          {
            "name": "http",
            "taskReferenceName": "http_ref",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "encode": true,
              "asyncComplete": false
            },
            "type": "HTTP",
            "permissive": false
          },
          {
            "name": "wait",
            "taskReferenceName": "wait_ref",
            "inputParameters": {
              "duration": "7 seconds"
            },
            "type": "WAIT",
            "permissive": false
          }
        ],
        "inputParameters": [],
        "outputParameters": {
          "output": "${http_ref.output}"
        },
        "failureWorkflow": "",
        "schemaVersion": 2,
        "restartable": true,
        "workflowStatusListenerEnabled": false,
        "ownerEmail": "user@example.com",
        "timeoutPolicy": "ALERT_ONLY",
        "timeoutSeconds": 0,
        "variables": {},
        "inputTemplate": {},
        "enforceSchema": true
      },
      "priority": 0,
      "variables": {},
      "lastRetriedTime": 0,
      "failedTaskNames": [],
      "history": [],
      "idempotencyKey": "",
      "rateLimited": false,
      "startTime": 1737091663648,
      "workflowName": "someWorkflow",
      "workflowVersion": 1
    }
  ],
  "2": [
    {
      "ownerApp": "",
      "createTime": 1737091691517,
      "updateTime": 1737091698635,
      "createdBy": "user@example.com",
      "status": "COMPLETED",
      "endTime": 1737091698632,
      "workflowId": "d7a80b1f-d493-11ef-a114-0af1b159704e",
      "tasks": [],
      "input": {},
      "output": {
        "output": {
          "response": {
            "headers": {
              "Date": [
                "Fri, 17 Jan 2025 05:28:11 GMT"
              ],
              "Content-Type": [
                "application/json"
              ],
              "Content-Length": [
                "182"
              ],
              "Connection": [
                "keep-alive"
              ],
              "Strict-Transport-Security": [
                "max-age=15724800; includeSubDomains"
              ]
            },
            "reasonPhrase": "200 OK",
            "body": {
              "randomString": "ayjkhmfpazcxthfpfvsr",
              "randomInt": 3510,
              "hostName": "orkes-api-sampler-67dfc8cf58-q2zd8",
              "apiRandomDelay": "0 ms",
              "sleepFor": "0 ms",
              "statusCode": "200",
              "queryParams": {}
            },
            "statusCode": 200
          }
        }
      },
      "correlationId": "2",
      "taskToDomain": {},
      "failedReferenceTaskNames": [],
      "workflowDefinition": {
        "createTime": 1737019785656,
        "updateTime": 1737022056827,
        "name": "someWorkflow",
        "description": "test flow",
        "version": 1,
        "tasks": [
          {
            "name": "http",
            "taskReferenceName": "http_ref",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "encode": true,
              "asyncComplete": false
            },
            "type": "HTTP",
            "permissive": false
          },
          {
            "name": "wait",
            "taskReferenceName": "wait_ref",
            "inputParameters": {
              "duration": "7 seconds"
            },
            "type": "WAIT",
            "permissive": false
          }
        ],
        "inputParameters": [],
        "outputParameters": {
          "output": "${http_ref.output}"
        },
        "failureWorkflow": "",
        "schemaVersion": 2,
        "restartable": true,
        "workflowStatusListenerEnabled": false,
        "ownerEmail": "user@example.com",
        "timeoutPolicy": "ALERT_ONLY",
        "timeoutSeconds": 0,
        "variables": {},
        "inputTemplate": {},
        "enforceSchema": true
      },
      "priority": 0,
      "variables": {},
      "lastRetriedTime": 0,
      "failedTaskNames": [],
      "history": [],
      "rateLimited": false,
      "startTime": 1737091691517,
      "workflowName": "someWorkflow",
      "workflowVersion": 1
    }
  ]
}
```
</details>