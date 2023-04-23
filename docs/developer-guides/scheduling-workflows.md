import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Scheduling Workflows

Often times we want to trigger a workflow at a specific schedule. Orkes Conductor platform supports this natively. The workflows can be configured to be triggered at any cadence as required using the crontab expression.

Scheduler can be used for use cases such as:

* Running a workflow in a fixed cadence, such as every hour
* Running the same workflow at different cadences using different fixed inputs
* Running a workflow at a cadence between a set start date and an end date
* Running the workflow once at a future date

Examples could be:

* Renewing a TLS certificate for an infrastructure component
* Sending notifications ahead of account renewal times
* Daily scanning of the S3 or Blob storage to verify policies are not breached
* Check the health of a server URL every 30 seconds

## Creating Schedule

For creating a schedule,

1. From your Conductor server, navigate to **SCHEDULER** > **Definitions**. This page displays a list of all the defined schedules.
2. Click the **Define Schedule** button in the top right corner.

The following parameters can be used to configure the schedule:

| Attribute | Description |
| -- | -- | 
| Schedule Name | Unique name for the schedule. Ensure that the schedule name contains no spaces or special characters. |
| Cron Expression | The cron expression is the schedule that the workflow will run on. You can either input the cron expression or choose from the available templates. See the section [Cron Expression](/content/developer-guides/scheduling-workflows#cron-expression) below for detailed information regarding this. |
| Workflow Name | Name of the workflow to be run. The author of the scheduler should have execution permission for the workflow.|
| Workflow Version | Selected Workflow may have different versions. Choose the version to be used in this schedule. If left blank, it will run the latest version. |    
| Input Parameters | Provide fixed input values for the workflow as a JSON object. This field is optional. |
| Correlation Id | User-supplied ID to correlate or search the scheduled workflows. |
| Schedule Start | Choose the date & time for the scheduler to start running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional. |
| Schedule End | Choose the date & time for the scheduler to stop running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional. |
| Task to Domain Mapping | You can use the task to domain mapping to limit the workflow execution to specific domains. This field is optional. |
| Start Schedule Paused? | If selected, the schedule will be paused (so it will not run) upon creation. It is helpful when you don’t want to run the workflow scheduler, such as during maintenance. To resume the scheduled executions, this needs to be un-paused. |

3. Click **Save Schedule**.

## Cron Expression

:::tip
The standard cron expression can be used for scheduling the workflows.
:::

<details><summary>Cron Expression</summary>

The UI has a *Cron Expression Helper* to describe the options of the Cron expression. You can also test the expression after entering it, and the UI will automatically calculate the next few runs of the schedule.

The CRON expression has six terms; you can denote a blank entry with an asterisk.

```
* * * * * *
```

The terms, in the order from left to right, define the timings:

* **Second**: Allowed values: 0-59
* **Minute**: Allowed values: 0-59
* **Hour**: Allowed values: 0-23
* **Day of Month**: Allowed values: 1-31
* **Month**: Allowed values are 1-12 or JAN-DEC
* **Day of Week**: Allowed values are 0-7 or MON-SUN, where 0 & 7 is Sunday

Macros are also supported when setting a schedule.

|Macro    |Meaning|
| --- | ----------- |
|@yearly (Or @annually)|Once a year (0 0 0 1 1 *)|
|@monthly|Once a month (0 0 0 1 * *)|
|@weekly|Once a week (0 0 0 * * 0)|
|@daily (Or @midnight)|Once a day (0 0 0 * * *)|
|@hourly |Once an hour, (0 0 * * * *)|

:::note Notes

* The schedules are all based on the **UTC** timezone. However, you can view the corresponding local browser time
* The scheduler supports up to a second granularity - however, this is on a best-effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow scheduling
* A workflow can be invoked by any number of schedules
* Execution history is maintained up to a configured maximum limit (Default of 1000 executions per schedule)
* When there are a large number of schedules, we must adjust the server capacity to manage the load
* When the workflow is invoked, the following field will be injected automatically as the input
```json
{
    "_executedTime": <EPOCH EXECUTED TIME>,
    "_startedByScheduler": "<SCHEDULER NAME>",
    "_executionId": "<EXECUTION ID>",
    "_scheduledTime": <EPOCH SCHEDULED TIME>
}
```
:::

</details>