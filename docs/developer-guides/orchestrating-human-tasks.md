# Orchestrating Human Tasks with Conductor

Human tasks are used when you need to wait your workflow for an interaction with a human. When your workflow reaches the human task, it waits for a manual interaction to proceed with the workflow.

It can be leveraged when you need manual approval from a human, such as when a  form needs to be approved within an application, such as approval workflows.

To support human-involved tasks, Conductor offers a set of features:

- User Forms: Used to build forms that can be hosted in Conductor UI.
- [Human Tasks API](https://orkes.io/content/reference-docs/api/human-tasks): A suite of APIs that manage the lifecycle of human tasks connected to Conductor workflows.

## Creating User Forms

You can compose and host forms to be used in the Conductor UI.

:::note
A user form must be created only if it is to be hosted within your Conductor cluster. If you are hosting this in an external system, you may not create a user form and may proceed directly with the next step - [Defining Workflow](/content/developer-guides/orchestrating-human-tasks#defining-workflow). 
:::

To create a user form from Conductor UI,

1. From the left menu, navigate to **Definitions > User Forms**.
2. Click **+ New Form**.
3. Provide a name for the form.
4. Choose the required form layout (horizontal/vertical) and drag and drop the available components to create the user form.
5. While adding the components, you can make the fields mandatory by checking the  _required_ button.

<p align="center"><img src="/content/img/making-form-fields-mandatory.png" alt="Making form field mandatory in human tasks in Conductor" width="50%" height="auto"></img></p>

<ul><li>Field Name - This name is filled in the user form section of the workflow definition and is used as the input parameter.</li><li>Label - The name the end-users see while filling out the form.</li></ul>

6. Once the user form is created, you can preview it by clicking the **Preview** button.
7. Save the form.

<p align="center"><img src="/content/img/creating-forms-human-task.png" alt="Creating user forms for human task in Orkes Conductor" width="100%" height="auto"></img></p>

:::note Notes
- If you make any changes to the existing user form, you can save it as a new version.
- The user form can also be created using JSON code.
:::

## Defining Workflow

To define a workflow from Conductor UI, 

1. Navigate to **Definitions > Workflow** from the left menu.
2. Click **+Define Workflow**, provide a workflow name, and add a **Human Task** at the required point of the workflow.

The human task needs to be configured with the following parameters:

<p align="center"><img src="/content/img/human-task.png" alt="Human Task in Orkes Conductor" width="100%" height="auto"></img></p>

### Human Task Parameters

| Parameter | Description | 
| --------- | ----------- |
| Task display name | The display name for the human task that appears in the human task execution list.<br/><br/>Whenever a workflow containing a human task is executed, the execution status of the human task can be viewed under **Executions > Human Tasks** from the left menu on your Conductor console. The name specified under this field can be used to identify your human task execution from the **Executions > Human Tasks** list. |
| UI template | Choose the user form you have created previously here. Similar to workflows, the user forms can also have different versions. You can also choose the required version. <br/><br/>**Note**: This optional field is used only if the forms are hosted by the Conductor. If you host the forms in an external system, you can leave this field empty.|
| Assignment policy | Configure the assignment policy here. If you haven’t configured any policy under this field, it’s free for all, which indicates that anyone can pick a particular human task; access to this task is not limited.<br/><br/>To add a new assignment, click the **+New assignment** button: <p align="center"><img src="/content/img/assignment-policy-human-task.png" alt=" Assignment policy of human task" width="70%" height="auto"></img></p><ul><li>**Assign** - Choose the user/group type for the assignment policy. It can take the following values:<ul><li>**External User** - If the user is a non-Orkes user, i.e., residing in an external system, choose this option and provide the user's email ID.</li><li>**External Group** - If the group resides outside the Conductor cluster, choose this option and provide the name of the group that resides in the external system.</li><li>**Conductor User** - If the task is to be assigned to a user in the Conductor cluster, select this option and choose the user in the next column.</li><li>**Conductor Group** -  If the task is to be assigned to a group in the Conductor cluster, select this option and choose the group name in the next column.</li></ul><li>**SLA Minute** - Specify the duration in minutes for which the human task will be addressed. Set this field to 0 for a non-expiring SLA. Note that setting the SLA to non-expiring (0 minutes) will disable the ability to add a new assignment policy.</li></li></ul>**Note**: Multiple assignment policies can be stacked to create a hierarchical structure. For example, in the following setup, if the first group fails to pick the assignment within the specified SLA minutes, the task will be escalated according to the subsequent assignment policy in the order added here. <p align="center"><img src="/content/img/assignment-policy-human-task-hierarchy.png" alt="Assignment policy of human task in hierarchical order" width="90%" height="auto"></img></p>|
| After assignments | Choose the action to be carried out after the assignment policy is timed out. You can choose any of the following actions:<ul><li>**Leave open** - This ensures that the human task execution remains open to pick up by anyone once the assignment policy is timed out as per the specified SLA Minute.</li><li>**Terminate** - This option terminates the human task, and the workflow fails. If you check the workflow execution, you can see that it failed with a note indicating the same: **_“Task terminated as no more assignments pending and completion strategy is TERMINATE”_**.<p align="center"><img src="/content/img/terminate-action-human-task.png" alt="Workflow with human task failed on terminate action" width="100%" height="auto"></img></p></li><li>In the **Executions > Human Tasks**, this instance of the human task would be marked as deleted.<p align="center"><img src="/content/img/deleted-action-human-task.png" alt="Human task deleted in the executions view" width="100%" height="auto"></img></p></li></ul>
| Trigger policy | Choose the trigger policy to be applied. This field is optional.<br/>The trigger policy works based on the human task state in the **Executions > Human Tasks** list.<p align="center"><img src="/content/img/human-task-states.png" alt="States in Human tasks based on which trigger policies can be defined" width="100%" height="auto"></img></p>To add a trigger policy, click the **+New trigger** button. You can choose from the following trigger policies:<p align="center"><img src="/content/img/trigger-policy-human-task.png" alt=" Trigger policy for human task" width="90%" height="auto"></img></p><ul><li>**Pending** - If the human task execution is in the pending state, the workflow chosen under the “Start workflow” field is executed.</li><li>**Assigned** - Once the human task is assigned to a specific assignee, the workflow chosen under the “Start workflow” field is executed.</li><li>**In progress** - Once the human task execution is in the progress state, the workflow chosen under the “Start workflow” field is executed.</li><li>**Completed** - Once the human task execution is completed, the workflow chosen under the “Start workflow” field is executed.</li><li>**Timed out** - Once the human task execution is timed out, the workflow chosen under the “Start workflow” field is executed.</li><li>**Assignee changed** - Once the human task assignee changes (as per the assignment policy or if left open and picked by anyone), the workflow chosen under the “Start workflow” field is executed.</li><li>**Claimant changed** - When the claimant of a human task changes (e.g., if the initially assigned user does not claim the task and it remains open, allowing another user to claim it), the workflow specified in the "Start workflow" field will be executed.</li></ul><ul><li>**Start workflow** - Choose the workflow to be triggered.</li><li>**Version** - Choose the workflow version.</li></ul>In addition, you can include more inputs while starting the workflow by clicking the **Additional Inputs** button and providing input parameters, correlation ID, and task-to-domain mapping.<p align="center"><img src="/content/img/additional-inputs-for-trigger-policy.png" alt="Additional inputs for trigger policy" width="70%" height="auto"></img></p>|
| Input parameters | If you have created a user form in Conductor, the fields mentioned in the user form will be added as input parameters here by default. You can also [pass these parameters](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) as variables from inputs/outputs from tasks/workflows. In addition, you can also add additional parameters here.|

3. Save the workflow definition.

## Executing Workflow

Now, you can run the workflow from the Conductor UI.

1. From the left menu, click **Run Workflow**.
2. Choose the workflow to run and provide any input parameters if defined.
3. Click **Run Workflow**.
4. Once the workflow is run, click on the workflow ID generated.
5. The workflow would be in the **RUNNING** state.

<p align="center"><img src="/content/img/human-task-in-running-state.png" alt="Human Task in Running state" width="50%" height="auto"></img></p>

## Completing Human Task / Human Task Executions

Once your workflow execution is initiated, navigate to **Executions > Human Tasks**. 

You have two different views for human task execution based on your permissions to the Conductor cluster. 

- **Task inbox** - As a regular non-admin user, you get the task inbox view, which lists all the tasks assigned to you or left open. 
- **Admin search** - If you are an admin (cluster-admin or the task admin—who created the workflow containing human tasks), you can also have another view: the admin search, which lists all human tasks within the Conductor cluster. 

### Task inbox

The task inbox view is the non-admin regular user view that lists all the tasks assigned to you or left open (by the assignment policy).

<p align="center"><img src="/content/img/human-task-inbox-view.png" alt="Task inbox view of human task execution" width="100%" height="auto"></img></p>

- The executions can be filtered by task name and start time. You can also filter the executions by _Available_, _Completed_, or _All_.
- On the execution page, you can view the human task details, such as the task ID, Name (_Task display name_ specified in the workflow definition), task state, assignee, claimant, etc.

### Admin search

The admin search view is available to the cluster admin and the task admin (who created the workflow containing human tasks).

<p align="center"><img src="/content/img/admin-view-human-task.png" alt="Admin view of human task executions" width="100%" height="auto"></img></p>

- On the execution page, you can view the human task details, such as the task ID, Name (_Task display name_ specified in the workflow definition), task state, assignee, claimant, etc.
- You can filter the data based on the following parameters:
    - **Task names** - The human task's name (the _Task display name_ specified in the workflow definition).
    - **State** - The status of the human task. It can be IN_PROGRESS, PENDING, ASSIGNED, COMPLETED, TIMED_OUT or DELETED.
    - **Definition names** - This field filters based on the task definition name (the name of the human task in the workflow). It supports multiple entries.
    - **Output data search** - Used to filter execution based on the output data.
    - **Task reference name** - Filters based on the task reference name (Each task created has a unique task reference name). This field supports multiple entries.
    - **Start time** - Used to filter execution based on the task execution time.
    - **Input data search** - Used to filter execution based on the input data.
    - **Full-text search** - Used to query the data using a full-text approach. Only “AND” and “OR” are supported.
    :::note
    The field supports searching all the data within the execution columns based on an “AND” or “OR” query. For an example query like this:

    ```json 
    “loan" OR "cc3d2dc-18d4-11ef-a811-8a584d19ffea" 
    ```

    <p align="center"><img src="/content/img/full-text-search-human-task.png" alt="Full text view of human task executions" width="100%" height="auto"></img></p>

    The search will return all results that contain either the text “loan” or the specific workflow ID “cc3d2dc-18d4-11ef-a811-8a584d19ffea”. This means it will include results that match either of the criteria. To get results matching both criteria, use “AND” instead of “OR”.
    :::

- **Filter by actors** - Filters based on Claimant or Assignee.
- **Actor type** - Filters based on the actor, i.e., Conductor User, Conductor Group, External User, or External Group.
    - **User/Group ID** - Filters execution based on a particular user/group's name.

### Claiming Task

The task assignee can claim the task. To do this:

1. Click on the task ID from the executions page & you can view the form details.
2. Click **Claim**. 

<p align="center"><img src="/content/img/claiming-forms.png" alt="Claiming human tasks forms " width="80%" height="auto"></img></p>

:::noteNotes
- Select the dropdown arrow adjacent to **Claim** to override the claim.
- To bypass the task, use the **Skip** option. Access the dropdown menu under **_Skip_** and choose **_Skip with a reason_** to explain skipping the task.
- Within this interface, you can also allocate to another user/group through the **Assign to a different subject** option.

<p align="center"><img src="/content/img/assign-to-different-subject.png" alt="Assigning to a different subject" width="60%" height="auto"></img></p>
:::

Once claimed, you can update or complete the task. In addition, you can **Release** the task to remove your assignment so that someone else can claim it. 

<p align="center"><img src="/content/img/update-complete-release-forms.png" alt="Update/Complete/Release forms" width="80%" height="auto"></img></p>

Once the task is completed from here, the workflow moves to the next step. 

<p align="center"><img src="/content/img/human-task-completed.png" alt="Human Task Completed" width="50%" height="auto"></img></p>