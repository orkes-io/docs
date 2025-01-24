---
sidebar_position: 14
slug: "/reference-docs/api/workflow/search-workflow-executions"
description: "This API is used to search for workflow executions."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Search Workflow Executions

**Endpoint:** `GET /api/workflow/search`

Retrieves a list of workflow executions based on the provided search criteria.

:::tip
You can construct your search query in the Conductor UI (**Executions** > **Workflow**) and select the **⏷** (down arrow) icon beside Search > **Show as Code** to access the same search request in an API call.
:::


## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| start | The start of the search results list, which is used for pagination. Default is 0. | integer | Optional. |
| size | The number of search results that should be returned from the specified start. Default is 100. | integer | Optional. |
| sort | The manner in which the list will be sorted, in the format "FIELD:ASC\|DESC". For example, "workflowId:DESC". | string | Optional. |
| freeText | All full-text indexed data associated with the workflow execution (workflow input values, workflow output values, workflow variable values, task output values, correlation ID, and reason for incompletion). Default is *. <br/><br/> **Note:** This query only searches for exact matches. | string | Optional. |
| query | The query expression in the format `FIELD = VALUE` or `FIELD IN (value1, value2)`. Supported fields for querying: <ul><li>workflowId</li> <li>correlationId</li> <li>workflowType</li> <li>status</li> <li>startTime</li> <li>modifiedTime</li></ul> <br/> Only AND operations are supported. <br/><br/> **Example queries:**<ul><li>workflowType = your_workflow_name</li> <li>status IN (PAUSED, RUNNING)</li> <li>startTime >1726655978410</li> <li>startTime < 1696143600000</li> <li>workflowType = your_workflow_name AND status = PAUSED</li> <li>workflowId IN (3434546, 45365767, 20984885) AND workflowType = test_workflow</li></ul> | string | Optional. |
| skipCache | **Note:** This parameter is deprecated. There is no effect when configured. <br/><br/> Whether to skip caching of the search results. Default is false. | boolean | Optional. |

## Response

Returns the total number of results in *totalHits* and a list of workflow executions in a *results* array.

## Examples

