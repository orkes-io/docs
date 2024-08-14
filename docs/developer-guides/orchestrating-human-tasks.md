import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Human Task Orchestration

Business processes often involve human interaction. To augment your workflows with human interactions, Orkes Conductor offers a variety of features for real-time interfacing with human input:
* At the core is Orkes’ **user form template**, a reusable JSON-based schema that defines the form's fields and layout.
* Each **Human task** is associated with a user form template, which can be assigned to someone to complete.
* The user form can be displayed on an external UI using Orkes’ **[Human Tasks API](/docs/reference-docs/api/human-tasks/index.mdx)**.

A Human task can be used for a variety of human-involved tasks, such as manual approval in an approval workflow or a booking form in an airline reservation workflow. When a workflow reaches the Human task, a form is generated based on the pre-defined template and assigned for a user or group to fill. Once the form has been submitted, the task will be set as Complete, allowing the workflow to progress to the next step.

During workflow creation, the Human task can be configured for:
* **Assignment policy**—Define who can fill out the form, how long the form is assigned to them, and what to do if the assignment times out.
* **Trigger policy**—Trigger a workflow to start if the task state changes. 

During development, you can test and execute Human tasks internally on Orkes Platform before integrating it with an external UI.


## Orchestrating human-involved tasks

**To orchestrate human-involved tasks:**
1. Create a user form schema for the Human task.
2. Define the Human task.
3. Configure the Human task in your workflow definition to set the assignment and trigger policy.
4. Display the user form on an external UI.


### Step 1: Create a user form schema

To use a Human task in a workflow, you must first create a user form for it. The User Forms studio on Orkes Platform allows you to compose user forms easily, using JSON code or the pre-built form components. Once created, these forms can be safely versioned as well.

:::tip
It is best practice to create forms using Orkes’ User Form studio, even if the form will be displayed on an external UI. With the user form schema stored on Conductor, any changes can be instantly reflected on the frontend without any additional development effort.
:::

**To create a user form on Orkes Platform:**
1. Go to your Conductor cluster on Orkes Platform.
2. In the left navigation menu, go to **Definitions** > **User Forms**.
3. Select **(+) New Form**.
4. In Form details, provide a name for the form in **Form name**.
5. To build the form, drag and drop the pre-built items for **Layout** and **Components** and configure each component.
6. Preview your form at any time by selecting **Preview** on the top right.
7. Once the form is ready, select **Save** > **Confirm** on the top right.

<p align="center"><img src="/content/img/creating-forms-human-task.png" alt="Creating user forms for human task in Orkes Conductor" width="100%" height="auto"></img></p>

#### Supported form components

These are the pre-built form components available on Orkes Platform:
* Boolean
* Multiple Choice
* Date
* Date + Time
* Description Text
* Image
* Number
* Text
* Time
* Video
* Radio

