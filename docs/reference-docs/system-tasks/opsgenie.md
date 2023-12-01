---
sidebar_position: 9
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Opsgenie 

A system task to send alerts to Opsgenie in the event of workflow failures. This task can be used in conjunction with the [Query Processor](/content/reference-docs/system-tasks/query-processor) task, which fetches metadata details to trigger alerts to Opsgenie as required.

## Definitions

```json
{
           "name": "ops_genie_task",
           "taskReferenceName": "ops_genie_task_ref",
           "inputParameters": {
             "alias": "${workflow.input.opsGenieAlias}",
             "description": "${query_processor_ref.output.result.workflowsUrl}",
             "visibleTo": "${workflow.input.opsGenieVisibleTo}",
             "message": "Failed Worklows detected",
             "responders": "${workflow.input.opsGenieResponders}",
             "details": {},
             "priority": "${workflow.input.opsGeniePriority}",
             "entity": "${workflow.input.opsGenieEntity}",
             "tags": "${workflow.input.opsGenieTags}",
             "actions": "${workflow.input.opsGenieActions}",
             "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
           },
           "type": "OPS_GENIE",
}
```

## Input Parameters

| Attributes  | Description             |
|-------------|-------------------------|
| alias | Specify the user-defined alias that will be created in Opsgenie when alerts are triggered. Alias are user-defined identifiers for alerts, limited to a maximum of 512 characters in Opsgenie. |
| description | Specify the description related to the alert. The description is limited to 15,000 characters in Opsgenie. |
| visibleTo | Specify the users in Opsgenie who can view the alerts. | 
| responders | Specify the names of the responders to be notified on creating this alert. |
| message | Specify the message to be displayed in the Opsgenie. This field can be leveraged to quickly give an overview of the alert. |
| priority | Set the priority of the alert. | 
| entity | Specify the domain the alert is related to, such as the server's name or application. |
| tags | Specify the tags to be added for the alerts in Opsgenie. |
| actions | Specify the Opsgenie actions to be executed on the alert. |
| token | Specify the API token to integrate with your Opsgenie account. Refer to the official [Opsgenie documentation to get the API keys](https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration/). |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling you can provide the following parameters:<ul><li>**TTL (in seconds)** - Provide the time to live in seconds.You can also pass this parameter as variables.</li><li>**Cache Key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also pass this parameter as variables.</li></ul>|

:::info
Refer to the official [Opsgenie documentation for more information on the alert fields](https://support.atlassian.com/opsgenie/docs/alert-fields/). 
:::

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Opsgenie**.
2. Configure the query parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/opsgenie-ui-guide.png" alt="Adding OpsGenie Task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
 {
           "name": "ops_genie_task",
           "taskReferenceName": "ops_genie_task_ref",
           "inputParameters": {
             "alias": "DemoAlias",
             "description": "Alert on failed workflows",
             "visibleTo": "${workflow.input.visibleUsers}",
             "message": "Failed Worklows detected",
             "responders": "${workflow.input.responders}",
             "details": {},
             "priority": "${workflow.input.opsGeniePriority}",
             "entity": "${workflow.input.opsGenieEntity}",
             "tags": "${workflow.input.opsGenieTags}",
             "actions": "${workflow.input.opsGenieActions}",
             "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
           },
           "type": "OPS_GENIE",
}
```

</TabItem>
</Tabs>

Have a look at the [workflow alerting example with Opsgenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert) for a detailed example of leveraging this task.