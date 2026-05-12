---
title: "Human Task Orchestration"
description: "Learn how to incorporate human-in-the-loop steps in workflows using forms, task assignments, and manual approvals in Orkes Conductor."
---

# Human Task Orchestration

Human tasks let a workflow pause for review, approval, data correction, exception handling, or another decision that should remain part of the durable execution. A Human task is linked to a user form, assigned to a user or group, and completed through Orkes Conductor or your own UI.

Unlike a standalone ticket or form queue, a Human task keeps the decision connected to the workflow: timeouts, reassignment, audit history, downstream tasks, retries, and compensation all remain visible in one execution.

!!! tip "5-minute path"
    Create a user form, define a Human task, add it to a workflow with an assignment policy, run the workflow, complete the task, and verify the workflow continues with the submitted form output.

## Orchestrating human-involved tasks

Use Human tasks when the process needs:

- Approval before a side effect.
- Manual exception handling.
- Data correction before retrying.
- Compliance or fraud review.
- A user-facing form that should resume a workflow after submission.
- Escalation when an assignee does not act in time.

The implementation path is:

1. Create a user form schema.
2. Define the Human task resource.
3. Configure the Human task in a workflow.
4. Test task assignment and completion.
5. Optionally render and complete the form in your own UI.

## Step 1: Create a user form schema

A user form schema defines the fields an assignee sees and the output the workflow receives. Forms are versioned and reusable across workflows.

Recommended form design:

| Design choice | Guidance |
| ------------- | -------- |
| Field names | Use stable machine-readable names such as `approvalStatus` or `reviewNotes`. |
| Labels | Use human-readable labels for assignees. |
| Required fields | Require fields that downstream tasks need. |
| Read-only fields | Use for context passed from workflow input or previous task output. |
| Data size | Keep form output small because it becomes workflow data. |

Supported components include Boolean, Multiple Choice, Date, Date + Time, Description Text, Image, Number Field, Text, Time, Video, and Radio. You can also define custom form JSON when the visual builder is not enough.

Store the form in Conductor even when you render it in your own UI. That keeps the form versioned with the workflow and lets frontend rendering change without redeploying the orchestration logic.

## Step 2: Define a Human task

Define the Human task as a task resource before using it in a workflow. The task definition acts as the access-control resource for RBAC.

Use a stable task name such as `loan_review`, `contract_approval`, or `customer_data_correction`. Configure the same operational fields you would for other tasks: timeouts, rate limits, expected inputs/outputs, and ownership.

The Human task definition name is used when granting applications or groups permission to execute, read, update, or administer the task.

## Step 3: Configure the Human task

Add the Human task to the workflow and configure its form, assignment behavior, input parameters, and optional triggers.

Minimum configuration:

| Field | Purpose |
| ----- | ------- |
| Task display name | Human-readable name shown in Human task execution lists. |
| User form template | Form name and version the assignee completes. |
| Assignment policy | User/group assignment and escalation chain. |
| Input parameters | Values used to prefill form fields or provide review context. |

Example task configuration:

```json
{
  "name": "loan_review",
  "taskReferenceName": "loan_review",
  "type": "HUMAN",
  "inputParameters": {
    "applicationId": "${workflow.input.applicationId}",
    "riskScore": "${score_application.output.riskScore}",
    "requestedAmount": "${workflow.input.requestedAmount}"
  },
  "humanTaskConfig": {
    "displayName": "Loan Review",
    "userFormTemplate": {
      "name": "loanReviewForm",
      "version": 1
    }
  }
}
```

Assignment policy controls who can act on the task:

| Assignee type | Use when |
| ------------- | -------- |
| Conductor User | A named Conductor user completes the task in Orkes Conductor. |
| Conductor Group | A Conductor group shares responsibility through the Human task inbox. |
| External User | Your own application identifies and authenticates the assignee. |
| External Group | Your own application manages a group inbox or queue. |

Trigger policies can start workflows when the Human task changes state, such as `Pending`, `Assigned`, `In progress`, `Completed`, `Timed out`, `Assignee changed`, or `Claimant changed`. Use triggers for notifications, escalations, audit export, or downstream side effects that should run on task-state changes.

