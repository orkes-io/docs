# Scheduling Workflows

Sometimes, you need a workflow to run on a regular cadence. For such use cases, you can use the Scheduler functionality provided by Conductor. You can configure workflows to be triggered at any cadence as required using a crontab expression.

You can use the scheduler for use cases such as:

* Running a workflow in a fixed cadence, such as every hour.
* Running the same workflow at different cadences using different fixed inputs.
* Running a workflow at a cadence between a set start date and an end date.
* Running the workflow once at a future date.


<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/S5Ya4BP7wRk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


## Creating a Schedule

Conductor offers a configuration UI to create and manage a schedule. Alternatively, you can create one via the API.

##  UI Schedule Creation

For creating a schedule via Conductor UI,
1. Navigate to **Scheduler** and click **Definitions**. This will display a list of all our defined schedules.
2. Click the **Define Schedule** button in the upper right corner. 

You need to fill in the form with the following parameters:

* **Schedule Name**: Provide a unique name for the schedule to be created. It can be used to identify your schedule from the **Workflow Scheduler Definitions** list. Ensure that the schedule name contains no spaces or special characters.
* **Cron Expression**: The cron expression is the schedule that the workflow will run on. You can either input the cron expression or choose from the available templates. See the section [Cron Expression](#cron-expression) below for detailed information regarding this.
* **Workflow Name**: Provide the name of the workflow to be run. The author of the schedule should have execution permission for the workflow. Else the workflow would get terminated quoting the reason that the author has no permission over the workflow.
* **Workflow Version**: The Workflow created may have different versions. You can choose the version to be scheduled here. If left blank, it will run the latest version.
* **Input Parameters**: Any fixed input values for the workflow as a JSON object. This field is optional.
* **Correlation Id**: A user-supplied ID used to identify the workflows.
* **Schedule Start**: Choose the date & time for the schedule to start running. It should be in the format *yyyy-mm-dd hh:mm (a|p)m*. This field is optional.
* **Schedule End**: Choose the date & time for the schedule to stop running. It should be in the format *yyyy-mm-dd hh:mm (a|p)m*. This field is optional.
* **Task to Domain Mapping**: You can leverage this option to debug and develop even while running in the production environment. You need to provide the task to domain mapping as a JSON file. This field is optional.
* **Start Schedule Paused?**:  If selected, the schedule will be paused (so it will not run) upon creation. It is helpful when you don’t want to run the workflow scheduler, such as during maintenance. So to re-run the scheduler, you need to edit the scheduler and disable this option.

## API Schedule Creation

To create a schedule via API, the endpoint is ```api/scheduler/schedules```.

Send a POST with 

* cronExpression
* name
* paused (optional)
* scheduleEndTime (optional)
* scheduleStartTime (optional)
* startWorkflowRequest (JSON)
    * name 
    * version (optional)
    * input (JSON of workflow input values) (optional)
    * correlationId (optional)
    * taskToDomain (optional)

An example API call looks like this: (You can try it out using the [Orkes Playground](https://play.orkes.io))


```bash
curl -i -X "POST" "https://play.orkes.io/api/scheduler/schedules"  \
-H 'Content-Type: application/json; charset=utf-8' \
-H 'X-Authorization:  <authorization token>' \
-d '{
  "name": "api_scheduler_test",
  "cronExpression": "0 0 12 6 * ?",
  "startWorkflowRequest": {
    "name": "<WORKFLOW_NAME>",
    "input": {
      "digits": 10
    }
  }
}'
```

> **Note**: If you are using Orkes Conductor or the Orkes Playground, your API call must be [authenticated](https://orkes.io/content/docs/getting-started/concepts/access-control), and your application must have ‘execute’ permission for the workflow.

## Cron Expression

The UI has a *Cron Expression Helper* to describe the options of the Cron expression. You can also test our expression after entering it - and the UI will automatically calculate the next few runs of the schedule.

The CRON expression has six terms; you can denote a blank entry with an asterisk.

```
* * * * * *
```

The terms, in order from left to right, define the timings:

* **Second**: Allowed values: 0-59
* **Minute**: Allowed values: 0-59
* **Hour**: Allowed values: 0-23
* **Day of Month**: Allowed values: 1-31.
* **Month**: Allowed values are 1-12 or JAN-DEC.
* **Day of Week**: Allowed values are 0-7 or MON-SUN, where 0 & 7 is Sunday.

There are several examples on the definition page that you can use to set the schedule.

Macros are also supported when setting a schedule.

|Macro	|Meaning|
| --- | ----------- |
|@yearly (Or @annually)|Once a year (0 0 0 1 1 *)|
|@monthly|Once a month (0 0 0 1 * *)|
|@weekly|Once a week (0 0 0 * * 0)|
|@daily (Or @midnight)|Once a day (0 0 0 * * *)|
|@hourly |Once an hour, (0 0 * * * *)|

## Things to Note

* The schedules are all based on the **UTC** timezone.
* The scheduler supports up to a second granularity - however, this is on a best-effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow scheduling.
* You can have multiple schedules invoking the same workflow.
* Execution history is maintained up to a configured maximum limit (Default of 1000 executions per schedule).
* When running many schedules, you must tune the configurations to configure the server.
* When the workflow is invoked, it will have the following field injected as input automatically.
```json
{
    "_executedTime": <EPOCH EXECUTED TIME>,
    "_startedByScheduler": "<SCHEDULER NAME>",
    "_executionId": "<EXECUTION ID>",
    "_scheduledTime": <EPOCH SCHEDULED TIME>
}
```

