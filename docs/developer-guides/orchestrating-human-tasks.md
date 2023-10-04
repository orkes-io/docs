# Orchestrating Human Tasks with Conductor

Human tasks are used when you need to pause your workflow for an interaction from a human. When your workflow reaches the human task, it waits for a manual interaction to proceed with the workflow. 

It can be leveraged in situations where forms need to be used within an application, such as approval workflows.

To support human involved tasks, Conductor offers a set of features:

- __Templates__: Used to build forms that can be hosted in Conductor UI
- [__Human Tasks API__](/content/reference-docs/api/human-tasks): Suite of APIs to manage the lifecycle of Human tasks connected to Conductor workflows

## Human Task Lifecycle

The diagram below shows the lifecycle of a human task. When using the APIs, we are basically moving between states as required by the business application. State changes also happen when the policies kick in for timeouts, assignments, or escalations.

* When tasks are complete, workflows will move forward, and tasks are no longer editable.
* When tasks time out, the workflows will be marked as failed. Upon retry - a new task will be created that will start from the PENDING state.

<p align="center"><img src="/content/img/human-task-lifecycle.png" alt="Human task lifecycle" width="100%" height="auto"></img></p>


## Human Task Triggers

__Upcoming feature.__ Using triggers that can be attached to state changes or time, we can run additional workflows to supplement 
the human action. This is useful for notifications and other aspects.

__More details coming soon...__

## Creating Templates

Conductor has a feature to compose and host forms that can be used in the Conductor UI application.  

:::note
A template is to be created only if the forms are hosted within your Conductor console.

If your forms are to be hosted on any external system, you can simply add a blank template where 
one of the input parameters can be used to indicate that form is an external form.
:::

To create a template from Conductor UI,

1. From the left menu, navigate to **INBOX > Template builder**.
2. Click **Create New Template**.
3. Provide a name for the template.
4. Create the template based on your requirements by dragging and dropping the available components from Conductor UI. 
5. While adding the components, you have the provision to make the fields mandatory by checking the *required* button. 

<p align="center"><img src="/content/img/making-forms-mandatory.png" alt="Making form field mandatory in human tasks in Conductor" width="60%" height="auto"></img></p>

When creating a template as a proxy for an externally hosted form, we can add an empty form with just one field. And when this template is attached to the workflow, we can add the external reference to this task on it. The UI application that then reads this human task can determine that this is an external form and then load the corresponding UI form.

6. Under **Layout Configuration**, you can provide a **Layout label** that would be visible at the beginning of the layout.
7. Once the template is created, you can have a preview of the template by clicking on the **Preview** button.

<p align="center"><img src="/content/img/creating-templates-human-task.png" alt="Creating templates for human task in Orkes Conductor" width="100%" height="auto"></img></p>

## Defining Workflows with Human Tasks

To define a workflow from Conductor UI, 

1. Navigate to **WORKFLOWS > Definitions** from the left menu
2. Click **Define Workflow**, provide a workflow name and add a **Human Task**
3. You can have as many human tasks in whichever steps as required

The human task needs to be configured with the following parameters:

### Human Task Parameters

| Parameter          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Assignment Policy  | Choose the policy through which the human task is to be assigned. It can take the following values:<ul><li>**FREE_FOR_ALL** - Indicates that the particular human task can be picked up by anyone, i.e., there is no limitation on the access for this task.</li><li>**FIXED** - Indicates that the human task can be picked only by fixed users/groups. You can choose between 4 different assignees:<ol><li>**EXTERNAL_USER** - Provide the email ID of the arbitrary user in an external system.</li><li>**EXTERNAL_GROUP** - Provide the group name of your group that resides in an external system.</li><li>**CONDUCTOR_USER** - You can choose a user from the users in your Conductor environment.</li><li>**CONDUCTOR_GROUP** -  You can choose a group from the groups in your Conductor environment.</li></ol></li><li>**LEAST_BUSY_GROUP_MEMBER** - This field is applicable only for Conductor groups. You can choose the required Conductor group, and the task will be assigned to the group member with the least work of this type in their inbox.<p>For example, if your human task is “issues,” and there are 100 instances of this to be completed, and the group “support-team” has two members, of which one person has 40 issues to be addressed, and the other one with 60 issues. In this case, the tasks would be assigned to the first person.</p></li></ul> |
| Task Owners        | Select the task owner for the human task. The task owner grants permission to perform a human task. Choose the users/applications in Conductor who should own the task. In most situations, applications created in Conductor will retrieve tasks via APIs. In such cases, you can add the required application as a task owner.<br/><br/>**Note**: By default, the Conductor Admin can access all the human tasks.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Timeout Policy     | Indicates the condition at which the task should be timed out.  It can take the following values:<ul><li>**NEVER** - The task never times out.</li><li>**TERMINATE** - If chosen, provide the time in seconds after which the task will be terminated.</li><li>**CLEAR_ASSIGNMENT** - If chosen, provide the time in seconds after which the already set “*__Assignment Policy__*” would be cleared.<p>For example, if you have set the Assignment Policy as “LEAST_BUSY_GROUP_MEMBER”, & you have configured clear assignment as 3600 seconds. Then after 1 hour, the “LEAST_BUSY_GROUP_MEMBER” assignment would be cleared, and the task assignment would be free for all.</p></li><li>**ESCALATE** - If chosen, provide the time in seconds after which the task would be escalated to the specified users.</li><p align="center"><img src="/content/img/escalate-policy.png" alt="Escalate time out policyr" width="70%" height="auto"></img></p>For example, if it’s a critical issue to be addressed in 15 mins (900 seconds). You can choose the users to which the escalation should go. In this case, after 900 seconds, if the task is not yet completed, it will be escalated to user 1. If that’s not completed within another 900s, it would be escalated to user 2, and the process continues with all the users added under this policy.</ul>                                |
| UI Template        | Choose the template we have created previously here. Similar to workflows, the templates can also have different versions. You can also choose the required version. The inputs to the template can be parameterized from here.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 

3. Save the workflow definition.

## Executing Workflow

Now, you can run the workflow from the Conductor UI.

<details><summary> Steps to Run Workflow from UI</summary>

1. From the left menu, click **Run Workflow**.
2. Choose the workflow to run and provide any input parameters if defined.
3. Click **Run Workflow**.
4. Once the workflow is run, click on the workflowID generated.
5. The task would be in the **RUNNING** state.

</details>

## Completing Human Task

Once your workflow execution is initiated, navigate to **INBOX > Tasks**. Here, the human task would be listed.

<p align="center"><img src="/content/img/human-task-list.png" alt="Human Task List in Conductor UI" width="100%" height="auto"></img></p>

You can view the human task details, such as the workflow it is part of, state, assignment policy, and assignee.

The task owner/assignee can claim the task. To do this:

1. Click on the task ID & you can view the form details.
2. Click **Claim**. 

<p align="center"><img src="/content/img/claiming-forms.png" alt="Claiming human tasks forms " width="60%" height="auto"></img></p>

Once claimed, you can update or complete the task. In addition, you can **release** the task to remove your assignment so that someone else can claim the task. 

Once the task is completed from here, the workflow gets completed. 

Have a look at [Human Task APIs here](/content/reference-docs/api/human-tasks).
