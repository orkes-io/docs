# Workflow Scheduler

When you need to run a workflow on a regular cadence, you can use the Scheduler functionality to configure workflows to be triggered at any cadence as required using a crontab expression.
<br/>
You can use the scheduler for use cases such as:
<br/>

* Running a workflow in a fixed cadence, such as every hour.
* Running the same workflow at different cadences using different fixed inputs.
* Running a workflow at a cadence between a set start date and an end date.
* Running the workflow once at a future date.

## Creating a Schedule

For creating a schedule,
<br/>

1. From your Conductor server, navigate to **Scheduler** and click **Definitions**. This will display a list of all our defined schedules.
2. Click the **Define Schedule** button in the upper right corner.

You need to fill in the form with the following parameters:
<br/>

* **Schedule Name**: Provide a unique name for the schedule. Ensure that the schedule name contains no spaces or special characters.
* **Cron Expression**: The cron expression is the schedule that the workflow will run on. You can either input the cron expression or choose from the available templates. See the section [Cron Expression](/content/docs/api/scheduler#cron-expression) below for detailed information regarding this.
* **Workflow Name**: Provide the name of the workflow to be run. The author of the scheduler should have execution permission for the workflow. Else the workflow would get terminated quoting the reason that the author has no permission over the workflow.
* **Workflow Version**: The Workflow created may have different versions. You can choose the version to be scheduled here. If left blank, it will run the latest version.
* **Input Parameters**: Any fixed input values for the workflow as a JSON object. This field is optional.
* **Correlation Id**: A user-supplied ID used to identify the workflows.
* **Schedule Start**: Choose the date & time for the scheduler to start running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional.
* **Schedule End**: Choose the date & time for the scheduler to stop running. It should be in the format **yyyy-mm-dd hh:mm (a|p)m**. This field is optional.
* **Task to Domain Mapping**: You can use this option to debug and develop even in the production environment. You need to provide the task to domain mapping as a JSON file. This field is optional.
* **Start Schedule Paused?**: If selected, the schedule will be paused (so it will not run) upon creation. It is helpful when you don’t want to run the workflow scheduler, such as during maintenance. So to re-run the scheduler, you need to edit the scheduler and disable this option.

## Cron Expression

The UI has a *Cron Expression Helper* to describe the options of the Cron expression. You can also test our expression after entering it - and the UI will automatically calculate the next few runs of the schedule.
<br/>
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

* The schedules are all based on the **UTC** timezone.
* The scheduler supports up to a second granularity - however, this is on a best-effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow scheduling.
* You can have multiple schedules invoking the same workflow.
* Execution history is maintained up to a configured maximum limit (Default of 1000 executions per schedule).
* When running multiple schedules, you must tune the configurations to configure the server.
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