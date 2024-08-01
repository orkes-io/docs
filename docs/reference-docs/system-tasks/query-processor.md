---
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Query Processor

The Query Processor task is used to execute queries across different data sources. 

Conductor supports querying from two primary sources: 
  - **Conductor Search API**—This query type retrieves workflow-related data from the Conductor Search API using various parameters.
  - **Conductor Metrics (Prometheus)**—This query type allows gathering and analyzing performance metrics and system statistics through Prometheus.

## Task configuration

Configure these parameters for the Query Processor task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**queryType** | The type of query. Supported types:<ul><li>`CONDUCTOR_API`—For querying using Conductor Search API.</li><li>`metrics`—For querying using Prometheus metrics.</li></ul> | Required | 

### Configuration for CONDUCTOR_API

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**workflowNames** | The names of the workflows to query. Can be a string or an array. | Optional. | 
| inputParameters.**correlationIds** | The correlation IDs of the workflows to query. Can be a string or array. | Optional. |
| inputParameters.**statuses** | The statuses of the workflows to query. Can be a string or array. | Optional. | 
| inputParameters.**startTimeFrom** | Set the beginning of the start time range for the query, in minutes from the current time. For example, setting this to 15 means the query will include data starting from 15 minutes ago. | Optional. | 
| inputParameters.**startTimeTo** | Set the end of the start time range for the query in minutes from the current time. Setting this to 0 means the query will include data up to the current time. | Optional. | 
| inputParameters.**endTimeFrom** | Set the beginning of the end time range for the query, measured in minutes from the current time. | Optional. |
| inputParameters.**endTimeTo** | Set the end of the end time range for the query, measured in minutes from the current time. | Optional. | 
| inputParameters.**freeText** | Free text search parameter. | Optional. | 

### Configuration for METRICS

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**metricsQuery** | Prometheus query to execute. | Required. | 
| inputParameters.**metricsStart** | Start time for the metrics query in ISO format. | Required. | 
| inputParameters.**metricsEnd** | End time for the metrics query in ISO format. | Required. | 
| inputParameters.**metrics** | Defines a step or interval of the metrics query. | Required. | 

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

The Query Processor task will return the following parameters for CONDUCTOR_API query.

| Parameter  | Description |
|------------|------------ |
|result | A key value map containing the workflow query details. | 
| totalHits| Total number of hits or results matching the query criteria. | 
| count| The number of workflows returned in the current response. |
| workflowsUrl | URL linking to the queried workflow executions in the Conductor UI, with specific query parameters. | 
| workflows | An array containing detailed information about each workflow returned by the query. | 

## Adding a Query Processor task in UI

**To add a Query Processor task:**

1. In your workflow, select the (**+**) icon and add a **Query Processor** task.
2. Choose the **Query type**: **Conductor Search API** or **Conductor Metrics (Prometheus)**.
3. For **Conductor Search API**, set the following parameters:
  - Workflow name
  - Correlation ids
  - Statuses
  - Start time from - to (in mins)
  - End time from - to (in mins)
  - Free text search
4. For **Conductor Metrics (Prometheus)**, set the following parameters:
  - PROMQL code
  - Start time from - to (in mins)
  - End time from - to (in mins)
  - Step

<center><p><img src="/content/img/query-processor-ui-method.png " alt="Adding Query Processor task" width="100%" height="auto"/></p></center>

## Examples

Here are some examples for using the Query Processor task.

<details><summary>Using Query Processor task to monitor failure workflows</summary>
<p>

Get the full example for [using the Query Processor task to monitor failure workflows and send alerts to Opsgenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert).

</p>
</details>