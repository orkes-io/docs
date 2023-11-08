import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Scheduling Workflows

Often we want to trigger a workflow at a specific schedule. Orkes Conductor platform supports this natively. The workflows can be configured to be triggered at any cadence as required using the crontab expression.

The Scheduler can be used for use cases such as:

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

1. From your Conductor server, navigate to **Definitions > Scheduler**. This page displays a list of all the defined schedules.
2. Click the **Define Schedule** button in the top right corner.

The following parameters can be used to configure the schedule:

| Attribute | Description |
| ------------------------------------- | ------------------------------------ | 
| Name | Unique name for the schedule. Ensure that the schedule name contains no spaces or special characters. |
| Cron Expression | The cron expression is the schedule that the workflow will run on. You can either input the cron expression or choose from the available templates. See the section [Cron Expression](/content/developer-guides/scheduling-workflows#cron-expression) below for detailed information regarding this. |
| Workflow name | Name of the workflow to be run. The author of the scheduler should have execution permission for the workflow.|
| Workflow version | Selected Workflow may have different versions. Choose the version to be used in this schedule. If left blank, the latest version would be run. |    
| Input params | Provide fixed input values for the workflow as a JSON object. This field is optional. |
| Correlation id | User-supplied ID to correlate or search the scheduled workflows. |
| Schedule start | Choose the date & time for the scheduler to start running. It should be in the format **yyyy-mm-dd hh:mm (a/p)m**. This field is optional. |
| Schedule end | Choose the date & time for the scheduler to stop running. It should be in the format **yyyy-mm-dd hh:mm (a/p)m**. This field is optional. |
| Task to domain mapping | You can use the task to domain mapping to limit the workflow execution to specific domains. This field is optional. |
| Start schedule paused? | If selected, the schedule will be paused (so it will not run) upon creation. It is helpful when you don’t want to run the workflow scheduler, such as during maintenance. To resume the scheduled executions, this needs to be unpaused. |

3. Click **Save Schedule**.

:::note
Non-admin users can create a schedule only if they have "execute" permission over the workflow to be scheduled. You must also provide “read” permission to list the workflows in the scheduler or workflow definitions.
:::

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

* The schedules are all based on the **UTC** timezone. However, you can view the corresponding local browser time.
* A workflow can be invoked by any number of schedules.
* Execution history is maintained up to a configured maximum limit (Default of 1000 executions per schedule).
* When there are a large number of schedules, you must adjust the server capacity to manage the load.
* When the workflow is invoked, the following field will be injected automatically as the input:
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

## Viewing Executions

Once the schedulers are defined, you can view the executions from the **Executions > Scheduler** page. 

<p align="center"><img src="/content/img/scheduler-executions.jpg" alt="Scheduler Executions View" width="100%" height="auto"></img></p>

The execution page lists the details of all the scheduler executions. It includes the details such as scheduled time, execution time, execution ID, workflow ID, state, reason for failure, and error details. You can view the workflow execution by directly clicking on the workflow ID. You can also filter further information using the available options.

:::note
For non-admin users to work with schedules created by an admin, they need to be provided access to the required schedules and workflows. This can be granted through a user group. 
Here’s how you can achieve this:
<ul><li>

Add the required tag to the scheduler and workflow to which non-admins may need access. Let’s add the tag __“team:execute”__. Create a user group with required members and [provide execute & read access](https://orkes.io/content/access-control-and-security/tags#using-user-groups) to the tag __“team:execute”__.    
</li></ul>
This ensures that the group members will have "execute" & “read” permission over the scheduler and workflows you’ve tagged with the tag “team:execute”.
:::

## Scheduling Workflows from Completed Executions

 To schedule a workflow from a completed execution page,

 1. Navigate to the workflow execution page.
2. From **Actions**, choose **Create Schedule**.

<p align="center"><img src="/content/img/schedule-from-executions.png" alt="Workflow scheduling from executions" width="100%" height="auto"></img></p>

3. This pre-fills a Scheduler Definition with the workflow name, version, input parameters, and task-to-domain mapping. You only need to provide a name for the scheduler and choose the schedule time. 

<FAQStructuredData faqs={faqs} />

import FAQStructuredData from '../../src/theme/FAQStructuredData';

export const faqs = [
  {
    question: 'How do I set up a crontab to schedule a workflow every 15 minutes?',
    answer:
      "You can create a scheduler with the crontab expression (0 */15 * ? * *) to run your workflow every 15 minutes.",
  },
  {
    question: 'How do I set up a crontab to schedule a workflow every 90 minutes?',
    answer:
      "You cannot directly set up a scheduler to run every 90 minutes, as the minute field in the crontab expression supports only the values between 0-59. However, you can set up multiple schedulers to achieve the same. You'll have to define two separate schedulers with the following crontab expressions. (0 0-21/3 * * ? *) & (30 1-22/3 * * ? *)",
  },
  {
    question: 'Is there a limitation to how many schedules you can set up at the same scheduler?',
    answer:
      "No, there is no limitation on the number of schedules you can set up for the same scheduler.",
  },
  {
    question: 'Is there a limitation to how many schedules you can set up for the same user?',
    answer:
      "No, there is no limitation on the number of schedules you can set up for the same user.",
  },
  {
    question: 'Is there a limitation to how many schedules you can set up on the same cluster?',
    answer:
      "No, there is no limitation on the number of schedules you can set up for the same cluster.",
  },
  {
    question: 'What is the smallest granularity to set up a schedule?',
    answer:
      "The scheduler supports up to a second granularity - however, this is on a best-effort basis. A minimum of a 30 seconds gap is recommended as the cadence for workflow scheduling.",
  },
  {
    question: 'How do I debug a cron schedule?',
    answer:
      "You can debug the scheduler from the Scheduler > Executions page. The execution page gives details such as scheduled time, execution time, execution ID, workflow ID, etc. You can view your execution state and find the reasons for failure along with the error details.",
  },
  {
    question: 'How do I search for past executions of a specific schedule?',
    answer:
      "Navigate to Scheduler > Executions page. Under the field Schedule Name, provide your scheduler name and click Search. This would list all the past executions of the specific scheduler.",
  },
  {
    question: 'Can I get a summary view of all the schedules that ran in a given time span, like last month, last week, etc.?',
    answer:
      "Yes. From the Scheduler > Executions page, you can leverage the filter options Start Time - From & Start Time - To. You can provide the start & end date to view the schedules that ran within the stipulated time period. In addition, there is a field, namely, Lookback (days), where you can provide the number of past days to view the scheduled run over this period.",
  },
  {
    question: 'A scheduler is created for a workflow for version 1. The workflow definition for that version changed later and now has new or updated input parameters. The schedule should not be missing passing in a desired input parameter. Is there a way to find this?',
    answer:
      "While creating a scheduler, you have the option to choose the workflow version. If you have selected any workflow version, the scheduler will run only that version. On the other hand, if a version is not chosen, then the latest version runs by default. In this case, if the version were not chosen while creating the scheduler, the scheduler would run the updated workflow version. And If a particular version was selected during the scheduler creation, then you may have to update the scheduler with the latest version. If the input is to be updated, you can edit them too.",
  },
];
