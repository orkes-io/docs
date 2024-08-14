---
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Query Processor

The Query Processor task is used to execute queries across different data sources. 

Conductor supports querying from two primary sources: 
  - **Conductor Search API**—This query type retrieves workflow execution data from the Conductor Search API using various parameters.
  - **Conductor Metrics (Prometheus)**—This query type retrieves [workflow and task performance metrics](docs/developer-guides/metrics-and-observability.md) as well as system statistics through Prometheus.

## Task configuration

Configure these parameters for the Query Processor task.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputParameters. **queryType** | The type of query. Supported types:<ul><li>`CONDUCTOR_API`—For querying using Conductor Search API.</li><li>`metrics`—For querying using Prometheus metrics.</li></ul> | Required | 

<Tabs>
<TabItem value="CONDUCTOR_API_config" label="CONDUCTOR_API">

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputParameters. **workflowNames** | The names of the workflows to query. Can be a string or an array. | Optional. | 
| inputParameters. **correlationIds** | The correlation IDs of the workflows to query. Can be a string or array. | Optional. |
| inputParameters. **statuses** | The statuses of the workflows to query. Can be a string or array. | Optional. | 
| inputParameters. **startTimeFrom** | The beginning of the start time range for the query, in minutes from the current time. For example, setting this to 15 means the query will include data starting from 15 minutes ago. | Optional. | 
| inputParameters. **startTimeTo** | The end of the start time range for the query in minutes from the current time. Setting this to 0 means the query will include data up to the current time. | Optional. | 
| inputParameters. **endTimeFrom** | The beginning of the end time range for the query, measured in minutes from the current time. | Optional. |
| inputParameters. **endTimeTo** | The end of the end time range for the query, measured in minutes from the current time. | Optional. | 
| inputParameters. **freeText** | Free text search parameter. | Optional. | 

