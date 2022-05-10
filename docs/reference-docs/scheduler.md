# Scheduler

Sometimes, you need a workflow to run on a regular cadence.  The Scheduler module in Conductor is based on the Linux command tool crontab.

With the scheduler tool, you can create a customized schedule for your workflows, ensuring that the run when needed.

## Creating a Schedule

You can use the Conductor UI to create a schedule, or create one via the API.

##  UI Schedule Creation

To create a schedule, click ```Scheduler Definitions``` in the left navigation.  This will display a list of all of your defined schedules. Click the ```[Define Schedule](https://play.orkes.io/scheduler/newScheduleDef)``` button in the upper right corner.  Fill in the form withe the following parameters:

* **Schedule Name**: A descriptive term for the schedule you are creating (will appear in the ```Schedule Definition``` list). (No spaces or special characters)
* **Cron Expression**: The schedule that the workflow will run on (see [Cron Expression](#cron-expression) below.)
* **Workflow Name**:  The name of the workflow to be run.
* **Workflow Version**: The version of the workflow.  If left blank, the newest version will be run.
* **Input Parameters**: The JSON input for the workflow. 
* **Correlation Id**:  
* **Schedule Start**: Time/date that the schedule will start running (optional).
* **Schedule End**:  Time/date that the schedule will stop running (optional).
* **Task to Domain Mapping**:
* **Schedule Paused**: If selected, the schedule will be paused (so it will not run) upon creation.

## API Schedule Creation

To create a schedule via API, the endpoint is ```api/scheduler/schedules```.

Send a POST with 

* cronExpression
* name
* paused
scheduleEndTime
scheduleStartTime
* startWorkflowRequest JSON string
    * name 
    * version
    * input (jsonString of workflow input values)
    * correlationId
    * taskToDomain

An Example API call (using the [Orkes Playground](https://play.orkes.io)) looks like:


```bash

curl -X "POST" "https://play.orkes.io/api/scheduler/schedules"  \
-H 'Content-Type: application/json; charset=utf-8' \
-H 'X-Authorization:  <authentication token>' \
-d '{"name":"api_scheduler_test","cronExpression":"0 0 12 6 * ?", "startWorkflowRequest":{"name":"pi_calc_test", "input":{"digits": 10}}}

```

> Note: If using Orkes Conductor or the Orkes Playground, your API call must be [authenticated](https://orkes.io/content/docs/getting-started/concepts/access-control), and your application must have execute permissions for the workflow in question.

## Cron expression

The UI has a *Cron Expression Helper* to describe the options of the Cron expression. You can also test your expression after entering it - and the UI will calculate the next few times of the schedule.

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

There are a number of examples on the definition page.


