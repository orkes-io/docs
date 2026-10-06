---
title: "Human"
description: "Learn how the Human task pauses a workflow to collect user input through forms or approvals in Orkes Conductor."
canonical_route: "reference-docs/operators/human"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Human, Human task"
---

# Human

The Human task allows human interaction within a workflow. When execution reaches a Human task, Conductor assigns a form to a user or group and waits for it to be completed. After the form is submitted, the task records the input, and the workflow continues.

A Human task can be used for a variety of human-involved tasks, such as manual approval in an expense approval workflow or a user intake form in a hotel booking workflow.

To support human-involved tasks, the Human task can be used alongside the following:

- **User Forms**—A form builder to create user forms hosted on your Conductor cluster.
- **Human Tasks API**—A suite of APIs that manage the lifecycle of Human tasks connected to Conductor workflows.

!!! info "Prerequisites"
    Before adding a Human task to a workflow, you should complete the following:
    
    - Create a user form in Orkes Conductor.
    - Define the Human task in Conductor.
    
    For a complete guide on how to use human-involved tasks, refer to the [Human Task Orchestration guide](/content/developer-guides/orchestrating-human-tasks).

## Task parameters

When creating a workflow, you can configure the Human task with assignment and trigger policies.

- **Assignment policy**—Define who can fill out the form, how long the form is assigned to them, and what to do if the assignment times out.
  
  - If not configured, the task is not restricted and can be completed by anyone.
  - Multiple assignment policies can be added to create a multi-level assignment chain. If the first group fails to pick the assignment within the specified timeframe, the task will be escalated to the next assigned group.
  - Additional assignment policies cannot be added if the preceding assignment policy has no specified expiry timeframe.
- **Trigger policy**—Trigger a workflow to start if the task state or details change.

Here are all the parameters for the Human task.

