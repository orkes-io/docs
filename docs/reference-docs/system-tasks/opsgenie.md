---
sidebar_position: 12
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Opsgenie 

A system task to send alerts to Opsgenie in the event of workflow failures. This task can be used with the [Query Processor](/content/reference-docs/system-tasks/query-processor) task, which fetches metadata details to trigger alerts to Opsgenie as required.

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
       "details": {
         "key": "value"
       },
       "priority": "${workflow.input.opsGeniePriority}",
       "entity": "${workflow.input.opsGenieEntity}",
       "tags": "${workflow.input.opsGenieTags}",
       "actions": "${workflow.input.opsGenieActions}",
       "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
     },
     "type": "OPS_GENIE"
   }
```

## Input Parameters

| Attribute  | Description             |
|-------------|-------------------------|
| alias | A custom identifier that will be generated in Opsgenie when alerts are triggered from Conductor. These aliases are user-defined and can be up to 512 characters long.|
| description | Description of the alert, limited to 15,000 characters in Opsgenie. |
| visibleTo | Users in Opsgenie who can view the alerts. Can be a string, number, boolean, object/array, or null. | 
| responders | Names of the responders to be notified. Can be a string, number, boolean, object/array, or null.|
| details | Additional details for the alert. Can be a string, number, boolean, object/array, or null. | 
| message | Message to be displayed in Opsgenie, providing a quick overview of the alert.  |
| actions | Opsgenie actions to be executed on the alert. Can be a string or object/array. |
| priority | Priority of the alert. | 
| entity | Domain the alert is related to, such as the server's name or application. |
| token | API token for integrating with Opsgenie. Refer to the official [Opsgenie documentation](https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration/) to get the API keys.<br/><br/>**Note:**Save the token as a [secret](https://orkes.io/content/developer-guides/secrets-in-conductor) in the Conductor for enhanced security. |
| tags | Tags to be added to the alert in Opsgenie. Can be a string or object/array. |
| cacheConfig | Enabling this option allows saving the cache output of the task. On enabling, you can provide the following parameters:<ul><li>**ttlInSecond** - Provide the time to live in seconds. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li><li>**key** - Provide the cache key, which is a string with parameter substitution based on the task input. You can also [pass this parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul>|

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
 <TabItem value="JSON" label="JSON">

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
       "details": {
         "key": "value"
       },
       "priority": "${workflow.input.opsGeniePriority}",
       "entity": "${workflow.input.opsGenieEntity}",
       "tags": "${workflow.input.opsGenieTags}",
       "actions": "${workflow.input.opsGenieActions}",
       "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
     },
     "type": "OPS_GENIE"
   }
```

</TabItem>
</Tabs>

See the [workflow alerting example with Opsgenie](https://orkes.io/content/templates/alerting/querying-orkes-data-and-triggering-opsgenie-alert) for a detailed demonstration of leveraging this task.
