---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Query Processor

A system task for executing queries across different systems, tailored for purposes like alert generation.

Conductor supports the ability to query the following sources:

-  Conductor Search API
    - This query type can be used for querying information from the Conductor Search API. It allows users to retrieve workflow-related data based on various parameters.
- Conductor Metrics (Prometheus)
    - This query type facilitates querying Conductor Metrics using Prometheus. It enables users to gather and analyze performance metrics and system statistics. 

## Definitions

```json
{
     "name": "query_processor",
     "taskReferenceName": "query_processor_ref",
     "inputParameters": {
       "queryType": "CONDUCTOR_API",
       "statuses": "${workflow.input.statuses}",
       "workflowNames": "${workflow.input.workflows}",
       "startTimeFrom": "${workflow.input.fromStartedMinsFromNow}",
       "startTimeTo": "${workflow.input.toStartedMinsFromNow}",
       "correlationIds": "${workflow.input.correlationIds}",
       "freeText": "${workflow.input.freeText}"
     },
     "type": "QUERY_PROCESSOR",
}
```

## Input Parameters

| Attributes  | Description             |
|-------------|-------------------------|
| queryType | Choose the query type. It can take the following values:<ul><li>CONDUCTOR_API</li><li>METRICS</li></ul> | 

Depending on the chosen query method, the configuration parameters vary. If CONDUCTOR_API is chosen, then provide the following parameters:

| Attributes  | Description             |
|-------------|-------------------------|
| workflowNames | Provide the workflow names for the query. | 
| correlationIds | Provide the correlation ID of the workflows to be queried. |
| statuses | Provide the statuses of the workflows to be queried. |
| startTimeFrom | Specify the time range for the query to be performed. |
| startTimeTo | Specify the time range for the query to be performed. |
| freeText | Specify the free text search parameter. |

If the query type is chosen as METRICS, then the task definition is as follows:

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

| Attributes  | Description             |
|-------------|-------------------------|
| metricsQuery | Indicates the Prometheus query. | 
| metricsStart | Specifies the start time for the metrics query. |
| metricsEnd | Specifies the end time for the metrics query. |
| metricsStep | Defines a step or interval of the metrics query. | 

## Output Parameters

| Attributes  | Description             |
|-------------|-------------------------|
| workflowsUrl | A link to the queried workflow executions in Conductor UI. |

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
 <TabItem value="JSON" label="JSON Example">

```json
    {
     "name": "query_processor",
     "taskReferenceName": "query_processor_ref",
     "inputParameters": {
       "queryType": "CONDUCTOR_API",
       "statuses": "${workflow.input.statuses}",
       "workflowNames": "${workflow.input.workflows}",
       "startTimeFrom": "${workflow.input.fromStartedMinsFromNow}",
       "startTimeTo": "${workflow.input.toStartedMinsFromNow}",
       "correlationIds": "${workflow.input.correlationIds}",
       "freeText": "${workflow.input.freeText}"
     },
     "type": "QUERY_PROCESSOR",
    }
```

</TabItem>
</Tabs>

Have a look at the [workflow alerting example with OpsGenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert) for a detailed example of leveraging this task.