| Parameter                              | Description                                                            | Required/ Optional |
| -------------------------------------- | ---------------------------------------------------------------------- | ------------------ |
| displayName                            | The task display name, which will appear on the connected UI for the user. Use a unique human-friendly name (for example, “Loan Approval” or “Booking Form”).                                                                                                                                                                                                                                        | Required.          |
| userFormTemplate                       | The user form associated with the Human task. This form will be assigned when the Human task is executed. <br/><br/>**Note**: If you haven’t created the user form, go to **Definitions** > **User Forms** and set it up. Refer to the documentation for [creating user forms](/content/developer-guides/orchestrating-human-tasks#step-1-create-a-user-form-schema).                                                                                                                                                                              | Required.          |
| userFormTemplate. **name**             | The name of the user form.                                                                                                                                                                                                                                                                             | -                  |
| userFormTemplate. **version**          | The version of the user form.                                                                                                                                                                                                                                                                             | -                  |
| assignments                            | The assignment policy for the Human task.                                                                                                                                                                                                                                                                                         | Optional.          |
| assignments. **userType**              | The type of user or group that will be assigned to the task. Supported values: <ul> <li>**EXTERNAL_USER**—The assignee is a user residing outside the Conductor cluster in an external system.</li> <li>**EXTERNAL_GROUP**—The assignee is a group residing outside the Conductor cluster in an external system.</li> <li>**CONDUCTOR_USER**—The assignee is a user in the Conductor cluster.</li> <li>**CONDUCTOR_GROUP**—The assignee is a group in the Conductor cluster.</li></ul>                                                                                                                                                                                                                                                                                                                                                                       | -                  |
| assignments. **user**                  | The user or group ID for the assignee. The value depends on the user type. <ul> <li>**EXTERNAL_USER**—Provide the user's email that is managed and verified in an external system.</li> <li>**EXTERNAL_GROUP**—Provide the name of the group that is managed and verified in an external system.</li> <li>**CONDUCTOR_USER**—Provide the user’s Conductor email.</li> <li>**CONDUCTOR_GROUP**—Provide the [Conductor group name](/content/access-control-and-security/users-and-groups#groups).</li></ul>                                                                                                                                                                                                                                                                                                                                    | -                  |
| assignments. **slaMinutes**            | The duration in minutes for which the Human task will be assigned. Use 0 minutes for a non-expiring duration.                                                                                                                                                      | -                  |
| autoClaim | Enables automatic claiming of the Human task by the first assignee in the assignment policy list when the task execution starts.<br/><br/>When set to `true`, the task moves directly to the *In progress* state without requiring manual claiming. Set to `false` to keep the task in *Assigned* state until manually claimed. | Optional. | 
| assignmentCompletion Strategy          | The action that will occur if the assignment policy times out. Supported values: <ul> <li>**LEAVE_OPEN**—The Human task execution remains open to be picked up by anyone.</li> <li>**TERMINATE**—The Human task execution is terminated and marked as deleted, and the workflow fails with the error “Task terminated as no more assignments pending and completion strategy is TERMINATE”.</li></ul>                                                                                                                                                                                                                                 | Required.          |
| taskTriggers                           | The trigger policy for the Human task.                                                          | Optional.          |
| taskTriggers. **triggerType**          | The condition that will trigger a specified workflow. Supported conditions are: <ul> <li>**PENDING**—A workflow will be triggered if the Human task enters the Pending state.</li> <li>**ASSIGNED**—A workflow will be triggered once the Human task is assigned to a specific assignee.</li> <li>**IN_PROGRESS**—A workflow will be triggered if the Human task enters the In Progress state.</li> <li>**COMPLETED**—A workflow will be triggered if the Human task enters the Completed state.</li> <li>**TIMED_OUT**—A workflow will be triggered if the Human task times out.</li> <li>**ASSIGNEE_CHANGED**—A workflow will be triggered if the assignee changes due to the assignment policy or because the task has been left open and picked up by anyone.</li> <li>**CLAIMANT_CHANGED**—A workflow will be triggered if the claimant changes.</li></ul> | -                  |
| taskTriggers. **startWorkflowRequest** | The details of the workflow to be triggered, including its name, version, input parameters, correlation ID, and task-to-domain mapping.                                                                                                                                                                                         | -                  |

In addition, you should also configure Human task’s `inputParameters`, which contain the fields taken from its associated user form. The configuration depends on the input source:

- If the field is to be filled up by the assignee, leave the value empty.
- If the field is read-only, set the value explicitly. You can use static values or [dynamic variables](/content/developer-guides/passing-inputs-to-task-in-conductor) to pass data from workflow inputs or previous task outputs.

The following are generic configuration parameters that can be applied to the task and are not specific to the Human task.

<details>
<summary>Other generic parameters</summary>

Here are other parameters for configuring the task behavior.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| optional | Whether the task is optional. <br/><br/>If set to`true`, any task failure is ignored, and the workflow continues with the task status updated to `COMPLETED_WITH_ERRORS`. However, the task must reach a terminal state. If the task remains incomplete, the workflow waits until it reaches a terminal state before proceeding. | Optional. | 

</details>

## Task configuration

This is the task configuration for a Human task.

```json
   {
     "name": "human",
     "taskReferenceName": "human_ref",
     "inputParameters": {
       "__humanTaskDefinition": {
         "assignmentCompletionStrategy": "LEAVE_OPEN",
         "assignments": [
           {
             "assignee": {
               "user": "<ENGINEERS>",
               "userType": "CONDUCTOR_GROUP"
             },
             "slaMinutes": 10
           }
         ],
         "displayName": "Loan Approval",
         "userFormTemplate": {
           "name": "Approval",
           "version": 1
         },
         "autoClaim": true,
         "taskTriggers": [
           {
             "triggerType": "COMPLETED",
             "startWorkflowRequest": {
               "name": "email-notification-workflow",
               "version": 1
             }
           }
         ]
       }
     },
     "type": "HUMAN"
   }
```

## Task output

The Human task will return a JSON object containing the form response. For example:

```json
{
 "approve": "Yes",
 "comments": "Research paper approved.",
 "paperUrl": "<URL>"
}
```

## Examples

Here are some examples for using the Human task.

<details>
<summary>Document approval</summary>

See an example of a [document approval workflow](https://orkes.io/content/templates/examples/document-approvals) in Orkes Conductor, where two reviewers evaluate a submission, and the workflow either sends an approval email or requests revisions based on their decisions.

</details>

## Related pages

- [Operators](/content/category/reference-docs/operators)
- [Switch](/content/reference-docs/operators/switch)
- [Do While](/content/reference-docs/operators/do-while)
- [Wait](/content/reference-docs/operators/wait)
- [Dynamic](/content/reference-docs/operators/dynamic)
- [Set Variable](/content/reference-docs/operators/set-variable)
