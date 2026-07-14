---
title: "Test Workflow Synchronously"
description: "Use the Orkes Conductor workflows API to test Workflow Synchronously. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/workflow/test-workflow-synchronously"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Test Workflow Synchronously, Test Workflow Synchronously API, API orchestration, API gateway"
---

# Test Workflow Synchronously

## Quick reference

Use this workflows endpoint to test Workflow Synchronously. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/workflow/test/sync`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/workflow/test/sync`

Tests a workflow using mock data and blocks until the workflow completes or reaches a specified task. This endpoint supports mocking [HTTP tasks](/content/reference-docs/system-tasks/http), [Sub Workflow tasks](/content/reference-docs/operators/sub-workflow), and [Worker tasks](/content/reference-docs/worker-task).

All test workflow tasks are automatically routed to a randomly generated domain to prevent real workers from picking them up. If you provide a `taskToDomain` mapping, it is respected and not overwritten.

## Query parameter

| Parameter | Description | Type | Required/ Optional |
| --------- | ----------- | ---- | ------------------ |
| requestId | A user-generated request ID, which can be used to track the API request. Auto-generated if not provided. In most cases, this does not need to be set explicitly. | string | Optional. | 
| waitUntilTaskRef | The reference name of the task to wait for before returning a response.<br/><br/>When reached, the response is returned immediately, regardless of whether the workflow has completed. The workflow continues running on the server after the response is returned. | string | Optional. | 
| waitForSeconds | The duration in seconds to wait before returning a response. Default is 10. Setting this to 0 is equivalent to omitting it (resolves to 10). The minimum effective value is 1.<br/><br/>If this timeout expires before the workflow completes or reaches `waitUntilTaskRef`, the current workflow state is returned with `signalTimeout: true` in the response — the workflow is not terminated. | integer | Optional. | 
| consistency | Specifies how the workflow start request is persisted and replicated before execution begins.  Supported values:<ul><li>`SYNCHRONOUS`: Executes the workflow directly from memory without persisting the request. The workflow is evaluated with minimal state synchronization during execution. This mode provides the lowest latency but is non-durable.</li><li>`DURABLE`: The request is stored in persistence before the workflow execution. Workflow state is synchronized during execution.</li><li>`REGION_DURABLE`: The request is replicated across regions before the workflow execution. This method provides the highest level of durability and fault tolerance but may introduce additional latency.</li></ul> Default is `DURABLE`. | string | Optional. | 
| returnStrategy | Determines what is returned in the response. Supported values:<ul><li>`TARGET_WORKFLOW`: Returns the state of the originally triggered workflow.</li><li>`BLOCKING_WORKFLOW`: Returns the state of the workflow that is currently blocking the execution, which may be a sub-workflow.</li><li>`BLOCKING_TASK`: Returns the execution status of the task that is currently blocking workflow execution.</li><li>`BLOCKING_TASK_INPUT`: Returns the input of the task that is currently blocking workflow execution. Useful for introspecting runtime behavior or debugging.</li></ul>Default is `TARGET_WORKFLOW`. | string | Optional. | 

## Request body

Format the request as an object containing the following parameters.