</TabItem>
<TabItem value="METRICS_config" label="METRICS">

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| inputParameters. **metricsQuery** | The Prometheus query to execute. Refer to [the list of metrics published to the Conductor server](docs/developer-guides/metrics-and-observability.md#conductor-metrics) to formulate your query. | Required. | 
| inputParameters. **metricsStart** | The beginning of the time range for the query, in minutes from the current time. For example, setting this to 15 means the query will include data starting from 15 minutes ago. | Required. | 
| inputParameters. **metricsEnd** | The end of the time range for the query, in minutes from the current time. Setting this to 0 means the query will include data up to the current time. | Required. | 
| inputParameters. **metrics** | The time duration, in seconds, between data points in the query result (also known as the step or interval of the metrics query). For example, setting this to 1 means the query will include a data point for every 1 second. | Required. | 

</TabItem>
</Tabs>

## Task definition

This is the JSON schema for a Query Processor task definition.

<Tabs>
<TabItem value="CONDUCTOR_API" label="CONDUCTOR_API">

```json
 {
     "name": "query_processor",
     "taskReferenceName": "query_processor_ref",
     "inputParameters": {
       "workflowNames": [
         "workflow-1"
       ],
       "statuses": [
         "FAILED"
       ],
       "correlationIds": [],
       "queryType": "CONDUCTOR_API",
       "startTimeFrom": 15,
       "endTimeFrom": 15,
       "startTimeTo": 0,
       "endTimeTo": 0,
       "freeText": "your_input_here"
     },
     "type": "QUERY_PROCESSOR",
}
```

</TabItem>
<TabItem value="METRICS" label="METRICS">

```json
{
    "name": "query_processor",
    "taskReferenceName": "query_processor_ref",
    "inputParameters": {
        "metricsQuery": "avg_over_time(cpu_usage{instance=\"your_instance\"}[1h])",
        "metricsStart": "2024-01-01T00:00:00Z",
        "metricsEnd": "2024-01-30T23:59:59Z",
        "metricsStep": "5m",
        "queryType": "METRICS"
    },
    "type": "QUERY_PROCESSOR"
}
```

</TabItem>
</Tabs>

## Task output

The Query Processor task will return the following parameters.

<Tabs>
<TabItem value="CONDUCTOR_API_ouput" label="CONDUCTOR_API">

| Parameter  | Description |
|------------|------------ |
|result | A key value map containing the workflow query details. | 
| totalHits | Total number of hits or results matching the query criteria. | 
| count | The number of workflows returned in the current response. |
| workflowsUrl | URL linking to the queried workflow executions in the Conductor UI, with specific query parameters. | 
| workflows | An array containing detailed information about each workflow returned by the query. | 

</TabItem>

<TabItem value="METRICS_output" label="METRICS">

| Parameter  | Description |
|------------|------------ |
|result | A key-value map containing the Prometheus query details. | 
| metric | A key-value map containing the details of the Conductor cluster that was queried, such as the cluster name, pod, and workflow name. | 
| values | An array containing the queried metric at each timestamp interval. |

</TabItem>
</Tabs>

## Adding a Query Processor task in UI

**To add a Query Processor task:**

1. In your workflow, select the **(+)** icon and add a **Query Processor** task.
2. Select the Query type as **Conductor Search API** or **Conductor Metrics (Prometheus)**.
3. For **Conductor Search API**, set the following parameters:
    - Workflow name
    - Correlation ids
    - Statuses
    - Start time from - to (in mins)
    - End time from - to (in mins)
    - Free text search
4. For **Conductor Metrics (Prometheus)**, set the following parameters:
    - PromQL code
    - Start time from - to (in mins)
    - Step

<center><p><img src="/content/img/query-processor-ui-method.png " alt="Adding Query Processor task" width="100%" height="auto"/></p></center>

## Examples

Here are some examples for using the Query Processor task.

<details><summary>CONDUCTOR_API</summary>
<p>

In this example, the Query Processor task searches the Conductor Search API for completed `http_workflow` workflows.

``` json
{
  "name": "search_query_task",
  "taskReferenceName": "search_query_task_ref",
  "inputParameters": {
    "workflowNames": [
      "http_workflow"
    ],
    "statuses": [
      "COMPLETED"
    ],
    "correlationIds": [],
    "queryType": "CONDUCTOR_API"
  },
  "type": "QUERY_PROCESSOR"
}
```

The query will return the details of the workflow executions, such as the execution time, inputs and outputs, workflow ID, status, and so on.

``` json
{
  "result": {
    "totalHits": 1,
    "count": 1,
    "workflowsUrl": "https://cluster-name.orkesconductor.com?rowsPerPage=200&workflowType=http_workflow&start=0",
    "workflows": [
      {
        "updateTime": "2024-08-08T09:01:52.967Z",
        "priority": 0,
        "version": 1,
        "failedReferenceTaskNames": "",
        "output": "{http_11={response={headers={Strict-Transport-Security=[max-age=15724800; includeSubDomains], Connection=[keep-alive], Content-Length=[182], Date=[Thu, 08 Aug 2024 09:01:52 GMT], Content-Type=[application/json]}, reasonPhrase=200 OK, body={randomInt=1507, hostName=orkes-api-sampler-67dfc8cf58-chmzf, randomString=uxhurkppwwkxzyjstuko, queryParams={}, sleepFor=0 ms, apiRandomDelay=0 ms, statusCode=200}, statusCode=200}}, http_22={response={headers={Strict-Transport-Security=[max-age=15724800; includeSubDomains], Connection=[keep-alive], Content-Length=[181], Date=[Thu, 08 Aug 2024 09:01:52 GMT], Content-Type=[application/json]}, reasonPhrase=200 OK, body={randomInt=338, hostName=orkes-api-sampler-67dfc8cf58-chmzf, randomString=jpoggtvjpgxieqtobrqp, queryParams={}, sleepFor=0 ms, apiRandomDelay=0 ms, statusCode=200}, statusCode=200}}",
        "executionTime": 664,
        "outputSize": 2531,
        "input": "{}",
        "failedTaskNames": [],
        "inputSize": 2,
        "workflowType": "http_workflow",
        "startTime": "2024-08-08T09:01:52.302Z",
        "endTime": "2024-08-08T09:01:52.966Z",
        "workflowId": "da852039-5564-11ef-963f-56aaccfcba93",
        "status": "COMPLETED"
      }
    ]
  }
}
```

</p>
</details>

<details><summary>METRICS</summary>
<p>
In this example, the Query Processor task searches the Prometheus for the number of workflows started within the past minute. The query resolution is set at an interval of 10 seconds.

``` json
{
  "name": "query_processor",
  "taskReferenceName": "query_processor_ref",
  "inputParameters": {
    "metricsQuery": "workflow_start_request_seconds_count{workflowName=\"indexed_qna_slack\"}",
    "metricsStart": "1",
    "metricsEnd": "0",
    "metricsStep": "10",
    "queryType": "METRICS"
    },
  "type": "QUERY_PROCESSOR"
}
```

The query will return the following results. The `values` array contains the queried metrics at each given timestamp.

``` json
{
  "result": {
    "data": {
      "result": [
        {
          "metric": {
            "container": "conductor",
            "cluster_name": "someCluster",
            "endpoint": "default-app-port",
            "instance": "00.00.0.000:0000",
            "pod": "somePod",
            "__name__": "workflow_start_request_seconds_count",
            "service": "conductor-app",
            "namespace": "someNameSpace",
            "workflowName": "indexed_qna_slack",
            "job": "conductor-app"
          },
          "values": [
            [
              1723110950,
              "1390"
            ],
            [
              1723110960,
              "1390"
            ],
            [
              1723110970,
              "1390"
            ],
            [
              1723110980,
              "1390"
            ],
            [
              1723110990,
              "1390"
            ],
            [
              1723111000,
              "1390"
            ],
            [
              1723111010,
              "1390"
            ]
          ]
        }
      ],
      "resultType": "matrix"
    },
    "status": "success"
  }
}
```

</p>
</details>

<details><summary>Using Query Processor task to monitor failure workflows</summary>
<p>

Get the full example for [using the Query Processor task to monitor failure workflows and send alerts to Opsgenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert).

</p>
</details>