<details><summary>Search based on workflow name</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/workflow/search?start=0&size=100&freeText=%2A&query=workflowType%3DsomeWorkflow' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "totalHits": 1,
  "results": [
    {
      "workflowType": "someWorkflow",
      "version": 1,
      "workflowId": "ba2aeb84-d4c7-11ef-87b1-b2b27c52ebde",
      "startTime": "2025-01-17T11:39:35.873Z",
      "updateTime": "2025-01-17T11:39:35.873Z",
      "status": "RUNNING",
      "input": "{name=John}",
      "output": "{}",
      "executionTime": 0,
      "failedReferenceTaskNames": "",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 11,
      "outputSize": 2
    }
  ]
}
```

</details>


<details><summary>Search for workflows based on workflow name and status</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/workflow/search?start=0&size=100&freeText=%2A&query=status%20IN%20%28RUNNING%29%20AND%20workflowType%3DcompensationWorkflow' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "totalHits": 5,
  "results": [
    {
      "workflowType": "compensationWorkflow",
      "version": 3,
      "workflowId": "ddf03cfd-d4b6-11ef-a114-0af1b159704e",
      "correlationId": "string",
      "startTime": "2025-01-17T09:38:54.442Z",
      "updateTime": "2025-01-17T09:44:46.666Z",
      "status": "RUNNING",
      "input": "{additionalProp1={}, additionalProp2={}, additionalProp3={}}",
      "output": "{}",
      "executionTime": 0,
      "failedReferenceTaskNames": "",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 60,
      "outputSize": 2
    },
    {
      "workflowType": "compensationWorkflow",
      "version": 3,
      "workflowId": "3163f2e3-d4a9-11ef-a114-0af1b159704e",
      "correlationId": "string",
      "startTime": "2025-01-17T08:01:01.497Z",
      "updateTime": "2025-01-17T09:57:09.427Z",
      "status": "RUNNING",
      "input": "{additionalProp1={}, additionalProp2={}, additionalProp3={}}",
      "output": "{}",
      "executionTime": 0,
      "failedReferenceTaskNames": "",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 60,
      "outputSize": 2
    },
    {
      "workflowType": "compensationWorkflow",
      "version": 2,
      "workflowId": "2ce9207f-d4a6-11ef-87b1-b2b27c52ebde",
      "correlationId": "",
      "startTime": "2025-01-17T07:39:25.491Z",
      "updateTime": "2025-01-17T10:15:50.803Z",
      "endTime": "2025-01-17T10:15:31.060Z",
      "status": "RUNNING",
      "input": "{name=}",
      "output": "{output={response={headers={Date=[Fri, 17 Jan 2025 07:39:25 GMT], Content-Type=[application/json], Content-Length=[182], Connection=[keep-alive], Strict-Transport-Security=[max-age=15724800; includeSubDomains]}, reasonPhrase=200 OK, body={randomString=rxseamdaoaasmjoofuju, randomInt=1836, hostName=orkes-api-sampler-67dfc8cf58-lp2np, apiRandomDelay=0 ms, sleepFor=0 ms, statusCode=200, queryParams={}}, statusCode=200}}}",
      "executionTime": 9365569,
      "failedReferenceTaskNames": "simple_ref",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 7,
      "outputSize": 421
    },
    {
      "workflowType": "compensationWorkflow",
      "version": 3,
      "workflowId": "bf6ac066-d493-11ef-87b1-b2b27c52ebde",
      "correlationId": "1",
      "startTime": "2025-01-17T05:27:30.850Z",
      "updateTime": "2025-01-17T10:05:13.093Z",
      "status": "RUNNING",
      "input": "{}",
      "output": "{}",
      "executionTime": 0,
      "failedReferenceTaskNames": "",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 2,
      "outputSize": 2
    },
    {
      "workflowType": "compensationWorkflow",
      "version": 2,
      "workflowId": "dd76a747-d48e-11ef-a114-0af1b159704e",
      "startTime": "2025-01-17T04:52:33.776Z",
      "updateTime": "2025-01-17T04:52:33.777Z",
      "status": "RUNNING",
      "input": "{_headers={content-length=77, referer=https://lw.orkesconductor.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config, sec-fetch-site=same-origin, origin=https://lw.orkesconductor.io, x-forwarded-port=443, sec-gpc=1, sec-ch-ua-mobile=?0, x-forwarded-host=lw.orkesconductor.io, waitforseconds=60, host=lw.orkesconductor.io, connection=close, content-type=application/json, x-request-id=60ebfa7b5a5571dc0acfa764caffe130, sec-fetch-mode=cors, x-forwarded-proto=https, accept-language=en-GB,en;q=0.7, cookie=_legacy_auth0.0tZM6YcMFKfFSOMW9RHx2imCs0YgroQl.is.authenticated=true; auth0.0tZM6YcMFKfFSOMW9RHx2imCs0YgroQl.is.authenticated=true, priority=u=1, i, accept=application/json, x-real-ip=10.150.19.251, x-forwarded-scheme=https, sec-ch-ua=\"Brave\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\", requestid=teststring, sec-ch-ua-platform=\"macOS\", x-nginx-proxy=true, x-scheme=https, accept-encoding=gzip, deflate, br, zstd, user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36, sec-fetch-dest=empty}, additionalProp1={}, _X-Request-Id=teststring, additionalProp3={}, additionalProp2={}, _X-Wait-Until=null, _X-Host-Id=10.150.22.99}",
      "output": "{}",
      "executionTime": 0,
      "failedReferenceTaskNames": "",
      "priority": 0,
      "failedTaskNames": [],
      "inputSize": 1213,
      "outputSize": 2
    }
  ]
}
```

</details>