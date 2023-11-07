# Orchestrating Human Tasks with Conductor

Human tasks are used when you need to pause your workflow for an interaction with a human. When your workflow reaches the human task, it waits for a manual interaction to proceed with the workflow.

It can be leveraged in situations where forms need to be used within an application, such as approval workflows.
To support human-involved tasks, Conductor offers a set of features:

- User Forms: Used to build forms that can be hosted in Conductor UI
- Human Tasks API: Suite of APIs to manage the lifecycle of Human tasks connected to Conductor workflows

## Creating User Forms

Conductor has a feature to compose and host forms that can be used in the Conductor UI.

:::note
A user form is to be created only if they are to be hosted within your Conductor console.
:::

To create a user form from Conductor UI,

1. From the left menu, navigate to **Definitions > User Forms**.
2. Click **+ New Form**.
3. Provide a name for the form.
4. Create the user form based on your requirements by dragging and dropping the available components from the Conductor UI.
5. While adding the components, you have the provision to make the fields mandatory by checking the _required_ button.

<p align="center"><img src="/content/img/making-form-fields-mandatory.png" alt="Making form field mandatory in human tasks in Conductor" width="70%" height="auto"></img></p>

6. Under **Layout configuration**, you can provide a **Layout label** that would be visible at the beginning of the layout.
7. Once the template is created, you can have a preview of the template by clicking on the **Preview** button.

<p align="center"><img src="/content/img/creating-templates-human-task.png" alt="Creating templates for human task in Orkes Conductor" width="100%" height="auto"></img></p>

## Defining Workflow

To define a workflow from Conductor UI, 

1. Navigate to **Definitions > Workflow** from the left menu.
2. Click **+Define Workflow**, provide a workflow name, and add a **Human Task**.

The human task needs to be configured with the following parameters:

<p align="center"><img src="/content/img/human-task.png" alt="Human Task in Orkes Conductor" width="100%" height="auto"></img></p>

### Human Task Parameters

| Parameter | Description | 
| --------- | ----------- |
| UI template | Choose the user form you have created previously here. Similar to workflows, the user forms can also have different versions. You can also choose the required version.<br/><br/>This optional field comes into use only if the forms are hosted in the Conductor itself. If you are hosting the forms in an external system, you can leave this field empty.|
| Task Owners | Select the task owner for the human task. The task owner grants permission to perform a human task. Choose the users/applications in Conductor who should own the task.<br/><br/>In certain situations, the applications created in Conductor may be required to retrieve this task. You can add the required application as a task owner in such cases.<br/><br/>**Notes:**By default, the Conductor Admin can access all the human tasks. |
| Assignment Policy | Configure the assignment policy here. If you haven’t configured any policy under this field, it’s free for all, which indicates that anyone, i.e., can pick a particular human task; there is no limitation on the access for this task.<br/><br/>To add a new assignment, click **+New assignment** button: <p align="center"><img src="/content/img/assignment-policy-human-task.png" alt=" Assignment policy of human task" width="60%" height="auto"></img></p><ul><li>**After _ Minutes** - Provide the time duration in minutes after which the assignment policy is to be applied.</li><li>**Assign** - Choose the user type or action for the assignment policy. It can take the following values:<ul><li>**External user** - Choose this option and provide the user's email ID in an external system. </li><li>**External group** - Choose this option and provide the group name of your group that resides in an external system.</li><li>**Internal user** - You can choose a user from the users in your Conductor environment.</li><li>**Internal group** -  You can choose a group from the groups in your Conductor environment.</li><li>**Terminate** - Terminate the task after the specified time duration.</li></ul></li></ul>|
| Trigger Policy | Choose the trigger policy to be applied. This field is optional.<br/><br/>You can choose from the following trigger policies:<p align="center"><img src="/content/img/trigger-policy-human-task.png" alt=" Trigger policy for human task" width="70%" height="auto"></img></p><ul><li>**Select trigger event** - Choose the trigger event. It can take the following values:<ul><li>**_Pending_** - If the human task reaches the pending state, the workflow chosen under the “Start workflow” field is executed.</li><li>**_Assigned_** - Once the human task is given to the specific assignee, the workflow chosen under the “Start workflow” field is executed.</li><li>**_In progress_** - Once the human task is in the progress state, the workflow chosen under the “Start workflow” field is executed.</li><li>**_Completed_** - Once the human task is completed, the workflow chosen under the “Start workflow” field is executed.</li><li>**_Timed out_** - Once the human task is timed out, the workflow chosen under the “Start workflow” field is executed.</li><li>**_Assignee change_** - You can change the human task assignee and the workflow chosen under the “Start workflow” field is executed.</li></ul></li><li>**Start workflow** - Choose the workflow to be triggered.</li><li>**Version** - Choose the workflow version.</li></ul><br/>In addition, you can also include more inputs while starting the workflow by clicking the **Additional Inputs** button and providing the additional inputs such as input parameters, correlation ID & task to domain mapping.|
| Predefined input | The inputs to the template can be parameterized from here. Check out the document on [how to pass parameters to the inputs](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | 

3. Save the workflow definition.

## Executing Workflow

Now, you can run the workflow from the Conductor UI.

1. From the left menu, click **Run Workflow**.
2. Choose the workflow to run and provide any input parameters if defined.
3. Click **Run Workflow**.
4. Once the workflow is run, click on the workflow ID generated.
5. The task would be in the **RUNNING** state.

<p align="center"><img src="/content/img/human-task-in-running-state.png" alt="Human Task in Running state" width="70%" height="auto"></img></p>

## Completing Human Task

Once your workflow execution is initiated, navigate to **Executions > Human Task**. Here, the human task would be listed.

<p align="center"><img src="/content/img/human-task-list.png" alt="Human Task List in Conductor UI" width="100%" height="auto"></img></p>

You can view the human task details, such as the workflow it is part of, state, assignment policy, and assignee.

The task owner/assignee can claim the task. To do this:

1. Click on the task ID & you can view the form details.
2. Click **Claim**. 

<p align="center"><img src="/content/img/claiming-forms.png" alt="Claiming human tasks forms " width="70%" height="auto"></img></p>

Once claimed, you can update or complete the task. In addition, you can **release** the task to remove your assignment so that someone else can claim the task. 

Once the task is completed from here, the workflow moves to the next stage. 

<p align="center"><img src="/content/img/human-task-completed.png" alt="Human Task Completed" width="70%" height="auto"></img></p>
