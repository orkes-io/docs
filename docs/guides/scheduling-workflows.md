import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Scheduling Workflows

You can use the Scheduler functionality when you need to run a workflow at a regular cadence. The workflows can be configured to be triggered at any cadence as required using the crontab expression.

You can use the scheduler for use cases such as:

* Running a workflow in a fixed cadence, such as every hour.
* Running the same workflow at different cadences using different fixed inputs.
* Running a workflow at a cadence between a set start date and an end date.
* Running the workflow once at a future date.

## Creating Schedule

For creating a schedule,

1. From your Conductor server, navigate to **SCHEDULER** > **Definitions**. This page displays a list of all the defined schedules.
2. Click the **Define Schedule** button in the top right corner.

You need to configure the following parameters:

| Attribute | Description |
| -- | -- | 
| Schedule Name | Provide a unique name for the schedule. Ensure that the schedule name contains no spaces or special characters. |
| Cron Expression | The cron expression is the schedule that the workflow will run on. You can either input the cron expression or choose from the available templates. See the section [Cron Expression](/content/docs/api/scheduler#cron-expression) below for detailed information regarding this. |
| Workflow Name | Provide the name of the workflow to be run. The author of the scheduler should have execution permission for the workflow. Else the workflow would get terminated quoting the reason that the author has no permission over the workflow. |
| Workflow Version | The Workflow created may have different versions. You can choose the version to be scheduled here. If left blank, it will run the latest version. |
| Input Parameters | Provide fixed input values for the workflow as a JSON object. This field is optional. |
| Correlation Id | Correlation Id is a user-supplied ID to identify the workflows. |
| Schedule Start | Choose the date & time for the scheduler to start running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional. |
| Schedule End | Choose the date & time for the scheduler to stop running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional. |
| Task to Domain Mapping | You can use the task to domain mapping to limit the workflow execution to specific domains. This field is optional. |
| Start Schedule Paused? | If selected, the schedule will be paused (so it will not run) upon creation. It is helpful when you don’t want to run the workflow scheduler, such as during maintenance. So to re-run the scheduler, you need to edit the scheduler and disable this option. |

3. Click **Save Schedule**.

## Cron Expression

:::note
You can use the standard cron expression for scheduling the workflows.
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
* **Day of Month**: Allowed values: 1-31.
* **Month**: Allowed values are 1-12 or JAN-DEC.
* **Day of Week**: Allowed values are 0-7 or MON-SUN, where 0 & 7 is Sunday.

Macros are also supported when setting a schedule.

|Macro	|Meaning|
| --- | ----------- |
|@yearly (Or @annually)|Once a year (0 0 0 1 1 *)|
|@monthly|Once a month (0 0 0 1 * *)|
|@weekly|Once a week (0 0 0 * * 0)|
|@daily (Or @midnight)|Once a day (0 0 0 * * *)|
|@hourly |Once an hour, (0 0 * * * *)|

:::note Notes

* The schedules are all based on the **UTC** timezone. However, you can view the corresponding local browser time.
* The scheduler supports up to a second granularity - however, this is on a best-effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow scheduling.
* You can have multiple schedules invoking the same workflow.
* Execution history is maintained up to a configured maximum limit (Default of 1000 executions per schedule).
* You must tune the configurations when running multiple schedules to configure the server.
* When the workflow is invoked, the following field will be injected automatically as the input.
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