| Parameter | Description | Type | Required/ Optional |
| ----- | ----- | ----- | ----- |
| name | The name of the workflow to be tested. | string | Required. |
| version | The version of the workflow to be tested. If unspecified, the latest version will be used. | integer | Optional. |
| input | The workflow inputs for the test request. | object | Required if there are workflow inputs specified. |
| workflowDef | The workflow definition JSON of the workflow to be tested. Use this to test a local definition instead of the one stored on the server. | object | Required if you don’t want to use the JSON from the Conductor server. |
| taskRefToMockOutput |  Mock outputs for worker tasks, HTTP tasks, and Sub Workflow tasks. Each key is a task reference name, and each value is an array of mock outputs applied in order per execution attempt.<br/><br/>If no mock is provided:<ul><li>The HTTP task executes against the real endpoint.</li><li>Worker tasks will stall until `waitForSeconds` expires, since they are automatically routed to an isolated domain that no real workers poll.</li></ul>When targeting a Sub Workflow task reference, no child workflow is started; the task completes immediately with the provided output.<br/><br/>See [Configuring mock entries](#configuring-mock-entries) below. | object | Optional. |
| subWorkflowTestRequest | The sub-workflow test request for mocking outputs in the sub-workflow’s Worker tasks. Use this when the sub-workflow should actually run, but its own Worker tasks need mocking.<br/><br/>Each key is the sub-workflow task's reference name in the parent workflow; each value is a full `WorkflowTestRequest`. Unlike `taskRefToMockOutput`, the child workflow is actually started. | object | Optional. |
| maxLoops | Maximum number of simulation iterations before returning early. When this limit is exceeded, the API returns the workflow in its current state — the workflow is not terminated and continues running on the server. Default is 1000. | integer | Optional. | 
| mockTtlSeconds | The time-to-live in seconds for mock data stored. Mock entries are automatically removed after this period, even if the workflow does not complete cleanly. Default is 300. | integer | Optional. | 
| correlationId | A unique identifier used to correlate the current workflow execution with other executions of the same workflow. | string | Optional. |
| idempotencyKey | A unique, user-generated key to prevent duplicate workflow executions. Idempotency data is retained for the life of the workflow execution. | string | Optional. |
| idempotencyStrategy | The idempotency strategy for handling duplicate requests. Supported values:<ul><li>`RETURN_EXISTING`: Return the `workflowId` of the workflow instance with the same idempotency key.</li><li>`FAIL`: Start a new workflow instance only if there are no workflow executions with the same idempotency key.</li><li>`FAIL_ON_RUNNING`: Start a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Completed workflows can run again.</li></ul> | string | Required if `idempotencyKey` is used. |
| taskToDomain | A mapping of task reference names to domain-specific values to [route the task to defined workers](/content/developer-guides/task-to-domain). | object | Optional. |

### Configuring mock entries

Each entry in `taskRefToMockOutput` is a list of mock objects with the following fields:

| Field | Description | Type | Required/ Optional |
| ----- | ----- | ----- | ----- |
| status | The mocked task status. Defaults to `COMPLETED`. Supported values: `COMPLETED`, `FAILED`, `FAILED_WITH_TERMINAL_ERROR`, `CANCELED`, `COMPLETED_WITH_ERRORS`, `IN_PROGRESS`, `SCHEDULED`. |  string | Optional. | 
| output | The mocked output data for the task. Must be provided as an object — use `{}` for empty output. Omitting this field will cause an error. | object | Required. |
| executionTime | Simulated task execution duration in milliseconds. Used to backdate the task's `startTime`, enabling timeout condition testing. Defaults to `0`. | integer | Optional. | 
| queueWaitTime | Simulated queue wait time in milliseconds. Combined with `executionTime` to backdate the task's `scheduledTime`. Defaults to `0`. | integer | Optional. | 

**Example**

```json
"taskRefToMockOutput": {
  "myHttpTask_ref": [
    {
      "status": "COMPLETED",
      "output": { "response": { "statusCode": 200, "body": "ok" } },
      "executionTime": 0,
      "queueWaitTime": 0
    }
  ]
}
```

## Response

Returns a `SignalResponse` object. When `returnStrategy` is `TARGET_WORKFLOW` or `BLOCKING_WORKFLOW`, the body contains a workflow execution object. When `returnStrategy` is `BLOCKING_TASK` or `BLOCKING_TASK_INPUT`, the body contains a task execution object.

| Field | Description |
| ----- | ----- |
| responseType | The `returnStrategy` used (e.g., `TARGET_WORKFLOW`). | 
| targetWorkflowId | The ID of the originally triggered workflow. | 
| targetWorkflowStatus | The status of the originally triggered workflow. | 
| workflowId | The ID of the workflow whose data is in the response. | 
| signalTimeout | `true` if `waitForSeconds` expired before completion. The workflow is not terminated. | 

## Examples

<details>
<summary>Test workflow using remote workflow definition</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/test/sync?consistency=SYNCHRONOUS&returnStrategy=TARGET_WORKFLOW' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "http",
  "version": 1
}'
```

**Response**  

The workflow execution details are returned for the `http` workflow using the definition stored on the Conductor server.

``` json
{
  "responseType": "TARGET_WORKFLOW",
  "targetWorkflowId": "55d430cb-22a9-11f1-a31d-7a59f946460e",
  "targetWorkflowStatus": "COMPLETED",
  "workflowId": "55d430cb-22a9-11f1-a31d-7a59f946460e",
  "input": {},
  "output": {
    "response": {
      "headers": {
        "content-length": [
          "182"
        ],
        "content-type": [
          "application/json"
        ],
        "date": [
          "Wed, 18 Mar 2026 09:03:31 GMT"
        ],
        "strict-transport-security": [
          "max-age=15724800; includeSubDomains"
        ]
      },
      "reasonPhrase": "",
      "body": {
        "randomString": "iwodbexhwlgpyompxace",
        "randomInt": 9986,
        "hostName": "orkes-api-sampler-67dfc8cf58-6xqr4",
        "apiRandomDelay": "0 ms",
        "sleepFor": "0 ms",
        "statusCode": "200",
        "queryParams": {}
      },
      "statusCode": 200
    }
  },
  "signalTimeout": false,
  "priority": 0,
  "variables": {},
  "tasks": [
    {
      "taskType": "HTTP",
      "status": "COMPLETED",
      "inputData": {
        "encode": true,
        "method": "GET",
        "asyncComplete": false,
        "_createdBy": "john.doe@acme.com",
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "contentType": "application/json",
        "accept": "application/json"
      },
      "referenceTaskName": "http_ref",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "http",
      "scheduledTime": 1773824611179,
      "startTime": 1773824611191,
      "endTime": 1773824611433,
      "updateTime": 1773824611476,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "55d430cb-22a9-11f1-a31d-7a59f946460e",
      "workflowType": "http",
      "taskId": "55e48484-22a9-11f1-a31d-7a59f946460e",
      "callbackAfterSeconds": 0,
      "workerId": "orkes-conductor-deployment-69cc8c86fc-27d7x",
      "outputData": {
        "response": {
          "headers": {
            "content-length": [
              "182"
            ],
            "content-type": [
              "application/json"
            ],
            "date": [
              "Wed, 18 Mar 2026 09:03:31 GMT"
            ],
            "strict-transport-security": [
              "max-age=15724800; includeSubDomains"
            ]
          },
          "reasonPhrase": "",
          "body": {
            "randomString": "iwodbexhwlgpyompxace",
            "randomInt": 9986,
            "hostName": "orkes-api-sampler-67dfc8cf58-6xqr4",
            "apiRandomDelay": "0 ms",
            "sleepFor": "0 ms",
            "statusCode": "200",
            "queryParams": {}
          },
          "statusCode": 200
        }
      },
      "workflowTask": {
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
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "loopOverTask": false,
      "taskDefinition": null,
      "queueWaitTime": 12
    }
  ],
  "createdBy": "john.doe@acme.com",
  "createTime": 1773824611096,
  "status": "COMPLETED",
  "updateTime": 1773824611482
}
```

</details>

<details>
<summary>Test workflow using local workflow definition</summary>

**Request**

``` shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/test/sync?consistency=SYNCHRONOUS&returnStrategy=TARGET_WORKFLOW' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "myFirstWorkflow",
  "workflowDef": {
    "name": "myFirstWorkflow",
    "tasks": [
      {
        "name": "get-user_ref",
        "taskReferenceName": "get-user_ref",
        "inputParameters": {
          "http_request": {
            "uri": "https://randomuser.me/api/",
            "method": "GET"
          }
        },
        "type": "HTTP"
      }
    ],
    "inputParameters": [],
    "outputParameters": {},
    "schemaVersion": 2,
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 60,
    "enforceSchema": false
  }
}'
```

**Response**  

The workflow execution details are returned using the local workflow definition provided in the request body.

``` json
{
  "responseType": "TARGET_WORKFLOW",
  "targetWorkflowId": "52cc0e0e-22aa-11f1-bcc9-82b25f73e343",
  "targetWorkflowStatus": "COMPLETED",
  "workflowId": "52cc0e0e-22aa-11f1-bcc9-82b25f73e343",
  "input": {},
  "output": {
    "response": {
      "headers": {
        "alt-svc": [
          "h3=\":443\"; ma=86400"
        ],
        "cf-cache-status": [
          "DYNAMIC"
        ],
        "cf-ray": [
          "9de31ae88e81d680-IAD"
        ],
        "content-type": [
          "application/json"
        ],
        "date": [
          "Wed, 18 Mar 2026 09:10:35 GMT"
        ],
        "nel": [
          "{\"report_to\":\"cf-nel\",\"success_fraction\":0.0,\"max_age\":604800}"
        ],
        "report-to": [
          "{\"group\":\"cf-nel\",\"max_age\":604800,\"endpoints\":[{\"url\":\"https://a.nel.cloudflare.com/report/v4?s=wXRx%2B7e%2F7pnWzZWtf%2BKkmJ1pycZb9EmyP0YIaDEvp74FmbKZYVHPgWBfTvmqVXnwoPt4p1sZWgIlJ2h%2F2SdG691Gz4p1LIZw6dqF\"}]}"
        ],
        "server": [
          "cloudflare"
        ]
      },
      "reasonPhrase": "",
      "body": {
        "results": [],
        "info": {
          "seed": "d3adb33f",
          "results": 1,
          "page": 1,
          "version": "1.4"
        }
      },
      "statusCode": 200
    }
  },
  "signalTimeout": false,
  "priority": 0,
  "variables": {},
  "tasks": [
    {
      "taskType": "HTTP",
      "status": "COMPLETED",
      "inputData": {
        "asyncComplete": false,
        "http_request": {
          "method": "GET",
          "uri": "https://randomuser.me/api/"
        },
        "_createdBy": "john.doe@acme.com"
      },
      "referenceTaskName": "get-user_ref",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "get-user_ref",
      "scheduledTime": 1773825035421,
      "startTime": 1773825035421,
      "endTime": 1773825035616,
      "updateTime": 1773825035618,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "52cc0e0e-22aa-11f1-bcc9-82b25f73e343",
      "workflowType": "myFirstWorkflow",
      "taskId": "52cdbbc7-22aa-11f1-bcc9-82b25f73e343",
      "callbackAfterSeconds": 0,
      "workerId": "orkes-conductor-deployment-69cc8c86fc-s6bdf",
      "outputData": {
        "response": {
          "headers": {
            "alt-svc": [
              "h3=\":443\"; ma=86400"
            ],
            "cf-cache-status": [
              "DYNAMIC"
            ],
            "cf-ray": [
              "9de31ae88e81d680-IAD"
            ],
            "content-type": [
              "application/json"
            ],
            "date": [
              "Wed, 18 Mar 2026 09:10:35 GMT"
            ],
            "nel": [
              "{\"report_to\":\"cf-nel\",\"success_fraction\":0.0,\"max_age\":604800}"
            ],
            "report-to": [
              "{\"group\":\"cf-nel\",\"max_age\":604800,\"endpoints\":[{\"url\":\"https://a.nel.cloudflare.com/report/v4?s=wXRx%2B7e%2F7pnWzZWtf%2BKkmJ1pycZb9EmyP0YIaDEvp74FmbKZYVHPgWBfTvmqVXnwoPt4p1sZWgIlJ2h%2F2SdG691Gz4p1LIZw6dqF\"}]}"
            ],
            "server": [
              "cloudflare"
            ]
          },
          "reasonPhrase": "",
          "body": {
            "results": [],
            "info": {
              "seed": "d3adb33f",
              "results": 1,
              "page": 1,
              "version": "1.4"
            }
          },
          "statusCode": 200
        }
      },
      "workflowTask": {
        "name": "get-user_ref",
        "taskReferenceName": "get-user_ref",
        "inputParameters": {
          "http_request": {
            "uri": "https://randomuser.me/api/",
            "method": "GET"
          },
          "asyncComplete": false
        },
        "type": "HTTP",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "loopOverTask": false,
      "taskDefinition": null,
      "queueWaitTime": 0
    }
  ],
  "createdBy": "john.doe@acme.com",
  "createTime": 1773825035413,
  "status": "COMPLETED",
  "updateTime": 1773825035621
}
```
</details>

<details>
<summary>Test workflow with mock HTTP tasks</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/test/sync' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "http",
  "version": 1,
  "taskRefToMockOutput": {
    "http_ref": [
      {
        "status": "COMPLETED",
        "output": {
          "response": {
            "statusCode": 200,
            "body": "ok"
          }
        },
        "executionTime": 0,
        "queueWaitTime": 0
      }
    ]
  }
}'
```

**Response**

The workflow execution details are returned with the HTTP task (`http_ref`) showing the mocked output instead of executing against the real endpoint.

```json
{
  "responseType": "TARGET_WORKFLOW",
  "targetWorkflowId": "b5fb98e1-22aa-11f1-bcc9-82b25f73e343",
  "targetWorkflowStatus": "COMPLETED",
  "workflowId": "b5fb98e1-22aa-11f1-bcc9-82b25f73e343",
  "input": {},
  "output": {
    "response": {
      "statusCode": 200,
      "body": "ok"
    }
  },
  "signalTimeout": false,
  "priority": 0,
  "variables": {},
  "tasks": [
    {
      "taskType": "HTTP",
      "status": "COMPLETED",
      "inputData": {
        "encode": true,
        "method": "GET",
        "asyncComplete": false,
        "_createdBy": "john.doe@acme.com",
        "uri": "https://orkes-api-tester.orkesconductor.com/api",
        "contentType": "application/json",
        "accept": "application/json"
      },
      "referenceTaskName": "http_ref",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "http",
      "scheduledTime": 1773825201851,
      "startTime": 1773825201851,
      "endTime": 1773825201851,
      "updateTime": 1773825201856,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "b5fb98e1-22aa-11f1-bcc9-82b25f73e343",
      "workflowType": "http",
      "taskId": "b5ff697d-22aa-11f1-bcc9-82b25f73e343",
      "callbackAfterSeconds": 0,
      "outputData": {
        "response": {
          "statusCode": 200,
          "body": "ok"
        }
      },
      "workflowTask": {
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
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "loopOverTask": false,
      "taskDefinition": null,
      "queueWaitTime": 0
    }
  ],
  "createdBy": "john.doe@acme.com",
  "createTime": 1773825201814,
  "status": "COMPLETED",
  "updateTime": 1773825201862
}
```

</details>

<details>
<summary>Test workflow with mock Sub Workflow tasks</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/workflow/test/sync' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "mockSubWorkflow",
  "version": 1,
  "workflowDef": {
    "name": "mockSubWorkflow",
    "version": 1,
    "tasks": [
      {
        "name": "http",
        "taskReferenceName": "http",
        "type": "HTTP",
        "inputParameters": {
          "http_request": {
            "uri": "https://orkes-api-tester.orkesconductor.com/api",
            "method": "GET"
          }
        }
      },
      {
        "name": "subworkflow",
        "taskReferenceName": "subworkflow",
        "type": "SUB_WORKFLOW",
        "subWorkflowParam": {
          "name": "payment-workflow",
          "version": 1
        }
      }
    ],
    "schemaVersion": 2,
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0
  },
  "taskRefToMockOutput": {
    "http": [
      {
        "output": { "message": "MOCKED HTTP TASK" },
        "status": "COMPLETED"
      }
    ],
    "subworkflow": [
      {
        "output": { "message": "hello mocked subworkflow!" },
        "status": "COMPLETED"
      }
    ]
  }
}'
```

**Response**

The workflow execution details are returned with the Sub Workflow task (`mockSubWorkflow`) showing the mocked output. No `subWorkflowId` is present, confirming that no child workflow was started.

```json
{
  "responseType": "TARGET_WORKFLOW",
  "targetWorkflowId": "2fb86033-2dbc-11f1-bf9f-cea03a00d806",
  "targetWorkflowStatus": "COMPLETED",
  "workflowId": "2fb86033-2dbc-11f1-bf9f-cea03a00d806",
  "input": {},
  "output": {
    "message": "hello mocked subworkflow!"
  },
  "signalTimeout": false,
  "priority": 0,
  "variables": {},
  "tasks": [
    {
      "taskType": "HTTP",
      "status": "COMPLETED",
      "inputData": {
        "asyncComplete": false,
        "http_request": {
          "method": "GET",
          "uri": "https://orkes-api-tester.orkesconductor.com/api"
        },
        "_createdBy": "john.doe@acme.com"
      },
      "referenceTaskName": "http",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "http",
      "scheduledTime": 1775042170316,
      "startTime": 0,
      "endTime": 1775042170339,
      "updateTime": 1775042170379,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "2fb86033-2dbc-11f1-bf9f-cea03a00d806",
      "workflowType": "mockSubWorkflow",
      "taskId": "2fbc09b4-2dbc-11f1-bf9f-cea03a00d806",
      "callbackAfterSeconds": 0,
      "outputData": {
        "message": "MOCKED HTTP TASK"
      },
      "workflowTask": {
        "name": "http",
        "taskReferenceName": "http",
        "inputParameters": {
          "http_request": {
            "uri": "https://orkes-api-tester.orkesconductor.com/api",
            "method": "GET"
          },
          "asyncComplete": false
        },
        "type": "HTTP",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "queueWaitTime": 0,
      "taskDefinition": null,
      "loopOverTask": false
    },
    {
      "taskType": "SUB_WORKFLOW",
      "status": "COMPLETED",
      "inputData": {
        "subWorkflowDefinition": null,
        "workflowInput": {},
        "subWorkflowTaskToDomain": null,
        "subWorkflowName": "payment-workflow",
        "subWorkflowPriority": null,
        "_createdBy": "john.doe@acme.com",
        "subWorkflowVersion": 1
      },
      "referenceTaskName": "subworkflow",
      "retryCount": 0,
      "seq": 2,
      "pollCount": 0,
      "taskDefName": "subworkflow",
      "scheduledTime": 1775042170373,
      "startTime": 1775042170373,
      "endTime": 1775042170373,
      "updateTime": 1775042170384,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "2fb86033-2dbc-11f1-bf9f-cea03a00d806",
      "workflowType": "mockSubWorkflow",
      "taskId": "2fc30e95-2dbc-11f1-bf9f-cea03a00d806",
      "callbackAfterSeconds": 0,
      "outputData": {
        "message": "hello mocked subworkflow!"
      },
      "workflowTask": {
        "name": "subworkflow",
        "taskReferenceName": "subworkflow",
        "inputParameters": {},
        "type": "SUB_WORKFLOW",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "subWorkflowParam": {
          "name": "payment-workflow",
          "version": 1
        },
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "queueWaitTime": 0,
      "taskDefinition": null,
      "loopOverTask": false
    }
  ],
  "createdBy": "john.doe@acme.com",
  "createTime": 1775042170291,
  "status": "COMPLETED",
  "updateTime": 1775042170389
}
```

</details>

<details>
<summary>Test workflow with Sub Workflow that runs with mocked worker tasks</summary>

**Request**

```bash
curl -X POST 'https://<YOUR-SERVER-URL>/api/workflow/test/sync' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "parentWorkflow",
  "workflowDef": {
    "name": "parentWorkflow",
    "version": 1,
    "tasks": [
      {
        "name": "payment_subworkflow_ref",
        "taskReferenceName": "payment_subworkflow_ref",
        "type": "SUB_WORKFLOW",
        "subWorkflowParam": {
          "name": "payment-workflow",
          "version": 1,
          "workflowDefinition": {
            "name": "payment-workflow",
            "version": 1,
            "tasks": [
              {
                "name": "charge_task",
                "taskReferenceName": "charge_task_ref",
                "type": "SIMPLE",
                "inputParameters": {}
              }
            ],
            "schemaVersion": 2,
            "timeoutPolicy": "ALERT_ONLY",
            "timeoutSeconds": 0
          }
        }
      }
    ],
    "schemaVersion": 2,
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0
  },
  "subWorkflowTestRequest": {
    "payment_subworkflow_ref": {
      "name": "payment-workflow",
      "taskRefToMockOutput": {
        "charge_task_ref": [
          {
            "status": "COMPLETED",
            "output": { "chargeId": "ch_mock_123", "amount": 99.99 },
            "executionTime": 0,
            "queueWaitTime": 0
          }
        ]
      }
    }
  }
}'
```

**Response**

The child workflow (`payment-workflow`) was started and ran to completion with the mocked worker task output. The `subWorkflowId` field in the response confirms the child workflow was executed.

```json
{
  "responseType": "TARGET_WORKFLOW",
  "targetWorkflowId": "2b6a9778-2e60-11f1-bf9f-cea03a00d806",
  "targetWorkflowStatus": "COMPLETED",
  "workflowId": "2b6a9778-2e60-11f1-bf9f-cea03a00d806",
  "input": {},
  "output": {
    "subWorkflowId": "2b6d7daa-2e60-11f1-bf9f-cea03a00d806",
    "chargeId": "ch_mock_123",
    "amount": 99.99
  },
  "signalTimeout": false,
  "priority": 0,
  "variables": {},
  "tasks": [
    {
      "taskType": "SUB_WORKFLOW",
      "status": "COMPLETED",
      "inputData": {
        "_systemMetadata": {
          "dynamic": true
        },
        "subWorkflowDefinition": {
          "createTime": 0,
          "updateTime": 0,
          "name": "payment-workflow",
          "version": 1,
          "tasks": [
            {
              "name": "charge_task",
              "taskReferenceName": "charge_task_ref",
              "inputParameters": {},
              "type": "SIMPLE",
              "decisionCases": {},
              "defaultCase": [],
              "forkTasks": [],
              "startDelay": 0,
              "joinOn": [],
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
          "schemaVersion": 2,
          "restartable": true,
          "workflowStatusListenerEnabled": false,
          "timeoutPolicy": "ALERT_ONLY",
          "timeoutSeconds": 0,
          "variables": {},
          "inputTemplate": {},
          "enforceSchema": true,
          "metadata": {},
          "maskedFields": []
        },
        "workflowInput": {},
        "subWorkflowTaskToDomain": null,
        "subWorkflowName": "payment-workflow",
        "subWorkflowPriority": null,
        "_createdBy": "john.doe@acme.com",
        "subWorkflowVersion": null
      },
      "referenceTaskName": "payment_subworkflow_ref",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "payment_subworkflow_ref",
      "scheduledTime": 1775112600551,
      "startTime": 1775112600551,
      "endTime": 1775112600636,
      "updateTime": 1775112600646,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": true,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 0,
      "workflowInstanceId": "2b6a9778-2e60-11f1-bf9f-cea03a00d806",
      "workflowType": "parentWorkflow",
      "taskId": "2b6bf709-2e60-11f1-bf9f-cea03a00d806",
      "callbackAfterSeconds": 0,
      "outputData": {
        "subWorkflowId": "2b6d7daa-2e60-11f1-bf9f-cea03a00d806",
        "chargeId": "ch_mock_123",
        "amount": 99.99
      },
      "workflowTask": {
        "name": "payment_subworkflow_ref",
        "taskReferenceName": "payment_subworkflow_ref",
        "inputParameters": {},
        "type": "SUB_WORKFLOW",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "subWorkflowParam": {
          "name": "payment-workflow",
          "version": 1,
          "workflowDefinition": {
            "createTime": 0,
            "updateTime": 0,
            "name": "payment-workflow",
            "version": 1,
            "tasks": [
              {
                "name": "charge_task",
                "taskReferenceName": "charge_task_ref",
                "inputParameters": {},
                "type": "SIMPLE",
                "decisionCases": {},
                "defaultCase": [],
                "forkTasks": [],
                "startDelay": 0,
                "joinOn": [],
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
            "schemaVersion": 2,
            "restartable": true,
            "workflowStatusListenerEnabled": false,
            "timeoutPolicy": "ALERT_ONLY",
            "timeoutSeconds": 0,
            "variables": {},
            "inputTemplate": {},
            "enforceSchema": true,
            "metadata": {},
            "maskedFields": []
          }
        },
        "joinOn": [],
        "optional": false,
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 0,
      "workflowPriority": 0,
      "iteration": 0,
      "subWorkflowId": "2b6d7daa-2e60-11f1-bf9f-cea03a00d806",
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "queueWaitTime": 0,
      "taskDefinition": null,
      "loopOverTask": false
    }
  ],
  "createdBy": "john.doe@acme.com",
  "createTime": 1775112600534,
  "status": "COMPLETED",
  "updateTime": 1775112600650
}
```

</details>
