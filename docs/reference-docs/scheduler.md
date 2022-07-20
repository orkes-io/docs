# Scheduling Workflows

Sometimes, we need a workflow to run on a regular cadence. For such use cases we can use the Scheduler functionality that is provided by Conductor. Using a crontab expression, we can configure workflows to be triggered at any cadence as required. 

We can use the scheduler for use cases such as:

* Running a workflow in a fixed cadence such as every hour
* Running the same workflow at different cadences using different fixed inputs
* Running a workflow at a cadence between a fixed start date and end date
* Running the workflow once at a future date


<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/S5Ya4BP7wRk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>


## Creating a Schedule

Conductor offers a configuration UI to create and manage a schedule. Alternatively we can create one via the API.

##  UI Schedule Creation

To create a schedule, click ```Scheduler Definitions``` in the left navigation.  This will display a list of all of our defined schedules. Click the [Define Schedule](https://play.orkes.io/scheduler/newScheduleDef) button in the upper right corner.  Fill in the form with the following parameters:

* **Schedule Name**: A descriptive term for the schedule being created (will appear in the ```Schedule Definitions``` list). (No spaces or special characters)
* **Cron Expression**: The schedule that the workflow will run on (see [Cron Expression](#cron-expression) below.)
* **Workflow Name**:  The name of the workflow to be run. The author of the schedule should have execution permission for the workflow
* **Workflow Version**: The version of the workflow.  If left blank, the latest version will be run.
* **Input Parameters**: Any fixed input values for the workflow as a JSON object (optional)
* **Correlation Id**:  
* **Schedule Start**: Time/date that the schedule will start running (optional) (inclusive)
* **Schedule End**:  Time/date that the schedule will stop running (optional) (inclusive)
* **Task to Domain Mapping**: (optional)
* **Schedule Paused**: If selected, the schedule will be paused (so it will not run) upon creation 

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

An example API call (using the [Orkes Playground](https://play.orkes.io)) looks like:


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

> Note: If using Orkes Conductor or the Orkes Playground, our API call must be [authenticated](https://orkes.io/content/docs/getting-started/concepts/access-control), and our application must have execute permissions for the workflow in question.

## Cron expression

The UI has a *Cron Expression Helper* to describe the options of the Cron expression. We can also test our expression after entering it - and the UI will calculate the next few times of the schedule.

The CRON expression has 6 terms, and a blank entry is denoted by an asterisk.

```
* * * * * *
```

The terms, in order left to right define the timings:

* **Second**: Allowed values: 0-59
* **Minute**: Allowed values: 0-59
* **Hour**: Allowed values: 0-23
* **Day of Month**: (1-31)
* **Month**: (1-12 or Jan-Dec)
* **Day of Week**: (0-7 or MON-SUN) [0 & 7 are Sunday]

There are a number of examples on the definition page we can use as an aid to set the schedule.

Macros are also supported when setting a schedule

|Macro	|Meaning|
| --- | ----------- |
|@yearly (or @annually)|once a year (0 0 0 1 1 *)|
|@monthly|once a month (0 0 0 1 * *)|
|@weekly|once a week (0 0 0 * * 0)|
|@daily (or @midnight)|once a day (0 0 0 * * *)|
|@hourly |once an hour, (0 0 * * * *)|

## Things to Note

* The schedules are all based on **UTC** timezone
* The scheduler supports up to a second granularity - however this is on a best effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow schedules
* We can have multiple schedules invoking the same workflow
* Execution history is maintained up to a configured maximum limit (default of 1000 executions per schedule)
* When running a very large number of schedules, we need to tune the configurations to configure the server
* When the workflow is invoked, it will have the following field injected as input automatically
```json
{
    "_executedTime": <EPOCH EXECUTED TIME>,
    "_startedByScheduler": "<SCHEDULER NAME>",
    "_executionId": "<EXECUTION ID>",
    "_scheduledTime": <EPOCH SCHEDULED TIME>
}
```

