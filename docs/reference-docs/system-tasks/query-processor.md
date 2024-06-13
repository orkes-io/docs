---
sidebar_position: 13
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Query Processor

A system task designed to execute queries across various systems, primarily used for alert generation.

Conductor supports querying from the following sources:

-  Conductor Search API
    - This query type retrieves workflow-related data from the Conductor Search API using various parameters.
- Conductor Metrics (Prometheus)
    - This query type allows gathering and analyzing performance metrics and system statistics through Prometheus. 

## Definitions

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

## Input Parameters

| Attribute  | Description             |
|-------------|-------------------------|
| queryType | Select the query type. Supported values:<ul><li>CONDUCTOR_API</li><li>METRICS</li></ul> | 

If **_queryType_** is **_CONDUCTOR_API_**:

| Attribute  | Description             |
|-------------|-------------------------|
| workflowNames | Names of the workflows to query. Can be a string or array. | 
| correlationIds | Correlation IDs of the workflows to query. Can be a string or array. |
| statuses | Statuses of the workflows to query. Can be a string or array. |
| startTimeFrom | Defines the start of the time range for the query, in minutes from the current time. For example, setting this to 15 means the query will include data starting from 15 minutes ago. |
| startTimeTo | Defines the end of the time range for the query, in minutes from the current time. Setting this to 0 means the query will include data up to the current time. |
| endTimeFrom | Defines the start time of the time range for the query's execution end time, measured in minutes from the current time. |
| endTimeTo | Defines the end time of the time range for the query's execution end time, measured in minutes from the current time. | 
| freeText | Free text search parameter.. |

If **_queryType_** is **_METRICS_**:

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

| Attribute | Description             |
|-------------|-------------------------|
| metricsQuery | Indicates the Prometheus query. | 
| metricsStart | Start time for the metrics query. |
| metricsEnd | End time for the metrics query. |
| metricsStep | Defines a step or interval of the metrics query. | 

## Output Parameters

| Attribute  | Description             |
|-------------|-------------------------|
| workflowsUrl | URL linking to the queried workflow executions in the UI. |
| workflows | Returns the details of the queried workflow. | 

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Query Processor**.
2. Configure the query parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/query-processor-ui-method.png" alt="Adding Query Processor Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

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
</Tabs>

See the [workflow alerting example with Opsgenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert) for a detailed demonstration of leveraging this task.