Refer to the [Human task reference](/content/reference-docs/operators/human) for the complete configuration schema.

## Step 4: Testing Human tasks in Orkes Conductor

Test a Human task with a Conductor User or Group assignment before wiring a custom UI. This verifies the form, assignment policy, output payload, and workflow continuation.

### Run the workflow

Start the workflow with input that reaches the Human task. The workflow remains running while the Human task waits for completion.

Record the workflow ID and Human task execution ID. You will use them for debugging, API tests, and external UI integration.

### Complete the Human task

Complete the task from the Human Tasks inbox or through the Human Tasks API. The submitted form fields become task output and can be referenced by downstream tasks.

Example downstream reference:

```json
{
  "name": "route_decision",
  "taskReferenceName": "route_decision",
  "type": "SWITCH",
  "evaluatorType": "value-param",
  "expression": "decision",
  "inputParameters": {
    "decision": "${loan_review.output.approvalStatus}"
  },
  "decisionCases": {
    "approved": [],
    "rejected": []
  }
}
```

Check that:

- The right user or group can claim the task.
- Required fields are enforced.
- Read-only fields are prefilled correctly.
- Output field names match downstream workflow expressions.
- Timeout and escalation behavior is acceptable.

### Search Human task executions

Use Human task search for operational review and debugging.

Useful filters include:

| Filter | Use |
| ------ | --- |
| Task names | Find all executions of a specific Human task. |
| Workflow IDs | Debug a single workflow execution. |
| State | Find pending, assigned, completed, timed out, or deleted tasks. |
| Actor filters | Find tasks assigned to or claimed by a user/group. |
| Input/output search | Locate tasks by form context or submitted response. |
| Time range | Review SLA or incident windows. |

For production operations, treat Human task search as the inbox and audit surface for decisions made inside workflows.

## Step 5: Display the form on your own UI

Use your own UI when assignees should not log in to Orkes Conductor or when the Human task is part of an existing application experience.

### 1. Create the UI in your preferred language.

Build an inbox, detail page, or embedded form experience around Human task executions. The UI should show enough workflow context for the assignee to make a decision, but should avoid exposing unrelated workflow data.

### 2. Add the Human task to an application and grant permissions for execution.

Create an application for the external UI backend. Grant it the minimum permissions required to search, claim, update, and complete the Human task.

Recommended permissions:

| Resource | Permission |
| -------- | ---------- |
| Human task / task definition | Read, Update, Execute |
| Related workflow execution | Read, if the UI needs workflow context |
| Secrets or integrations | Avoid unless the UI backend explicitly needs them |

Store the application key and secret in your secret manager. Do not expose Conductor credentials in the browser.

### 3. Configure the Human task for external form assignment.

Set the assignment policy to External User or External Group when your own system owns assignee identity. Use Conductor User or Conductor Group only when assignees complete the task inside Orkes Conductor.

Map your application's user or group IDs consistently to the external assignee IDs used in the Human task assignment policy.

### 4. Integrate the UI with Conductor.

Use the [Human Tasks APIs](/content/reference-docs/api/human-tasks) from your backend service:

| Action | API pattern |
| ------ | ----------- |
| Search assigned tasks | `GET /api/human/tasks/search` |
| Fetch form schema | `GET /api/human/template` |
| Claim task as external user | `POST /api/human/tasks/{taskId}/externalUser/{userId}` |
| Save or submit task output | `POST /api/human/tasks/{taskId}/update` |

Integration flow:

1. Search for active Human tasks assigned to the external user or group.
2. Fetch the form schema by form name and version.
3. Merge read-only task inputs into the form model.
4. Claim the task before editing when your workflow requires ownership.
5. Submit form output to complete or update the task.
6. Show the resulting task state and workflow status in your UI.

Production notes:

- Keep form output stable because downstream workflow tasks depend on field names.
- Use schemas or validation in your UI backend for submitted form data.
- Log who claimed and submitted the task in your own identity system.
- Define timeout and escalation behavior for tasks that are not completed.
- Use trigger policies for notification workflows instead of embedding notification logic in the UI.