:::note
You can toggle to the Code tab to create custom components for your form. However, all inputs to the form will be part of the Conductor workflow and JSON response, so the input data size should be as small as possible. Refer to [this package](https://www.npmjs.com/package/@io-orkes/human-task-material-renderers-react) for more information on Orkes-supported components.
:::

#### Configuring form components

**To configure a component:**
1. Select the Edit icon beside the component. <br/> A pop-up box appears. 
  <p align="center"><img src="/content/img/making-form-fields-mandatory.png" alt="Making form field mandatory in human tasks in Conductor" width="50%" height="auto"></img></p> 
2. Enter the **Field Name**, which serves as the input parameter name in the Human task definition.
3. Enter the **Label**, which is the text that end-users see when filling out the form.
4. Configure the remaining settings:

| Setting     | Applicable to   | Description                                       |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required | All components except Description Text. | Sets whether the form component is mandatory. |
| Read-only | All components except Description Text. | Sets whether the form component can accept a user input. <br/><br/>If the component is read-only, the user cannot fill out the field and the value must be supplied from elsewhere, such as from the workflow parameters. |
| Boolean default value | Boolean. | Sets whether the default value is true or false. |
| Items split by commas | Multiple Choice and Radio. | Contains the list of selection items split by a comma. |
| Alignment | Description Text. | Sets the alignment of the description text. Supported values: <ul> <li>Left</li> <li>Center</li> <li>Right</li> <li>Justify</li> <li>inherit</li></ul> |
| Allow-decimal | Number. | Sets whether to allow decimal values as input. |
| Multiline | Text. | Sets whether the text input box is multiline.  |
| Height | Image and Video. | Sets the height of the image or video. |
| Width | Image and Video. | Sets the width of the image or video. |
| Default URL | Image and Video. | Sets the default image or video displayed on the form if it is not supplied from elsewhere. |


### Step 2: Define a Human task

To use a Human task with an external UI, you must first define the Human task in **Definitions** > **Task**. 

**To define a Human task:**
1. Go to your Conductor cluster on Orkes Platform.
2. In the left navigation menu, go to **Definitions** > **Task**.
3. Select **(+) Define task**.
4. In Name, enter a unique name for your Human task.
5. In Description, enter the task description.
6. Enter the task details, such as the rate limits, retry settings, timeout settings, and expected inputs and outputs.
7. Select **Save** > **Confirm Save**.

Once the task is defined, you can proceed to add it to a workflow definition.


### Step 3: Configure the Human task

Add the Human task to your workflow and configure its assignment policy and trigger policy. The assignment policy is governed by the following:
* If not configured, the Human task will not be limited to a certain group or user and anyone can complete the form.
* Multiple assignment policies can be added to create a multi-level assignment chain. If the first group fails to pick the assignment within the specified timeframe, the task will be escalated to the next assigned group.
* Additional assignment policies cannot be added if the preceding assignment policy has no specified expiry timeframe.

**To add a Human task:**
1. In your workflow, select the **(+)** icon and add a **Human** task.
2. In Task Definition, select a Human task definition.
3. Enter the **Task display name**, which will appear on the connected UI for the user. Use a unique human-friendly name, such as “Loan Approval” or “Booking Form”.
4. Select the **UI template** previously created in the User Form studio and its **Version**.
5. (Optional) Add an assignment policy to control who can fill out the form.
    1. In Assignment policy, select **(+) New assignment**.
    2. In Assign, select the **User type** for the assignee(s) and enter the corresponding user or group ID.
        * **External User** or **Group**—Select this if the assignees are managed and verified in an external system, and will access an external UI to complete the task.
        * **Conductor User** or **Group**—Select this if the assignees are Conductor users and will access Orkes Platform to complete the task.
        <p align="center"><img src="/content/img/assignment-policy-human-task.png" alt=" Assignment policy of human task" width="70%" height="auto"></img></p>
    3. Enter the **SLA minutes** to specify the assignment duration before it times out. Use 0 minutes to set a non-expiring assignment.
    4. In **After assignments**, select the strategy for when the assignment times out.
    5. If needed, add another assignment to create a multi-level assignment chain.
    <p align="center"><img src="/content/img/assignment-policy-human-task-hierarchy.png" alt="Assignment policy of human task in hierarchical order" width="90%" height="auto"></img></p>
6. (Optional) Add a trigger policy to start new workflows when the state of the Human task changes.
    1. In Trigger policy, select **(+) New trigger**.
    2. Select the **Trigger event**.
    3. Select the **Workflow** to start and its **Version**.
    4. (Optional) Select **Additional inputs** to configure the workflow’s input parameters, correlation ID, and task-to-domain mapping.
    5. If needed, add another trigger to start another workflow.
    <p align="center"><img src="/content/img/trigger-policy-human-task.png" alt=" Trigger policy for human task" width="90%" height="auto"></img></p>
7. In Input parameters, configure the form fields depending on the input source:
    * If the field is to be filled up by the assignee, you can leave the parameter value empty or pass in a default value that can be modified before submission.
    * If the field is read-only and will be passed from somewhere in the workflow, enter a parameter value. The value can be passed as a variable.

Refer to the [Human task reference](docs/reference-docs/operators/human.md) for more information and examples on configuring the task.

<p align="center"><img src="/content/img/human-task.png" alt="Human Task in Orkes Conductor" width="100%" height="auto"></img></p>

:::tip
During development, if the Human task is not yet connected to an external UI, you can set the assignment policy to Conductor User or Group first to test the form. Once the Human task is connected to an external UI, you can easily make the switch to External User or Group. Even after making the switch, the form can still be tested internally on Orkes Platform using the Human Task Inbox. 
:::

### Step 4: Display the form on an external UI

When the Human task begins, the associated user form will be assigned to the user or group defined in the task. The user form can be displayed on an external UI so that assignees can claim and complete user forms without having to log into Orkes Platform. These external assignees are referenced in the Human task definition but managed and verified in an external system.

**To display the form on an external UI:**

<details><summary>1. Create the UI in your preferred language.</summary>

Create an external UI to display the user form as desired. Some common display options include an action inbox that contains all pending approval items or a multi-page form, with each page corresponding to one Human task on the Conductor end. 
</details>

<details><summary>2. Add the Human task to an application account and grant permissions for execution.</summary>

To use a Human task with an external UI, you need to add the Human task to an application account and grant Execute permission to the application.

**To add the Human task to application account:**
1. Go to the application account.
    1. Go to your Conductor cluster on Orkes Platform.
    2. In the left navigation menu, go to **Access Control** > **Applications**.
    3. Select an application that you will be adding your worker to. Otherwise, create an application.
2. Grant Execute, Read, and Update permission to the application.
    1. Under Permissions, select **Add permission**.
    2. Select the **Task** tab and then your Human task.
    3. Enable the **Execute**, **Read**, and **Update **toggles.
    4. (If Task to Domain is used) In Domain, enter the domain name used in your workflow.
    5. Select Add Permissions.

The application account can now execute the Human task.
</details>

<details><summary>3. Configure the Human task for external form assignment.</summary>

If the assignment policy in the Human task is not yet configured, go to the Human task in your workflow definition and ensure that the **User type** for the assignee(s) is set as **External User** or **Group**.
</details>

<details><summary>4. Integrate the UI with Conductor.</summary>

Use the Human Tasks APIs to integrate your external UI with your Conductor cluster. Get the API authentication tokens (key and secret) from your application account in Conductor.

1. **Display all active Human task executions.**
   Call `GET human/tasks/search` to list Human tasks with Assigned status and Assignee as External Group or External User.
2. **Display the user form for each Human task execution.**
   First, call `GET human/template` using the form name and version to get the user form schema. Then, inject the form inputs from the `GET human/tasks/search` call into the form schema so that the read-only fields are pre-filled.
3. **Submit the form response.**
   First, call `POST human/tasks/{taskId}/externalUser/{userId}` to claim the Human task. Then, call `POST h​​uman/tasks/{taskId}/update` to save or submit the form response.

</details>



## Testing and completing Human tasks in Orkes Platform

When defining your workflows with Human tasks, you can test and complete the task internally on Orkes Platform without having to test it from an external UI.

**To test and complete Human tasks in Orkes Platform:**
1. Run the workflow.
2. Complete the Human task in Orkes Platform.


### Run the workflow

Run the workflow to trigger a Human task execution. The Human task will remain in progress until the human interaction with the user form is complete.

**To run the workflow on Orkes Platform:**
1. Go to your Conductor cluster on Orkes Platform.
2. In the left navigation menu, select **Run Workflow**.
3. Select the desired workflow name and version and provide any input parameters as needed.
4. On the top right, select **Run Workflow**.

The workflow ID is generated. You can use it to view the execution progress and details.

<p align="center"><img src="/content/img/human-task-in-running-state.png" alt="Human Task in Running state" width="50%" height="auto"></img></p>

### Complete the Human task in Orkes Platform

As a Conductor user, you can also access all Human task executions on Orkes Platform. The list of Human task executions can be found in the left navigation menu under **Executions** > **Human Tasks**, allowing you to claim and complete pending Human tasks and view past Human task executions. 

Depending on your permission level,  there are two tab views available on the page:
* **Task inbox**—Contains unassigned Human tasks left open to everyone as well as  assigned tasks to you or your group, pending and completed.
* **Admin search**—(applicable only to cluster admins or task creators) Contains all Human tasks in the Conductor cluster.

<p align="center"><img src="/content/img/human-task-inbox-view.png" alt="Task inbox view of human task execution" width="100%" height="auto"></img></p>

<Tabs>
<TabItem value="claim task" label="To claim a task">

**To claim a task:**
1. Go to **Executions** > **Human Tasks** > **Task inbox**.
2. In the filter box, select **Available** to view all unclaimed tasks.
3. Select a task.
4. Select **Claim** to claim a task. Alternatively, select the drop-down arrow > **Override claim** to claim a previously-claimed task.

<p align="center"><img src="/content/img/claiming-forms.png" alt="Claiming human tasks forms " width="80%" height="auto"></img></p>

Once claimed, you can **Update** or **Complete** the task. In addition, you can **Release** the task to remove your claim so that someone else can claim it.

<p align="center"><img src="/content/img/update-complete-release-forms.png" alt="Update/Complete/Release forms" width="80%" height="auto"></img></p>

</TabItem>
<TabItem value="skip task" label="To skip a task">

**To skip a task:**

In your selected Human task, select **Skip** to bypass it. Alternatively, select the drop-down arrow > **Skip with reason** to include a reason for skipping the task.

<p align="center"><img src="/content/img/claiming-forms.png" alt="Claiming human tasks forms " width="80%" height="auto"></img></p>

</TabItem>

<TabItem value="assign task" label="To assign the task to a different user or group">

**To assign the task to a different user or group:**
1. In your selected Human task, select **Assign to a different subject** > **(+) New assignment**.
2. In Assign, select the **User type** for the assignee(s) and enter the corresponding user or group ID.
    * **External User** or **Group**—Select this if the assignees are managed and verified in an external system, and will access an external UI to complete the task.
    * **Conductor User** or **Group**—Select this if the assignees are Conductor users and will access Orkes Platform to complete the task.
3. Enter the **SLA minutes** to specify the assignment duration before it times out. Use 0 minutes to set a non-expiring assignment.
4. In **After assignments**, select the strategy for when the assignment times out.
5. If needed, add another assignment to create a multi-level assignment chain.

<p align="center"><img src="/content/img/assign-to-different-subject.png" alt="Assigning to a different subject" width="60%" height="auto"></img></p>

</TabItem>
</Tabs>

### Search Human task executions in Orkes Platform

If you are a cluster admin or task admin (workflow creator for the Human task), you can use **Admin search** tab in **Executions** > **Human Tasks** to filter and sort through all Human task executions for testing and debugging.

<p align="center"><img src="/content/img/admin-view-human-task.png" alt="Admin view of human task executions" width="100%" height="auto"></img></p>


**Admin search filters**

| Filter     | Description                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task names | Filters based on the task display name specified in the Human task definition. Multiple entries can be selected. |
| State | Filters based on the Human task status. Supported values:<ul><li>IN_PROGRESS</li> <li>PENDING</li> <li>ASSIGNED</li> <li>COMPLETED</li> <li>TIMED_OUT</li> <li>DELETED</li></ul> |
| Definition names | Filters based on the task definition name. Multiple entries can be selected. |
| Output data search | Filters based on the output data. |
| Task reference name | Filters based on the task reference name. Multiple entries can be selected. |
| Start time | Filters based on the task execution time. |
| Input data search | Filters based on the input data. |
| Full-text search | Searches all data within the execution columns based on an “AND” and “OR” query. <p align="center"><img src="/content/img/full-text-search-human-task.png" alt="Full text view of human task executions" width="100%" height="auto"></img></p> For example, `“loan" OR "cc3d2dc-18d4-11ef-a811-8a584d19ffea"`. The search will return all results that contain either the text “loan” or the specific workflow ID “cc3d2dc-18d4-11ef-a811-8a584d19ffea”. To get results matching both criteria, use “AND” instead of “OR”. |
| Filter by actors | Filters based on Claimant or Assignee. |
| Actor type | Filters based on the actor type for the selected actor. Supported values: <ul><li>Conductor User</li> <li>Conductor Group</li> <li>External User</li> <li>External Group</li> </ul> |
| User/Group ID | Filters based on a particular user or group ID. |